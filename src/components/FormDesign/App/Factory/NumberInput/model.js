import Attribute from "./Attribute.vue";
import icon from "./images/number-input-thumb.png";
const name = "数字输入框";
export default {
    name: name,
    component: "NumberInput",
    icon: icon,
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