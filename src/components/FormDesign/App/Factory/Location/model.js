import Attribute from "./Attribute.vue";
import icon from "./images/thumb.png";
const name = "地点";
export default {
    name: name,
    component: "Location",
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