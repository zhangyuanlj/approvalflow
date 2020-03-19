<template>
  <div class="df-field-transfer-position df-field-has-border">
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
      <div class="label">原部门</div>
      <div class="placeholder">系统自动获取</div>
    </div>
    <div class="df-field-design">
      <div class="label">原职位</div>
      <div class="placeholder">系统自动获取</div>
    </div>
    <div class="df-field-design">
      <div class="label">原岗位职级</div>
      <div class="placeholder">系统自动获取</div>
    </div>
    <div class="df-field-design">
      <div class="label">转入部门</div>
      <div class="placeholder">请选择（必填）</div>
      <Icon type="ios-arrow-forward" class="df-arrow" :size="20" />
    </div>
    <div class="df-field-design">
      <div class="label">转入职位</div>
      <div class="placeholder">请选择（必填）</div>
    </div>
    <div class="df-field-design">
      <div class="label">新岗位职级</div>
      <div class="placeholder">请输入（必填）</div>
    </div>
    <div class="df-field-design">
      <div class="label">生效日期</div>
      <div class="placeholder">请选择（必填）</div>
      <Icon type="ios-arrow-forward" class="df-arrow" :size="20" />
    </div>
    <p>审批通过后，自动变更员工的部门及职位</p>
  </div>
</template>

<script>
import { Icon } from "view-design";
import model from "./model";
export default {
  name: "TransferPositionDesign",
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
.df-field-transfer-position {
  p {
    background: @body-bg-color;
    padding: 5px 10px;
    background-color: #fcf7d7;
  }
}
</style>