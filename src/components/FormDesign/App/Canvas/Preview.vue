<template>
  <Modal
    v-model="modalVisible"
    class-name="df-app-preview-modal"
    title="预览表单"
    :fullscreen="true"
    @on-visible-change="onVisibleChange"
  >
    <FormPreviewView v-if="modalVisible"></FormPreviewView>
  </Modal>
</template>

<script>
import FormPreviewView from "components/FormPreview/App.vue";
export default {
  name: "AppPreviewModal",
  components: {
    FormPreviewView
  },
  data() {
    return {
      modalVisible: false
    };
  },
  methods: {
    show() {
      this.modalVisible = true;
    },
    hide() {
      this.modalVisible = false;
    },
    onVisibleChange(visible) {
      this.modalVisible = visible;
    }
  }
};
</script>

<style lang="less">
.df-app-preview-modal {
  .ivu-modal-body {
    padding: 0;
  }
  .df-form-render {
    padding: 20px 15px 20px;
  }
}
</style>