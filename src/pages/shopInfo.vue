<template>
    <div class="shop__info">
        <template v-if="shopInfo.toString() !== '{}' ">
            <el-row type="flex" justify="space-between">
                <div></div>
                <el-col :span="4">
                    <img class="shop__logo" :src="shopInfo.logo" alt="">
                </el-col>
                <router-link to="/updateShop">
                    <el-button>修改</el-button>
                </router-link>
            </el-row>
            <el-row class="shop__name" type="flex" justify="center">
                {{ shopInfo.cnName }} ({{ shopInfo.enName }})
            </el-row>
            <el-row class="shop__declaration" type="flex" justify="center">
                {{ shopInfo.declaration }}
            </el-row>
            <el-row class="shop__info-title" type="flex" justify="center">
                店铺展示
            </el-row>
            <el-carousel indicator-position="outside">
                <el-carousel-item v-for="item in shopInfo.album" :key="item">
                    <img :src="item" alt="">
                </el-carousel-item>
            </el-carousel>
            <el-row class="shop__tel" type="flex" justify="space-between">
                <el-col :span="8">电话</el-col>
                <el-col :span="16">{{ shopInfo.phone }}</el-col>
            </el-row>
            <el-row class="shop__tel" type="flex" justify="space-between">
                <el-col :span="8">地址</el-col>
                <el-col :span="16">{{ shopInfo.address }}</el-col>
            </el-row>
            <el-row class="shop__tel" type="flex" justify="space-between">
                <el-col :span="8">wifi</el-col>
                <el-col :span="8">账号：{{ shopInfo.wifiSsid }}</el-col>
                <el-col :span="8">密码：{{ shopInfo.wifiPwd }}</el-col>
            </el-row>
            <el-row class="shop__tel" type="flex" justify="space-between">
                <el-col :span="8">营业时间</el-col>
                <el-col :span="16">{{ shopInfo.beginTime }}--{{shopInfo.endTime}}</el-col>
            </el-row>
        </template>

    </div>
</template>

<script type="text/ecmascript-6">
    import { proxyError, getShopInfo } from 'api'
    export default {
        data: function(){
            return {
                shopInfo: {}
            }
        },
        created() {
            // 获取店铺信息，初始化界面数据
            this.getShopInfo()
        },
        methods: {
            getShopInfo: async function () {
                let res = await proxyError(getShopInfo())
                if(res.data.code === window.config.STATE_OK){
                    this.handleShopInfo(res.data.data)
//                    console.log(this.shopInfo)

                }
            },
            handleShopInfo(data) {
                data.logo = window.config.DOMAIN + data.logo
                data.album = JSON.parse(data.album)
                data.album = data.album.map(function (item) {
                    return window.config.DOMAIN + item

                })
                this.shopInfo = data
//                console.log(data.album)
            }
        }
    }
</script>

<style >
    .el-carousel__item img {
        width: 100%
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>
