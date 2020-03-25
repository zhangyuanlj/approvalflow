import Attribute from "./Attribute.vue";
import icon from "./images/thumb.png";
const name = "日期";
export default {
    name: name,
    component: "DateTime",
    icon: icon,
    attributeComp: Attribute,
    attribute: {
        name: name,
        title: name,
        props: {
            placeholder: "请输入",
            type: "date"
        },
        validation: {
            required: false
        },
        validationRules: []
    }
};