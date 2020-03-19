import Thumb from "./Thumb.vue";
import Design from "./Design.vue";
import Attribute from "./Attribute.vue";
const name = "日期区间";
export default {
    name: name,
    component: "DateTimeRange",
    thumb: Thumb,
    designComp: Design,
    attributeComp: Attribute,
    attribute: {
        name: name,
        title: name,
        startDateTitle: "开始日期",
        endDateTitle: "结束日期",
        automatic: false,
        props: {
            placeholder: "请选择",
            type: "date"
        },
        validation: {
            required: false
        },
        validationRules: []
    }
};