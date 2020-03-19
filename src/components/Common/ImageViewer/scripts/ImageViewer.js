import Vue from 'vue';
import ImageViewer from '../imageViewer.vue';
const newInstance = function () {
    const instance = new Vue({
        render: h => h(ImageViewer)
    });
    const component = instance.$mount();
    const $ImageViewer = component.$children[0];
    const $el = $ImageViewer.$el;
    document.body.appendChild($el);
    return {
        moveImageIndex: function (step) {
            $ImageViewer.moveImageIndex(step);
        },
        viewImages: function (imageList, getImageUrl) {
            $ImageViewer.viewImages(imageList, getImageUrl);
        },
        onReset: function () {
            $ImageViewer.onReset();
        }
    };
};
Vue.prototype.$ImageViewer = newInstance;