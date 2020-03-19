<template>
  <div>
    <div class="node-wrap">
      <div class="process-node process-node-copy-give" @click="onEditCopyGive">
        <div class="node-title">
          <strong class="title-text ellipsis">
            <Icon type="ios-paper-plane" />
            {{setNodeText}}
          </strong>
          <Icon type="md-close" class="remove" @click.stop="deleteNode(nodeData)" />
        </div>
        <div class="node-content">
          <div class="content-text ellipsis">{{setCopyGive}}</div>
          <Icon type="ios-arrow-forward" />
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
import { deleteNode } from "./scripts/utils";
export default {
  name: "CopyGive",
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
  computed: {
    ...mapGetters({
      processNodesData: GET_NODES_DATA
    }),
    setNodeText() {
      const { nodeText } = this.nodeData;
      if (nodeText !== "") {
        return nodeText;
      }
      return "选择抄送人";
    },
    setCopyGive() {
      const { value } = this.nodeData;
      const contacts = value.contacts.value;
      const roles = value.roles;
      const director = value.director;
      const ret = [...contacts, ...roles, ...director];
      const nodeText = [];
      if (ret.length) {
        ret.forEach(item => {
          let text = "";
          if (item.nodeText) {
            text = item.nodeText;
          }
          if (item.userName) {
            text = item.userName;
          }
          if (item.menuName) {
            text = item.menuName;
          }
          nodeText.push(text);
        });
        return nodeText.join(",");
      }
      return "选择抄送人";
    }
  },
  methods: {
    ...mapMutations({
      updateProcessData: UPDATE_NODES_DATA,
      updateShowModal: UPDATE_SHOW_MODAL,
      updateModalType: UPDATE_MODAL_TYPE,
      updateEditNode: UPDATE_EDIT_NODE
    }),
    deleteNode(node) {
      const nodesList = deleteNode(this.processNodesData, node);
      this.updateProcessData(nodesList);
    },
    onEditCopyGive() {
      this.updateEditNode(this.nodeData);
      this.updateModalType("copygive");
      this.updateShowModal(true);
    }
  }
};
</script>