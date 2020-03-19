import {
    UPDATE_ADVANCED_SETTING
} from "./type";
const mutations = {
    [UPDATE_ADVANCED_SETTING](state, advancedSetting) {
        state.advancedSetting = Object.assign({}, state.advancedSetting, advancedSetting);
    }
};
export default mutations;