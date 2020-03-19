<template>
  <div class="node-wrap">
    <div class="process-node-add-btn">
      <Button type="primary" shape="circle" icon="md-add" @click="onAdd"></Button>
    </div>
  </div>
</template>

<script>
import {
  UPDATE_SHOW_MODAL,
  UPDATE_MODAL_TYPE,
  UPDATE_EDIT_NODE
} from "store/modules/workflow/type";
import { mapMutations } from "vuex";
export default {
  name: "NodeAddBtn",
  props: {
    nodeData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  methods: {
    ...mapMutations({
      updateShowModal: UPDATE_SHOW_MODAL,
      updateModalType: UPDATE_MODAL_TYPE,
      updateEditNode: UPDATE_EDIT_NODE
    }),
    onAdd() {
      this.updateEditNode(this.nodeData);
      this.updateModalType("add");
      this.updateShowModal(true);
    }
  }
};
</script>
