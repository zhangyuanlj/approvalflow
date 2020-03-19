import Vue from 'vue';
const Bus = new Vue();
Vue.prototype.$EventBus = Bus;
export default Bus;