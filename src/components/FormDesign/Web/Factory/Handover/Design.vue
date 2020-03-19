<template>
  <div class="df-field-handover df-field-has-border">
    <div class="df-field-design">
      <div class="label">入职日期</div>
      <div class="placeholder">系统自动获取</div>
    </div>
    <div class="df-field-design">
      <div class="label">预计离职日期</div>
      <div class="placeholder">请选择（必填）</div>
      <Icon type="ios-arrow-forward" class="df-arrow" :size="20" />
    </div>
    <div class="df-field-design">
      <div class="label">离职原因</div>
      <div class="placeholder">请选择（必填）</div>
      <Icon type="ios-arrow-forward" class="df-arrow" :size="20" />
    </div>
    <div class="df-field-design">
      <div class="label">离职原因备注</div>
      <div class="placeholder">请输入...</div>
    </div>
    <div class="df-field-design">
      <div class="label">工作交接人</div>
      <div class="placeholder">请选择（必填）</div>
      <Icon type="ios-arrow-forward" class="df-arrow" :size="20" />
    </div>
    <p>实际申请人负责的审批单将在离职后转给交接人负责</p>
    <div class="df-field-design">
      <div class="label">工作交接事项</div>
      <div class="placeholder">请输入</div>
    </div>
  </div>
</template>

<script>
import { Icon } from "view-design";
import model from "./model";
export default {
  name: "HandoverDesign",
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
.df-field-handover {
  p {
    background: @body-bg-color;
    padding: 5px 10px;
  }
}
</style>