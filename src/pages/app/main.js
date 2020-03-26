import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import ViewUI from "view-design/dist/iview.min.js";
import App from "components/App.vue";
import ProcessNode from "components/Common/Workflow/ProcessNode.vue";
import checkLogin from "utils/checkLogin";
import "utils/bus";
import "utils/route";
import {
    app
} from "@/router";
import store from "@/store";
import "components/Styles/index.module.less";
// 路由配置
const router = new VueRouter({
    routes: app
});
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
//将流程节点组件注册为全局组件,fixed在递归时Vue抛出组件未注册的异常
Vue.component("ProcessNode", ProcessNode);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(ViewUI);
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount("#app");