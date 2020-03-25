<template>
  <ul class="df-render-datetime-range">
    <li class="item" :data-startDate="this.fieldData.value[0]">
      <p class="label">
        <span class="required" v-if="fieldData.attribute.validation.required">*</span>
        <span class="label-text">{{fieldData.attribute.startDateTitle}}</span>
      </p>
      <DatePicker
        :value="fieldData.value[0]"
        :type="fieldData.attribute.props.type"
        :placeholder="fieldData.attribute.props.placeholder"
        @on-change="onStartDateChange"
        style="width:100%;"
      ></DatePicker>
    </li>
    <li class="item" :data-startDate="this.fieldData.value[1]">
      <p class="label">
        <span class="required" v-if="fieldData.attribute.validation.required">*</span>
        <span class="label-text">{{fieldData.attribute.endDateTitle}}</span>
      </p>
      <DatePicker
        :value="fieldData.value[1]"
        :type="fieldData.attribute.props.type"
        :placeholder="fieldData.attribute.props.placeholder"
        @on-change="onEndDateChange"
        style="width:100%;"
      ></DatePicker>
    </li>
  </ul>
</template>

<script>
export default {
  name: "RenderDateTimeRange",
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
    onStartDateChange(dateTime) {
      const self = this;
      this.$emit(
        "on-value-change",
        [dateTime, self.fieldData.value[1]],
        this.index,
        this.parentIndex
      );
      this.$EventBus.$emit("on-datetimerange-change", {
        dateTime: [dateTime, self.fieldData.value[1]],
        parentKey: self.fieldData.parentKey,
        relatedName: self.fieldData.name
      });
    },
    onEndDateChange(dateTime) {
      const self = this;
      this.$emit(
        "on-value-change",
        [self.fieldData.value[0], dateTime],
        this.index,
        this.parentIndex
      );
      this.$EventBus.$emit("on-datetimerange-change", {
        dateTime: [self.fieldData.value[0], dateTime],
        parentKey: self.fieldData.parentKey,
        relatedName: self.fieldData.name
      });
    }
  }
};
</script>
<style lang="less">
.df-render-datetime-range {
  .item {
    margin-bottom: 5px;
  }
  .label {
    font-size: 0;
    &-text {
      color: #515a6e;
      font-size: 14px;
    }
  }
  .required {
    margin-right: 4px;
    line-height: 1;
    font-family: SimSun;
    color: #ed4014;
    font-size: 14px;
  }
}
</style>