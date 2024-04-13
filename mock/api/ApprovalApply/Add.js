const response = require("../../response");
const resBody = null;
// 提交审批表单
const resData = response(200, resBody, "数据提交成功!");
module.exports = {
  method: "POST",
  resData: resData,
};
