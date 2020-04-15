import config from "@/config";
import {
  spinShow,
  spinHide
} from "./spin";
import {
  fetch
} from "whatwg-fetch";
import {
  Message
} from "view-design";
import {
  redirectLogin
} from "utils/helper";
const showMessage = (type, config) => {
  Message[type](config);
}
//设置请求地址
const serRequestUrl = url => {
  const urlMatch = /^http|^https|^\/\//;
  if (urlMatch.test(url)) {
    return url;
  } else {
    return `${config.requestUrl}${url}`;
  }
};
//设置请求参数
const setRequestParams = options => {
  if (!options.data) {
    return null;
  }
  const headers = options.headers ? options.headers : {};
  const method = options.method;
  const contentType = headers["Content-Type"] || headers["content-type"];
  let data = null;
  if (method === "GET") {
    const params = [];
    Object.keys(options.data).forEach(function (key) {
      params.push(`${key}=${options.data[key]}`);
    });
    data = `${params.join("&")}`;
  } else if (contentType === "application/json") {
    data = options.data;
  }
  return data;
};
/**
 * 通用异常函数
 *
 * @param {object} error Error description
 * @param {string} serverErrorMsg Message returned by server 500 exception
 */
const commonExceptionFunc = (error, serverErrorMsg) => {
  const url = error.url;
  const statusCode = error.status ? error.status : "";
  let errTxt = error.statusText;
  if (statusCode !== "") {
    errTxt = `[${statusCode}] ${errTxt}`;
  }
  showMessage("error", {
    content: serverErrorMsg
  });
  window.console.error(
    `The request is abnormal, please try again later!\napiUrl:${url}\nerrDescribe:${errTxt}`
  );
};
const base = options => {
  let defaults = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    responseType: "json",
    loading: true,
    succeed: () => {}
  };
  defaults = Object.assign({}, defaults, options);
  let url = serRequestUrl(defaults.url);
  let succeed = defaults.succeed;
  let errorCbs = defaults.errorCbs;
  let failure = defaults.failure;
  let requestData = setRequestParams(defaults);
  let token = window.localStorage.getItem("token");
  if(token === null){
    token = "";
  }
  else{
    token = JSON.parse(token);
    token = `Bearer ${token.data}`;
  }
  defaults.headers["Authorization"] = token;
  let fetchOpts = {
    method: defaults.method,
    headers: defaults.headers
  };
  if (typeof requestData === "string") {
    url += `?${requestData}`;
  } else {
    if (requestData !== null) {
      fetchOpts["body"] = JSON.stringify(requestData);
    }
  }
  if (url) {
    if (defaults.loading) {
      spinShow();
    }
    return fetch(url, fetchOpts)
      .then(res => {
        if (defaults.loading) {
          spinHide();
        }
        if (res.ok) {
          res.json().then(data => {
            const body = data;
            const bodyData = body.data ? body.data : [];
            const code = parseInt(body.code);
            //请求成功
            if (code === 1) {
              succeed(res, bodyData, body);
            }
            //没有登录
            else if (code === 3) {
              redirectLogin();
            }
            //业务异常
            else {
              if (typeof errorCbs === "function") {
                errorCbs(res);
              } else {
                const msg = body.msg;
                showMessage("error", {
                  content: msg
                });
              }
            }
          });
        } else {
          if (typeof errorCbs === "function") {
            errorCbs(res);
          } else {
            const msg = `错误码:${res.status},错误描述:${res.statusText}!`;
            showMessage("error", {
              content: msg
            });
          }
        }
        return res;
      })
      .catch(err => {
        const error = {
          url: url,
          statusText: err
        };
        if (defaults.loading) {
          spinHide();
        }
        if (typeof failure === "function") {
          failure(error);
        } else {
          commonExceptionFunc(error, err.message);
        }
      });
  }
  return null;
};
const request = (options, method) => {
  options.method = method;
  return base(options);
};
const Http = {
  ajax(options) {
    return base(options);
  },
  post(options) {
    return request(options, "POST");
  },
  get(options) {
    return request(options, "GET");
  }
};
export default Http;