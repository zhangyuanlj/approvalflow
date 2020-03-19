const Mock = require("mockjs");
const resBody = [];
const response = (code, resBody, message) => {
  // return resBody;
  return {
    code: code,
    body: resBody,
    message: message
  };
};
for (let i = 0; i < 50; i++) {
  const title = Mock.mock({
    "array|1": ["iPhone 12要涨价？5G组件使其成本增加80美元", "一亿像素加持 卢伟冰暗示小米10将屠榜DxOMark", "荣耀与小米互怼错杀 OV韬光养晦才是大敌"]
  });
  const publishTime = Mock.mock({
    "array|1": [
      "2020-01-15 09:30:00",
      "2020-01-16 09:30:00",
      "2020-01-17 09:30:00"
    ]
  });
  const item = {
    id: i + 1,
    title: title.array,
    publishTime: publishTime.array
  };
  resBody.push(item);
}
const resData = response(200, resBody, "数据获取成功");
module.exports = {
  resData: resData
};