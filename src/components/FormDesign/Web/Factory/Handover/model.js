import Thumb from "./Thumb.vue";
import Design from "./Design.vue";
import Attribute from "./Attribute.vue";
const name = "离职和交接套件";
export default {
    name: name,
    component: "Handover",
    thumb: Thumb,
    designComp: Design,
    attributeComp: Attribute,
    attribute: {
        name: name,
        title: name,
        isWidget: true,
        showMsg: true,
        msgContent: "此套件允许发起人代他人提交",
        props: {},
        children: []
    }
};