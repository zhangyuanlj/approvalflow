import $ from "jquery";
import {
    rolesData,
    directorData
} from "./mockData";
const APPROVER_VALUE = {
    type: "member",
    members: {
        value: []
    },
    roles: [],
    member: {
        approvalWay: "approvalInTurn"
    },
    role: {
        approvalWay: "jointlySign",
        approverIsBlank: "autoTransfer"
    },
    sponsorChoice: {
        choice: "single",
        choiceScope: "wholeCompany",
        approvalWay: "approvalInTurn"
    }
};
const CONDITION_ITEM_VALUE = {
    data: [{
        component: "originator",
        name: "发起人",
        title: "发起人",
        contacts: {
            value: []
        },
        roles: [],
        checked: true,
        isConditionField: true,
        required: true
    }]
};
const COPY_GIVE_VALUE = {
    contacts: {
        value: []
    },
    roles: [],
    director: [],
    selfSelect: {
        isSelect: true,
        list: []
    }
};
let serachParentNode = null;
//创建节点id
export const creatId = (type) => {
    return `${type}-${new Date().getTime()}`;
};
/**
 * 获取新增节点的父节点id
 *
 * @param {object} node
 * @returns
 */
const getAddNodePid = (node) => {
    const {
        id,
        pid,
        nodeType
    } = node;
    if (nodeType === "conditionItem") {
        return id;
    }
    return pid;
};
//递归遍历list节点
export const eachNodes = (nodesList, searchId, eachCbs) => {
    const len = nodesList.length;
    for (let i = 0; i < len; i++) {
        const item = nodesList[i];
        const children = item.children || item.nodes;
        const ret = eachCbs(item, searchId, children, {
            nodesList,
            len,
            i
        });
        if (ret) {
            return ret;
        }
        if (children && children.length) {
            eachNodes(children, searchId, eachCbs);
        }
    }
};
/**
 * 查找父元素
 *
 * @param {array} processNodes 某一层的数据
 * @param {number} searchId 要搜索节点的id
 * @returns
 */
const findParentNode = (processNodes, searchId) => {
    const eachCbs = (item, searchId) => {
        if (item.id === searchId) {
            serachParentNode = item;
            return serachParentNode;
        }
        return false;
    };
    if (serachParentNode !== null && serachParentNode.id === searchId) {
        return serachParentNode;
    }
    //根节点
    if (searchId === "0") {
        serachParentNode = processNodes;
    } else {
        eachNodes(processNodes, searchId, eachCbs);
    }
    return serachParentNode;
};
/**
 * 搜索某个节点的位置
 * 
 * @param {array} nodesList 父节点的子节点列表
 * @param {object} node 要搜索的节点
 * @returns {number} 节点索引
 */
const searchIndex = (nodesList, node) => {
    const id = node.id;
    let index = -1;
    let len = nodesList.length;
    for (let i = 0; i < len; i++) {
        if (nodesList[i].id === id) {
            return i;
        }
    }
    return index;
};
/**
 * 创建一个节点
 *
 * @param {string} type 节点类型
 * @param {number} pid 父节点id
 * @returns {object} 新创建的节点
 */
