<template>
  <Thumb :text="text" :thumbIcon="thumbIcon"></Thumb>
</template>

<script>
import Thumb from "formDesign/Web/Thumb.vue";
import thumbIcon from "./images/multiple-input-thumb.png";
export default {
  name: "MultipleInput",
  components: {
    Thumb
  },
  data() {
    return {
      text: "多行输入框",
      thumbIcon: thumbIcon
    };
  }
};
</script>