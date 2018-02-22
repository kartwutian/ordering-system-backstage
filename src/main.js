import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
import "babel-polyfill";

import config from 'src/common/utils/config.js'
window.config = config

import GlobalComponents from 'src/plugin/components';

Vue.use(ElementUI);
Vue.use(GlobalComponents)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

router.afterEach((to, from) => {
    /**
     * 实现面包屑导航的双向绑定
     */
    if( to.meta && to.meta.breadcrumb ){
        store.commit('UPDATEBREADCRUMB', to.meta.breadcrumb)
    }else{
        store.commit('UPDATEBREADCRUMB', [])
    }
})
