<template>
  <div class="attribute-content">
    <Form :model="attribute" :rules="rules">
      <FormItem prop="title">
        <div class="df-attribute-item">
          <div class="item-title">
            <strong>标题</strong>
            <span>最多{{nameMaxLen}}字</span>
          </div>
          <div class="item-content">
            <Input v-model="attribute.title" @on-change="onTitleChange" />
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
          <div class="item-content">内容最多可填写1000个字</div>
        </div>
      </FormItem>
      <FormItem>
        <div class="df-attribute-item df-attribute-required">
          <div class="item-title">验证</div>
          <div class="item-content">
            <Checkbox v-model="attribute.validation.required" @on-change="onChange">
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
      <FormItem>
        <div class="df-attribute-item">
          <div class="item-title">选项</div>
          <div class="item-content">
            <RadioGroup v-model="attribute.multiple">
              <Radio label="只能选择一个部门"></Radio>
              <Radio label="可同时选择多个部门"></Radio>
            </RadioGroup>
          </div>
        </div>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import {
  Form,
  FormItem,
  Input,
  Checkbox,
  RadioGroup,
  Radio,
  Tooltip
} from "view-design";
import { UPDATE_VALIDATION } from "store/modules/formDesign/type";
import { mapMutations } from "vuex";
import { requiredMixin } from "mixins";
import model from "./model";
const NAME_MAX_LEN = 20;
const NAME_PLACEHOLDER_LEN = 50;
export default {
  name: "DepartmentsAttribute",
  components: {
    Form,
    FormItem,
    Input,
    Checkbox,
    RadioGroup,
    Radio,
    Tooltip
  },
  mixins: [requiredMixin],
  data() {
    return {
      nameMaxLen: NAME_MAX_LEN,
      namePlaceholderLen: NAME_PLACEHOLDER_LEN,
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
  methods: {
    ...mapMutations({
      updateValidation: UPDATE_VALIDATION
    })
  }
};
</script>