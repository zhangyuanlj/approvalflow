import Attribute from "./Attribute.vue";
import icon from "./images/input-thumb.png";
const name = "单行输入框";
export default {
    name: name,
    component: "Input",
    icon: icon,
    attributeComp: Attribute,
    attribute: {
        name: name,
        title: name,
        props: {
            placeholder: "请输入",
            maxlength: 1000
        },
        validation: {
            required: false
        },
        validationRules: []
    }
};