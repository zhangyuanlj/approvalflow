import config from "@/config";
import {
    isMobile,
    getQueryString
} from "utils/helper";
const id = getQueryString("id");
const route = getQueryString("route");
const fromUrl = getQueryString("fromUrl");
let baseUrl = `${config.baseUrl}`;
if (route === null) {
    if (isMobile()) {
        baseUrl += "webFormDesign/";
    } else {
        baseUrl += "basicSetting/";
    }
} else {
    baseUrl += `${route}/`;
}
if (id !== null) {
    baseUrl += `?id=${encodeURI(id)}`;
}
if (fromUrl !== null) {
    baseUrl += `&fromUrl=${encodeURI(fromUrl)}`;
}
window.localStorage.setItem("token", "54d591f42f224fb6b47616bedfae8d53");
window.location.href = baseUrl;