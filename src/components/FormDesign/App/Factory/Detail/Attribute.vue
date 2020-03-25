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
            <Input v-model="attribute.title" />
          </div>
        </div>
      </FormItem>
      <FormItem prop="title">
        <div class="df-attribute-item">
          <div class="item-title">
            <strong>动作标题</strong>
            <span>最多{{nameMaxLen}}字</span>
          </div>
          <div class="item-content">
            <Input v-model="attribute.actionName" />
          </div>
        </div>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { Form, FormItem, Input } from "view-design";
import model from "./model";
const NAME_MAX_LEN = 20;
export default {
  name: "InputAttribute",
  components: {
    Form,
    FormItem,
    Input
  },
  data() {
    return {
      nameMaxLen: NAME_MAX_LEN,
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
  }
};
</script>