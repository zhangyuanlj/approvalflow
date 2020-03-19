import Thumb from "./Thumb.vue";
import Design from "./Design.vue";
import Attribute from "./Attribute.vue";
const name = "明细";
export default {
    name: name,
    component: "Detail",
    thumb: Thumb,
    designComp: Design,
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