<template>
  <div class="df-field-design">
    <div class="label">{{attribute.title}}</div>
    <div class="placeholder">
      {{placeholder(attribute.validation.required)}}
      <img :src="thumbIcon" class="icon" />
    </div>
  </div>
</template>

<script>
import thumbIcon from "./images/thumb.png";
import model from "./model";
export default {
  name: "AttachmentDesign",
  data() {
    return {
      thumbIcon: thumbIcon
    };
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
    placeholder(required) {
      if (required) {
        return "（必填）";
      }
      return "";
    }
  }
};
</script>