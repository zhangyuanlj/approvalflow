import config from "@/config";
import {
    redirectLogin
} from "utils/helper";
import Http from "utils/http";
import {
    spinShow,
    spinHide
} from "./spin";
import {
    set as setUserInfo
} from "./userInfo";
const isInWhiteList = (path) => {
    if (config.whiteList.length) {
        const searchPath = config.whiteList.find((item) => {
            return path.indexOf(item) !== -1;
        });
        return searchPath;
    }
    return false;
};
//进入某个路由
const enterRoute = (to, next, ViewUI) => {
    document.title = to.meta.title;
    ViewUI.LoadingBar.start();
    spinHide();
    next();
};
const checkLogin = (to, from, next, ViewUI) => {
    spinShow();
    //如果是开发环境，并且没有开启登录检查，则直接跳转到对应路由
    if (window.ENV === "development" && config.enableLoginCheck === false) {
        enterRoute(to, next, ViewUI);
        return;
    }
    const path = to.path;
    //检查当前路由是否在白名单中
    if (isInWhiteList(path)) {
        enterRoute(to, next, ViewUI);
    } else {
        const token = window.localStorage.getItem("token");
        //本地没有token直接跳转到登录页
        if (token === null) {
            redirectLogin();
        } else {
            //检查本地的token是否过期
            Http.get({
                url: config.apiUrl.CheckToken,
                data: {
                    token: token
                },
                succeed: (res, data) => {
                    window.localStorage.setItem("token", data.token);
                    setUserInfo(data);
                    enterRoute(to, next, ViewUI);
                },
                errorCbs: () => {
                    redirectLogin();
                },
                failure: () => {
                    redirectLogin();
                }
            });
        }
    }
};
export default checkLogin;