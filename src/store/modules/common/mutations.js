import {
    SHOW_SPIN,
    HIDE_SPIN,
    UPDATE_ERROR_LIST
} from "./type";
const mutations = {
    [SHOW_SPIN](state) {
        state.spinVisable = true;
    },
    [HIDE_SPIN](state) {
        state.spinVisable = false;
    },
    [UPDATE_ERROR_LIST](state, errorList) {
        state.errorList = Object.assign({}, errorList);
    }
};
export default mutations;