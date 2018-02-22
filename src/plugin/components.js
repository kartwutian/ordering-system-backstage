import MyCrop from 'src/components/cropper/index.js'

const install = function (Vue) {

    Vue.prototype.$cropper = MyCrop

};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install
};
