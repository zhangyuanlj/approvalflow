const response = require("../../response");

// 基础设置-选择分组
const names = ["假勤管理", "人事管理", "业务管理", "行政管理", "法务管理"];
const content = [];
names.forEach((item, i) => {
  content.push({
    approvalGroupId: i + 1,
    groupName: names[i],
  });
});
const resData = response(200, content, "数据获取成功");
module.exports = {
  resData,
};
