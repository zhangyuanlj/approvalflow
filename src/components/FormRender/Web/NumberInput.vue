<template>
  <div>
    <Input
      v-model="fieldData.value"
      type="number"
      :placeholder="setPlaceholder"
      style="width:100%;"
    >
      <span v-if="showAppend" slot="append">{{fieldData.attribute.unit}}</span>
    </Input>
  </div>
</template>

<script>
import { Input } from "view-design";
export default {
  name: "RenderNumberInput",
  components: {
    Input
  },
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
  mounted() {
    this.bindChangeEvent();
  },
  computed: {
    showAppend() {
      return this.fieldData.attribute.unit;
    },
    setPlaceholder() {
      const props = this.fieldData.attribute.props;
      return props && props.placeholder;
    }
  },
  methods: {
    //自动计算两个时间之间的天数
    getDays(sDate1, sDate2) {
      let aDate, oDate1, oDate2, iDays;
      aDate = sDate1.split("-");
      oDate1 = new Date(aDate[1] + "-" + aDate[2] + "-" + aDate[0]);
      aDate = sDate2.split("-");
      oDate2 = new Date(aDate[1] + "-" + aDate[2] + "-" + aDate[0]);
      iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);
      return iDays;
    },
    onChange(data) {
      const relatedName = data.relatedName;
      if (relatedName === this.fieldData.attribute.relatedName) {
        const dateTime = data.dateTime;
        const startDate = dateTime[0];
        const endDate = dateTime[1];
        if (startDate && endDate) {
          const startTime = new Date(startDate).getTime();
          const endTime = new Date(endDate).getTime();
          if (startTime <= endTime) {
            let days = this.getDays(startDate, endDate);
            days = days ? days.toString() : "";
            this.$emit("on-value-change", days, this.index, this.parentIndex);
          }
        }
      }
    },
    bindChangeEvent() {
      this.$EventBus.$off("on-datetimerange-change", this.onChange);
      this.$EventBus.$on("on-datetimerange-change", this.onChange);
    }
  }
};
</script>
