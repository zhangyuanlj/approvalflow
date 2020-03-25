import Attribute from "./Attribute.vue";
import icon from "./images/thumb.png";
const name = "明细";
export default {
    name: name,
    component: "Detail",
    icon: icon,
    attributeComp: Attribute,
    attribute: {
        name: name,
        title: name,
        actionName: "增加明细",
        props: {},
        validation: {
            required: false
        },
        validationRules: [],
        children: []
    }
};