<template>
  <div class="df-radio-field_attribute attribute-content">
    <Form :model="attribute" :rules="rules">
      <FormItem prop="title">
        <div class="df-attribute-item">
          <div class="item-title">
            <strong>标题</strong>
            <span>最多{{nameMaxLen}}字</span>
          </div>
          <div class="item-content">
            <Input v-model="attribute.title" />
          </div>
        </div>
      </FormItem>
      <FormItem prop="props.placeholder">
        <div class="df-attribute-item">
          <div class="item-title">
            <strong>提示文字</strong>
            <span>最多{{namePlaceholderLen}}字</span>
          </div>
          <div class="item-content">
            <Input v-model="attribute.props.placeholder" />
          </div>
        </div>
      </FormItem>
      <FormItem>
        <div class="df-attribute-item">
          <div class="item-title">
            <strong>选项</strong>
            <span :class="setItemsClass">{{getItemsText}}</span>
          </div>
          <div class="item-content">
            <SlickList
              v-model="items"
              :useDragHandle="true"
              helperClass="df-radio-field_helper"
              :lockToContainerEdges="true"
              axis="y"
              lockAxis="y"
              @input="onSortEnd"
            >
              <SlickItem v-for="(item, i) in items" class="items-list" :index="i" :key="i">
                <div class="input">
                  <Input v-model="item.value" :class="setItemsInputClass(item.value)">
                    <Icon slot="prefix" v-handle type="md-menu" class="del-button" />
                  </Input>
                </div>
                <div class="buttons">
                  <Icon type="md-close-circle" class="del-button" @click.stop="deleteItem(i)" />
                  <Icon type="md-add-circle" class="add-button" @click.stop="addItem(i)" />
                </div>
              </SlickItem>
            </SlickList>
          </div>
        </div>
      </FormItem>
      <FormItem>
        <div class="df-attribute-item">
          <div class="item-title">验证</div>
          <div class="item-content df-attribute-required">
            <Checkbox v-model="attribute.validation.required">
              必填
              <Tooltip content="流程条件：流程设计里可用于区分流程走向，例如：金额大于500需要主管+经理审批；小于500只需要主管审批。">
                <div class="required-tip">
                  (勾选后可作为
                  <strong>流程条件</strong>)
                </div>
              </Tooltip>
            </Checkbox>
          </div>
        </div>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { Form, FormItem, Input, Checkbox, Tooltip, Icon } from "view-design";
import { SlickList, SlickItem, HandleDirective } from "vue-slicksort";
import {
  UPDATE_FIELD_ITEMS
} from "store/modules/formDesign/type";
import { mapMutations } from "vuex";
import model from "./model";
const NAME_MAX_LEN = 20;
const NAME_PLACEHOLDER_LEN = 50;
const ITEMS_LEN = 200;
const ITEM_NAME = "选项";
const ITEMS_EXPLAIN = `最多${ITEMS_LEN}，每项最多${NAME_PLACEHOLDER_LEN}字`;
const ITEMS_ERR_MSG = `${ITEM_NAME}重复`;
export default {
  name: "CheckBoxAttribute",
  components: {
    Form,
    FormItem,
    Input,
    Checkbox,
    Tooltip,
    Icon,
    SlickList,
    SlickItem
  },
  directives: {
    handle: HandleDirective
  },
  data() {
    return {
      nameMaxLen: NAME_MAX_LEN,
      namePlaceholderLen: NAME_PLACEHOLDER_LEN,
      itemsExplain: ITEMS_EXPLAIN,
      items: this.attribute.items,
      rules: {
        title: [
          {
            required: true,
            message: "标题不能为空",
            trigger: "change"
          },
          {
            type: "string",
            max: NAME_MAX_LEN,
            message: `最多输入${NAME_MAX_LEN}个字符`,
            trigger: "change"
          }
        ],
        "props.placeholder": [
          {
            type: "string",
            max: NAME_PLACEHOLDER_LEN,
            message: `最多输入${NAME_PLACEHOLDER_LEN}个字符`,
            trigger: "change"
          }
        ]
      }
    };
  },
  props: {
    attribute: {
      type: Object,
      default: () => {
        return model.attribute;
      }
    }
  },
  watch: {
    attribute: {
      handler(val) {
        this.items = [...val.items];
      },
      deep: true
    }
  },
  computed: {
    getItemsText() {
      if (this.isRepeat()) {
        return ITEMS_ERR_MSG;
      }
      return ITEMS_EXPLAIN;
    },
    setItemsClass() {
      if (this.isRepeat()) {
        return "items-error";
      }
      return undefined;
    }
  },
  methods: {
    ...mapMutations({
      updateFieldItems: UPDATE_FIELD_ITEMS
    }),
    isRepeat() {
      const items = [];
      this.items.forEach(item => {
        items.push(item.value);
      });
      if (new Set(items).size !== items.length) {
        return true;
      }
      return false;
    },
    setItemsInputClass(value) {
      let num = 0;
      this.items.forEach(item => {
        if (item.value === value) {
          num++;
        }
      });
      if (num >= 2) {
        return "items-error";
      }
      return undefined;
    },
    getMaxNum() {
      let num = 0;
      this.items.forEach(item => {
        const value = item.value;
        const ret = value.match(/\d{1}/);
        const valueNum = ret !== null ? parseInt(ret[0]) : 0;
        if (valueNum > num) {
          num = valueNum;
        }
      });
      return num;
    },
    deleteItem(i) {
      this.items.splice(i, 1);
      this.updateFieldItems({
        name: this.attribute.name,
        items: this.items
      });
    },
    addItem(i) {
      const len = this.items.length;
      const start = this.items.slice(0, i + 1);
      const maxNum = this.getMaxNum() + 1;
      const mid = [
        {
          value: `选项${maxNum}`
        }
      ];
      const end = this.items.slice(i + 1, len);
      const ret = [...start, ...mid, ...end];
      this.items = ret;
      this.updateFieldItems({
        name: this.attribute.name,
        items: this.items
      });
    },
    onSortEnd(items) {
      this.updateFieldItems({
        name: this.attribute.name,
        items: items
      });
    }
  }
};
</script>

<style lang="less">
@items-error-color: #ed4014;

.list() {
  display: flex;
  margin-bottom: 10px;

  .input {
    flex: 3;
  }

  .buttons {
    display: flex;
    align-items: center;
    font-size: 0;
    margin: 0 5px;

    .ivu-icon {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.65);
      cursor: pointer;
    }

    .del-button {
      margin-right: 5px;
    }

    .add-button {
      color: #3296fa;
    }
  }
}

.df-radio-field_attribute {
  .item-title span.items-error {
    color: @items-error-color;
  }

  .items-error input.ivu-input,
  .items-error input.ivu-input:focus {
    border-color: @items-error-color;
  }

  .items-list {
    .list();
  }
}

.df-radio-field_helper {
  .list();
}
</style>

