<template>
  <RadioDesign :attribute="attribute"></RadioDesign>
</template>

<script>
import RadioDesign from "formDesign/Web/Factory/Radio/Design.vue";
import model from "./model";
export default {
  name: "CheckboxDesign",
  components: {
    RadioDesign
  },
  props: {
    attribute: {
      type: Object,
      default: () => {
        return model.attribute;
      }
    }
  }
};
</script>