import {
    GET_NODES_DATA,
    GET_PERSON_LIST,
    GET_EDIT_NODE,
    GET_SHOW_MODAL,
    GET_MODAL_TYPE
} from "./type";
const getters = {
    [GET_NODES_DATA]: state => state.nodesData,
    [GET_PERSON_LIST]: state => state.personList,
    [GET_EDIT_NODE]: state => state.editNode,
    [GET_SHOW_MODAL]: state => state.showModal,
    [GET_MODAL_TYPE]: state => state.modalType
};
export default getters;