import {
    UPDATE_CURRENT_DEPARTMENTS,
    UPDATE_DEPARTMENTS,
    UPDATE_CONTACTS,
    UPDATE_SELECTED_DEPARTMENTS,
    UPDATE_SELECTED_CONTACTS,
    RESET_STATE
} from "./type";
const mutations = {
    [UPDATE_CURRENT_DEPARTMENTS](state, currentDepartments) {
        state.currentDepartments = currentDepartments;
    },
    [UPDATE_DEPARTMENTS](state, departments) {
        state.departments = departments;
    },
    [UPDATE_CONTACTS](state, contacts) {
        state.contacts = contacts;
    },
    [UPDATE_SELECTED_DEPARTMENTS](state, selectedDepartments) {
        state.selectedDepartments = Object.assign({}, selectedDepartments);
    },
    [UPDATE_SELECTED_CONTACTS](state, selectedContacts) {
        state.selectedContacts = Object.assign({}, selectedContacts);
    },
    [RESET_STATE](state, nextState) {
        state.currentDepartments = [];
        state.departments = [];
        state.contacts = [];
        state.selectedDepartments = Object.assign({}, nextState.selectedDepartments);
        state.selectedContacts = Object.assign({}, nextState.selectedContacts);
    }
};
export default mutations;