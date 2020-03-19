<template>
  <div class="df-field-auto-transfer df-field-has-border">
    <div class="df-field-design">
      <div class="label">实际申请人</div>
      <div class="placeholder">请选择（必填）</div>
      <Icon type="ios-arrow-forward" class="df-arrow" :size="20" />
    </div>
    <div class="df-field-design">
      <div class="label">预计离职日期</div>
      <div class="placeholder">请选择（必填）</div>
      <Icon type="ios-arrow-forward" class="df-arrow" :size="20" />
    </div>
    <div class="df-field-design">
      <div class="label">工作交接人</div>
      <div class="placeholder">请选择（必填）</div>
      <Icon type="ios-arrow-forward" class="df-arrow" :size="20" />
    </div>
    <p>该员工待处理的审批单，将会转交给工作交接人</p>
  </div>
</template>

<script>
import { Icon } from "view-design";
import model from "./model";
export default {
  name: "AutoTransferDesign",
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
.df-field-auto-transfer {
  p {
    background: @body-bg-color;
    padding: 5px 10px;
  }
}
</style>