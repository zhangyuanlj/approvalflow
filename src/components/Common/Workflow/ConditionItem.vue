<template>
  <div>
    <div class="node-wrap condition-node-wrap">
      <div
        v-if="item.nodeType === 'conditionItem'"
        :class="setClass"
        :data-key="item.key"
        @click="onEdit(item)"
      >
        <div class="node-title">
          <strong class="title-text ellipsis">{{setTitle(item, index)}}</strong>
          <span class="priority">优先级{{index+1}}</span>
          <span class="icons">
            <Icon type="ios-copy" @click.stop="copyConditionNode(item)" />
            <Icon type="md-close" @click.stop="deleteNode(item)" />
          </span>
        </div>
        <div class="node-content">
          <div class="content-text ellipsis">{{setContent(item)}}</div>
        </div>
        <div v-if="index > 0" class="sort-prev" @click.stop="sortNode(item, 'top')">
          <Icon type="ios-arrow-back" />
        </div>
        <div
          v-if="index < nodeData.children.length-1"
          class="sort-next"
          @click.stop="sortNode(item, 'bottom')"
        >
          <Icon type="ios-arrow-forward" />
        </div>
        <div v-if="item.error" class="process-node-err">
          <Tooltip content="请设置条件">
            <Icon type="ios-information-circle-outline" />
          </Tooltip>
        </div>
      </div>
      <NodeAddBtn :nodeData="item"></NodeAddBtn>
      <template v-if="index===0">
        <div class="top-left-cover"></div>
        <div class="bottom-left-cover"></div>
      </template>
      <template v-if="index===nodeData.children.length-1">
        <div class="top-right-cover"></div>
        <div class="bottom-right-cover"></div>
      </template>
    </div>
    <template v-if="hasChildren(item)">
      <ProcessNode :nodeData="childNode" v-for="childNode in item.nodes" :key="childNode.id"></ProcessNode>
    </template>
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
import { GET_ONE_FIELD, UPDATE_ONE_FIELD } from "store/modules/formDesign/type";
import { mapGetters, mapMutations } from "vuex";
import NodeAddBtn from "./NodeAddBtn.vue";
import classNames from "classnames";
import {
  deleteNode,
  copyConditionNode,
  sortConditionNode,
  updateNodeData,
  setConditionContent
} from "./scripts/utils";
const DEFAULT_TEXT = "请设置条件";
export default {
  name: "ConditionItem",
  components: {
    NodeAddBtn
  },
  props: {
    nodeData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    item: {
      type: Object,
      default: () => {
        return {};
      }
    },
    index: {
      type: Number,
      default: 0
    }
  },
  watch: {
    item: {
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
      processNodesData: GET_NODES_DATA,
      getOneField: GET_ONE_FIELD
    }),
    setClass() {
      const baseClass = "condition-node";
      return classNames({
        [baseClass]: true,
        [`${baseClass}_error`]: this.item.error
      });
    }
  },
  methods: {
    ...mapMutations({
      updateProcessData: UPDATE_NODES_DATA,
      updateShowModal: UPDATE_SHOW_MODAL,
      updateModalType: UPDATE_MODAL_TYPE,
      updateEditNode: UPDATE_EDIT_NODE,
      updateOneField: UPDATE_ONE_FIELD
    }),
    setTitle(node, i) {
      const nodeText = node.nodeText;
      if (nodeText !== "") {
        node.nodeText = nodeText;
        return nodeText;
      } else {
        const title = `条件${i + 1}`;
        node.nodeText = title;
        return title;
      }
    },
    setContent(item) {
      return setConditionContent(item);
    },
    setError() {
      if (this.notLast) {
        const updateData = this.item;
        if (this.setContent(this.item) === DEFAULT_TEXT) {
          updateData.error = true;
        } else {
          updateData.error = false;
        }
        const nodesList = updateNodeData(
          this.processNodesData,
          this.item,
          updateData
        );
        this.updateProcessData(nodesList);
      }
    },
    notLast() {
      return this.index !== this.nodeData.children.length - 1;
    },
    hasChildren(node) {
      return node.nodes && node.nodes.length;
    },
    copyConditionNode(node) {
      const nodesList = copyConditionNode(this.processNodesData, node);
      this.updateProcessData(nodesList);
    },
    //重置设为流程条件的表单字段
    resetConditionField(node) {
      const { data } = node.value;
      data.forEach(item => {
        const name = item.name;
        const component = item.component;
        if (component !== "originator") {
          const designField = this.getOneField(name);
          if (designField) {
            designField.attribute.props.isConditionField = false;
            this.updateOneField(designField);
          }
        }
      });
    },
    deleteNode(node) {
      const nodesList = deleteNode(this.processNodesData, node);
      this.resetConditionField(node);
      this.updateProcessData(nodesList);
    },
    sortNode(node, type) {
      const nodesList = sortConditionNode(this.processNodesData, node, type);
      this.updateProcessData(nodesList);
    },
    onEdit(item) {
      this.updateEditNode(item);
      this.updateModalType("condition");
      this.updateShowModal(true);
    }
  }
};
</script>
