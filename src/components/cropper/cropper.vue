<template>
    <div class="crop__wrap">
        <div class="crop__title" >
            图片裁切
        </div>
        <div class="btn__wrap">
            <el-button @click.native.stop="closeCropper" type="primary">裁切</el-button>
            <el-button @click.native.stop="cancleCropper" type="primary">取消</el-button>
        </div>

        <div class="img__wrap">
            <img ref="img" :src="img" alt="Picture">
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { Button } from 'element-ui'

    export default {

        props: {
            img: String,
            callback: Function
        },
        components: {
            'el-button': Button
        }

    }
</script>

<style lang="less">
    @import "cropper.less";
</style>
