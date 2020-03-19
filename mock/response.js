module.exports = (code, resBody, message) => {
    return {
        code: code,
        data: resBody,
        msg: message
    };
};