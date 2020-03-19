import baseConfig from "./base";
import devConfig from "./dev";
import prodConfig from "./prod";
const createConfig = function () {
    const env = window.ENV ? window.ENV : "development";
    if (env === "development") {
        return Object.assign({}, baseConfig, devConfig);
    } else {
        return Object.assign({}, baseConfig, prodConfig);
    }
};
export default createConfig();