<template>
  <div class="modal-edit-item">
    <div class="item-label ellipsis">发起人</div>
    <div class="item-content">
      <div class="item-content-wrapper">
        <Button type="primary" icon="md-add" @click="onSelectContact">选择部门/人员</Button>
        <TagList
          :data="itemData.contacts.value"
          textFieldName="userName"
          :showClearBtn="false"
          :onCloseCbs="onCloseContacts"
        ></TagList>
      </div>
      <div class="item-content-wrapper">
        <Button type="primary" icon="md-add" @click="onSelectRoles">选择角色</Button>
        <TagList
          :data="itemData.roles"
          textFieldName="nodeText"
          :showClearBtn="false"
          :onCloseCbs="onCloseRoles"
        ></TagList>
      </div>
    </div>
    <ConditionRemoveItem :nodeData="nodeData" :itemData="itemData" :index="index"></ConditionRemoveItem>
    <ContactsModal
      ref="contactsModal"
      modalTitle="选择成员"
      :fieldData="itemData.contacts"
      @on-addressbook-model-confirm="onSelectedContacts"
    ></ContactsModal>
    <SelectBoxModal
      ref="selectRolesModal"
      :value="itemData.roles"
      :data="rolesData"
      @on-selectbox-confirm="onConfirmRolesModal"
    ></SelectBoxModal>
  </div>
</template>

<script>
import { GET_NODES_DATA, UPDATE_NODES_DATA } from "store/modules/workflow/type";
import { mapGetters, mapMutations } from "vuex";
import TagList from "components/Common/TagList";
import { ContactsModal } from "components/Common/AddressBook";
import { SelectBoxModal } from "components/Common/SelectBox";
import ConditionRemoveItem from "./ConditionRemoveItem.vue";
import { updateNodeData, getRolesData } from "./scripts/utils";
export default {
  name: "ConditionOriginator",
  components: {
    TagList,
    ContactsModal,
    SelectBoxModal,
    ConditionRemoveItem
  },
  data() {
    return {
      rolesData: []
    };
  },
  props: {
    nodeData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    itemData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    index: {
      type: Number,
      default: 0
    }
  },
  computed: {
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
      getRolesData().then(data => {
        this.rolesData = [...data];
      });
    },
    onSelectContact() {
      this.$refs.contactsModal.show();
    },
    onSelectRoles() {
      this.$refs.selectRolesModal.show();
    },
    onSelectedContacts(data) {
      const updateData = this.nodeData;
      updateData.value.data[0].contacts.value = data;
      const nodesList = updateNodeData(
        this.processNodesData,
        this.nodeData,
        updateData
      );
      this.updateProcessData(nodesList);
    },
    onConfirmRolesModal(data) {
      const updateData = this.nodeData;
      updateData.value.data[0].roles = data;
      const nodesList = updateNodeData(
        this.processNodesData,
        this.nodeData,
        updateData
      );
      this.updateProcessData(nodesList);
    },
    onCloseContacts(item) {
      const updateData = this.nodeData;
      const contacts = updateData.value.data[0].contacts.value;
      let index = 0;
      contacts.forEach((contact, i) => {
        const id = contact.id || contact.departmentId;
        if (id === item.id) {
          index = i;
        }
      });
      contacts.splice(index, 1);
      this.nodeData.value.data[0].contacts.value = contacts;
      const nodesList = updateNodeData(
        this.processNodesData,
        this.nodeData,
        updateData
      );
      this.updateProcessData(nodesList);
    },
    onCloseRoles(item) {
      const updateData = this.nodeData;
      const roles = this.nodeData.value.data[0].roles;
      let index = 0;
      roles.forEach((role, i) => {
        if (role.id === item.id) {
          index = i;
        }
      });
      roles.splice(index, 1);
      this.nodeData.value.data[0].roles = roles;
      const nodesList = updateNodeData(
        this.processNodesData,
        this.nodeData,
        updateData
      );
      this.updateProcessData(nodesList);
    }
  }
};
</script>