const createNode = (type, pid) => {
    const id = creatId(type);
    let nodeText = "";
    let value;
    if (type === "approver") {
        nodeText = "审批人";
        value = $.extend(true, {}, APPROVER_VALUE);
    } else if (type === "copygive") {
        nodeText = "抄送人";
        value = $.extend(true, {}, COPY_GIVE_VALUE);
    } else if (type === "condition") {
        nodeText = "流程条件";
        value = {
            data: {}
        };
    }
    let node = {
        id: id,
        pid: pid,
        key: id,
        nodeText: nodeText,
        nodeType: type,
        error: false,
        value: value
    };
    if (type === "condition") {
        node["children"] = [{
            id: `${id}_1`,
            pid: id,
            key: `${id}_1`,
            nodeText: "",
            nodeType: `${type}Item`,
            error: false,
            value: $.extend(true, {}, CONDITION_ITEM_VALUE),
            nodes: []
        }, {
            id: `${id}_2`,
            pid: id,
            key: `${id}_2`,
            nodeText: "",
            nodeType: `${type}Item`,
            error: false,
            value: $.extend(true, {}, CONDITION_ITEM_VALUE),
            nodes: []
        }];
    }
    return node;
};
//是否对新节点执行入栈操作
const isPushNode = (nodesList, index, pid) => {
    if (pid === "0") {
        return false;
    }
    const len = nodesList.length;
    return index === len - 1;
};
//将某一层的流程子节点添加到条件节点的第一个子节点中
const addChildrenNodes = (nodesList, node) => {
    const pid = getAddNodePid(node);
    let searchRet = [];
    if (pid === "0") {
        const len = nodesList.length;
        const index = searchIndex(nodesList, node);
        searchRet = nodesList.slice(index + 1, len - 1);
    } else {
        const index = searchIndex(nodesList, node);
        const startIndex = index === -1 ? 0 : index + 1;
        searchRet = nodesList.slice(startIndex);
        nodesList.splice(startIndex);
    }
    return searchRet;
};
const creatNodesList = (nodesList, node, newNode) => {
    const pid = getAddNodePid(node);
    if (newNode.nodeType === "condition") {
        const parentNode = newNode.children[0];
        const searchRet = addChildrenNodes(nodesList, node);
        searchRet.forEach((item) => {
            item.pid = parentNode.id;
        });
        newNode.children[0].nodes = searchRet;
    }
    let index = searchIndex(nodesList, node);
    if (isPushNode(nodesList, index, pid)) {
        nodesList.push(newNode);
        return nodesList;
    } else {
        let start = [];
        let mid = newNode;
        let end = [];
        let ret = [];
        start = nodesList.slice(0, index + 1);
        end = nodesList.slice(index + 1, nodesList.length);
        ret = [...start, ...[mid], ...end];
        if (pid === "0" && newNode.nodeType === "condition") {
            index = searchIndex(ret, newNode);
            start = ret.slice(0, index + 1);
            end = ret[ret.length - 1];
            ret = [...start, ...[end]];
        }
        return ret;
    }
};
const insertNode = (processNodes, node, newNode) => {
    const nodeType = node.nodeType;
    if (nodeType === "conditionItem") {
        node.nodes = creatNodesList(node.nodes, node, newNode);
    } else {
        const pid = getAddNodePid(node);
        const parentNode = findParentNode(processNodes, pid);
        parentNode.nodes = creatNodesList(parentNode.nodes, node, newNode);
    }
    return processNodes;
};
/**
 * 新增节点
 *
 * @param {array} processNodes 某一层的数据
 * @param {object} node 当前节点
 * @param {string} type 节点类型
 * @returns {array} 流程节点集合
 */
export const addNode = (processNodes, node, type) => {
    const pid = getAddNodePid(node);
    const newNode = createNode(type, pid);
    if (pid === "0") {
        return creatNodesList(processNodes, node, newNode);
    } else {
        return insertNode(processNodes, node, newNode);
    }
};
/**
 * 添加条件子节点
 *
 * @param {array} processNodes 某一层的数据
 * @param {object} node 当前节点
 * @returns {array} 流程节点集合
 */
export const addConditionNode = (processNodes, node) => {
    const id = creatId(node.nodeType);
    const pid = node.pid;
    const parentNode = findParentNode(processNodes, pid);
    const newNode = {
        id: `${id}_2`,
        pid: node.id,
        key: `${id}_2`,
        nodeText: "",
        nodeType: `conditionItem`,
        error: false,
        value: $.extend(true, {}, CONDITION_ITEM_VALUE),
        nodes: []
    };
    if (pid === "0") {
        const index = searchIndex(parentNode, node);
        parentNode[index].children.push(newNode);
    } else {
        const index = searchIndex(parentNode.nodes, node);
        parentNode.nodes[index].children.push(newNode);
    }
    return processNodes;
};
/**
 * 删除一个节点
 *
 * @param {array} processNodes 某一层的数据
 * @param {object} node 当前节点
 * @returns {array} 流程节点集合
 */
