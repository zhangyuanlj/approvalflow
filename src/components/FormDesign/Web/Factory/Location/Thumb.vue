<template>
  <Thumb :text="text" :thumbIcon="thumbIcon"></Thumb>
</template>

<script>
import Thumb from "formDesign/Web/Thumb.vue";
import model from "./model";
import thumbIcon from "./images/thumb.png";
export default {
  name: "LocationThumb",
  components: {
    Thumb
  },
  data() {
    return {
      text: model.attribute.title,
      thumbIcon: thumbIcon
    };
  }
};
</script>