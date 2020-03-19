<template>
  <div class="thumb-container">
    <Thumb :text="text" :thumbIcon="thumbIcon"></Thumb>
    <p class="desc">办理离职并交接</p>
  </div>
</template>

<script>
import Thumb from "formDesign/Web/Thumb.vue";
import model from "./model";
import thumbIcon from "./images/thumb.png";
export default {
  name: "HandoverThumb",
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