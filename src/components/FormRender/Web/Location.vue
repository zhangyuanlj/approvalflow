<template>
  <div>
    <Input v-model="fieldData.value" @on-change="this.onChange">
      <a slot="append" href="javascript:void(0);" @click="onShow()">选择地址</a>
    </Input>
    <Modal
      v-model="modalVisible"
      class-name="select-address-web-modal"
      :title="setModalTitle"
      :width="630"
      :fullscreen="true"
      @on-visible-change="onVisibleChange"
    >
      <WebPositionPicker v-if="modalVisible" @on-select-postion="onSelectPostion"></WebPositionPicker>
      <div slot="footer" class="modal-footer">
        <p>
          <Icon type="md-information-circle" :size="14" />拖拽蓝色Marker进行选择
        </p>
        <Button type="primary" @click="onConfirm">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { WebPositionPicker } from "components/Common/PositionPicker";
export default {
  name: "RenderLocation",
  components: {
    WebPositionPicker
  },
  data() {
    return {
      modalVisible: false,
      selectedPosition: null
    };
  },
  props: {
    fieldData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    parentIndex: {
      type: Number
    },
    index: {
      type: Number,
      default: 0
    }
  },
  computed: {
    setModalTitle() {
      const title = this.fieldData.attribute.title;
      return `选择${title}`;
    }
  },
  methods: {
    onShow() {
      this.modalVisible = true;
    },
    onConfirm() {
      const address = this.selectedPosition.address;
      this.modalVisible = false;
      this.$emit("on-value-change", address, this.index, this.parentIndex);
    },
    onVisibleChange(visible) {
      this.modalVisible = visible;
    },
    onSelectPostion(selectedPosition) {
      this.selectedPosition = selectedPosition;
    },
    onChange(e) {
      const value = e.target.value;
      this.$emit("on-value-change", value, this.index, this.parentIndex);
    }
  }
};
</script>
<style lang="less">
.select-address-web-modal {
  .ivu-modal-body {
    padding: 0;
  }
  .modal-footer {
    display: flex;
    align-items: center;
    p {
      flex: 3;
      text-align: left;
      color: #e33d3d;
      font-size: 13px;
      .ivu-icon {
        margin-right: 5px;
      }
    }
  }
}
</style>