<template>
  <div class="df-field-has-border">
    <div class="df-field-design">
      <div class="label">申请人</div>
      <div class="placeholder">换班申请人</div>
      <Icon type="ios-arrow-forward" class="df-arrow" :size="20" />
    </div>
    <div class="df-field-design">
      <div class="label">替班人</div>
      <div class="placeholder">请选择（必填）</div>
      <Icon type="ios-arrow-forward" class="df-arrow" :size="20" />
    </div>
    <div class="df-field-design">
      <div class="label">换班日期</div>
      <div class="placeholder">请选择（必填）</div>
      <Icon type="ios-arrow-forward" class="df-arrow" :size="20" />
    </div>
    <div class="df-field-design">
      <div class="label">还班日期</div>
      <div class="placeholder">请选择</div>
      <Icon type="ios-arrow-forward" class="df-arrow" :size="20" />
    </div>
  </div>
</template>

<script>
import { Icon } from "view-design";
import model from "./model";
export default {
  name: "ShiftDutyDesign",
  components: {
    Icon
  },
  props: {
    attribute: {
      type: Object,
      default: () => {
        return model.attribute;
      }
    }
  }
};
</script>