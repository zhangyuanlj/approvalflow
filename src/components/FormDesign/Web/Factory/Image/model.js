import Thumb from "./Thumb.vue";
import Design from "./Design.vue";
import Attribute from "./Attribute.vue";
const name = "图片";
export default {
    name: name,
    component: "Image",
    thumb: Thumb,
    designComp: Design,
    attributeComp: Attribute,
    attribute: {
        name: name,
        title: name,
        watermark: false,
        props: {
            placeholder: "请选择"
        },
        validation: {
            required: false
        },
        validationRules: []
    }
};