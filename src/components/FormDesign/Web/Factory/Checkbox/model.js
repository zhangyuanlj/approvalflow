import Thumb from "./Thumb.vue";
import Design from "./Design.vue";
import Attribute from "./Attribute.vue";
const name = "多选框";
const item = "选项";
export default {
  name: name,
  component: "Checkbox",
  thumb: Thumb,
  designComp: Design,
  attributeComp: Attribute,
  attribute: {
    name: name,
    title: name,
    props: {
      placeholder: "请选择",
    },
    validation: {
      required: false,
    },
    validationRules: [],
    items: [
      {
        value: `${item}1`,
      },
      {
        value: `${item}2`,
      },
      {
        value: `${item}3`,
      },
    ],
  },
};
