<template>
  <div class="df-field-overtime df-field-has-border">
    <div class="df-field-design">
      <div class="label">加班人</div>
      <div class="placeholder">请选择（必填）</div>
      <Icon type="ios-arrow-forward" class="df-arrow" :size="20" />
    </div>
    <p>加班补偿只对加班规则为“可申请加班费或调休”的员工可见</p>
    <div class="df-field-design">
      <div class="label">开始时间</div>
      <div class="placeholder">请选择（必填）</div>
      <Icon type="ios-arrow-forward" class="df-arrow" :size="20" />
    </div>
    <div class="df-field-design">
      <div class="label">结束时间</div>
      <div class="placeholder">请选择（必填）</div>
      <Icon type="ios-arrow-forward" class="df-arrow" :size="20" />
    </div>
    <div class="df-field-design">
      <div class="label">时长</div>
      <div class="placeholder">请输入时长（必填）</div>
    </div>
  </div>
</template>

<script>
import { Icon } from "view-design";
import model from "./model";
export default {
  name: "OvertimeDesign",
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
<style lang="less">
@import "~components/Styles/base.module.less";
.df-field-overtime {
  p {
    background: @body-bg-color;
    padding: 5px 10px;
  }
}
</style>