//查找一个节点
export const findNode = (listData, node) => {
    const nodeId = node.id;
    let searchNode = null;
    const eachNodes = (nodesList, id) => {
        const len = nodesList.length;
        for (let i = 0; i < len; i++) {
            const item = nodesList[i];
            const children = item.children;
            if (item.id === id) {
                searchNode = item;
                return;
            }
            if (children) {
                eachNodes(children, id);
            }
        }
    };
    eachNodes(listData, nodeId);
    return searchNode;
};
//根据名字实现模糊匹配
export const searchName = (listData, name) => {
    const searchRet = [];
    const eachNodes = (nodesList, id) => {
        const len = nodesList.length;
        for (let i = 0; i < len; i++) {
            const item = nodesList[i];
            const children = item.children;
            if (item.nodeText.indexOf(name) !== -1) {
                searchRet.push(item);
            }
            if (children) {
                eachNodes(children, id);
            }
        }
    };
    eachNodes(listData, name);
    return searchRet;
};
export const checkedNodes = (listData, selectedItems) => {
    const eachNodes = (nodesList, selectedItems) => {
        const len = nodesList.length;
        for (let i = 0; i < len; i++) {
            const item = nodesList[i];
            const children = item.children;
            const searchNode = selectedItems.find((seachNode) => {
                return seachNode.id === item.id;
            });
            if (searchNode) {
                item.checked = true;
            } else {
                item.checked = false;
            }
            if (children) {
                eachNodes(children, selectedItems);
            }
        }
    };
    eachNodes(listData, selectedItems);
    return listData;
};
export const unChecked = (listData, node) => {
    const searchNode = findNode(listData, node);
    searchNode.checked = false;
    return listData;
};