//获取审批信息
const response = require("../../response");
const formDesign = require("../../formDesign");
const personList = require("../../personList");
const resBody = {
    //基础设置
    basicSetting: {
        approvalName: "测试数据名称",
        approvalGroup: {
            name: "测试分组1",
            value: "1"
        },
        approvalUser: {
            text: "",
            value: []
        },
        templateManageUser: {
            text: "",
            value: []
        },
        templateIcon: "",
        approvalStatement: ""
    },
    //表单
    formDesign: formDesign,
    //审批人、抄送人列表
    personList: personList,
    //流程
    processDesign: [],
    //高级设置
    advancedSetting: {
        approverDuplication: "1",
        autoPass: true,
        approvalComments: "",
        approvalOpinion: ["1"]
    }
};
//参数id会附加到地址栏，例如Rpc_Approval/GetList?id=1024
//直接访问http://127.0.0.1:3000/Rpc_Approval/GetList可以看到返回结果
const resData = response(200, resBody, "数据获取成功");
module.exports = {
    resData: resData
};