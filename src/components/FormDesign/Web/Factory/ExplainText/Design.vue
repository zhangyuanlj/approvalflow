<template>
  <div class="df-field-design">
    <p>{{attribute.text}}</p>
  </div>
</template>

<script>
import model from "./model";
export default {
  name: "ExplainTextDesign",
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

<style lang="less">
.df-component[data-component="ExplainText"] {
  background: none;

  p {
    color: #858e99;
    font-size: 12px;
  }
}
</style>
