<template>
    <div class="upload__shop">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="店铺名称">
                <el-col :span="9">
                    <el-input v-model="form.cnName"></el-input>
                </el-col>
                <el-col :span="2" class="shop__wifi-title">英文名</el-col>
                <el-col :span="9">
                    <el-input v-model="form.enName" placeholder="选填"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="服务宣言">
                <el-col :span="20">
                    <el-input v-model="form.declaration"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="店铺电话">
                <el-col :span="6">
                    <el-input v-model="form.tel"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="WIFI账号">
                <el-row >
                    <el-col :span="6">
                        <el-input v-model="form.wifiAccount"></el-input>
                    </el-col>
                    <el-col :span="3" class="shop__wifi-title">WIFI密码</el-col>
                    <el-col :span="6">
                        <el-input v-model="form.wifiPassword"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>

            <el-form-item label="营业时间">
                <el-col :span="11">
                    <el-time-picker type="fixed-time" placeholder="开始时间" v-model="form.beginTime" style="width: 100%;"></el-time-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-time-picker type="fixed-time" placeholder="结束时间" v-model="form.endTime" style="width: 100%;"></el-time-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="logo上传" >
                <label class="shop__logo-area">
                    <input type="file" @change="setLogo" style="width: 0;height: 0;opacity: 0" multiple>
                    <img class="shop__logo-img" v-if="logo" :src="logo" alt="">
                </label>
            </el-form-item>
            <el-form-item label="店铺展示" >
                <label>
                    <input type="file" @change="addShow" style="width: 0;height: 0;opacity: 0" multiple>
                    <el-button>添加</el-button>
                </label>
                <div class="shop__shows" v-if="shows.length">
                    <el-col :span="6" v-for="(item,index) in shows" :key="index" class="shop__shows-item">
                        <img class="shop__item-img" :src="item" alt="">
                        <i class="el-icon-close shop__item-close" @click="deleteShowItem(index)"></i>
                    </el-col>

                </div>
            </el-form-item>
            <el-form-item label="店铺简介">
                <el-col :span="24">
                    <el-input class="shop__desc" :rows="5" type="textarea" v-model="form.desc"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="店铺地址"><!--
                <el-col :span="4">
                    <el-button @click.native="getGeo" style="margin-bottom: 10px;">模糊定位</el-button>
                </el-col>-->
                <el-col :span="14" style="margin-bottom: 10px;">
                    <el-input @input.native="setGeo" v-model="form.address"></el-input>
                </el-col>
                <el-col :span="24" id="map" style="height: 400px;">
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
    import { dataURItoBlob } from 'src/common/utils/utils.js'
    import { upFiles,updateShop,getShopInfo,proxyError } from 'src/api'
    export default {
        data() {
            return {
                logo: '',
                shows: [],
                form: {
                    cnName: '',
                    enName: '',
                    declaration: '',
                    tel: '',
                    wifiAccount: '',
                    wifiPassword: '',
                    beginTime: '',
                    endTime: '',
                    logo: '',
                    shows: [],
                    desc: '',
                    address: '',
                    province: '',
                    city: '',
                    district: '',
                    lon: '',
                    lat: ''
                }
            }
        },
        mounted: function(){
            alert(1)
            this.initMap()
        },
        methods: {
            getShopInfo: async function () {
                let res = await proxyError(getShopInfo())
                if(res.data.code === window.config.STATE_OK){
                    this.handleShopInfo(res.data.data)
                }
            },
            handleShopInfo(data) {
                console.log(data)
                this.form.cnName = data.cnName
                this.form.enName = data.enName
                this.form.declaration = data.declaration
                this.form.tel = data.phone
                this.form.wifiAccount = data.wifiSsid
                this.form.wifiPassword = data.wifiPwd
                this.form.beginTime = data.beginTime
                this.form.endTime = data.endTime
                this.form.logo = data.logo
                this.form.shows = JSON.parse( data.album )
                this.form.desc = data.about
                this.form.address = data.address
                this.form.province = data.province
                this.form.city = data.city
                this.form.district = data.county
                this.form.lon = data.lon
                this.form.lat = data.lat
            },
            searchTip() {

            },
            initMap() {
                let _this = this
                this.map = new BMap.Map("map");
                var point = new BMap.Point(116.404, 39.915);
                this.map.centerAndZoom(point,15);

//                this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
                this.map.addControl(new BMap.NavigationControl());
                this.map.addControl(new BMap.ScaleControl());
                this.map.addControl(new BMap.OverviewMapControl());
                this.map.addControl(new BMap.MapTypeControl());



                // 创建地址解析器实例
                this.myGeo = new BMap.Geocoder();
                // 将地址解析结果显示在地图上，并调整地图视野

                /* 定位获取城市信息 */
                var myCity = new BMap.LocalCity();
                myCity.get(function (result) {
                    var cityName = _this.cityName = result.name;
                    _this.point = result.center
                    _this.map.setCenter(cityName);

                    _this.marker = new BMap.Marker(_this.point);        // 创建标注
                    _this.map.addOverlay(_this.marker);
                    _this.form.lon = _this.point.lng
                    _this.form.lat = _this.point.lat
                    _this.myGeo.getLocation(_this.point, function(result){
//                        console.log(result)
                        if (result){
                            _this.form.address = result.address
                            _this.form.province = result.addressComponents.province
                            _this.form.city = result.addressComponents.city
                            _this.form.district = result.addressComponents.district
                        }
                    });
                });
            },
            getGeo() {
                let _this = this
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function(ret){
                    if(this.getStatus() == BMAP_STATUS_SUCCESS){
                        let mk = new BMap.Marker(ret.point);
//                        console.log(ret.point)
                        _this.map.addOverlay(mk);
                        _this.map.panTo(ret.point);
                        _this.myGeo.getLocation(ret.point, function(result){
                            if (result){
                                _this.form.address = result.address
//                                alert(result.address);
                            }
                        });
                    }
                    else {
                        alert('定位失败！'+this.getStatus());
                    }
                });
            },
            setGeo() {
                if(!this.form.address){
                    return
                }
                let _this = this;
//                console.log(this.point)
                this.map.removeOverlay(this.marker)
                this.myGeo.getPoint(this.form.address, function(point){
                    _this.point = point
                    if (_this.point) {
                        _this.map.centerAndZoom(_this.point, 16);
                        _this.marker = new BMap.Marker(_this.point)
                        _this.map.addOverlay(_this.marker);
                        _this.form.lon = _this.point.lng
                        _this.form.lat = _this.point.lat
                        _this.myGeo.getLocation(_this.point, function(result){
//                        console.log(result)
                            if (result){
                                _this.form.province = result.addressComponents.province
                                _this.form.city = result.addressComponents.city
                                _this.form.district = result.addressComponents.district
                            }
                        });
                    }

                }, this.cityName);
            },
            setLogo(e){
                let _this = this
                let file = e.target.files[0]
                let reader = new FileReader();
                reader.addEventListener('load',function () {
                    _this.$cropper({
                        img: reader.result,
                        callback(img) {
                            _this.logo = img
                            var formData = new FormData();
                             formData.append("file",dataURItoBlob(img),"image.png")
                             upFiles(formData).then(function (res) {
                                 if(res.data.code === window.config.STATE_OK){
                                     _this.form.logo = res.data.data[0].saveFile
                                     console.log(_this.form.logo)
                                 }
                             })
                        }
                    })

                },false)
                reader.readAsDataURL(file)

            },
            addShow(e) {
                let _this = this
                let file = e.target.files[0]
                let reader = new FileReader()
                reader.addEventListener('load',function () {
                    _this.$cropper({
                        aspectRatio: 16/9,
                        imageType: 'jpeg',
                        img: reader.result,
                        callback(img) {
                            _this.shows.push(img)
                            var formData = new FormData();
                            formData.append("file",dataURItoBlob(img),"image.jpeg")
                            upFiles(formData).then(function (res) {
                                if(res.data.code === window.config.STATE_OK){
                                    _this.form.shows.push( res.data.data[0].saveFile )
                                    console.log(_this.form.shows)
                                }
                            })
                        }
                    })

                },false)
                reader.readAsDataURL(file)


            },
            deleteShowItem(index){
                this.shows.splice(index,1)
                this.form.shows.splice(index,1)
            },
            onSubmit() {
                updateShop(this.form).then(function(res){

                })
                console.log('submit!');

            },
        }
    }
</script>

<style lang="less">
</style>
