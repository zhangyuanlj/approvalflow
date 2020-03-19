<template>
  <Thumb :text="text" :thumbIcon="thumbIcon"></Thumb>
</template>

<script>
import Thumb from "formDesign/Web/Thumb.vue";
import thumbIcon from "./images/number-input-thumb.png";
export default {
  name: "NumberInput",
  components: {
    Thumb
  },
  data() {
    return {
      text: "数字输入框",
      thumbIcon: thumbIcon
    };
  }
};
</script>