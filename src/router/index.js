import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: resolve => require(['pages/login.vue'], resolve)
        },
        {
            path: '/register',
            component: resolve => require(['pages/register.vue'], resolve)
        },
        {
            path: '/home',
            component: resolve => require(['pages/index.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../pages/home.vue'], resolve),
                },
                {
                    path: '/shopInfo',
                    component: resolve => require(['../pages/shopInfo.vue'], resolve),
                    meta: {
                        breadcrumb: ['数据管理', '店铺信息']
                    }
                },
                {
                    path: '/goodsList',
                    component: resolve => require(['../pages/goodsList.vue'], resolve),
                    meta: {
                        breadcrumb: ['数据管理', '菜单信息']
                    }
                },
                {
                    path: '/deskList',
                    component: resolve => require(['../pages/deskList.vue'], resolve),
                    meta: {
                        breadcrumb: ['数据管理', '餐桌管理']
                    }
                },
                {
                    path: '/updateShop',
                    component: resolve => require(['../pages/uploadShop.vue'], resolve),
                    meta: {
                        breadcrumb: ['完善数据', ' 完善店铺']
                    }
                },
                {
                    path: '/addGoods',
                    component: resolve => require(['../pages/addGoods.vue'], resolve),
                    meta: {
                        breadcrumb: ['完善数据', ' 添加商品']
                    }
                }
            ]
        }
    ]
})
