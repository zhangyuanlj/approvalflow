const response = require("../../response");
const { nodesMap } = require("../../staticData/createOrganizationData");

module.exports = {
  rewriteFunc: (req, res) => {
    const search = req.body.search;
    const resData = Object.values(nodesMap).filter((item) => {
      const name = item?.menuName || item?.userName;
      return name?.indexOf(search) !== -1;
    });
    res.status(200).send(response(200, resData, "数据获取成功!"));
  },
};
