import config from "@/config";
import {
    isMobile,
    getQueryString
} from "utils/helper";
const id = getQueryString("id");
const route = getQueryString("route");
const fromUrl = getQueryString("fromUrl");
const parameter = [];
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
    parameter.push(`id=${id}`);
}
if (fromUrl !== null) {
    parameter.push(`fromUrl=${encodeURIComponent(fromUrl)}`);
}
baseUrl += parameter.length ? `?${parameter.join("&")}` : "";
window.location.href = baseUrl;