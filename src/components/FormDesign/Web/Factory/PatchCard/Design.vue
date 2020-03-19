<template>
  <div>
    <div class="df-field-design first-field">
      <div class="label">补卡时间</div>
      <div class="placeholder">请选择（必填）</div>
      <Icon type="ios-arrow-forward" class="df-arrow" :size="20" />
    </div>
  </div>
</template>

<script>
import { Icon } from "view-design";
import model from "./model";
export default {
  name: "LeaveDesign",
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