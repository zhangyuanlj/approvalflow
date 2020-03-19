<template>
  <Modal
    v-model="modalVisible"
    :width="320"
    class-name="process-node-add-modal"
    @on-visible-change="onVisible"
  >
    <ul class="add-item">
      <li @click="onAddNode('approver')">
        <div class="icon">
          <Icon type="md-person" />
        </div>
        <h4>审批人</h4>
      </li>
      <li>
        <div class="icon" @click="onAddNode('copygive')">
          <Icon type="ios-paper-plane" />
        </div>
        <h4>抄送人</h4>
      </li>
      <li @click="onAddNode('condition')">
        <div class="icon">
          <Icon type="md-git-network" />
        </div>
        <h4>条件流程</h4>
      </li>
    </ul>
  </Modal>
</template>

<script>
import {
  GET_NODES_DATA,
  UPDATE_NODES_DATA,
  UPDATE_SHOW_MODAL
} from "store/modules/workflow/type";
import { mapGetters, mapMutations } from "vuex";
import { addNode } from "./scripts/utils";
export default {
  name: "NodeAddModal",
  data() {
    return {
      modalVisible: false
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
      this.modalVisible = true;
    },
    hide() {
      this.modalVisible = false;
    },
    onVisible(visible) {
      this.updateShowModal(visible);
    },
    onAddNode(type) {
      const nodesList = addNode(this.processNodesData, this.nodeData, type);
      this.hide();
      this.updateProcessData(nodesList);
    }
  }
};
</script>

<style lang="less">
.process-node-add-modal {
  .ivu-modal {
    &-header,
    &-footer {
      display: none;
    }

    &-body {
      padding-top: 30px;
      padding-bottom: 30px;
    }

    &-close {
      right: 0;
      top: 0;
    }
  }

  .add-item {
    display: flex;

    li {
      margin-right: 10px;
      cursor: pointer;

      .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80px;
        height: 80px;
        margin-bottom: 5px;
        background: #fff;
        border: 1px solid #e2e2e2;
        border-radius: 50%;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

        .ivu-icon {
          font-size: 40px;
        }
      }

      h4 {
        color: #191f25;
        text-align: center;
        font-size: 14px;
        font-weight: 100;
      }

      &:nth-child(1) .ivu-icon {
        color: #ff943e;
      }

      &:nth-child(2) .ivu-icon {
        color: #3296fa;
      }

      &:nth-child(3) .ivu-icon {
        color: #15bc83;
      }

      &:hover {
        .icon {
          border-color: #1890ff;
          background-color: #1890ff;
        }

        .ivu-icon {
          color: #fff;
        }
      }
    }
  }
}
</style>
