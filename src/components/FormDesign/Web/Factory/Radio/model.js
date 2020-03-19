import Thumb from "./Thumb.vue";
import Design from "./Design.vue";
import Attribute from "./Attribute.vue";
const name = "单选框";
const item = "选项";
export default {
    name: name,
    component: "Radio",
    thumb: Thumb,
    designComp: Design,
    attributeComp: Attribute,
    attribute: {
        name: name,
        title: name,
        props: {
            placeholder: "请选择",
            isConditionField: false
        },
        validation: {
            required: false
        },
        validationRules: [],
        items: [{
                value: `${item}1`
            },
            {
                value: `${item}2`
            },
            {
                value: `${item}3`
            }
        ]
    }
};