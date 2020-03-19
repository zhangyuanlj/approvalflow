import {
    UPDATE_BASIC_SETTING
} from "./type";
const mutations = {
    [UPDATE_BASIC_SETTING](state, basicSetting) {
        state.basicSetting = Object.assign({}, state.basicSetting, basicSetting);
    }
};
export default mutations;