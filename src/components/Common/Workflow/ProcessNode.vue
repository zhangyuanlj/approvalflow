<template>
  <component :is="components[nodeData.nodeType]" :nodeData="nodeData"></component>
</template>

<script>
import CopyGive from "./CopyGive.vue";
import Approver from "./Approver.vue";
import Condition from "./Condition.vue";
export default {
  name: "ProcessNode",
  data() {
    return {
      components: {
        copygive: CopyGive,
        approver: Approver,
        condition: Condition
      }
    };
  },
  props: {
    nodeData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
};
</script>