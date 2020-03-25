<template>
  <div v-if="modalVisible" class="df-preview-modal">
    <Button type="primary" class="goback-btn" shape="circle" icon="ios-arrow-back" @click="hide">返回</Button>
    <div class="inner">
      <FormPreview></FormPreview>
    </div>
  </div>
</template>

<script>
import FormPreview from "components/FormPreview";
export default {
  name: "PreviewModal",
  data() {
    return {
      modalVisible: false
    };
  },
  components: {
    FormPreview
  },
  methods: {
    show() {
      this.modalVisible = true;
    },
    hide() {
      this.modalVisible = false;
    }
  }
};
</script>
<style lang="less">
.df-preview-modal {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  background-color: #f6f6f6;
  z-index: 999;
  .goback-btn {
    position: fixed;
    left: 15px;
    top: 18px;
    z-index: 1000;
  }
  .inner {
    padding-top: 60px;
  }
  .df-form-preview {
    margin-top: -50px;
  }
}
</style>