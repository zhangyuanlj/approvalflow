<template>
  <div class="df-process-design_modal-title">
    <Input
      v-if="editModel"
      v-model="nodeText"
      ref="input"
      :placeholder="setPlaceholder(nodeData)"
      @on-blur="onBlur"
    />
    <template v-else>
      <div @click="onEdit" class="node-text-container">
        <span class="node-text ellipsis">{{setNodeText(nodeData)}}</span>
        <Icon type="md-create" :size="16" />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "ModalTitle",
  data() {
    return {
      editModel: false,
      nodeText: ""
    };
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
        this.nodeText = val.nodeText;
      },
      deep: true
    }
  },
  mounted() {
    this.nodeText = this.nodeData.nodeText;
  },
  methods: {
    setNodeText(node) {
      if (this.nodeText === "") {
        return this.setPlaceholder(node);
      }
      return this.nodeText;
    },
    setPlaceholder(node) {
      const nodeType = node.nodeType;
      if (nodeType === "approver") {
        return "审批人";
      } else if (nodeType === "copygive") {
        return "抄送人";
      } else {
        return "条件";
      }
    },
    onEdit() {
      this.editModel = true;
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    onBlur() {
      this.editModel = false;
      this.$emit("on-modify-node-text", this.nodeText);
    }
  }
};
</script>

<style lang="less">
.df-process-design_modal-title {
  .node-text {
    &-container {
      display: flex;
      align-items: center;
      height: 32px;
    }
    display: inline-block;
    max-width: 80%;
    font-size: 15px;
    margin-right: 5px;
  }

  .ivu-icon {
    vertical-align: 0;
  }
}
</style>
