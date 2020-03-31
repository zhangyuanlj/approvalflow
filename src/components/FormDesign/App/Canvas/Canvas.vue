<template>
  <div class="df-design-canvas">
    <div
      v-if="basicSetting.templateIcon && basicSetting.approvalName"
      class="df-group df-form-info"
    >
      <img :src="basicSetting.templateIcon" />
      <span>{{basicSetting.approvalName}}</span>
    </div>
    <div class="df-group">
      <div class="df-group-title">字段设置</div>
      <div class="df-group-content">
        <SlickList
          v-model="items"
          :useDragHandle="true"
          :useWindowAsScrollContainer="true"
          axis="y"
          lockAxis="y"
          @sort-end="onSortEnd"
          @input="onInput"
        >
          <SlickItem v-for="(item, i) in fieldLists" class="df-design-item" :index="i" :key="i">
            <div class="item-inner">
              <div class="item-remove" @click="onRemove(i)">
                <Icon type="md-remove-circle" />
              </div>
              <div class="item-title">
                <span class="ellipsis">{{item.attribute.title}}</span>
              </div>
              <div v-if="setTypeText(item) !== ''" class="item-type" @click="onEditAttribute(item)">
                <span>{{setTypeText(item)}}</span>
                <Icon type="ios-arrow-forward" />
              </div>
              <div class="item-sort" v-handle>
                <Icon type="md-menu" />
              </div>
            </div>
            <template v-if="item.attribute.children">
              <SlickList
                v-model="item.attribute.children"
                :useDragHandle="true"
                axis="y"
                lockAxis="y"
                @sort-end="onSortEnd"
                @input="onInput"
              >
                <SlickItem
                  v-for="(children, j) in item.attribute.children"
                  class="df-design-item"
                  :index="j"
                  :key="j"
                >
                  <div class="item-inner">
                    <div class="item-children-icon">
                      <Icon type="md-return-right" />
                    </div>
                    <div class="item-remove" @click="onRemove(i, j)">
                      <Icon type="md-remove-circle" />
                    </div>
                    <div class="item-title">
                      <span class="ellipsis">{{children.attribute.title}}</span>
                    </div>
                    <div
                      v-if="isShow(item) && setTypeText(children) !== ''"
                      class="item-type"
                      @click="onEditAttribute(children)"
                    >
                      <span>{{setTypeText(children)}}</span>
                      <Icon type="ios-arrow-forward" />
                    </div>
                    <div v-if="isShow(item)" v-handle class="item-sort" :data-parentIndex="i">
                      <Icon type="md-menu" :data-parentIndex="i" />
                    </div>
                  </div>
                </SlickItem>
              </SlickList>
              <div v-if="isShow(item)" class="df-design-item" @click="showModal(i)">
                <div class="item-inner">
                  <div class="item-children-icon">
                    <Icon type="md-return-right" />
                  </div>
                  <div class="item-add">
                    <Icon type="ios-add-circle" />
                  </div>
                  <div class="item-title">
                    <span class="ellipsis">添加明细字段</span>
                  </div>
                </div>
              </div>
            </template>
          </SlickItem>
        </SlickList>
        <div class="df-design-item" @click="showModal()">
          <div class="item-inner">
            <div class="item-add">
              <Icon type="ios-add-circle" />
            </div>
            <div class="item-title">
              <span class="ellipsis">添加字段</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="nav-btn nav-first-btn">
      <Button long @click="onRedirect('basicSetting/')">基础设置</Button>
    </div>
    <div class="nav-btn">
      <Button long @click="onRedirect('processDesign/')">流程设置</Button>
    </div>
    <div class="nav-btn">
      <Button long @click="onRedirect('advancedSetting/')">高级设置</Button>
    </div>
    <div :class="setItemClass">
      <div class="mask" @click="hideModal"></div>
      <div class="model-pannel">
        <div class="model-pannel-title" @click="hideModal">
          <Icon type="ios-arrow-down" />
          {{modalTitle}}
        </div>
        <div class="model-pannel-content">
          <div
            v-for="(item ,i) in componentsModel"
            :key="i"
            class="df-field-item"
            @click="onAdd(item)"
          >
            <div class="icon">
              <img :src="item.icon" />
            </div>
            <div class="name">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <Button type="primary" @click="onPreview">预览</Button>
      <Button @click="onPublich">发布</Button>
    </div>
    <Attribute ref="attributeModal"></Attribute>
    <Preview ref="previewModal"></Preview>
    <ErrorModal ref="errorModal"></ErrorModal>
  </div>
