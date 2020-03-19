<template>
  <div class="app-root">
    <NavBar title="标题" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="app-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import "view-design/dist/styles/iview.css";
import "vant/lib/index.css";
import { NavBar } from "vant";
export default {
  name: "AppMainView",
  components: {
    NavBar
  },
  methods: {
    onClickLeft() {}
  }
};
</script>
<style lang="less">
@import "~components/Styles/index.module.less";
</style>