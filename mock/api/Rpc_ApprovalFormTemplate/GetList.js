//获取表单模板
const response = require("../../response");
const formDesign = require("../../formDesign");
const personList = require("../../personList");
const resData = response(1, {
    formDesign,
    personList
}, "数据获取成功");
//参数id会附加到地址栏，例如Rpc_ApprovalFormTemplate/GetList?id=1024
//直接访问http://127.0.0.1:3000/Rpc_ApprovalFormTemplate/GetList可以看到返回结果
module.exports = {
    resData: resData
};