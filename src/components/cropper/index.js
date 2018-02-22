import Vue from 'vue';
import CropperModule from './cropper.vue';

const CropperConstructor = Vue.extend(CropperModule);


const instance = new CropperConstructor({
    el: document.createElement('div')
});

const hashChange = function () {
    const el = instance.$el;
    el.parentNode && el.parentNode.removeChild(el);
};

CropperConstructor.prototype.closeCropper = function () {
    let img = this.crop.getCroppedCanvas().toDataURL('image/'+this.imageType)
    this.crop.destroy()
    const el = instance.$el;
    el.parentNode && el.parentNode.removeChild(el);


    window.removeEventListener("hashchange", hashChange);

    typeof this.callback === 'function' && this.callback(img);
};

CropperConstructor.prototype.cancleCropper = function () {
    this.crop.destroy()
    const el = instance.$el;
    el.parentNode && el.parentNode.removeChild(el);

    window.removeEventListener("hashchange", hashChange);

};

let myCrop  = (options = {}) => {
    instance.img = options.img;
    instance.callback = options.callback;
    instance.imageType = options.imageType || 'png'
    window.addEventListener("hashchange", hashChange);
    document.body.appendChild(instance.$el);
    instance.$nextTick(function () {
        instance.crop = new Cropper(instance.$refs.img,{
            viewMode: 2,
            aspectRatio: options.aspectRatio || 1
        })
    })

};

export default myCrop;
