import Thumb from "./Thumb.vue";
import Design from "./Design.vue";
import Attribute from "./Attribute.vue";
const name = "外部联系人";
export default {
    name: name,
    component: "ExternalContacts",
    thumb: Thumb,
    designComp: Design,
    attributeComp: Attribute,
    attribute: {
        name: name,
        title: name,
        props: {
            placeholder: "请选择"
        },
        validation: {
            required: false
        },
        validationRules: []
    }
};