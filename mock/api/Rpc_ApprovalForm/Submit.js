const response = require("../../response");
const resBody = null;
//创建一个审批单Rpc_ApprovalForm/Submit
const resData = response(1, resBody, "数据提交成功!");
module.exports = {
    method: "POST",
    resData: resData
};