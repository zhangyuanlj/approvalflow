const response = require("../../response");
const resBody = null;
//更新一个审批单Rpc_Approval/Update
//参数为id、approval审批数据
const resData = response(200, resBody, "审批单更新成功!");
module.exports = {
    method: "POST",
    resData: resData
};