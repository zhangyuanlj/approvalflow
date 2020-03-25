//获取主管列表
const response = require("../../response");
const body = [{
        id: 6,
        nodeText: "主管",
        checked: false
    },
    {
        id: 7,
        nodeText: "直接主管",
        checked: false
    },
    {
        id: 8,
        nodeText: "直接主管1",
        checked: false
    },
    {
        id: 9,
        nodeText: "直接主管2",
        checked: false
    },
    {
        id: 10,
        nodeText: "直接主管3",
        checked: false
    }
];
const resData = response(1, body, "数据获取成功");
//Rpc_Approval_Director/GetList
//直接访问http://127.0.0.1:3000/Rpc_Approval_Director/GetList可以看到返回结果
module.exports = {
    resData: resData
};