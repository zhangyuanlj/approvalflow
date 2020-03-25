<template>
  <div class="df-setting df-advanced-setting">
    <div class="inner">
      <Form></Form>
    </div>
  </div>
</template>

<script>
import Form from "./Form.vue";
export default {
  name: "AppAdvancedSetting",
  components: {
    Form
  }
};
</script>

<style lang="less">
.df-advanced-setting {
  .duplicate-help {
    line-height: 14px;
    margin-top: 10px;
  }
  .checkbox-item {
    display: block;
    margin-bottom: 5px;
  }
  .ivu-tooltip {
    display: none;
  }
  .ivu-select-dropdown {
    left: 0 !important;
    max-width: 100% !important;
  }
  .ivu-select-item {
    white-space: pre-wrap;
  }
  .view-setting {
    line-height: auto;
    a {
      display: block;
    }
  }
}
</style>