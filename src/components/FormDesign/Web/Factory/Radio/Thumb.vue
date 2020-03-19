<template>
  <Thumb :text="text" :thumbIcon="thumbIcon"></Thumb>
</template>

<script>
import Thumb from "formDesign/Web/Thumb.vue";
import thumbIcon from "./images/thumb.png";
export default {
  name: "RadioThumb",
  components: {
    Thumb
  },
  data() {
    return {
      text: "单选框",
      thumbIcon: thumbIcon
    };
  }
};
</script>