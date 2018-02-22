<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: 'home',
                        title: '首页'
                    },
                    {
                        icon: 'el-icon-document',
                        index: '1',
                        title: '数据管理',
                        subs: [
                            {
                                index: 'shopInfo',
                                title: '店铺信息'
                            },
                            {
                                index: 'goodsList',
                                title: '菜单信息'
                            },
                            {
                                index: 'deskList',
                                title: '餐桌管理'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-plus',
                        index: '2',
                        title: '完善数据',
                        subs: [
                            {
                                index: 'updateShop',
                                title: '店铺完善'
                            },
                            {
                                index: 'addGoods',
                                title: '添加食品'
                            }
                        ]
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 0;
        bottom:0;
        background: #2E363F;
        z-index: 10;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
