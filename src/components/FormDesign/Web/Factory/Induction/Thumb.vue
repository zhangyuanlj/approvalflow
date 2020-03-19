<template>
  <div class="thumb-container">
    <Thumb :text="text" :thumbIcon="thumbIcon"></Thumb>
    <p class="desc">自动添加待入职</p>
  </div>
</template>

<script>
import Thumb from "formDesign/Web/Thumb.vue";
import model from "./model";
import thumbIcon from "./images/thumb.png";
export default {
  name: "InductionThumb",
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