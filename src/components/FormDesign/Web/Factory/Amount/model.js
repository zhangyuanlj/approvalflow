import Thumb from "./Thumb.vue";
import Design from "./Design.vue";
import Attribute from "./Attribute.vue";
const name = "金额（元）";
export default {
    name: name,
    component: "Amount",
    thumb: Thumb,
    designComp: Design,
    attributeComp: Attribute,
    attribute: {
        name: name,
        title: name,
        props: {
            placeholder: "请输入金额",
            type: "date",
            isConditionField: false
        },
        validation: {
            required: false
        },
        validationRules: [],
        showUpperCase: true
    }
};