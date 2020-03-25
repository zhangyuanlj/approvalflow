const response = require("../../response");
module.exports = {
    rewriteFunc: (req, res) => {
        if (req.query.token === "54d591f42f224fb6b47616bedfae8d53") {
            const resBody = {
                "userId": "54d591f42f224fb6b47616bedfae8d53",
                "userName": "admin",
                "tel": "15196449235",
                "headImg": "http://xwbg.sclxzc.cn",
                "token": "54d591f42f224fb6b47616bedfae8d53",
                "departmentName": "保卫科,信息技术组,保安班"
            };
            res.status(200).send(response(1, resBody, "审批单创建成功!"));
        } else {
            res.status(200).send(response(3, null, "token失效!"));
        }

    }
};