<template>
  <div>
    <Form ref="renderForm" :model="fieldLists" label-position="top">
      <div v-for="(item, i) in fieldLists.items" :key="i">
        <template v-if="isDetail(item.component)">
          <Card class="df-render-detail" :dis-hover="true" :data-name="item.name">
            <div slot="title">{{item.attribute.title}}</div>
            <a
              v-show="item.isDelete"
              slot="extra"
              href="javascript:void(0);"
              class="delete-btn"
              @click.stop="onDelete(i)"
            >
              <Icon type="md-trash" :size="14" />
              <span>删除</span>
            </a>
            <FormItem
              v-for="(children, j) in item.attribute.children"
              :key="j"
              :prop="setDetailProp(i,j)"
              :label="setLabel(children)"
              :rules="setRules(children)"
            >
              <component
                :is="components[children.component]"
                :fieldData="children"
                :parentIndex="i"
                :index="j"
                @on-value-change="onValueChange"
              ></component>
            </FormItem>
            <Button long @click="addDetail(i)">
              <Icon type="md-add" />
              {{item.attribute.actionName}}
            </Button>
          </Card>
        </template>
        <template v-else>
          <template v-if="item.attribute.isWidget">
            <FormItem
              v-for="(children, j) in item.attribute.children"
              :key="j"
              :prop="setDetailProp(i,j)"
              :label="setLabel(children)"
              :rules="setRules(children)"
            >
              <component
                :is="components[children.component]"
                :fieldData="children"
                :parentIndex="i"
                :index="j"
                @on-value-change="onValueChange"
              ></component>
            </FormItem>
          </template>
          <FormItem
            v-else
            :prop="'items.'+i+'.value'"
            :label="setLabel(item)"
            :rules="setRules(item)"
          >
            <component
              :is="components[item.component]"
              :fieldData="item"
              :index="i"
              @on-value-change="onValueChange"
            ></component>
          </FormItem>
        </template>
      </div>
    </Form>
    <PersonList></PersonList>
  </div>
</template>

<script>
import { Form, FormItem, Message } from "view-design";
import components from "./scripts/components";
import PersonList from "./PersonList.vue";
import validator from "./scripts/validator";
export default {
  name: "FormPreview",
  components: {
    Form,
    FormItem,
    Message,
    PersonList
  },
  data() {
    return {
      fieldLists: {
        items: []
      },
      components: components
    };
  },
  props: {
    formData: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  watch: {
    formData: {
      handler(val) {
        this.fieldLists.items = val;
      },
      deep: true
    }
  },
  mounted() {
    this.fieldLists.items = this.formData;
  },
  methods: {
    isDetail(component) {
      const detailReg = /Detail|BusinessTravel/;
      return detailReg.test(component);
    },
    setDetailProp(i, j) {
      return `items.${i}.attribute.children.${j}.value`;
    },
    setLabel(item) {
      const noLabelReg = /DateTimeRange|ExplainText|Detail|Leave|BusinessTravel/;
      if (noLabelReg.test(item.component)) {
        return "";
      }
      return item.attribute.title;
    },
    setRules(item) {
      const component = item.component;
      if (validator[component]) {
        return validator[component](item);
      }
      return validator.defaultValidator(item);
    },
    //设置items分组
    setItemsGroup(name) {
      const items = this.fieldLists.items.filter(item => {
        return item.name === name;
      });
      const len = items.length;
      items.forEach((item, i) => {
        const title = item.attribute.title.replace(/\d{1,}/g, "");
        if (len > 1) {
          item.isDelete = true;
          item.attribute.title = title + (i + 1);
        } else {
          item.isDelete = false;
          item.attribute.title = title;
        }
      });
    },
    submit() {
      this.$refs.renderForm.validate(valid => {
        if (valid) {
          Message.success("Success!");
        } else {
          Message.error("Fail!");
        }
      });
    },
    reset() {
      this.$refs.renderForm.resetFields();
    },
    //拷贝卡片中的字段
    copyDetailField(i) {
      const item = JSON.parse(JSON.stringify(this.fieldLists.items[i]));
      item.value = "";
      item.attribute.children.forEach(children => {
        const specialValueReg = /Checkbox|DateTimeRange|Attachment|Image|Contacts|Departments/;
        let value = "";
        if (specialValueReg.test(children.component)) {
          value = [];
        } else {
          value = "";
        }
        children.value = value;
      });
      return item;
    },
    //添加一个item
    addDetail(i) {
      const items = this.fieldLists.items;
      const name = items[i].attribute.name;
      const len = items.length;
      const start = items.slice(0, i + 1);
      const middle = [this.copyDetailField(i)];
      const end = items.slice(i + 1, len);
      this.fieldLists.items = start.concat(middle, end);
      this.setItemsGroup(name);
    },
    onValueChange(data, i, parentIndex) {
      if (parentIndex === undefined) {
        this.fieldLists.items[i].value = data;
      } else {
        this.fieldLists.items[parentIndex].attribute.children[i].value = data;
      }
    },
    //删除一个item
    onDelete(i) {
      this.$Modal.confirm({
        width: 300,
        title: "确认对话框",
        content: "<p>确认要删除该项吗？</p>",
        onOk: () => {
          const name = this.fieldLists.items[i].attribute.name;
          this.fieldLists.items.splice(i, 1);
          this.setItemsGroup(name);
        }
      });
    }
  }
};
</script>

<style lang="less">
@padding: 12px;
.df-render-detail {
  margin-bottom: 15px;
  .ivu-card-body {
    padding: @padding;
  }
  .ivu-card-extra {
    top: 10px;
  }
  .ivu-form-item {
    margin-bottom: 15px;
    &-error-tip {
      position: relative;
    }
  }
  .delete-btn {
    font-size: 0;
    .ivu-icon {
      margin-right: 5px;
    }
    span {
      font-size: 12px;
    }
  }
}
</style>
