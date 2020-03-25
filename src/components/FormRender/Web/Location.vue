<template>
  <div>
    <Input v-model="fieldData.value" readonly>
      <Button slot="append" @click="onAuto()">{{autoBtnText}}</Button>
      <Button slot="append" @click="onShow()">选择地址</Button>
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
const AUTO_BTN_TEXT = "获取";
const AUTO_LOADING_BTN_TEXT = "获取中...";
export default {
  name: "RenderLocation",
  components: {
    WebPositionPicker
  },
  data() {
    return {
      autoBtnText: AUTO_BTN_TEXT,
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
    onAuto() {
      if (this.autoBtnText === AUTO_LOADING_BTN_TEXT) {
        return;
      }
      const self = this;
      const map = new window.AMap.Map("container", {
        resizeEnable: true
      });
      this.autoBtnText = AUTO_LOADING_BTN_TEXT;
      map.plugin("AMap.Geolocation", function() {
        const geolocation = new window.AMap.Geolocation({
          enableHighAccuracy: true,
          timeout: 10000,
          zoomToAccuracy: true
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        window.AMap.event.addListener(geolocation, "complete", data => {
          const address = data.formattedAddress;
          self.autoBtnText = AUTO_BTN_TEXT;
          self.$emit("on-value-change", address, self.index, self.parentIndex);
        });
        window.AMap.event.addListener(geolocation, "error", () => {
          self.autoBtnText = AUTO_BTN_TEXT;
          self.$Message.error("自动定位失败,请重试!");
        });
      });
    },
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
