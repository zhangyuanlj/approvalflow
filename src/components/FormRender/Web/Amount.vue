<template>
  <div class="df-render-amount">
    <Input
      v-model="fieldData.value"
      type="number"
      :placeholder="fieldData.attribute.props.placeholder"
      clearable
      @on-change="onChange"
    />
    <p v-if="fieldData.attribute.showUpperCase">大写：{{ upperCaseStr }}</p>
  </div>
</template>

<script>
const UPPER_CASE = {
  0: "零",
  1: "壹",
  2: "贰",
  3: "叁",
  4: "肆",
  5: "伍",
  6: "陆",
  7: "柒",
  8: "捌",
  9: "玖",
};
export default {
  name: "RenderAmount",
  data() {
    return {
      upperCaseStr: "",
    };
  },
  props: {
    fieldData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    onChange(e) {
      const value = e.target.value;
      const valueArr = value.split("");
      let upperCaseStr = [];
      valueArr.forEach((item) => {
        upperCaseStr.push(UPPER_CASE[item]);
      });
      this.upperCaseStr = upperCaseStr.join("");
    },
  },
};
</script>
<style lang="less">
.df-render-amount {
  p {
    color: rgba(25, 31, 37, 0.4);
    font-size: 12px;
    font-style: italic;
    line-height: 20px;
  }
}
</style>
