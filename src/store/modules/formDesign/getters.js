import {
    GET_DESIGN_FIELD,
    GET_DESIGN_FIELD_ATTRIBUTE,
    GET_FIELD_LISTS,
    GET_PREVIEW_DATA,
    GET_IS_DRAG,
    GET_HAS_WIDGET,
    GET_CONDITION_FIELD,
    GET_ONE_FIELD
} from "./type";
import {
    createFlatArr
} from "./utils";
const getters = {
    [GET_DESIGN_FIELD]: state => state.designField,
    [GET_FIELD_LISTS]: state => state.fieldLists,
    [GET_PREVIEW_DATA]: state => state.previewData,
    [GET_DESIGN_FIELD_ATTRIBUTE]: state => state.designField && state.designField.attribute,
    [GET_IS_DRAG]: state => state.isDrag,
    [GET_HAS_WIDGET]: state => state.hasWidget,
    [GET_CONDITION_FIELD]: (state) => {
        const arr = [];
        state.fieldLists.forEach((item) => {
            const children = item.attribute.children;
            arr.push(item);
            if (children) {
                children.forEach((childrenItem) => {
                    arr.push(childrenItem);
                });
            }
        });
        const conditionField = arr.filter((item) => {
            const reg = /Radio|NumberInput|Amount/;
            return reg.test(item.component);
        });
        return conditionField;
    },
    [GET_ONE_FIELD]: (state) => (name) => {
        const arr = createFlatArr(state);
        const field = arr.find((item) => {
            return item.name === name;
        });
        return field;
    }
};
export default getters;