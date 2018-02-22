<template>
    <div>
        <div class="crop__wrap">
            <div class="crop__title">
                图片裁切
            </div>
            <input type="file" name="image" accept="image/*"
                   style="font-size: 1.2em; padding: 10px 0;"
                   @change="setImage"
            />
            <br />
            <el-row>
                <el-col :span="6">1</el-col>
                <el-col :span="12">
                    <vue-cropper :viewMode="2" :aspectRatio="1" ref="cropper" :src="imgSrc"></vue-cropper>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click.native="cropImage">确定</el-button>
                    <el-button  @click.native="cropImage">取消</el-button>
                </el-col>
            </el-row>
            <img
                :src="cropImg"
                alt="Cropped Image"
            />
            <br />
        </div>


    </div>
</template>

<script>
    import VueCropper from 'src/components/base/cropper';
    export default {
        data () {
            return {
                imgSrc: '',
                cropImg: ''
            };
        },
        methods: {
            setImage (e) {
                const file = e.target.files[0];

                if (!file.type.includes('image/')) {
                    alert('Please select an image file');
                    return;
                }

                if (typeof FileReader === 'function') {
                    const reader = new FileReader();

                    reader.onload = (event) => {
                        this.imgSrc = event.target.result;
                        // rebuild cropperjs with the updated source
                        console.log(this.$refs.cropper)
                        this.$refs.cropper.replace(event.target.result);
                    };

                    reader.readAsDataURL(file);
                } else {
                    alert('Sorry, FileReader API not supported');
                }
            },
            cropImage () {
                // get image data for post processing, e.g. upload or setting image src
                this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
            },
            rotate () {
                // guess what this does :)
                this.$refs.cropper.rotate(90);
            }
        }
    }
</script>

<style lang="less">
@import "../base/cropper/cropper.less";
</style>
