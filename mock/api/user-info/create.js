module.exports = {
  rewriteFunc: (req, res) => {
    const resBody = {
      name: "Geralt Zhang",
      age: "保密"
    };
    res.status(200).send(resBody);
  }
};
