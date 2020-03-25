import config from "@/config";
import Route from "utils/route";
import $ from "jquery";
//Url redirect
export const redirect = href => {
  const baseUrl = config.baseUrl;
  const token = Route.getParam("token");
  const id = Route.getParam("id");
  const fromUrl = Route.getParam("fromUrl");
  const connector = href.indexOf("?") === -1 ? "?" : "&";
  let url = "";
  let parameters = {};
  if (token !== null && href.indexOf("token") === -1) {
    parameters["token"] = `token=${token}`;
  }
  if (id !== null && href.indexOf("id") === -1) {
    parameters["id"] = `id=${id}`;
  }
  if (fromUrl !== null && href.indexOf("fromUrl") === -1) {
    parameters["fromUrl"] = `fromUrl=${fromUrl}`;
  }
  parameters = Object.values(parameters);
  url += `${baseUrl}${href}`;
  if (parameters.length) {
    url += `${connector}${parameters.join("&")}`;
  }
  window.location.href = url;
};
//跳转到登录页
export const redirectLogin = () => {
  const href = window.location.href;
  const loginUrl = `${config.loginUrl}?returnUrl=${href}`;
  window.location.href = loginUrl;
};
//Get the type of variable
export const typeOf = n => {
  const typeStr = Object.prototype.toString.call(n);
  let typeName = typeStr.match(/ \S+/);
  if (typeName === null) {
    return "unkown";
  } else {
    typeName = typeName[0].substring(1, typeName[0].length - 1);
    return typeName.toLowerCase();
  }
};
//Variable is string
export const isString = n => {
  return typeOf(n) === "string";
};
//Variable is number
export const isNumber = n => {
  return typeOf(n) === "number";
};
//Variable is boolean
export const isBool = n => {
  return typeOf(n) === "boolean";
};
//Variable is function
export const isFunction = n => {
  return typeOf(n) === "function";
};
//Variable is object
export const isObject = n => {
  return typeOf(n) === "object";
};
//Variable is array
export const isArray = n => {
  return typeOf(n) === "array";
};
//Create unique id
// 8 character ID (base=2)
// uuid(8, 2)
// 8 character ID (base=10)
// uuid(8, 10)
// 8 character ID (base=16)
// uuid(8, 16)
export const uuid = (len, radix) => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
    ""
  );
  let uuid = [],
    i;
  radix = radix || chars.length;
  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    // rfc4122, version 4 form
    let r; // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4"; // Fill in random data.At i==19 set the high bits of clock sequence as // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join("");
};
//Whether the field exists
export const fieldExist = value => {
  return value !== null && value !== undefined;
};
export const isMobile = () => {
  return /Android|webOS|iPhone|iPod|BlackBerry/i.test(window.navigator.userAgent);
};
export const isIe = () => {
  return /MSIE|Edge/i.test(window.navigator.userAgent);
};
export const getQueryString = (name) => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
//移动端禁止viewport滚动
export const setViewPortNoScroll = () => {
  const $win = $(window);
  const $body = $("html, body");
  const $app = $(".app-root");
  const winH = $win.height();
  const marginTop = $win.scrollTop();
  $body.css({
    height: winH,
    overflow: "hidden"
  });
  $app.css("margin-top", 0 - marginTop);
};
//移动端恢复viewport滚动
export const resetViewPortScroll = () => {
  const $win = $(window);
  const $body = $("html, body");
  const $app = $(".app-root");
  const scrollTop = Math.abs(parseFloat($app.css("margin-top")));
  $body.removeAttr("style");
  $app.removeAttr("style");
  $win.scrollTop(scrollTop);
};