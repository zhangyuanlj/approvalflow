<template>
  <div class="app-container">
    <div class="app-head">
      <div class="goback" @click="goback">
        <Icon type="md-arrow-back" :size="20" />
        <span class="ellipsis">{{getId() !== null ? approvalName : "返回"}}</span>
      </div>
      <ul class="step">
        <li class="step-focus" :style="stepFocusPosition"></li>
        <li :class="setItemClass(0)" @click="clickStepItem(0, 'basicSetting')">
          <span class="step-num">1</span>基础设置
        </li>
        <li :class="setItemClass(1)" @click="clickStepItem(1, 'webFormDesign')">
          <span class="step-num">2</span>表单设计
        </li>
        <li :class="setItemClass(2)" @click="clickStepItem(2, 'processDesign')">
          <span class="step-num">3</span>流程设计
        </li>
        <li :class="setItemClass(3)" @click="clickStepItem(3, 'advancedSetting')">
          <span class="step-num">4</span>高级设置
        </li>
      </ul>
      <div class="buttons">
        <button class="preview-btn" @click="preview">预 览</button>
        <button class="publich-bth" @click="publich">发 布</button>
      </div>
    </div>
    <div class="app-content">
      <router-view></router-view>
    </div>
    <div class="df-dragging-proxy"></div>
    <ErrorModal ref="errorModal"></ErrorModal>
    <PreviewMoal ref="previewMoal"></PreviewMoal>
  </div>
</template>

