<template>
  <DatePicker
    :value="fieldData.value"
    :type="fieldData.attribute.props.type"
    @on-change="onChange"
    style="width:100%;"
  ></DatePicker>
</template>

<script>
export default {
  name: "RenderDateTime",
  props: {
    fieldData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    parentIndex: {
      type: Number
    },
    index: {
      type: Number,
      default: 0
    }
  },
  methods: {
    onChange(dateTime) {
      this.$emit("on-value-change", dateTime, this.index, this.parentIndex);
    }
  }
};
</script>