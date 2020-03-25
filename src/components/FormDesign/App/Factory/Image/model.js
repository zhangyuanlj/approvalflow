import Attribute from "./Attribute.vue";
import icon from "./images/thumb.png";
const name = "图片";
export default {
    name: name,
    component: "Image",
    icon: icon,
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