<template>
  <div class="df-location-field">
    <div class="df-field-design">
      <div class="label">{{attribute.title}}</div>
      <div class="placeholder">例如：四川省成都市</div>
    </div>
    <div class="location-formate">当前时间</div>
  </div>
</template>

<script>
import model from "./model";
export default {
  name: "LocationDesign",
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
.placeholder() {
  background-color: #ccc;
  opacity: 0.8;
}
.df-component[data-component="Location"] {
  background: none;
}
.df-location-field {
  .df-field-design {
    background-color: #fff;
  }
  .location-formate {
    color: rgba(25, 31, 37, 0.4);
    font-size: 13px;
    padding: 5px 15px;
    background: #f6f6f6;
  }
}
.df-component_placeholder {
  .df-field-design,
  .location-formate {
    .placeholder();
  }
}
</style>