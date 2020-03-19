<template>
  <div class="df-field-design">
    <div class="label">{{attribute.title}}</div>
    <div class="placeholder">{{placeholder(attribute.props.placeholder)}}</div>
  </div>
</template>

<script>
import model from "./model";
export default {
  name: "MultipleInputDesign",
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