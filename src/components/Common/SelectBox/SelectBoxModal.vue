<template>
  <Modal
    v-model="modalVisible"
    class-name="df-selectbox-modal"
    :title="modalTitle"
    :width="630"
    :styles="modelStyles"
    :fullscreen="isMobile"
    @on-ok="onConfirm"
    @on-visible-change="onVisibleChange"
  >
    <SelectBox
      v-if="modalVisible"
      ref="selectBox"
      :value="value"
      :data="data"
      :multiple="multiple"
      :noData="noData"
    ></SelectBox>
  </Modal>
</template>

<script>
import SelectBox from "./SelectBox.vue";
import { isMobile } from "@/utils/helper";
export default {
  name: "SelectBoxModal",
  components: {
    SelectBox
  },
  data() {
    return {
      modalVisible: false,
      isMobile: isMobile()
    };
  },
  props: {
    modalTitle: {
      type: String,
      default: "选择角色"
    },
    value: {
      type: Array,
      default: () => {
        return [];
      }
    },
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    multiple: {
      type: Boolean,
      default: true
    },
    noData: {
      type: String,
      default: "请选择角色"
    }
  },
  computed: {
    modelStyles() {
      if (!this.isMobile) {
        return {
          top: "30px"
        };
      }
      return null;
    }
  },
  methods: {
    show() {
      this.modalVisible = true;
    },
    onConfirm() {
      const selectedItems = this.$refs.selectBox.getData();
      this.$emit("on-selectbox-confirm", selectedItems);
    },
    onVisibleChange(visible) {
      this.modalVisible = visible;
    }
  }
};
</script>
<style lang="less">
.df-selectbox-modal {
  .ivu-modal-body {
    height: 370px;
    background-color: #f6f6f6;
    padding: 0;
  }
}

@media screen and (min-width: 320px) and (max-width: 768px) {
  .df-selectbox-modal {
    .ivu-modal-body {
      height: auto;
      background-color: #fff;
    }
    .ivu-modal-footer {
      z-index: 3;
    }
  }
}
</style>