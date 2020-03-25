<template>
  <div class="attribute-content">
    <Form :model="attribute" :rules="rules">
      <FormItem prop="text">
        <div class="df-attribute-item">
          <div class="item-title">
            <strong>说明文字</strong>
            <span>最多{{textMaxLen}}字</span>
          </div>
          <div class="item-content">
            <Input type="textarea" v-model="attribute.text" :rows="4" />
          </div>
        </div>
      </FormItem>
      <FormItem prop="jumpUrl">
        <div class="df-attribute-item">
          <div class="item-title">
            <strong>可以输入链接跳转地址</strong>
          </div>
          <div class="item-content">
            <Input type="textarea" v-model="attribute.jumpUrl" />
          </div>
        </div>
      </FormItem>
      <!-- <FormItem>
        <div class="df-attribute-item">
          <div class="item-title">显示</div>
          <div class="item-content">
            <Checkbox v-model="attribute.noDisplay">不在审批页显示</Checkbox>
          </div>
        </div>
      </FormItem>-->
    </Form>
  </div>
</template>

<script>
import { Form, FormItem, Input } from "view-design";
import model from "./model";
const TEXT_MAX_LEN = 5000;
export default {
  name: "ExplainTextAttribute",
  components: {
    Form,
    FormItem,
    Input
    // Checkbox
  },
  data() {
    return {
      textMaxLen: TEXT_MAX_LEN,
      rules: {
        text: [
          {
            type: "string",
            max: TEXT_MAX_LEN,
            message: `最多输入${TEXT_MAX_LEN}个字符`,
            trigger: "change"
          }
        ],
        jumpUrl: [
          {
            validator: (rule, value, callback) => {
              const reg = /((https|http|ftp|rtsp|igmp|file|rtspt|rtspu):\/\/)(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(\/[a-zA-Z0-9\&%_\./-~-]*)?/; // eslint-disable-line no-useless-escape
              if (value === "") {
                callback();
              } else {
                if (reg.test(value)) {
                  callback();
                } else {
                  callback(new Error("链接地址格式有误"));
                }
              }
            },
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
