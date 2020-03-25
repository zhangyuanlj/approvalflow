import Attribute from "./Attribute.vue";
import icon from "./images/thumb.png";
const name = "附件";
export default {
    name: name,
    component: "Attachment",
    icon: icon,
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