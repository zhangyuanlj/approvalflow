const {
  resolve
} = require('path');
const glob = require("glob");
const bodyParser = require("body-parser");
const dirRoot = resolve('./');
const config = require(`${dirRoot}/mock/config`);
const log = require("./utils/log");
const jsonParser = bodyParser.json();
const getApiName = path => {
  const apiDir = `${dirRoot}/mock/api/`.replace(/\\/g, "/");
  const name = path.replace(apiDir, "");
  const lastIndex = name.lastIndexOf(".");
  return name.substring(0, lastIndex);
};

module.exports = app => {
  const apiPathGlob = `${dirRoot}/mock/api/**/*.js`;
  const apiList = glob.sync(apiPathGlob);
  const showList = {};
  app.use(jsonParser);
  apiList.forEach(api => {
    const path = api;
    const apiConfig = require(`${path}`);
    const name = getApiName(path);
    const method = apiConfig.method;
    const headers = apiConfig.headers;
    const resData = apiConfig.resData;
    const rewriteFunc = apiConfig.rewriteFunc;
    const route = `/${name}`;
    const apiUrl = `http://${config.host}:${config.port}/${name}`;
    showList[route] = apiUrl;
    app.use([route, `${route}/:id`], function (req, res) {
      if (method && req.method != method) {
        const errMsg = `This request only supports ${method} method.`;
        res.status(401).send(errMsg);
        log(
          `[api-server-info] request ${apiUrl} fail.\nStatusCode:401. \nMsg:${errMsg}`,
          "error"
        );
        return;
      } else if (
        headers &&
        headers["content-type"] != req.headers["content-type"]
      ) {
        const errMsg = `Server error!Please check headers.`;
        res.status(500).send(errMsg);
        log(
          `[api-server-info] request ${apiUrl} fail.\nStatusCode:500. \nMsg:${errMsg}`,
          "error"
        );
        return;
      }
      if (rewriteFunc) {
        rewriteFunc(req, res);
      } else {
        res.json(resData);
      }
      log(
        `[api-server-info] request ${apiUrl} success.\nStatusCode:200.`,
        "prompt"
      );
    });
  });
  return showList;
};