//获取审批信息
const response = require("../response");
const formDesign = require("../formDesign");
const resBody = {
    basicSetting: {
        approvalName: "",
        approvalGroup: {},
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
    formDesign: formDesign,
    processList: [],
    processDesign: []
};
const resData = response(1, resBody, "数据获取成功");
module.exports = {
    resData: resData
};