export const deleteNode = (processNodes, node) => {
    const pid = node.pid;
    const parentNode = findParentNode(processNodes, pid);
    if (parentNode.nodeType === "condition") {
        const children = parentNode.children;
        if (children.length > 2) {
            const index = searchIndex(children, node);
            parentNode.children.splice(index, 1);
        } else {
            return deleteNode(processNodes, parentNode);
        }
    } else if (parentNode.nodeType === "conditionItem") {
        const index = searchIndex(parentNode.nodes, node);
        parentNode.nodes.splice(index, 1);
    } else {
        const index = searchIndex(parentNode, node);
        parentNode.splice(index, 1);
    }
    return processNodes;
};
/** 
 * 复制条件子节点
 *
 * @param {array} processNodes 某一层的数据
 * @param {object} node 要拷贝的节点
 * @returns {array} 流程节点集合
 */
export const copyConditionNode = (processNodes, node) => {
    const pid = node.pid;
    const id = creatId(node.nodeType);
    const parentNode = findParentNode(processNodes, pid);
    const children = parentNode.children;
    const index = searchIndex(children, node);
    const nodes = JSON.parse(JSON.stringify(node.nodes));
    const eachCbs = (item) => {
        const key = creatId(item.nodeType);
        item.key = key;
        return false;
    };
    nodes.forEach((item) => {
        const key = creatId(item.nodeType);
        item.pid = id;
        item.key = key;
    });
    eachNodes(nodes, id, eachCbs);
    const tmpNode = {
        id: id,
        pid: pid,
        key: id,
        nodeText: `${node.nodeText}(复制)`,
        nodeType: node.nodeType,
        error: false,
        value: $.extend(true, {}, node.value),
        nodes: nodes
    };
    if (index === children.length - 1) {
        parentNode.children.push(tmpNode);
    } else {
        const start = children.slice(0, index + 1);
        const mid = [tmpNode];
        const end = children.slice(index + 1, children.length);
        parentNode.children = [...start, ...mid, ...end];
    }
    return [...processNodes];
};
/** 
 * 对流程子节点进行排序
 *
 * @param {array} processNodes 某一层的数据
 * @param {object} node 当前节点
 * @returns {array} 流程节点集合
 */
export const sortConditionNode = (processNodes, node, direction = "top") => {
    const pid = node.pid;
    const parentNode = findParentNode(processNodes, pid);
    const children = parentNode.children;
    const index = searchIndex(children, node);
    let ret = [];
    if (direction === "top") {
        const prevIndex = index - 1;
        if (prevIndex === 0) {
            const start = [children[index], children[prevIndex]];
            const end = children.slice(2);
            ret = [...start, ...end];
        } else {
            const start = children.slice(0, prevIndex);
            const mid = [children[index], children[prevIndex]];
            const end = children.slice(index + 1);
            ret = [...start, ...mid, ...end];
        }
    }
    if (direction === "bottom") {
        const nextIndex = index + 1;
        const len = children.length;
        if (nextIndex === len - 1) {
            const start = children.slice(0, len - 2);
            const end = [children[nextIndex], children[index]];
            ret = [...start, ...end];
        } else {
            const start = children.slice(0, index);
            const mid = [children[nextIndex], children[index]];
            const end = children.slice(nextIndex + 1);
            ret = [...start, ...mid, ...end];
        }
    }
    parentNode.children = ret;
    return processNodes;
};
/**
 * 更新一个节点的数据
 *
 * @param {array} processNodes 某一层的数据
 * @param {object} node 当前节点
 * @param {object} updateData 更新后的数据
 * @returns {array} 流程节点集合
 */
