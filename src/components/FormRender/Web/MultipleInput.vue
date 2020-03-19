<template>
  <Input
    type="textarea"
    v-model="fieldData.value"
    :placeholder="setPlaceholder"
    :maxlength="setMaxlength"
    :rows="3"
  />
</template>

<script>
import { Input } from "view-design";
export default {
  name: "RenderMultipleInput",
  components: {
    Input
  },
  props: {
    fieldData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    setPlaceholder() {
      const props = this.fieldData.attribute.props;
      return props && props.placeholder;
    },
    setMaxlength() {
      const props = this.fieldData.attribute.props;
      return props && props.maxlength;
    }
  }
};
</script>
