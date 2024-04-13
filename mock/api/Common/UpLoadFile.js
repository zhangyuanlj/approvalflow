const fs = require("fs");
const response = require("../../response");
const mutipart = require("connect-multiparty");
const config = require("../../config");

module.exports = {
  method: "POST",
  middleware: mutipart(),
  rewriteFunc: async (req, res) => {
    const file = req.files?.file;
    try {
      const successCode = 200;
      const data = await fs.readFileSync(file.path);
      await fs.writeFileSync(
        `./${config.static}/uploads/${file?.originalFilename}`,
        data,
        "utf8"
      );
      const resData = {
        fileName: file?.originalFilename,
        fileSize: file?.size,
        suffix: file?.originalFilename?.replace(/.*\./, ""),
        fileServerPath: `http://${config.host}:${config.port}/uploads/${file?.originalFilename}`,
      };
      res
        .status(successCode)
        .send(response(successCode, resData, "附件上传成功!"));
    } catch (err) {
      const errorCode = 500;
      res
        .status(errorCode)
        .send(response(errorCode, null, "上传失败，请稍后重试!"));
    }
  },
};
