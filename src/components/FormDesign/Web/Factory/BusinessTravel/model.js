import Thumb from "./Thumb.vue";
import Design from "./Design.vue";
import Attribute from "./Attribute.vue";
const name = "出差套件";
export default {
    name: name,
    component: "BusinessTravel",
    thumb: Thumb,
    designComp: Design,
    attributeComp: Attribute,
    attribute: {
        name: name,
        title: name,
        isWidget: true,
        props: {},
        actionName: "增加行程",
        unitValue: "2",
        daysOfBusinessTrip: true,
        peers: true,
        children: []
    }
};