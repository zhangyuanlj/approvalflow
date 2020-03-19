<template>
  <div class="df-field-induction-design df-field-has-border">
    <div class="df-field-design">
      <div class="label">入职员工姓名</div>
      <div class="placeholder">请输入（必填）</div>
    </div>
    <div class="df-field-design">
      <div class="label">用人部门</div>
      <div class="placeholder">请选择（必填）</div>
      <Icon type="ios-arrow-forward" class="df-arrow" :size="20" />
    </div>
    <div class="df-field-design">
      <div class="label">职位</div>
      <div class="placeholder">请输入（必填）</div>
    </div>
    <div class="df-field-design">
      <div class="label">手机号</div>
      <div class="placeholder">请输入（必填）</div>
    </div>
    <div class="df-field-design">
      <div class="label">员工类型</div>
      <div class="placeholder">请选择（必填）</div>
      <Icon type="ios-arrow-forward" class="df-arrow" :size="20" />
    </div>
    <div class="df-field-design">
      <div class="label">预计入职日期</div>
      <div class="placeholder">请选择（必填）</div>
      <Icon type="ios-arrow-forward" class="df-arrow" :size="20" />
    </div>
    <p>审批通过后且开通智能人事微应用，员工将自动进入待入职名单</p>
  </div>
</template>

<script>
import { Icon } from "view-design";
import model from "./model";
export default {
  name: "InductionDesign",
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
.df-field-induction-design {
  p {
    background: @body-bg-color;
    padding: 5px 10px;
    background-color: #fcf7d7;
  }
}
</style>