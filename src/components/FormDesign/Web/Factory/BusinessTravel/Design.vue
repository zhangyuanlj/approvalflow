<template>
  <div class="df-field-businesstravel df-field-has-border">
    <div class="df-field-design">
      <div class="label">出差事由</div>
      <div class="placeholder">请输入出差事由（必填）</div>
      <Icon type="ios-arrow-forward" class="df-arrow" :size="20" />
    </div>
    <div class="df-field-design trip-title">
      <div class="label">行程</div>
    </div>
    <div class="df-field-design">
      <div class="label">交通工具</div>
      <div class="placeholder">（必填）</div>
      <Icon type="ios-arrow-forward" class="df-arrow" :size="20" />
    </div>
    <div class="df-field-design">
      <div class="label">单程往返</div>
      <div class="placeholder">（必填）</div>
    </div>
    <div class="df-field-design">
      <div class="label">出发城市</div>
      <div class="placeholder">（必填）</div>
    </div>
    <div class="df-field-design">
      <div class="label">目的城市</div>
      <div class="placeholder">（必填）</div>
    </div>
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
      <div class="label">时长（天）</div>
      <div class="placeholder">自动计算（必填）</div>
    </div>
    <!-- <div class="df-field-design">
      <div class="label">出差天数（天）</div>
      <div class="placeholder">自动计算（必填）</div>
    </div>-->
    <div class="df-field-design">
      <div class="label">出差备注</div>
      <div class="placeholder">请输入具体的出差备注（选填，少于500字）</div>
    </div>
    <div v-if="attribute.peers" class="df-field-design">
      <div class="label">同行人</div>
      <div class="placeholder">请选择</div>
      <Icon type="ios-arrow-forward" class="df-arrow" :size="20" />
    </div>
    <a class="add-button">
      <Icon type="md-add" :size="20" />增加行程
    </a>
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
.df-field-businesstravel {
  .trip-title {
    .label {
      color: rgba(25, 31, 37, 0.56) !important;
      font-size: 13px !important;
    }
  }
  .add-button {
    display: block;
    height: 56px;
    line-height: 56px;
    color: #008cee;
    text-align: center;
    padding: 0 15px;
    background: #f7f9ff;
    border-bottom: 1px solid hsla(240, 2%, 79%, 0.5);
  }
}
</style>