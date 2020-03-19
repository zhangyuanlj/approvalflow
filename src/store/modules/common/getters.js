import {
    GET_SPIN_VISABLE,
    GET_ERROR_LIST
} from "./type";
const getters = {
    [GET_SPIN_VISABLE]: state => state.spinVisable,
    [GET_ERROR_LIST]: state => state.errorList
};
export default getters;