</template>

<script>
import config from "@/config";
import {
  GET_ERROR_LIST,
  GET_GENERA,
  UPDATE_ERROR_LIST
} from "store/modules/common/type";
import { GET_BASIC_SETTING } from "store/modules/basicSetting/type";
import { GET_ADVANCED_SETTING } from "store/modules/advancedSetting/type";
import {
  GET_FIELD_LISTS,
  UPDATE_DESIGN_FIELD,
  UPDATE_FIELD_LISTS,
  UPDATE_PREVIEW_DATA
} from "store/modules/formDesign/type";
import { GET_NODES_DATA, UPDATE_NODES_DATA } from "store/modules/workflow/type";
import { mapGetters, mapMutations } from "vuex";
import $ from "jquery";
import Attribute from "../Factory/Attribute.vue";
import Preview from "./Preview.vue";
import ErrorModal from "components/MainView/ErrorModal.vue";
import { SlickList, SlickItem, HandleDirective } from "vue-slicksort";
import classNames from "classnames";
import { setViewPortNoScroll, resetViewPortScroll } from "utils/helper";
import model from "../Factory/model";
import {
  eachNodes as eachWorkflowNodes,
  setApprover,
  setConditionContent
} from "components/Common/Workflow/scripts/utils";
import Http from "utils/http";
import { redirect } from "utils/helper";
import "./Canvas.less";
const APPROVAL_NAME_KEY = "approvalName";
const APPROVALGROUP_NAME_KEY = "approvalGroupName";
const FORM_DESIGN_KEY = "formDesign";
export default {
  name: "CanvasDesign",
  components: {
    Attribute,
    Preview,
    ErrorModal,
    SlickList,
    SlickItem
  },
  data() {
    return {
      items: [],
      componentsModel: model,
      modalVisible: false,
      modalTitle: "添加字段",
      parentIndex: 0,
      index: 0
    };
  },
  directives: {
    handle: HandleDirective
  },
  computed: {
    ...mapGetters({
      fieldLists: GET_FIELD_LISTS,
      errorList: GET_ERROR_LIST,
      genera: GET_GENERA,
      basicSetting: GET_BASIC_SETTING,
      advancedSetting: GET_ADVANCED_SETTING,
      processData: GET_NODES_DATA
    }),
    setItemClass() {
      const baseClass = "df-add-field-model";
      return classNames({
        [baseClass]: true,
        [`${baseClass}_show`]: this.modalVisible
      });
    }
  },
  watch: {
    fieldLists: {
      handler(val) {
        this.items = val;
      }
    }
  },
  methods: {
    ...mapMutations({
      updateDesignField: UPDATE_DESIGN_FIELD,
      setItems: UPDATE_FIELD_LISTS,
      updatePreviewData: UPDATE_PREVIEW_DATA,
      updateProcessData: UPDATE_NODES_DATA,
      updateErrorList: UPDATE_ERROR_LIST
    }),
    isHasChildren(item) {
      return item.component === "Detail" || item.attribute.isWidget;
    },
    setTypeText(item) {
      const typeText = {
        Input: "文本输入",
        MultipleInput: "多行输入框",
        NumberInput: "数字输入",
        DateTime: "日期",
        ExplainText: "说明文字",
        Image: "图片",
        Attachment: "附件",
        Amount: "金额",
        Detail: "明细",
        Location: "当前位置",
        Departments: "部门"
      };
      return typeText[item.component] ? typeText[item.component] : "";
    },
    setFieldKey(component) {
      const time = new Date().getTime();
      const key = `${component}-${time}`;
      return key;
    },
    setItem(item) {
      const arrValueReg = /Checkbox|DateTimeRange|Attachment|Image|Contacts|Departments/;
      const component = item.component;
      const key = this.setFieldKey(component);
      let value = "";
      if (arrValueReg.test(component) || item.isWidget) {
        value = [];
      } else {
        value = "";
      }
      return {
        name: item.name,
        component: component,
        key: key,
        value: value,
        attribute: {
          ...item.attribute
        }
      };
    },
    setError() {
      const { approvalName, approvalGroup } = this.basicSetting;
      const processData = this.processData;
      const errorList = {};
      if (!approvalName || approvalName.length > 50) {
        const message =
          approvalName.length > 50
            ? "审批名称只能输入50个字符"
            : "请输入审批名称";
        errorList[APPROVAL_NAME_KEY] = {
          nodeText: "审批名称",
          message: message
        };
        errorList[APPROVAL_NAME_KEY].group = "basicSetting";
      } else {
        errorList[APPROVAL_NAME_KEY] && delete errorList[APPROVAL_NAME_KEY];
      }
      if (!approvalGroup.name) {
        const message = "请选择分组";
        errorList[APPROVALGROUP_NAME_KEY] = {
          nodeText: "选择分组",
          message: message
        };
        errorList[APPROVALGROUP_NAME_KEY].group = "basicSetting";
      } else {
        errorList[APPROVALGROUP_NAME_KEY] &&
          delete errorList[APPROVALGROUP_NAME_KEY];
      }
      if (!this.fieldLists.length) {
        const message = "空审批不允许保存";
        errorList[FORM_DESIGN_KEY] = {
          nodeText: "表单设计",
          message: message
        };
        errorList[FORM_DESIGN_KEY].group = FORM_DESIGN_KEY;
      } else {
        errorList[FORM_DESIGN_KEY] && delete errorList[FORM_DESIGN_KEY];
      }
      eachWorkflowNodes(
        processData,
        0,
        (item, searchId, children, levelData) => {
          const approverText = "请选择审批人";
          const conditionText = "请设置条件";
          const nodeType = item.nodeType;
          const key = item.key;
          const createErr = () => {
            item.error = true;
            errorList[key] = $.extend(true, {}, item);
            errorList[key].group = "process";
            errorList[key].message =
              nodeType === "approver" ? approverText : conditionText;
          };
          const clearErr = () => {
            item.error = false;
            errorList[key] && delete errorList[key];
          };
          if (nodeType === "approver") {
            if (setApprover(item) === approverText) {
              createErr();
            } else {
              clearErr();
            }
          }
          if (nodeType === "conditionItem") {
            if (setConditionContent(item) === conditionText) {
              if (levelData.i !== levelData.len - 1) {
                createErr();
              }
            } else {
              clearErr();
            }
          }
          return false;
        }
      );
      this.updateErrorList(errorList);
      this.updateProcessData(processData);
    },
    createSaveData() {
      const items = [];
      const fieldLists = this.fieldLists;
      fieldLists.forEach(item => {
        const component = item.component;
        const key = this.setFieldKey(component);
        item.key = key;
        if (this.isHasChildren(item)) {
          const detailChildren = [];
          item.attribute.children.forEach(children => {
            detailChildren.push(this.setItem(children));
          });
          item.attribute.children = detailChildren;
          items.push(this.setItem(item));
        } else {
          items.push(this.setItem(item));
        }
      });
      return items;
    },
    getId() {
      return this.$Route.getParam("id");
    },
    isShow(item) {
      return !item.attribute.isWidget;
    },
    hideModal() {
      this.modalVisible = false;
      resetViewPortScroll();
    },
    showModal(index) {
      this.modalVisible = true;
      this.index = index;
      if (this.index !== undefined) {
        this.modalTitle = "添加明细字段";
      } else {
        this.modalTitle = "添加字段";
      }
      setViewPortNoScroll();
    },
    redirectFormResult(id) {
      let href = "form/";
      if (id) {
        href += `?id=${id}`;
      }
      redirect(href);
    },
    onRemove(i, j) {
      const errMsg = "该组件已被设为审批条件，不可删除!";
      const items = this.fieldLists;
      if (j !== undefined) {
        const field = items[i].attribute.children[j];
        if (field.attribute.props.isConditionField) {
          this.$Message.error({
            content: errMsg
          });
          return;
        }
        items[i].attribute.children.splice(j, 1);
      } else {
        if (items[i].attribute.props.isConditionField) {
          this.$Message.error({
            content: errMsg
          });
          return;
        }
        items.splice(i, 1);
      }
      this.setItems(items);
    },
    onAdd(item) {
      const items = this.fieldLists;
      const temp = $.extend(true, {}, item);
      temp.key = `${temp.component}-${new Date().getTime()}`;
      //添加到明细字段
      if (this.index !== undefined) {
        if (item.component === "Detail") {
          this.$Message.error({
            content: "不能将明细字段添加明细中!"
          });
          return;
        }
        items[this.index].attribute.children.push(temp);
      } else {
        items.push(temp);
      }
      this.hideModal();
      this.setItems(items);
    },
    onSortEnd(e) {
      const $target = $(e.event.target);
      if ($target.attr("data-parentIndex")) {
        this.parentIndex = parseInt($target.attr("data-parentIndex"));
      } else {
        this.parentIndex = parseInt(
          $target.parent(".item-sort").attr("data-parentIndex")
        );
      }
      this.parentIndex = isNaN(this.parentIndex) ? undefined : this.parentIndex;
    },
    onInput(newList) {
      if (this.parentIndex !== undefined) {
        const items = this.fieldLists;
        items[this.parentIndex].attribute.children = newList;
        this.setItems(items);
      } else {
        this.setItems(newList);
      }
    },
    onEditAttribute(item) {
      this.updateDesignField({
        key: item.key
      });
      this.$refs.attributeModal.show();
    },
    onRedirect(url) {
      redirect(url);
    },
    //预览
    onPreview() {
      const items = this.createSaveData();
      this.updatePreviewData(items);
      this.setError();
      this.$nextTick(() => {
        const errList = Object.values(this.errorList);
        if (errList.length) {
          this.$refs.errorModal.show();
        } else {
          this.$refs.previewModal.show();
        }
      });
    },
    //发布
    onPublich() {
      this.setError();
      this.$nextTick(() => {
        const errList = Object.values(this.errorList);
        if (errList.length) {
          this.$refs.errorModal.show();
        } else {
          const id = this.getId();
          const basicSetting = this.basicSetting;
          const formDesign = this.createSaveData();
          const processDesign = this.processData;
          const advancedSetting = this.advancedSetting;
          const approval = {
            basicSetting,
            formDesign,
            processDesign,
            advancedSetting
          };
          if (id) {
            approval["genera"] = this.genera;
            Http.post({
              url: config.apiUrl.UpdateApproval,
              data: {
                ...approval
              },
              succeed: (res, data, body) => {
                this.$Message.success({
                  content: body.msg
                });
                this.redirectFormResult(data);
              }
            });
          } else {
            Http.post({
              url: config.apiUrl.CreateApproval,
              data: approval,
              succeed: (res, data, body) => {
                this.$Message.success({
                  content: body.msg
                });
                this.redirectFormResult(data);
              }
            });
          }
        }
      });
    }
  }
};
</script>