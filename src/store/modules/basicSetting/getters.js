import {
    GET_BASIC_SETTING
} from "./type";
const getters = {
    [GET_BASIC_SETTING]: state => state.basicSetting
};
export default getters;