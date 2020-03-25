import Attribute from "./Attribute.vue";
import icon from "./images/thumb.png";
const name = "部门";
export default {
    name: name,
    component: "Departments",
    icon: icon,
    attributeComp: Attribute,
    attribute: {
        name: name,
        title: name,
        props: {
            placeholder: "请选择"
        },
        multiple: "只能选择一个部门",
        validation: {
            required: false
        },
        validationRules: []
    }
};