import {
    GET_CURRENT_DEPARTMENTS,
    GET_DEPARTMENTS,
    GET_CONTACTS,
    GET_SELECTED_DEPARTMENTS,
    GET_SELECTED_CONTACTS
} from "./type";
const getters = {
    [GET_CURRENT_DEPARTMENTS]: state => state.currentDepartments,
    [GET_DEPARTMENTS]: state => state.departments,
    [GET_CONTACTS]: state => state.contacts,
    [GET_SELECTED_DEPARTMENTS]: state => state.selectedDepartments,
    [GET_SELECTED_CONTACTS]: state => state.selectedContacts
};
export default getters;