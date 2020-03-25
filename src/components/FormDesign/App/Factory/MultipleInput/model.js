import Attribute from "./Attribute.vue";
import icon from "./images/multiple-input-thumb.png";
const name = "多行输入框";
export default {
    name: name,
    component: "MultipleInput",
    icon: icon,
    attributeComp: Attribute,
    attribute: {
        name: name,
        title: name,
        props: {
            placeholder: "请输入",
            maxlength: 8000
        },
        validation: {
            required: false
        },
        validationRules: []
    }
};