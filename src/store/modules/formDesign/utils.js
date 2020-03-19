export const createFlatArr = (state) => {
    const arr = [];
    //将二维数组转换为一维数组方便查找
    state.fieldLists.forEach((item) => {
        const children = item.attribute.children;
        arr.push(item);
        if (children) {
            children.forEach((childrenItem) => {
                arr.push(childrenItem);
            });
        }
    });
    return arr;
};