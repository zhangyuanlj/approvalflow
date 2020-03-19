<template>
  <div class="attribute-content">
    <Form :model="attribute" :rules="rules">
      <FormItem prop="startDateTitle">
        <div class="df-attribute-item">
          <div class="item-title">
            <strong>标题1</strong>
            <span>最多{{nameMaxLen}}字</span>
          </div>
          <div class="item-content">
            <Input v-model="attribute.startDateTitle" />
          </div>
        </div>
      </FormItem>
      <FormItem prop="endDateTitle">
        <div class="df-attribute-item">
          <div class="item-title">
            <strong>标题2</strong>
            <span>最多{{nameMaxLen}}字</span>
          </div>
          <div class="item-content">
            <Input v-model="attribute.endDateTitle" />
          </div>
        </div>
      </FormItem>
      <FormItem prop="type">
        <div class="df-attribute-item">
          <div class="item-title">
            <strong>日期类型</strong>
          </div>
          <div class="item-content">
            <RadioGroup v-model="attribute.props.type" vertical>
              <Radio label="datetime">
                <span>年-月-日 时:分</span>
              </Radio>
              <Radio label="date">
                <span>年-月-日</span>
              </Radio>
            </RadioGroup>
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
          <div class="item-title">验证</div>
          <div class="item-content">
            <Checkbox v-model="attribute.validation.required" @on-change="onChange">必填</Checkbox>
          </div>
        </div>
      </FormItem>
      <FormItem>
        <div class="df-attribute-item">
          <div class="item-title">自动计算时长</div>
          <div class="item-content">
            <Checkbox v-model="attribute.automatic">开启</Checkbox>
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
  Radio
} from "view-design";
import { UPDATE_VALIDATION } from "store/modules/formDesign/type";
import { mapMutations } from "vuex";
import model from "./model";
const NAME_MAX_LEN = 20;
const NAME_PLACEHOLDER_LEN = 50;
const RULES = [
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
];
export default {
  name: "DateTimeRangeAttribute",
  components: {
    Form,
    FormItem,
    Input,
    Checkbox,
    RadioGroup,
    Radio
  },
  data() {
    return {
      nameMaxLen: NAME_MAX_LEN,
      namePlaceholderLen: NAME_PLACEHOLDER_LEN,
      rules: {
        startDateTitle: RULES,
        endDateTitle: RULES,
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
    }),
    onChange(required) {
      let rules = [];
      if (required) {
        rules = [
          {
            required: true,
            message: `请选择起始时间`,
            trigger: "change"
          }
        ];
      }
      this.updateValidation({
        name: this.attribute.name,
        rules: rules
      });
    }
  }
};
</script>
