<template>
  <div>
    <Form ref="renderForm" :model="fieldLists" label-position="top">
      <div v-for="(item, i) in fieldLists.items" :key="i">
        <template v-if="isDetail(item.component)">
          <Card class="df-render-detail" :dis-hover="true">
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
import config from "@/config";
import $ from "jquery";
import { GET_BASIC_SETTING } from "store/modules/basicSetting/type";
import { GET_ADVANCED_SETTING } from "store/modules/advancedSetting/type";
import { GET_NODES_DATA, GET_PERSON_LIST } from "store/modules/workflow/type";
import { mapGetters } from "vuex";
import { Form, FormItem, Message } from "view-design";
import components from "./scripts/components";
import PersonList from "./PersonList.vue";
import validator from "./scripts/validator";
import Http from "utils/http";
import { uuid } from "@/utils/helper";
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
    isPreview: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    genera: {
      type: Object,
      default: () => {
        return null;
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
  computed: {
    ...mapGetters({
      basicSetting: GET_BASIC_SETTING,
      nodesData: GET_NODES_DATA,
      personList: GET_PERSON_LIST,
      advancedSetting: GET_ADVANCED_SETTING
    })
  },
  mounted() {
    this.fieldLists.items = this.formData;
  },
  methods: {
    isDetail(component) {
      const detailReg = /Detail|BusinessTravel/;
      return detailReg.test(component);
    },
    getId() {
      return this.$Route.getParam("id");
    },
    setDetailProp(i, j) {
      return `items.${i}.attribute.children.${j}.value`;
    },
    setLabel(item) {
      const noLabelReg = /DateTimeRange|ExplainText|Detail|Leave|BusinessTravel/;
      if (item.noLabel || noLabelReg.test(item.component)) {
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
      const items = JSON.parse(JSON.stringify(this.fieldLists.items));
      const itemsGroup = items.filter(item => {
        return item.name === name;
      });
      const len = itemsGroup.length;
      itemsGroup.forEach((item, i) => {
        const key = `${item.component}-${uuid(8, 10)}`;
        const title = item.attribute.title.replace(/\d{1,}/g, "");
        if (len > 1) {
          item.isDelete = true;
          item.attribute.title = title + (i + 1);
          item.key = key;
        } else {
          item.isDelete = false;
          item.attribute.title = title;
        }
      });
      this.fieldLists.items = items;
    },
    //拷贝卡片中的字段
    copyDetailField(i) {
      const item = JSON.parse(JSON.stringify(this.fieldLists.items[i]));
      const key = `${item.component}-${uuid(8, 10)}`;
      item.key = key;
      item.value = item.value !== undefined ? item.value : "";
      item.attribute.children.forEach(children => {
        const specialValueReg = /Checkbox|DateTimeRange|Attachment|Image|Contacts|Departments/;
        let value = "";
        delete children.value;
        if (children.value !== undefined) {
          value = children.value;
        } else {
          if (specialValueReg.test(children.component)) {
            value = [];
          } else {
            value = "";
          }
        }
        children.parentKey = item.key;
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
    submit() {
      this.$refs.renderForm.validate(valid => {
        if (valid) {
          if (!this.isPreview) {
            const requestUrl = config.apiUrl.Submit;
            const requestData = {
              genera: this.genera,
              basicSetting: this.basicSetting,
              formDesign: this.fieldLists.items,
              processDesign: this.nodesData,
              advancedSetting: this.advancedSetting
            };
            Http.post({
              url: requestUrl,
              data: requestData,
              succeed: (res, data, body) => {
                this.$Message.success(body.msg);
              }
            });
          } else {
            Message.success("数据提交成功!");
          }
        } else {
          $(window).scrollTop(0);
          Message.error("表单中存在错误项,请重新输入后在进行提交!");
        }
      });
    },
    reset() {
      this.$refs.renderForm.resetFields();
    },
    onValueChange(data, i, parentIndex, key) {
      const updateKey = key ? key : "value";
      if (parentIndex === undefined) {
        this.fieldLists.items[i][updateKey] = data;
      } else {
        this.fieldLists.items[parentIndex].attribute.children[i][
          updateKey
        ] = data;
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
