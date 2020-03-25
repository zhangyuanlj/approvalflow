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
    loginUrl: "http://www.sclxzc.cn/LX/Index/Index",
    //首页
    homeUrl: "http://www.sclxzc.cn/LX/Index/Index",
    //白名单,不需要进行登录拦截的路由
    whiteList: [],
    apiUrl: apiUrlConfig
};