import Thumb from "./Thumb.vue";
import Design from "./Design.vue";
import Attribute from "./Attribute.vue";
const name = "部门";
export default {
    name: name,
    component: "Departments",
    thumb: Thumb,
    designComp: Design,
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