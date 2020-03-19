<template>
  <Thumb :text="text" :thumbIcon="thumbIcon"></Thumb>
</template>

<script>
import Thumb from "formDesign/Web/Thumb.vue";
import thumbIcon from "./images/thumb.png";
export default {
  name: "CheckboxThumb",
  components: {
    Thumb
  },
  data() {
    return {
      text: "多选框",
      thumbIcon: thumbIcon
    };
  }
};
</script>