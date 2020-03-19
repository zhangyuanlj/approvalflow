import Thumb from "./Thumb.vue";
import Design from "./Design.vue";
import Attribute from "./Attribute.vue";
const name = "多行输入框";
export default {
    name: name,
    component: "MultipleInput",
    thumb: Thumb,
    designComp: Design,
    attributeComp: Attribute,
    attribute: {
        name: name,
        title: name,
        props: {
            placeholder: "请输入",
            maxlength: 8000
        },
        validation: {
            required: false
        },
        validationRules: []
    }
};