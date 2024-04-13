const response = require("../../response");
const {
  createOrganizationData,
} = require("../../staticData/createOrganizationData");

// 获取部门
const content = createOrganizationData();
const resData = response(200, content, "数据获取成功");
module.exports = {
  resData,
};
