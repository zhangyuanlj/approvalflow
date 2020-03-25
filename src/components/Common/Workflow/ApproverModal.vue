<template>
  <ProcessNodeModal ref="processNodeModal" :nodeData="nodeData">
    <template slot="process-node-model">
      <div class="approver-node-modal">
        <RadioGroup
          v-model="nodeData.value.type"
          class="radio-group"
          type="button"
          @on-change="onRadioClick"
        >
          <Radio v-for="(item, i) in typeItems" :key="i" :label="item.label">{{item.text}}</Radio>
        </RadioGroup>
        <div v-if="nodeData.value.type === 'member'" class="switch-pannel">
          <div class="member-content">
            <div class="content-top">
              <Button
                type="primary"
                icon="md-add"
                @click="onAddMember"
              >{{nodeData.value.members.value.length ? "修改成员" : "添加成员"}}</Button>
              <span class="info">不能超过20人</span>
            </div>
            <TagList
              :data="nodeData.value.members.value"
              textFieldName="userName"
              :onCloseCbs="onCloseMembers"
              :onClearCbs="onClearMembers"
            ></TagList>
            <div v-if="nodeData.value.members.value.length >= 2" class="more">
              <h4>多人审批时采用的审批方式</h4>
              <RadioGroup v-model="nodeData.value.member.approvalWay">
                <Radio v-for="(item ,i) in approvalWay" :key="i" :label="item.value">{{item.text}}</Radio>
              </RadioGroup>
            </div>
          </div>
        </div>
        <div v-else-if="nodeData.value.type === 'role'" class="switch-pannel">
          <div class="role-content">
            <div class="content-top">
              <Button
                type="primary"
                icon="md-add"
                @click="onAddRoles"
              >{{nodeData.value.roles.length ? "修改角色" : "添加角色"}}</Button>
              <TagList
                :data="nodeData.value.roles"
                textFieldName="nodeText"
                :onCloseCbs="onCloseRoles"
                :onClearCbs="onClearRoles"
              ></TagList>
              <div v-if="nodeData.value.roles.length" class="more">
                <h4>多人审批时采用的审批方式</h4>
                <RadioGroup v-model="nodeData.value.role.approvalWay" class="approval-way-radio">
                  <Radio v-for="(item ,i) in approvalWay" :key="i" :label="item.value">{{item.text}}</Radio>
                </RadioGroup>
              </div>
              <!-- <div v-if="nodeData.value.roles.length" class="more">
                <h4>审批人为空时</h4>
                <RadioGroup v-model="nodeData.value.role.approverIsBlank">
                  <Radio
                    v-for="(item ,i) in approverIsBlank"
                    :key="i"
                    :label="item.value"
                  >{{item.text}}</Radio>
                </RadioGroup>
              </div> -->
            </div>
          </div>
        </div>
        <div
          v-else-if="nodeData.value.type === 'sponsorChoice'"
          class="switch-pannel sponsor-choice-content"
        >
          <div class="item-content">
            <Select v-model="nodeData.value.sponsorChoice.choice" :transfer="true">
              <Option
                v-for="item in choiceItems"
                :value="item.value"
                :key="item.value"
              >{{ item.text }}</Option>
            </Select>
          </div>
          <div class="item-text">选择范围</div>
          <div class="item-content">
            <Select v-model="nodeData.value.sponsorChoice.choiceScope" :transfer="true">
              <Option
                v-for="item in choiceScopeItems"
                :value="item.value"
                :key="item.value"
              >{{ item.text }}</Option>
            </Select>
            <Button
              v-if="nodeData.value.sponsorChoice.choiceScope === 'designatedMembers'"
              type="primary"
              icon="md-add"
              @click="onAddMember"
            >{{nodeData.value.members.value.length ? "修改成员" : "添加成员"}}</Button>
            <div
              v-if="nodeData.value.sponsorChoice.choiceScope === 'designatedMembers'"
              class="content-top"
            >
              <TagList
                :data="nodeData.value.members.value"
                textFieldName="userName"
                :onCloseCbs="onCloseMembers"
                :onClearCbs="onClearMembers"
              ></TagList>
            </div>
            <Button
              v-if="nodeData.value.sponsorChoice.choiceScope === 'role'"
              type="primary"
              icon="md-add"
              @click="onAddRoles"
            >{{nodeData.value.roles.length ? "修改角色" : "添加角色"}}</Button>
            <div v-if="nodeData.value.sponsorChoice.choiceScope === 'role'" class="content-top">
              <TagList
                :data="nodeData.value.roles"
                textFieldName="nodeText"
                :onCloseCbs="onCloseMembers"
                :onClearCbs="onClearMembers"
              ></TagList>
            </div>
          </div>
          <div v-if="showApprovalWay" class="more">
            <h4>多人审批时采用的审批方式</h4>
            <RadioGroup v-model="nodeData.value.sponsorChoice.approvalWay">
              <Radio :label="item.value" v-for="(item ,i) in approvalWay" :key="i">{{item.text}}</Radio>
            </RadioGroup>
          </div>
        </div>
      </div>
      <ContactsModal
        ref="contactsModal"
        modalTitle="选择成员"
        :fieldData="nodeData.value.members"
        @on-contacts-model-confirm="onContactsModelConfirm"
      ></ContactsModal>
      <SelectBoxModal
        ref="selectRolesModal"
        :value="nodeData.value.roles"
        :data="rolesData"
        :multiple="false"
        @on-selectbox-confirm="onConfirmRolesModal"
      ></SelectBoxModal>
    </template>
  </ProcessNodeModal>
