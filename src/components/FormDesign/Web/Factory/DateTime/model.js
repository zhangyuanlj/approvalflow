import Thumb from "./Thumb.vue";
import Design from "./Design.vue";
import Attribute from "./Attribute.vue";
const name = "日期";
export default {
    name: name,
    component: "DateTime",
    thumb: Thumb,
    designComp: Design,
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