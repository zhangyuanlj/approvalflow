//验证手机号码
export const validatorMobile = function (value) {
    if (/^1[3456789]\d{9}$/.test(value)) {
        return true;
    }
    return false;
};
//限制在指定的长度范围内
export const limitLen = function (value, min = 1, max = 10) {
    const len = value.length;
    if (len >= min && len <= max) {
        return true;
    }
    return false;
};