import Thumb from "./Thumb.vue";
import Design from "./Design.vue";
import Attribute from "./Attribute.vue";
const name = "加班套件";
export default {
    name: name,
    component: "Overtime",
    thumb: Thumb,
    designComp: Design,
    attributeComp: Attribute,
    attribute: {
        name: name,
        title: name,
        isWidget: true,
        props: {},
        includeType: false,
        types: [],
        otherSubmited: true,
        children: []
    }
};