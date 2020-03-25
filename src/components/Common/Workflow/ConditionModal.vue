<template>
  <ProcessNodeModal
    ref="conditionModal"
    :width="500"
    :nodeData="nodeData"
    @on-process-node-model-visible="onVisible"
  >
    <template slot="process-node-model">
      <div class="df-condition-modal">
        <div v-for="(item, i) in nodeData.value.data" :key="i">
          <component
            v-if="item.checked"
            :is="components[item.component]"
            :nodeData="nodeData"
            :itemData="item"
            :index="i"
          ></component>
        </div>
        <div class="modal-edit-button">
          <div class="left">
            <Button type="primary" icon="md-add" @click="onAddConditions">添加条件</Button>
            <p>还有{{getUsableLen()}}个可用条件</p>
          </div>
          <p class="add-expain" @click="onShowHelpModal">
            <Icon type="ios-help-circle-outline" />如何添加更多条件
          </p>
        </div>
      </div>
      <Modal
        v-model="selectConditionsVisible"
        class-name="df-select-conditions-modal"
        title="选择条件"
        :width="400"
        :fullscreen="isMobile()"
        @on-ok="ok"
      >
        <template v-if="selectConditionsVisible">
          <div class="select-conditions-item">
            <p>请选择用来区分审批流程的条件字段 ，已选{{getHasChooseLen()}}个</p>
            <Checkbox
              v-for="(item, i) in getConditionField()"
              v-model="item.checked"
              :key="i"
              :label="item.name"
            >{{item.title}}</Checkbox>
          </div>
          <div v-if="getNonRequiredList().length" class="select-conditions-item">
            <p>非必填条件不能用来区分流程，如需使用请前往表单设置</p>
            <Checkbox
              v-for="(item, i) in getNonRequiredList()"
              v-model="item.required"
              :key="i"
              :label="item.name"
              @on-change="onUnChecked(item)"
            >{{item.title}}</Checkbox>
          </div>
        </template>
      </Modal>
      <Modal
        v-model="helpModalVisible"
        title="如何添加更多条件"
        :width="400"
        :fullscreen="isMobile()"
        :footer-hide="true"
      >
        <img :src="helpImg" width="100%" />
      </Modal>
    </template>
  </ProcessNodeModal>
</template>

