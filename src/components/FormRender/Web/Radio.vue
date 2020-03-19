<template>
  <RadioGroup v-model="fieldData.value" class="df-render-radio">
    <p v-for="item in fieldData.attribute.items" :key="item.value">
      <Radio :label="item.value"></Radio>
    </p>
  </RadioGroup>
</template>

<script>
import { RadioGroup, Radio } from "view-design";
export default {
  name: "RenderRadio",
  components: {
    RadioGroup,
    Radio
  },
  props: {
    fieldData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
};
</script>
<style lang="less">
.df-render-radio {
  .ivu-radio {
    margin-right: 10px;
  }
}
</style>