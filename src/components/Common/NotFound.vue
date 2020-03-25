<template>
  <div class="app-no-found">
    <Icon type="ios-information-circle" :size="90" />
    <h4>很抱歉,没有找到对应页面!</h4>
    <Button type="primary" long @click="goHome">跳转到首页</Button>
  </div>
</template>

<script>
import { redirect, isMobile } from "utils/helper";
export default {
  name: "NotFound",
  methods: {
    goHome() {
      const href = isMobile() ? "webFormDesign/" : "basicSetting/";
      redirect(href);
    }
  }
};
</script>

<style lang="less">
.app-no-found {
  width: 400px;
  text-align: center;
  color: #999;
  padding: 90px 0;
  margin: 0 auto;
  h4 {
    font-size: 14px;
    font-weight: 400;
    margin: 15px 0;
  }
}

@media screen and (min-width: 320px) and (max-width: 768px) {
  .app-no-found {
    width: auto;
    padding: 90px 15px;
  }
}
</style>