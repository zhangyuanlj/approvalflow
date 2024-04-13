const response = require("../../response");
const resBody = null;
//创建一个审批单Rpc_Approval/Create，请求体为对象
const resData = response(200, resBody, "审批单创建成功!");
module.exports = {
    method: "POST",
    resData: resData
};