<template>
  <div class="df-field-become df-field-has-border">
    <div class="df-field-design">
      <div class="label">实际申请人</div>
      <div class="placeholder">请选择（必填）</div>
      <Icon type="ios-arrow-forward" class="df-arrow" :size="20" />
    </div>
    <div class="df-field-design">
      <div class="label">入职日期</div>
      <div class="placeholder">系统自动获取</div>
    </div>
    <div class="df-field-design">
      <div class="label">试用期</div>
      <div class="placeholder">系统自动获取</div>
    </div>
    <div class="df-field-design">
      <div class="label">转正日期</div>
      <div class="placeholder">请选择（必填）</div>
      <Icon type="ios-arrow-forward" class="df-arrow" :size="20" />
    </div>
    <div class="df-field-design">
      <div class="label">职位</div>
      <div class="placeholder">请输入</div>
    </div>
    <div class="df-field-design">
      <div class="label">职级</div>
      <div class="placeholder">请输入</div>
    </div>
    <p>审批通过后，自动更新花名册转正日期</p>
  </div>
</template>

<script>
import { Icon } from "view-design";
import model from "./model";
export default {
  name: "BecomeDesign",
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
.df-field-become {
  p {
    background: @body-bg-color;
    padding: 5px 10px;
    background-color: #fcf7d7;
  }
}
</style>