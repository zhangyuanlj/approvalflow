import {
    uuid
} from "@/utils/helper";
export default [{
        id: `${uuid(8, 10)}`,
        pid: "0",
        nodeText: "发起人",
        nodeType: "originator",
        value: {
            contacts: {
                value: []
            }
        }
    },
    {
        id: `${uuid(8, 10)}`,
        pid: "0",
        nodeText: "流程结束",
        nodeType: "end"
    }
];