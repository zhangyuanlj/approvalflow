<template>
  <div>
    <div class="inner">
      <Form ref="form" :model="basicSetting" label-position="top">
        <FormItem :class="setApprovalNameClass()" :required="true">
          <span slot="label" class="label">
            审批名称
            <strong>最多50字</strong>
          </span>
          <Input v-model="basicSetting.approvalName" placeholder="请输入" @on-change="onChange"></Input>
        </FormItem>
        <FormItem :class="setApprovalGroupClass()" :required="true">
          <span slot="label" class="label">选择分组</span>
          <Dropdown trigger="click" placement="bottom-start" @on-click="onClickItem">
            <Input
              v-model="basicSetting.approvalGroup.name"
              placeholder="请选择"
              :style="setApprovalGroupStyle"
              @on-change="onChange"
            ></Input>
            <DropdownMenu slot="list" style="width:230px;">
              <DropdownItem
                v-for="(item, i) in approvalGroupItems"
                :key="i"
                :name="item.id"
              >{{item.name}}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </FormItem>
        <FormItem>
          <span slot="label" class="label">谁可以发起这个审批</span>
          <Input
            v-model="basicSetting.approvalUser.text"
            placeholder="请选择"
            @on-focus="onFocus('approvalUser')"
          ></Input>
        </FormItem>
        <FormItem>
          <span slot="label" class="label">
            谁可以管理这个模板并导出数据
            <strong>只有模板管理员可以编辑这个审批单和导出数据</strong>
          </span>
          <Input
            v-model="basicSetting.templateManageUser.text"
            placeholder="请选择"
            @on-focus="onFocus('templateManageUser')"
          ></Input>
        </FormItem>
        <FormItem>
          <span slot="label" class="label">模板图标</span>
          <div class="template-icon">
            <div v-if="basicSetting.templateIcon!==''" class="icon" :style="setIconStyle"></div>
            <Button @click="onSelectIcon">选择图标</Button>
          </div>
        </FormItem>
        <FormItem>
          <span slot="label" class="label">
            审批说明
            <strong>最多100字</strong>
          </span>
          <Input v-model="basicSetting.approvalStatement" placeholder="请输入"></Input>
        </FormItem>
      </Form>
    </div>
    <ContactsModal
      ref="contactsModal"
      :modalTitle="modalTitle"
      :fieldData="fieldData"
      @on-contacts-model-confirm="onContactsModelConfirm"
    ></ContactsModal>
    <Modal
      v-model="modalVisible"
      class-name="df-setting_icons-modal"
      title="选择模板图标"
      :fullscreen="isMobile()"
      @on-ok="onConfirm"
    >
      <div class="icons-modal-container clear-fl">
        <a
          href="javascript:void(0);"
          v-for="(item, i) in icons"
          :key="i"
          :class="setIconClass(i)"
          @click="onSelected(i)"
        >
          <img :src="item" />
          <Icon type="ios-checkmark-circle-outline" />
        </a>
      </div>
    </Modal>
  </div>
</template>

<script>
import config from "@/config";
import { GET_ERROR_LIST, UPDATE_ERROR_LIST } from "store/modules/common/type";
import {
  GET_BASIC_SETTING,
  UPDATE_BASIC_SETTING
} from "store/modules/basicSetting/type";
import { mapGetters, mapMutations } from "vuex";
import { ContactsModal } from "components/Common/AddressBook";
import icons from "./scripts/icons";
import classNames from "classnames";
import Http from "utils/http";
import { isMobile } from "@/utils/helper";
const APPROVAL_NAME_KEY = "approvalName";
const APPROVALGROUP_NAME_KEY = "approvalGroupName";
export default {
  name: "BasicSettingContent",
  components: {
    ContactsModal
  },
  data() {
    return {
      approvalGroupItems: [],
      rules: {
        approvalName: [
          {
            required: true,
            message: `审批名称不能为空`,
            trigger: "change"
          },
          {
            type: "string",
            max: 50,
            message: `最多输入50个字符`,
            trigger: "change"
          }
        ],
        "approvalGroup.name": [
          {
            required: true,
            message: `分组不能为空`,
            trigger: "change"
          }
        ]
      },
      modalTitle: "",
      fieldName: "",
      fieldData: {
        value: []
      },
      icons: icons,
      selectedIconIndex: 0,
      modalVisible: false,
      isMobile: isMobile
    };
  },
  computed: {
    setIconStyle() {
      return {
        "background-image": `url(${this.basicSetting.templateIcon})`
      };
    },
    setApprovalGroupStyle() {
      if (isMobile()) {
        return {
          width: "100%"
        };
      }
      return {
        width: "540px"
      };
    },
    ...mapGetters({
      basicSetting: GET_BASIC_SETTING,
      getErrorList: GET_ERROR_LIST
    })
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.$form = this.$refs.form;
  },
  methods: {
    init() {
      this.$form = this.$refs.form;
      this.$contactsModal = this.$refs.contactsModal;
      this.getApprovalGroup().then(items => {
        this.approvalGroupItems = items;
      });
    },
    //获得审批分组
    getApprovalGroup() {
      return new Promise(resolve => {
        Http.get({
          url: config.apiUrl.ApprovalGroup,
          succeed: (res, data) => {
            const items = [];
            data.forEach(item => {
              items.push({
                id: item.approvalGroupId,
                name: item.groupName
              });
            });
            resolve(items);
          }
        });
      });
    },
    setApprovalNameClass() {
      return classNames({
        ["ivu-form-item-error"]: this.getErrorList[APPROVAL_NAME_KEY]
      });
    },
    setApprovalGroupClass() {
      return classNames({
        ["ivu-form-item-error"]: this.getErrorList[APPROVALGROUP_NAME_KEY]
      });
    },
    setIconClass(i) {
      return classNames({
        ["selected"]: this.selectedIconIndex === i
      });
    },
    setSelectedIconIndex() {
      const index = this.icons.indexOf(this.basicSetting.templateIcon);
      return index;
    },
    ...mapMutations({
      updateBasicSetting: UPDATE_BASIC_SETTING,
      updateErrorList: UPDATE_ERROR_LIST
    }),
    onChange() {
      const { approvalName, approvalGroup } = this.basicSetting;
      const errorList = this.getErrorList;
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
      this.updateErrorList(errorList);
    },
    onClickItem(id) {
      const searchItem = this.approvalGroupItems.find(item => {
        return item.id === id;
      });
      const approvalGroup = {
        id: id,
        name: searchItem.name
      };
      this.updateBasicSetting({
        approvalGroup: approvalGroup
      });
      this.$nextTick(() => {
        this.onChange();
      });
    },
    onFocus(fieldName) {
      this.fieldName = fieldName;
      this.fieldData.value = this.basicSetting[fieldName].value;
      if (fieldName === "approvalUser") {
        this.modalTitle = "选择发起审批人";
      } else {
        this.modalTitle = "选择模板管理员";
      }
      this.$contactsModal.show();
    },
    onContactsModelConfirm(data) {
      this.updateBasicSetting({
        [this.fieldName]: {
          text: this.$contactsModal.setValue(data),
          value: data
        }
      });
    },
    onSelectIcon() {
      this.modalVisible = true;
      this.selectedIconIndex = this.setSelectedIconIndex();
    },
    onSelected(i) {
      this.selectedIconIndex = i;
    },
    onConfirm() {
      this.updateBasicSetting({
        templateIcon: this.icons[this.selectedIconIndex]
      });
    }
  }
};
</script>
