import Thumb from "./Thumb.vue";
import Design from "./Design.vue";
import Attribute from "./Attribute.vue";
const name = "附件";
export default {
    name: name,
    component: "Attachment",
    thumb: Thumb,
    designComp: Design,
    attributeComp: Attribute,
    attribute: {
        name: name,
        title: name,
        props: {},
        validation: {
            required: false
        },
        validationRules: []
    }
};