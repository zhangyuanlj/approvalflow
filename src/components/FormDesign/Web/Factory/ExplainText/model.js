import Thumb from "./Thumb.vue";
import Design from "./Design.vue";
import Attribute from "./Attribute.vue";
const name = "说明文字";
export default {
    name: name,
    component: "ExplainText",
    thumb: Thumb,
    designComp: Design,
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