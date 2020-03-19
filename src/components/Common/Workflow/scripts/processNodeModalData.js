export default {
    typeItems: [{
        label: "member",
        text: "指定成员"
    }, {
        label: "role",
        text: "角色"
    }, {
        label: "sponsorChoice",
        text: "发起人自选"
    }],
    choiceItems: [{
        value: "single",
        text: "自选一个"
    }, {
        value: "multiple",
        text: "自选多个人"
    }],
    choiceScopeItems: [{
        value: "wholeCompany",
        text: "全公司"
    }, {
        value: "designatedMembers",
        text: "指定成员"
    }, {
        value: "role",
        text: "角色"
    }],
    approvalWay: [{
        value: "approvalInTurn",
        text: "依次审批"
    }, {
        value: "jointlySign",
        text: "会签（须所有审批人同意）"
    }, {
        value: "orSign",
        text: "或签（一名审批人同意或拒绝即可）"
    }],
    approverIsBlank: [{
        value: "autoPass",
        text: "自动通过"
    }, {
        value: "autoTransfer",
        text: "自动转交管理员"
    }],
    numberSelect: [{
        value: "1",
        text: "小于"
    }, {
        value: "2",
        text: "大于"
    }, {
        value: "3",
        text: "小于等于"
    }, {
        value: "4",
        text: "等于"
    }, {
        value: "5",
        text: "大于等于"
    }, {
        value: "6",
        text: "介于（两个数之间）"
    }],
    betweenSelect: [{
        value: "1",
        text: "<"
    }, {
        value: "2",
        text: "<="
    }]
};