<template>
  <component ref="workflowNodeModal" :is="components[getModalType]" :nodeData="getEditNode"></component>
</template>

<script>
import {
  GET_EDIT_NODE,
  GET_SHOW_MODAL,
  GET_MODAL_TYPE
} from "store/modules/workflow/type";
import { mapGetters } from "vuex";
import NodeAddBtnModal from "./NodeAddBtnModal.vue";
import OriginatorModal from "./OriginatorModal.vue";
import CopyGiveModal from "./CopyGiveModal.vue";
import ApproverModal from "./ApproverModal.vue";
import ConditionModal from "./ConditionModal.vue";
const components = {
  add: NodeAddBtnModal,
  originator: OriginatorModal,
  copygive: CopyGiveModal,
  approver: ApproverModal,
  condition: ConditionModal
};
export default {
  name: "WorkflowNodeModal",
  data() {
    return {
      components: components
    };
  },
  computed: {
    ...mapGetters({
      getEditNode: GET_EDIT_NODE,
      getShowModal: GET_SHOW_MODAL,
      getModalType: GET_MODAL_TYPE
    })
  },
  watch: {
    getShowModal: {
      handler(val) {
        if (val) {
          this.$nextTick(() => {
            this.$refs.workflowNodeModal.show();
          });
        }
      }
    }
  }
};
</script>