<template>
  <div class="df-amount-field">
    <div class="df-field-design">
      <div class="label">{{attribute.title}}</div>
      <div class="placeholder">{{placeholder(attribute.props.placeholder)}}</div>
    </div>
    <div class="amount-formate">大写：壹万元整（示例）</div>
  </div>
</template>

<script>
import model from "./model";
export default {
  name: "AmountDesign",
  props: {
    attribute: {
      type: Object,
      default: () => {
        return model.attribute;
      }
    }
  },
  methods: {
    placeholder(placeholder) {
      if (this.attribute.validation.required) {
        return `${placeholder}（必填）`;
      }
      return placeholder;
    }
  }
};
</script>
<style lang="less">
.placeholder() {
  background-color: #ccc;
  opacity: 0.8;
}
.df-component[data-component="Amount"] {
  background: none;
}
.df-amount-field {
  .df-field-design {
    background-color: #fff;
  }
  .amount-formate {
    color: rgba(25, 31, 37, 0.4);
    font-size: 13px;
    padding: 5px 15px;
    background: #f6f6f6;
  }
}
.df-component_placeholder {
  .df-field-design,
  .amount-formate {
    .placeholder();
  }
}
</style>