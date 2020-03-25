import {
    GET_SPIN_VISABLE,
    GET_ERROR_LIST,
    GET_GENERA
} from "./type";
const getters = {
    [GET_SPIN_VISABLE]: state => state.spinVisable,
    [GET_ERROR_LIST]: state => state.errorList,
    [GET_GENERA]: state => state.genera
};
export default getters;