import {
    UPDATE_IS_DRAG,
    UPDATE_DESIGN_FIELD,
    UPDATE_FIELD_LISTS,
    UPDATE_PREVIEW_DATA,
    UPDATE_FIELD_ITEMS,
    UPDATE_VALIDATION,
    UPDATE_HAS_WIDGET,
    UPDATE_CHILDREN,
    UPDATE_ONE_FIELD
} from "./type";
import {
    createFlatArr
} from "./utils";
const mutations = {
    [UPDATE_IS_DRAG](state, isDrag) {
        state.isDrag = isDrag;
    },
    [UPDATE_HAS_WIDGET](state, hasWidget) {
        state.hasWidget = hasWidget;
    },
    [UPDATE_DESIGN_FIELD](state, selectedName) {
        const arr = createFlatArr(state);
        const designField = arr.find((item) => {
            return item.name === selectedName;
        });
        state.designField = designField;
    },
    [UPDATE_FIELD_LISTS](state, fieldLists) {
        state.fieldLists = fieldLists;
    },
    [UPDATE_PREVIEW_DATA](state, previewData) {
        state.previewData = previewData;
    },
    [UPDATE_FIELD_ITEMS](state, updateState) {
        const fieldLists = state.fieldLists;
        fieldLists.forEach((field) => {
            if (field.name === updateState.name) {
                field.attribute.items = updateState.items;
            }
        });
        state.fieldLists = fieldLists;
    },
    [UPDATE_VALIDATION](state, updateState) {
        const fieldLists = state.fieldLists;
        fieldLists.forEach((item) => {
            const children = item.attribute.children;
            if (item.name === updateState.name) {
                item.attribute.validationRules = updateState.rules;
            }
            //没有找到的话，就再到当前字段的子字段中查找
            else {
                if (children) {
                    children.forEach((childrenItem) => {
                        if (childrenItem.name === updateState.name) {
                            childrenItem.attribute.validationRules = updateState.rules;
                        }
                    });
                }
            }
        });
        state.fieldLists = fieldLists;
    },
    [UPDATE_CHILDREN](state, updateState) {
        const fieldLists = state.fieldLists;
        fieldLists.forEach((item) => {
            if (item.name === updateState.name) {
                item.attribute.children = updateState.children;
            }
        });
        state.fieldLists = fieldLists;
    },
    [UPDATE_ONE_FIELD](state, updateState) {
        const fieldLists = state.fieldLists;
        fieldLists.forEach((item, i) => {
            const children = item.attribute.children;
            if (item.name === updateState.name) {
                fieldLists[i] = updateState;
            }
            //没有找到的话，就再到当前字段的子字段中查找
            else {
                if (children) {
                    children.forEach((childrenItem, i) => {
                        if (childrenItem.name === updateState.name) {
                            children[i] = updateState;
                        }
                    });
                }
            }
        });
        state.fieldLists = fieldLists;
    }
};
export default mutations;