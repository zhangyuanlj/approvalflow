<template>
  <Input v-model="fieldData.value" :readonly="setReadonly" :placeholder="setPlaceholder" :maxlength="setMaxlength" />
</template>

<script>
import { Input } from "view-design";
export default {
  name: "RenderInput",
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
    },
    setReadonly() {
      const props = this.fieldData.attribute.props;
      return props && props.readonly;
    }
  }
};
</script>