</template>

<script>
import { GET_NODES_DATA, UPDATE_NODES_DATA } from "store/modules/workflow/type";
import { mapGetters, mapMutations } from "vuex";
import ProcessNodeModal from "./ProcessNodeModal.vue";
import { ContactsModal } from "components/Common/AddressBook";
import { SelectBoxModal } from "components/Common/SelectBox";
import TagList from "components/Common/TagList";
import { updateNodeData, getRolesData } from "./scripts/utils";
import data from "./scripts/processNodeModalData";
export default {
  name: "ApproverModal",
  components: {
    ProcessNodeModal,
    ContactsModal,
    SelectBoxModal,
    TagList
  },
  data() {
    return {
      typeItems: data.typeItems.slice(0, 2),
      choiceItems: data.choiceItems,
      choiceScopeItems: data.choiceScopeItems,
      approvalWay: data.approvalWay,
      approverIsBlank: data.approverIsBlank,
      rolesData: []
    };
  },
  props: {
    nodeData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    showApprovalWay() {
      const { value } = this.nodeData;
      return (
        value.sponsorChoice.choice === "multiple" &&
        value.sponsorChoice.choiceScope === "wholeCompany"
      );
    },
    ...mapGetters({
      processNodesData: GET_NODES_DATA
    })
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapMutations({
      updateProcessData: UPDATE_NODES_DATA
    }),
    init() {
      this.$processNodeModal = this.$refs.processNodeModal;
      getRolesData().then(data => {
        this.rolesData = [...data];
      });
    },
    show() {
      this.$processNodeModal.show();
    },
    hide() {
      this.$processNodeModal.hide();
    },
    onRadioClick() {
      this.onContactsModelConfirm([]);
      this.onConfirmRolesModal([]);
    },
    onAddMember() {
      this.$refs.contactsModal.show();
    },
    onAddRoles() {
      this.$refs.selectRolesModal.show();
    },
    onContactsModelConfirm(data) {
      if (data.length > 20) {
        this.$Message.error({
          content: "最多能够添加20个成员"
        });
        return;
      }
      const updateData = this.nodeData;
      updateData.value.members.value = data;
      if (data.length >= 2) {
        updateData.value.member.approvalWay = "jointlySign";
      }
      const nodesList = updateNodeData(
        this.processNodesData,
        this.nodeData,
        updateData
      );
      this.updateProcessData(nodesList);
    },
    onConfirmRolesModal(selectedItems) {
      const updateData = this.nodeData;
      updateData.value.roles = selectedItems;
      const nodesList = updateNodeData(
        this.processNodesData,
        this.nodeData,
        updateData
      );
      this.updateProcessData(nodesList);
    },
    onCloseMembers(item) {
      const updateData = this.nodeData;
      const members = updateData.value.members.value;
      let index = 0;
      members.forEach((member, i) => {
        if (member.id === item.id) {
          index = i;
        }
      });
      members.splice(index, 1);
      updateData.value.members.value = members;
      const nodesList = updateNodeData(
        this.processNodesData,
        this.nodeData,
        updateData
      );
      this.updateProcessData(nodesList);
    },
    onClearMembers() {
      this.onContactsModelConfirm([]);
    },
    onCloseRoles(item) {
      const updateData = this.nodeData;
      const roles = updateData.value.roles;
      let index = 0;
      roles.forEach((role, i) => {
        if (role.id === item.id) {
          index = i;
        }
      });
      roles.splice(index, 1);
      updateData.value.roles = roles;
      const nodesList = updateNodeData(
        this.processNodesData,
        this.nodeData,
        updateData
      );
      this.updateProcessData(nodesList);
    },
    onClearRoles() {
      this.onConfirmRolesModal([]);
    }
  }
};
</script>

<style lang="less">
.approver-node-modal {
  .radio-group {
    display: flex;
    .ivu-radio-wrapper {
      flex: 1;
      text-align: center;
    }
  }
  .switch-pannel {
    padding: 10px 0;
  }
  .df-taglist {
    margin-top: 10px;
  }
  .member-content,
  .role {
    .content-top {
      display: flex;
      align-items: center;
    }
    .info {
      color: #999;
      font-size: 13px;
      margin-left: 15px;
    }
  }
  .role-content {
    .approval-way-radio {
      .ivu-radio-wrapper:first-child {
        margin-bottom: 0;
        display: none;
      }
    }
  }
  .more {
    margin-top: 20px;
    border-top: 1px solid #ebebeb;

    .ivu-radio-wrapper {
      display: block;
    }

    h4 {
      color: #191f25;
      font-size: 14px;
      font-weight: 400;
      margin-top: 20px;
      margin-bottom: 10px;
    }

    .ivu-radio-wrapper {
      margin-bottom: 7px;
    }
  }
  .sponsor-choice-content {
    .item {
      &-text {
        margin: 15px 0;
      }

      &-content {
        .ivu-select {
          width: 190px;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
