/*
 * 路由操作
 * author:张渊
 * modifyTime:2017-06-02
 */
/* eslint-disable */
import Vue from 'vue';
const Route = {
  set: function (baseUrl, moduleName, parameters) {
    let url = baseUrl;
    if (moduleName) {
      url += '#/' + moduleName + '/';
    }
    if (parameters) {
      let temp = [];
      for (const i in parameters) {
        if (parameters[i] == '') {
          temp.push(i);
        } else {
          temp.push(i + '=' + parameters[i]);
        }
      }
      temp = temp.join('&');
      url += '?' + temp;
    }
    return url;
  },
  /**
   * 向地址栏添加参数
   * @param object parameters 参数对象
   */
  add: function (parameters) {
    let url = location.href;
    const connector = '?';
    let temp = [];
    if (url.indexOf(connector) == -1) {
      url += connector;
    }
    for (const i in parameters) {
      if (parameters[i] == '') {
        temp.push(i);
      } else {
        temp.push(i + '=' + parameters[i]);
      }
    }
    temp = temp.join('&');
    url += temp;
    return url;
  },
  /**
   * 获取地址栏参数
   * @return string moduleName 模块名称
   * @return object parameters 参数对象
   */
  get: function () {
    const url = location.href;
    const moduleNameReg = /\#\/.*?(\/)/;
    const paramReg = /(\?).*/g;
    let moduleName = url.match(moduleNameReg);
    let parameters = url.match(paramReg);
    if (moduleName) {
      moduleName = moduleName[0];
      moduleName = moduleName.substr(2, moduleName.length - 3);
    }
    if (parameters) {
      parameters = parameters[0];
      parameters = parameters.substr(1, parameters.length - 1);
      parameters = parameters.split('&');
      const len = parameters.length;
      const ret = {};
      for (let i = 0; i < len; i++) {
        // 如果参数没有值则值为true
        if (parameters[i].indexOf('=') != -1) {
          const temp = parameters[i].split('=');
          ret[temp[0]] = temp[1];
        } else {
          ret[parameters[i]] = true;
        }
      }
      parameters = ret;
    }
    return {
      moduleName: moduleName,
      parameters: parameters
    };
  },
  // 获取模块名称的快捷方法
  getModuleName: function () {
    const ret = this.get();
    return ret.moduleName;
  },
  // 获取地址栏参数的快捷方法
  getParameters: function () {
    const ret = this.get();
    return ret.parameters;
  },
  // 获取指定名称的地址栏参数
  getParam(name) {
    const parameters = this.getParameters();
    if (parameters && parameters[name]) {
      return parameters[name];
    }
    return null;
  }
};
Vue.prototype.$Route = Route;
export default Route;