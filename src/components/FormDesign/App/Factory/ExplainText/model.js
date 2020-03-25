import Attribute from "./Attribute.vue";
import icon from "./images/thumb.png";
const name = "说明文字";
export default {
    name: name,
    component: "ExplainText",
    icon: icon,
    attributeComp: Attribute,
    attribute: {
        name: name,
        title: name,
        text: "请输入说明文字",
        props: {},
        noDisplay: false,
        jumpUrl: ""
    }
};