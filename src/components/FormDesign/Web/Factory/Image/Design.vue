<template>
  <div class="df-field-design">
    <div class="label">{{attribute.title}}</div>
    <div class="placeholder">{{placeholder(attribute.props.placeholder)}}</div>
    <Icon type="md-image" class="df-icon" :size="20" />
  </div>
</template>

<script>
import { Icon } from "view-design";
import model from "./model";
export default {
  name: "ImageDesign",
  components: {
    Icon
  },
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