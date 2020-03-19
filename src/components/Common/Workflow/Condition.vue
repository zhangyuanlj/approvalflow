<template>
  <div class="process-condition-node">
    <Button
      class="add-condition-button"
      shape="circle"
      size="small"
      @click="addConditionNode(nodeData)"
    >添加条件</Button>
    <div class="process-condition-wrap">
      <div class="inner">
        <div
          class="node-col-box"
          v-for="(item, i) in nodeData.children"
          :key="item.id"
          :data-id="item.id"
        >
          <ConditionItem :nodeData="nodeData" :item="item" :index="i"></ConditionItem>
        </div>
      </div>
    </div>
    <NodeAddBtn :nodeData="nodeData"></NodeAddBtn>
  </div>
</template>

<script>
import $ from "jquery";
import { GET_NODES_DATA, UPDATE_NODES_DATA } from "store/modules/workflow/type";
import { mapGetters, mapMutations } from "vuex";
import ConditionItem from "./ConditionItem.vue";
import NodeAddBtn from "./NodeAddBtn.vue";
import { addConditionNode } from "./scripts/utils";
export default {
  name: "Condition",
  components: {
    ConditionItem,
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
    })
  },
  methods: {
    ...mapMutations({
      updateProcessData: UPDATE_NODES_DATA
    }),
    addConditionNode(node) {
      const nodesList = addConditionNode(this.processNodesData, node);
      this.updateProcessData(nodesList);
      this.$nextTick(() => {
        const $dfProcessDesign = $("#df-process-design");
        const $conditionNode = $(this.$el);
        const id = node.children[node.children.length - 1].id;
        const left = $conditionNode
          .find(`.node-col-box[data-id='${id}']`)
          .offset().left;
        const scrollLeft = $dfProcessDesign.scrollLeft();
        $dfProcessDesign.scrollLeft(scrollLeft + left);
      });
    }
  }
};
</script>
