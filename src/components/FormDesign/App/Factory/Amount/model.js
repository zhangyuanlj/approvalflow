import Attribute from "./Attribute.vue";
import icon from "./images/thumb.png";
const name = "金额（元）";
export default {
    name: name,
    component: "Amount",
    icon: icon,
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