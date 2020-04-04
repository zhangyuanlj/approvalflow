<template>
  <DatePicker
    :value="fieldData.value"
    :type="fieldData.attribute.props.type"
    :format="setFormat"
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
  computed: {
    setFormat() {
      const { type } = this.fieldData.attribute.props;
      if (type === "datetime") {
        return "yyyy-MM-dd HH:mm";
      }
      return "yyyy-MM-dd";
    }
  },
  methods: {
    onChange(dateTime) {
      this.$emit("on-value-change", dateTime, this.index, this.parentIndex);
    }
  }
};
</script>