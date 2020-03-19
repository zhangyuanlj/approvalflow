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
  name: "AdvancedSetting",
  components: {
    Form
  }
};
</script>

<style lang="less">
.df-advanced-setting {
  .ivu-form-item {
    margin-bottom: 40px;
  }
  .duplicate-help {
    line-height: 14px;
    margin-top: 10px;
  }
  .checkbox-item {
    margin-right: 20px;
  }
}
</style>