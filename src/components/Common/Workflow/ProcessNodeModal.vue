<template>
  <Modal
    v-model="visible"
    class-name="df-process-node-model"
    :width="width"
    :closable="false"
    :fullscreen="isMobile()"
    ok-text="保存"
    @on-ok="ok"
    @on-visible-change="onVisibleChange"
  >
    <div slot="header">
      <ModalTitle :nodeData="nodeData" @on-modify-node-text="onModifyNodeText"></ModalTitle>
    </div>
    <slot name="process-node-model"></slot>
  </Modal>
</template>

<script>
import {
  GET_NODES_DATA,
  UPDATE_NODES_DATA,
  UPDATE_SHOW_MODAL
} from "store/modules/workflow/type";
import { mapGetters, mapMutations } from "vuex";
import { updateNodeData } from "./scripts/utils";
import ModalTitle from "./ModalTitle.vue";
import { isMobile } from "utils/helper";
export default {
  name: "ProcessNodeModal",
  components: {
    ModalTitle
  },
  data() {
    return {
      visible: false,
      updateData: {},
      isMobile: isMobile
    };
  },
  props: {
    nodeData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    width: {
      type: Number,
      default: () => {
        return 400;
      }
    }
  },
  watch: {
    nodeData: {
      handler(val) {
        this.updateData = val;
      },
      deep: true
    }
  },
  mounted() {
    this.updateData = this.nodeData;
  },
  computed: {
    ...mapGetters({
      processNodesData: GET_NODES_DATA
    })
  },
  methods: {
    ...mapMutations({
      updateProcessData: UPDATE_NODES_DATA,
      updateShowModal: UPDATE_SHOW_MODAL
    }),
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
    onModifyNodeText(nodeText) {
      this.updateData.nodeText = nodeText;
    },
    ok() {
      const nodesList = updateNodeData(
        this.processNodesData,
        this.nodeData,
        this.updateData
      );
      this.updateProcessData(nodesList);
    },
    onVisibleChange(visible) {
      this.updateShowModal(visible);
      this.$emit("on-process-node-model-visible", visible);
    }
  }
};
</script>

<style lang="less">
.df-process-node-model {
  .ivu-modal-body {
    min-height: 210px;
  }
}
</style>
