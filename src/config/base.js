import apiUrlConfig from "./apiUrl";
const setBaseUrl = () => {
    const env = window.ENV ? window.ENV : "development";
    let homeUrl = window.isMobile() ? "app.html" : "web.html"
    let baseUrl = "";
    if (env === "development") {
        baseUrl = `/${homeUrl}#/`;
    } else {
        baseUrl = `/approvalflow/${homeUrl}#/`;
    }
    return baseUrl;
};
export default {
    baseUrl: setBaseUrl(),
    //登录页
    //loginUrl: "http://jsapp.sslxzc.cn/#/pages/login/loginNew",
    loginUrl: "http://jsweb.sslxzc.cn/#/login",
    //首页
    //homeUrl: "http://jsapp.sslxzc.cn/#/pages/newApplication/applicationNav",
    homeUrl: "http://jsweb.sslxzc.cn",
    //发布或者更新成功后跳转的地址
    successRedirectUrl: {
        web: "http://jsweb.sslxzc.cn",
        app: "http://jsapp.sslxzc.cn"
    },
    //白名单,不需要进行登录拦截的路由
    whiteList: [],
    apiUrl: apiUrlConfig
};