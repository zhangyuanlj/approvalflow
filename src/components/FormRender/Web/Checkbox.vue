<template>
  <CheckboxGroup v-model="fieldData.value" class="df-render-checkbox">
    <p v-for="item in fieldData.attribute.items" :key="item.value">
      <Checkbox :label="item.value"></Checkbox>
    </p>
  </CheckboxGroup>
</template>

<script>
import { CheckboxGroup, Checkbox } from "view-design";
export default {
  name: "RenderCheckbox",
  components: {
    CheckboxGroup,
    Checkbox
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
.df-render-checkbox {
  .ivu-checkbox {
    margin-right: 10px;
  }
}
</style>