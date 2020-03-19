import Thumb from "./Thumb.vue";
import Design from "./Design.vue";
import Attribute from "./Attribute.vue";
const name = "入职套件";
export default {
    name: name,
    component: "Induction",
    thumb: Thumb,
    designComp: Design,
    attributeComp: Attribute,
    attribute: {
        name: name,
        title: name,
        isWidget: true,
        props: {},
        otherSubmited: true,
        children: []
    }
};