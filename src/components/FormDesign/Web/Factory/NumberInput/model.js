import Thumb from "./Thumb.vue";
import Design from "./Design.vue";
import Attribute from "./Attribute.vue";
const name = "数字输入框";
export default {
    name: name,
    component: "NumberInput",
    thumb: Thumb,
    designComp: Design,
    attributeComp: Attribute,
    attribute: {
        name: name,
        title: name,
        relatedName: "",
        props: {
            placeholder: "请输入",
            isConditionField: false
        },
        validation: {
            required: false
        },
        unit: "",
        validationRules: []
    }
};