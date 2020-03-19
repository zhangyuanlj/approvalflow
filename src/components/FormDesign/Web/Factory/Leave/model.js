import Thumb from "./Thumb.vue";
import Design from "./Design.vue";
import Attribute from "./Attribute.vue";
const name = "请假/调休套件";
export default {
    name: name,
    component: "Leave",
    thumb: Thumb,
    designComp: Design,
    attributeComp: Attribute,
    attribute: {
        name: name,
        title: name,
        isWidget: true,
        props: {},
        children: []
    }
};