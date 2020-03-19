<template>
  <div class="thumb-container">
    <Thumb :text="text" :thumbIcon="thumbIcon"></Thumb>
    <p class="desc">指导离职面谈</p>
  </div>
</template>

<script>
import Thumb from "formDesign/Web/Thumb.vue";
import model from "./model";
import thumbIcon from "./images/thumb.png";
export default {
  name: "QuitThumb",
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