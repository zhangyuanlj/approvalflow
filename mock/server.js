const {
  resolve
} = require('path');
const express = require("express");
const dirRoot = resolve('./');
const config = require(`${dirRoot}/mock/config`);
const align = require("align-text");
const log = require("./utils/log");
const createApi = require("./createApi");
const app = express();
const showList = createApi(app);
app.use('/', express.static(`${dirRoot}/${config.static}`));
const server = app.listen(config.port, config.host, function () {
  let maxCharNum = 0;
  log(
    `[api-server-info] api-server is listening at http://${
      server.address().address
    }:${server.address().port}\n`,
    "info"
  );
  log(`[api-server-list]`, "verbose");
  Object.keys(showList).forEach(item => {
    const len = item.length;
    if (len > maxCharNum) {
      maxCharNum = len;
    }
  });
  for (let key in showList) {
    const apiUrl = align(showList[key], maxCharNum - key.length + 3);
    log(`${key} ${apiUrl}`, "verbose");
  }
});