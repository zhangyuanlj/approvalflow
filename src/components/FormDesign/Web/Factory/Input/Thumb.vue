<template>
  <Thumb :text="text" :thumbIcon="thumbIcon"></Thumb>
</template>

<script>
import Thumb from "formDesign/Web/Thumb.vue";
import thumbIcon from "./images/input-thumb.png";
import model from "./model";
export default {
  name: "InputThumb",
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