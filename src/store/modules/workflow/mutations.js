import processDesign from "components/Common/Workflow/scripts/nodesData";
import {
    UPDATE_NODES_DATA,
    UPDATE_PERSON_LIST,
    UPDATE_EDIT_NODE,
    UPDATE_SHOW_MODAL,
    UPDATE_MODAL_TYPE,
    REST_NODES_DATA
} from "./type";
const mutations = {
    [UPDATE_NODES_DATA](state, nodesData) {
        state.nodesData = nodesData;
    },
    [UPDATE_PERSON_LIST](state, personList) {
        state.personList = Object.assign({}, personList);
    },
    [UPDATE_EDIT_NODE](state, editNode) {
        state.editNode = editNode;
    },
    [UPDATE_SHOW_MODAL](state, showModal) {
        state.showModal = showModal;
    },
    [UPDATE_MODAL_TYPE](state, modalType) {
        state.modalType = modalType;
    },
    [REST_NODES_DATA](state) {
        state.nodesData = processDesign;
    }
};
export default mutations;