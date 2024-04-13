//获取角色列表
const response = require("../../response");
const body = [{
        id: 1,
        nodeText: "默认",
        children: [{
                id: 2,
                nodeText: "负责人",
                checked: false
            },
            {
                id: 3,
                nodeText: "主管",
                checked: false
            },
            {
                id: 4,
                nodeText: "主管理员",
                checked: false
            }
        ]
    },
    {
        id: 5,
        nodeText: "职务",
        children: [{
                id: 6,
                nodeText: "财务",
                checked: false
            },
            {
                id: 7,
                nodeText: "人事",
                checked: false
            },
            {
                id: 8,
                nodeText: "出纳",
                checked: false
            },
            {
                id: 9,
                nodeText: "销售",
                checked: false
            },
            {
                id: 10,
                nodeText: "客服",
                checked: false
            },
            {
                id: 11,
                nodeText: "质检",
                checked: false
            },
            {
                id: 12,
                nodeText: "研发",
                checked: false
            },
            {
                id: 13,
                nodeText: "行政",
                checked: false
            },
            {
                id: 14,
                nodeText: "设计",
                checked: false
            }
        ]
    }
];
const resData = response(200, body, "数据获取成功");
module.exports = {
    resData: resData
};