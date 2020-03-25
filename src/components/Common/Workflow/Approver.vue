<template>
  <div>
    <div class="node-wrap">
      <div :class="setClass" @click="onEdit">
        <div class="node-title">
          <strong class="title-text ellipsis">
            <Icon type="md-person" />
            {{setNodeText}}
          </strong>
          <Icon type="md-close" class="remove" @click.stop="deleteNode(nodeData)" />
        </div>
        <div class="node-content">
          <div class="content-text ellipsis">{{setApprover}}</div>
          <Icon type="ios-arrow-forward" />
          <div v-if="nodeData.error" class="process-node-err">
            <Tooltip content="请选择审批人">
              <Icon type="ios-information-circle-outline" />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
    <NodeAddBtn :nodeData="nodeData"></NodeAddBtn>
  </div>
</template>

<script>
import {
  GET_NODES_DATA,
  UPDATE_NODES_DATA,
  UPDATE_SHOW_MODAL,
  UPDATE_MODAL_TYPE,
  UPDATE_EDIT_NODE
} from "store/modules/workflow/type";
import { mapGetters, mapMutations } from "vuex";
import NodeAddBtn from "./NodeAddBtn.vue";
import classNames from "classnames";
import { deleteNode, updateNodeData, setApprover } from "./scripts/utils";
const DEFAULT_TEXT = "请选择审批人";
export default {
  name: "Approver",
  components: {
    NodeAddBtn
  },
  props: {
    nodeData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  watch: {
    nodeData: {
      handler(val) {
        if (val.error) {
          this.setError();
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters({
      processNodesData: GET_NODES_DATA
    }),
    setNodeText() {
      const { nodeText } = this.nodeData;
      if (nodeText !== "") {
        return nodeText;
      }
      return "审批人";
    },
    setApprover() {
      return setApprover(this.nodeData);
    },
    setClass() {
      const baseClass = "process-node process-node-approver";
      return classNames({
        [baseClass]: true,
        [`process-node_error`]: this.nodeData.error
      });
    }
  },
  mounted() {
    this.$approverModel = this.$refs.approverModel;
  },
  methods: {
    ...mapMutations({
      updateProcessData: UPDATE_NODES_DATA,
      updateShowModal: UPDATE_SHOW_MODAL,
      updateModalType: UPDATE_MODAL_TYPE,
      updateEditNode: UPDATE_EDIT_NODE
    }),
    setError() {
      const updateData = this.nodeData;
      if (this.setApprover === DEFAULT_TEXT) {
        updateData.error = true;
      } else {
        updateData.error = false;
      }
      const nodesList = updateNodeData(
        this.processNodesData,
        this.nodeData,
        updateData
      );
      this.updateProcessData(nodesList);
    },
    deleteNode(node) {
      const nodesList = deleteNode(this.processNodesData, node);
      this.updateProcessData(nodesList);
    },
    onEdit() {
      this.updateEditNode(this.nodeData);
      this.updateModalType("approver");
      this.updateShowModal(true);
    }
  }
};
</script>