<script>
import config from "@/config";
import $ from "jquery";
import { GET_ERROR_LIST, UPDATE_ERROR_LIST } from "store/modules/common/type";
import {
  GET_FIELD_LISTS,
  UPDATE_FIELD_LISTS,
  UPDATE_PREVIEW_DATA,
  UPDATE_HAS_WIDGET
} from "store/modules/formDesign/type";
import {
  GET_BASIC_SETTING,
  UPDATE_BASIC_SETTING
} from "store/modules/basicSetting/type";
import {
  GET_ADVANCED_SETTING,
  UPDATE_ADVANCED_SETTING
} from "store/modules/advancedSetting/type";
import {
  GET_NODES_DATA,
  GET_PERSON_LIST,
  UPDATE_NODES_DATA,
  UPDATE_PERSON_LIST
} from "store/modules/workflow/type";
import { mapGetters, mapMutations } from "vuex";
import ErrorModal from "./ErrorModal.vue";
import PreviewMoal from "./PreviewMoal.vue";
import classNames from "classnames";
import processDesignData from "components/Common/Workflow/scripts/nodesData";
import { hashChangeMixin } from "mixins";
import { redirect } from "utils/helper";
import {
  eachNodes as eachWorkflowNodes,
  setApprover,
  setConditionContent
} from "components/Common/Workflow/scripts/utils";
import Http from "utils/http";
import "view-design/dist/styles/iview.css";
import "./styles/MainView.less";
const APPROVAL_NAME_KEY = "approvalName";
const APPROVALGROUP_NAME_KEY = "approvalGroupName";
const FORM_DESIGN_KEY = "formDesign";
export default {
  name: "MainView",
  components: {
    ErrorModal,
    PreviewMoal
  },
  mixins: [hashChangeMixin],
  data() {
    return {
      itemActiveIndex: 0,
      approvalName: "",
      fieldLists: []
    };
  },
  computed: {
    stepFocusPosition() {
      const x = this.itemActiveIndex * 150;
      return {
        transform: `translateX(${x}px)`
      };
    }
  },
  created() {
    this.bindHash();
  },
  mounted() {
    this.genera = null;
    this.init();
  },
  updated() {
    this.$refs.previewMoal.hide();
    this.activedItem();
  },
  beforeDestroy() {
    this.unBindHash();
  },
  methods: {
    init() {
      this.activedItem();
      this.getData();
    },
    getData() {
      const id = this.getId();
      //是否包含套件
      const hasWidget = formDesign => {
        let len = formDesign.length;
        for (let i = 0; i < len; i++) {
          const item = formDesign[i];
          if (item.attribute.isWidget) {
            return true;
          }
        }
        return false;
      };
      const updateData = data => {
        const genera = data.genera;
        const basicSetting = data.basicSetting;
        const formDesign = data.formDesign;
        const personList = {
          FreeFlow: data.freeFlow,
          Contacts: data.contacts
        };
        const processDesign = data.processDesign;
        const advancedSetting = data.advancedSetting;
        this.approvalName = basicSetting.approvalName;
        this.genera = genera;
        this.updateBasicSetting(basicSetting);
        this.updateFieldLists(formDesign);
        this.updatePersonList(personList);
        this.updateProcessData(processDesign);
        this.updateAdvancedSetting(advancedSetting);
        if (hasWidget(formDesign)) {
          this.updateHasWidget(true);
        }
      };
      if (id) {
        const requestUrl = `${config.apiUrl.Approval}?approvalFormTemplateId=${id}`;
        Http.get({
          url: requestUrl,
          succeed: (res, data) => {
            updateData(data);
          },
          errorCbs: () => {
            this.updateProcessData(processDesignData);
          }
        });
      } else {
        this.updateProcessData(processDesignData);
      }
    },
    getId() {
      return this.$Route.getParam("id");
    },
    ...mapGetters({
      getFieldLists: GET_FIELD_LISTS,
      getBasicSetting: GET_BASIC_SETTING,
      getNodesData: GET_NODES_DATA,
      getPersonList: GET_PERSON_LIST,
      getAdvancedSetting: GET_ADVANCED_SETTING,
      getErrorList: GET_ERROR_LIST
    }),
    ...mapMutations({
      updatePreviewData: UPDATE_PREVIEW_DATA,
      updateBasicSetting: UPDATE_BASIC_SETTING,
      updateFieldLists: UPDATE_FIELD_LISTS,
      updateHasWidget: UPDATE_HAS_WIDGET,
      updateProcessData: UPDATE_NODES_DATA,
      updatePersonList: UPDATE_PERSON_LIST,
      updateAdvancedSetting: UPDATE_ADVANCED_SETTING,
      updateErrorList: UPDATE_ERROR_LIST
    }),
    setItemClass(i) {
      const baseClass = "step-item";
      return classNames({
        [baseClass]: true,
        [`${baseClass}_active`]: this.itemActiveIndex === i
      });
    },
    setError() {
      const { approvalName, approvalGroup } = this.getBasicSetting();
      const processData = this.getNodesData();
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
      if (!this.getFieldLists().length) {
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
    goback() {
      const fromUrl = this.$Route.getParam("fromUrl");
      const href = fromUrl ? fromUrl : config.homeUrl;
      window.location.href = href;
    },
    activedItem() {
      const href = window.location.href;
      if (href.indexOf("basicSetting") !== -1) {
        this.itemActiveIndex = 0;
      } else if (href.indexOf("webFormDesign") !== -1) {
        this.itemActiveIndex = 1;
      } else if (href.indexOf("processDesign") !== -1) {
        this.itemActiveIndex = 2;
      } else if (href.indexOf("advancedSetting") !== -1) {
        this.itemActiveIndex = 3;
      }
    },
    clickStepItem(i, url) {
      let href = `${url}/`;
      this.itemActiveIndex = i;
      redirect(href);
    },
    isHasChildren(item) {
      return item.component === "Detail" || item.attribute.isWidget;
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
    //创建保存数据
    createSaveData() {
      const items = [];
      const fieldLists = this.getFieldLists();
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
    redirectFormResult(id) {
      let href = "form/";
      if (id) {
        href += `?id=${id}`;
      }
      redirect(href);
    },
    //预览
    preview() {
      this.fieldLists = this.createSaveData();
      this.updatePreviewData(this.fieldLists);
      this.setError();
      this.$nextTick(() => {
        const errList = Object.values(this.getErrorList());
        if (errList.length) {
          this.$refs.errorModal.show();
        } else {
          this.$refs.previewMoal.show();
        }
      });
    },
    //发布
    publich() {
      this.fieldLists = this.createSaveData();
      this.updateFieldLists(this.fieldLists);
      this.setError();
      this.$nextTick(() => {
        const errList = Object.values(this.getErrorList());
        if (errList.length) {
          this.$refs.errorModal.show();
        } else {
          const id = this.getId();
          const basicSetting = this.getBasicSetting();
          const formDesign = this.fieldLists;
          const processDesign = this.getNodesData();
          const advancedSetting = this.getAdvancedSetting();
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
