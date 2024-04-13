const Mock = require("mockjs");

// 部门、人员接口定义
// interface Department {
//     id: number;
//     departmentId?: number;
//     menuName: string;
//     count: number;
//     childNode: Department[]
// }
// interface User {
//     id: number;
//     userId?: number;
//     menuName: string;
//     count: number;
//     childNode: Departments[]
// }
const nodesMap = {};
const createOrganizationData = function() {
  let content = [];
  const rootNodes = [
    "总裁办",
    "人力资源",
    "研发部",
    "设计部",
    "产品",
    "法务部",
    "后勤保障",
  ];
  const userNames = [
    "孙敏",
    "傅秀兰",
    "贺娟",
    "龚丽",
    "戴桂英",
    "田艳",
    "万杰",
    "梁勇",
    "钱静",
    "薛敏",
    "侯桂英",
    "薛军",
    "万娟",
    "易芳",
    "贾静",
    "程娟",
    "杜军",
    "石艳",
    "金强",
    "万秀兰",
    "蔡强",
    "孙桂英",
    "易洋",
    "黎芳",
    "阎军",
    "田军",
    "黄静",
  ];
  let count = 0;
  rootNodes.forEach((item, i) => {
    const id = i + 1;
    const childNodes = [];
    const childNodesLen = Mock.mock({
      "number|1-5": 1,
    });
    for (let j = 0; j < childNodesLen.number; j++) {
      const userId = rootNodes.length + count + 1;
      const userItem = {
        id: userId,
        parentId: id,
        userId,
        accountName: Mock.mock("@name"),
        userName: userNames[count],
      };
      nodesMap[userId] = userItem;
      childNodes.push(userItem);
      count++;
    }
    const nodeItem = {
      id,
      departmentId: id,
      menuName: item,
      count: childNodes.length,
      childNode: childNodes,
    };
    nodesMap[id] = nodeItem;
    content.push(nodeItem);
  });
  content = content.map((item, i) => {
    const _id = 1000 + i;
    const _item = {
      id: _id,
      departmentId: _id,
      menuName: `测试部门${i + 1}`,
      count: 0,
      childNode: [],
    };
    nodesMap[_id] = _item;
    return {
      ...item,
      childNode: [_item].concat(item?.childNode),
    };
  });
  return content;
};
module.exports = {
  nodesMap,
  createOrganizationData,
};