<script>
import $ from "jquery";
import { GET_NODES_DATA, UPDATE_NODES_DATA } from "store/modules/workflow/type";
import {
  GET_CONDITION_FIELD,
  GET_ONE_FIELD,
  UPDATE_ONE_FIELD
} from "store/modules/formDesign/type";
import { mapGetters, mapMutations } from "vuex";
import ProcessNodeModal from "./ProcessNodeModal.vue";
import ConditionOriginator from "./ConditionOriginator.vue";
import ConditionRadio from "./ConditionRadio.vue";
import ConditionNumber from "./ConditionNumber.vue";
import { creatId, updateNodeData } from "./scripts/utils";
import { isMobile } from "utils/helper";
import helpImg from "./images/condition-expain.gif";
export default {
  name: "ConditionModal",
  components: {
    ProcessNodeModal
  },
  data() {
    return {
      itemsData: [],
      selectConditionsVisible: false,
      helpModalVisible: false,
      helpImg: helpImg,
      components: {
        originator: ConditionOriginator,
        Radio: ConditionRadio,
        NumberInput: ConditionNumber,
        Amount: ConditionNumber
      },
      isMobile: isMobile
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
      processNodesData: GET_NODES_DATA,
      conditionField: GET_CONDITION_FIELD,
      getOneField: GET_ONE_FIELD
    })
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapMutations({
      updateProcessData: UPDATE_NODES_DATA,
      updateOneField: UPDATE_ONE_FIELD
    }),
    getItemValue(data, name) {
      const searchRet = data.find(item => {
        return item.name === name;
      });
      return searchRet && searchRet.value;
    },
    getConditionField() {
      const { data } = this.nodeData.value;
      const ret = data.filter(item => {
        return item.isConditionField === true && item.required === true;
      });
      return ret;
    },
    getNonRequiredList() {
      const { data } = this.nodeData.value;
      const ret = data.filter(item => {
        return item.required === false;
      });
      return ret;
    },
    getUsableLen() {
      const { data } = this.nodeData.value;
      const ret = data.filter(item => {
        return item.checked === false;
      });
      return ret.length;
    },
    getHasChooseLen() {
      const { data } = this.nodeData.value;
      const ret = data.filter(item => {
        return item.checked === true;
      });
      return ret.length;
    },
    setConditionField() {
      const updateData = this.nodeData;
      const conditionField = JSON.parse(JSON.stringify(this.conditionField));
      const data = updateData.value.data;
      data[0].key = data[0].key ? data[0].key : creatId("originator");
      conditionField.forEach(item => {
        const name = item.name;
        const component = item.component;
        const required = item.attribute.validation.required;
        const itemValue = this.getItemValue(data, name);
        item.title = item.attribute.title;
        item.required = required;
        if (required) {
          item.checked = true;
          item.isConditionField = true;
        } else {
          item.checked = false;
        }
        item.key = item.key ? item.key : creatId(component);
        if (component === "Radio") {
          item.value = itemValue ? itemValue : [];
        } else {
          const defaultValue = {
            type: "1",
            data: {
              num: "",
              min: {
                type: "1",
                value: ""
              },
              max: {
                type: "1",
                value: ""
              }
            }
          };
          item.value = itemValue ? itemValue : $.extend(true, {}, defaultValue);
        }
      });
      updateData.value.data = [...[data[0]], ...conditionField];
      const nodesList = updateNodeData(
        this.processNodesData,
        this.nodeData,
        updateData
      );
      this.updateProcessData(nodesList);
    },
    init() {
      this.$conditionModal = this.$refs.conditionModal;
    },
    show() {
      this.$conditionModal.show();
    },
    hide() {
      this.$conditionModal.hide();
    },
    onAddConditions() {
      this.selectConditionsVisible = true;
    },
    onUnChecked(item) {
      this.$Modal.confirm({
        title: "确认选择",
        content: "<p>勾选后该字段将被设为提交人必填，且审批人不可编辑</p>",
        onOk: () => {
          const name = item.name;
          const updateData = this.nodeData;
          const designField = this.getOneField(name);
          updateData.value.data.forEach(field => {
            if (field.name === name) {
              field.isConditionField = true;
              field.checked = true;
              field.required = true;
            }
          });
          designField.attribute.validation.required = true;
          designField.attribute.validationRules = [
            {
              required: true,
              message: `${item.title}不能为空`,
              trigger: "change"
            }
          ];
          this.$Message.success({
            content: "已成功设为提交人必填"
          });
          const nodesList = updateNodeData(
            this.processNodesData,
            this.nodeData,
            updateData
          );
          this.updateOneField(designField);
          this.updateProcessData(nodesList);
        }
      });
    },
    onVisible(visible) {
      if (visible) {
        this.setConditionField();
      }
    },
    ok() {
      const data = this.nodeData.value.data;
      data.forEach(item => {
        if (item.component !== "originator" && item.required) {
          const designField = this.getOneField(item.name);
          designField.attribute.props.isConditionField = true;
          this.updateOneField(designField);
        }
      });
    },
    onShowHelpModal() {
      this.helpModalVisible = true;
    }
  }
};
</script>

<style lang="less">
.df-condition-modal {
  .modal-edit-item {
    display: flex;
    align-items: center;
    margin-bottom: 18px;

    .item-label {
      width: 17%;
    }

    .item-content {
      flex: 3;

      &-wrapper {
        margin-bottom: 15px;
      }

      .df-taglist {
        margin-top: 7px;
      }

      .number-title {
        height: 32px;
        text-align: center;
        line-height: 32px;
      }

      .more-setting {
        margin-top: 10px;
      }
    }

    .item-remove {
      width: 32px;
      height: 32px;
      text-align: center;
      color: rgba(0, 0, 0, 0.56);
      font-size: 16px;
      line-height: 32px;
      cursor: pointer;
    }
  }

  .modal-edit-button {
    display: flex;
    align-items: center;

    .left {
      display: flex;
      align-items: center;
      flex: 3;

      p {
        color: rgba(25, 31, 37, 0.56);
        font-size: 13px;
        margin-left: 10px;
      }
    }

    .add-expain {
      color: #576a95;
      cursor: pointer;

      .ivu-icon {
        margin-right: 5px;
      }
    }
  }
}

.df-select-conditions-modal {
  .select-conditions-item {
    margin-bottom: 15px;
  }

  .ivu-modal-body {
    min-height: 120px;
  }
}
@media screen and (min-width: 320px) and (max-width: 768px) {
  .df-condition-modal {
    .modal-edit-item {
      position: relative;
      flex-direction: column;
      align-items: flex-start;
      border-bottom: 1px solid #e8eaec;
      .item-label {
        width: 50%;
      }
      .item-content {
        margin-top: 15px;
      }
      .item-remove {
        position: absolute;
        right: 0;
        top: -5px;
      }
    }
    .modal-edit-button {
      flex-direction: column;
      align-items: flex-start;
      .add-expain {
        margin-top: 5px;
      }
    }
    .ivu-row,
    .ivu-checkbox-group {
      padding-bottom: 15px;
    }
  }
}
</style>
