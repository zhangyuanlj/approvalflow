<template>
  <div>
    <div class="node-wrap">
      <div class="process-node start-process-node" @click="onEdit">
        <div class="node-title">
          <strong class="title-text ellipsis">{{setNodeText}}</strong>
        </div>
        <div class="node-content">
          <div class="content-text ellipsis">{{setOriginator}}</div>
          <Icon type="ios-arrow-forward" />
        </div>
      </div>
    </div>
    <NodeAddBtn :nodeData="nodeData"></NodeAddBtn>
  </div>
</template>

<script>
import {
  UPDATE_SHOW_MODAL,
  UPDATE_MODAL_TYPE,
  UPDATE_EDIT_NODE
} from "store/modules/workflow/type";
import { mapMutations } from "vuex";
import NodeAddBtn from "./NodeAddBtn.vue";
const DEFAULT_NODE_TEXT = "所有人";
export default {
  name: "Originator",
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
    setNodeText() {
      const { nodeText } = this.nodeData;
      if (nodeText !== "") {
        return nodeText;
      }
      return DEFAULT_NODE_TEXT;
    },
    setOriginator() {
      if (this.nodeData.value) {
        const { value } = this.nodeData;
        const contacts = value.contacts.value;
        if (contacts.length) {
          const ret = [];
          contacts.forEach(item => {
            const name = item.userName ? item.userName : item.menuName;
            ret.push(name);
          });
          return ret.join(",");
        }
      }
      return DEFAULT_NODE_TEXT;
    }
  },
  methods: {
    ...mapMutations({
      updateShowModal: UPDATE_SHOW_MODAL,
      updateModalType: UPDATE_MODAL_TYPE,
      updateEditNode: UPDATE_EDIT_NODE
    }),
    onEdit() {
      this.updateEditNode(this.nodeData);
      this.updateModalType("originator");
      this.updateShowModal(true);
    }
  }
};
</script>
