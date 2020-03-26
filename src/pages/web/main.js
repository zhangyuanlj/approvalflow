import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import ViewUI from "view-design/dist/iview.min.js";
import App from "components/App.vue";
import {
    ThumbPannel,
    Attribute
} from "formDesign/Web";
import Canvas from "formDesign/Web/Canvas";
import ProcessNode from "components/Common/Workflow/ProcessNode.vue";
import checkLogin from "utils/checkLogin";
import componentModel from "formDesign/Web/Factory/model";
import "utils/bus";
import "utils/route";
import "components/Styles/reset.module.less";
import {
    web
} from "@/router";
import store from "@/store";
// 路由配置
const router = new VueRouter({
    routes: web
});
const onBeforeUnload = (e) => {
    const returnValue = '确定要关闭此页吗?请确保数据已进行保存!';
    e.returnValue = returnValue;
    return returnValue;
};
ViewUI.LoadingBar.config({
    color: "#5cb85c"
});
router.beforeEach((to, from, next) => {
    checkLogin(to, from, next, ViewUI);
});
router.afterEach(() => {
    window.scrollTo(0, 0);
    ViewUI.LoadingBar.finish();
});
Vue.config.productionTip = false;
Vue.prototype.componentModel = componentModel;
//注册组件
Vue.component("ThumbPannel", ThumbPannel);
Vue.component("Attribute", Attribute);
Vue.component("Canvas", Canvas);
Vue.component("ProcessNode", ProcessNode);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(ViewUI);
//web端卸载页面时，弹出页面保存提示
window.removeEventListener("beforeunload", onBeforeUnload, false);
window.addEventListener("beforeunload", onBeforeUnload, false);
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount("#app");