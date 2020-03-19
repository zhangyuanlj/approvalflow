<template>
  <div class="df-render-explain-text" v-if="!fieldData.attribute.noDisplay">
    <p v-if="fieldData.attribute.jumpUrl === ''">{{fieldData.attribute.text}}</p>
    <a v-else :href="fieldData.attribute.jumpUrl">{{fieldData.attribute.text}}</a>
  </div>
</template>

<script>
export default {
  name: "RenderExplainText",
  props: {
    fieldData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
};
</script>
<style lang="less">
.df-render-explain-text {
  line-height: 20px;
}
</style>