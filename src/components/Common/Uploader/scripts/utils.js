/* eslint-disable */
//检测是否为图片文件
export const testImage = function (file) {
    if (file.type.indexOf('bmp') != -1) {
        return false;
    }
    return !file || /image|png|jpg|jpeg|gif\//.test(file.type);
};
/**
 * 数据容量单位转换(kb,mb,gb,tb)
 *
 * @param {integer} bytes 字节数
 * @returns
 */
export const bytesToSize = function (bytes) {
    if (bytes === 0) return "0 B";
    const k = 1024,
        sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toPrecision(3) + " " + sizes[i];
};
export const getExt = function (filename) {
    const ret = /\.[^\.]+$/.exec(filename);
    return ret[0];
};