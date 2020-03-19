import Vue from "vue";
const props = Vue.prototype;
export const spinShow = function () {
    props.$Spin.show();
};
export const spinHide = function () {
    props.$Spin.hide();
};