export const updateNodeData = (processNodes, node, updateData) => {
    const pid = node.pid;
    const parentNode = findParentNode(processNodes, pid);
    if (pid === "0") {
        const index = searchIndex(parentNode, node);
        processNodes[index] = updateData;
    } else {
        if (parentNode.nodeType === "condition") {
            const index = searchIndex(parentNode.children, node);
            parentNode.children[index] = updateData;
        } else {
            const index = searchIndex(parentNode.nodes, node);
            parentNode.nodes[index] = updateData;
        }
    }
    return [...processNodes];
};
//获取角色数据
export const getRolesData = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(rolesData);
        }, 1000);
    });
};
//获取主管列表
export const getDirectorData = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(directorData);
        }, 1000);
    });
};
//根据选择的条件显示审批人文本
export const setApprover = (nodeData) => {
    const DEFAULT_TEXT = "请选择审批人";
    const {
        members,
        roles,
        type,
        member,
        role
    } = nodeData.value;
    if (type === "member") {
        const len = members.value.length;
        const approvalWay =
            member.approvalWay === "jointlySign" ? "会签" : "或签";
        if (!len) {
            return DEFAULT_TEXT;
        }
        if (len === 1) {
            const item = members.value[0];
            return `${item.userName ? item.userName : item.menuName}`;
        } else {
            if (member.approvalWay === "approvalInTurn") {
                let str = "";
                members.value.forEach((item, i) => {
                    str += item.userName ? item.userName : item.menuName;
                    if (i != len - 1) {
                        str += ",";
                    }
                });
                return `${str}`;
            } else {
                return `${members.value.length}人${approvalWay}`;
            }
        }
    } else if (type === "role") {
        if (roles.length) {
            const approvalWay =
                role.approvalWay === "jointlySign" ? "会签" : "或签";
            return `${roles[0].nodeText}${approvalWay}`;
        }
    } else if (type === "sponsorChoice") {
        if (roles.length) {
            return `发起人从${roles[0].nodeText}自选`;
        } else {
            return "发起人自选";
        }
    }
    return DEFAULT_TEXT;
}
//根据选择的条件显示条件节点文本
export const setConditionContent = (item) => {
    const NUMBER_SELECT = {
        1: "小于",
        2: "大于",
        3: "小于等于",
        4: "等于",
        5: "大于等于"
    };
    const BETWEEN_SELECT = {
        1: "<",
        2: "<="
    };
    const {
        data
    } = item.value;
    const defaultText = "请设置条件";
    const str = [];
    data.forEach(item => {
        if (item.checked) {
            if (item.component === "originator") {
                const contacts = item.contacts.value;
                const roles = item.roles;
                const search = [];
                if (contacts.length || roles.length) {
                    const ret = [...contacts, ...roles];
                    ret.forEach(item => {
                        let text = "";
                        if (item.nodeText) {
                            text = item.nodeText;
                        }
                        if (item.userName) {
                            text = item.userName;
                        }
                        if (item.menuName) {
                            text = item.menuName;
                        }
                        search.push(text);
                    });
                    str.push(`发起人属于：${search.join(",")}`);
                }
            } else {
                if (item.component === "Radio") {
                    const value = item.value;
                    if (value.length) {
                        str.push(`${item.attribute.title}属于：${value.join("或")}`);
                    }
                } else {
                    const value = item.value;
                    const type = value.type;
                    if (type !== "6" && value.data.num !== "") {
                        str.push(
                            `${item.attribute.title} ${NUMBER_SELECT[type]} ${value.data.num}`
                        );
                    } else {
                        if (
                            value.data.min.value !== "" &&
                            value.data.max.value !== ""
                        ) {
                            str.push(
                                `${value.data.min.value} ${
                    BETWEEN_SELECT[value.data.min.type]
                  } ${item.attribute.title} ${
                    BETWEEN_SELECT[value.data.max.type]
                  } ${value.data.max.value}`
                            );
                        }
                    }
                }
            }
        }
    });
    if (str.length) {
        return str.join(" 并且 ");
    }
    return defaultText;
}