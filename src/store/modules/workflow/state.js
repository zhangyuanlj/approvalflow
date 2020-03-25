import processNodesData from "components/Common/Workflow/scripts/nodesData";
const state = {
    nodesData: [],
    personList: {},
    editNode: processNodesData[0],
    showModal: false,
    modalType: "originator"
};
export default state;