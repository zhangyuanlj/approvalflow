const response = require("../../response");
const { nodesMap } = require("../../staticData/createOrganizationData");

module.exports = {
  rewriteFunc: (req, res) => {
    const departmentIds = req.body.departmentIds;
    const resData = {};
    departmentIds.map((id) => {
      nodesMap[id]?.childNode?.map((item) => {
        resData[item.id] = item;
      });
    });
    res
      .status(200)
      .send(response(200, Object.values(resData), "数据获取成功!"));
  },
};
