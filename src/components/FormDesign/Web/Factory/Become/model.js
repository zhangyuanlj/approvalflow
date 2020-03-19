import Thumb from "./Thumb.vue";
import Design from "./Design.vue";
import Attribute from "./Attribute.vue";
const name = "转正套件";
export default {
    name: name,
    component: "Become",
    thumb: Thumb,
    designComp: Design,
    attributeComp: Attribute,
    attribute: {
        name: name,
        title: name,
        isWidget: true,
        props: {},
        position: true,
        rank: true,
        workingPlace: false,
        otherSubmited: true,
        children: []
    }
};