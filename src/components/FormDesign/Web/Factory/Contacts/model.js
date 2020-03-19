import Thumb from "./Thumb.vue";
import Design from "./Design.vue";
import Attribute from "./Attribute.vue";
const name = "联系人";
export default {
    name: name,
    component: "Contacts",
    thumb: Thumb,
    designComp: Design,
    attributeComp: Attribute,
    attribute: {
        name: name,
        title: name,
        props: {
            placeholder: "请选择"
        },
        multiple: "只能选择一人",
        validation: {
            required: false
        },
        validationRules: []
    }
};