<template>
  <ProcessNodeModal ref="copyGiveModal" :width="500" :nodeData="nodeData">
    <template slot="process-node-model">
      <div class="df-copygive-modal">
        <div class="select">
          <Button type="primary" icon="md-add" @click="onAddCotacts">选择部门/人员</Button>
          <Button type="primary" icon="md-add" @click="onAddRoles">选择角色</Button>
          <!-- <Button type="primary" icon="md-add" @click="onAddDirector">选择主管</Button> -->
        </div>
        <div class="select-ret">
          <TagList
            v-if="activeType === 'contacts'"
            :data="nodeData.value.contacts.value"
            textFieldName="userName"
            :onCloseCbs="onCloseContacts"
            :onClearCbs="onClearContacts"
          ></TagList>
          <TagList
            v-else-if="activeType === 'roles'"
            :data="nodeData.value.roles"
            textFieldName="nodeText"
            :onCloseCbs="onCloseRoles"
            :onClearCbs="onClearRoles"
          ></TagList>
          <TagList
            v-else-if="activeType === 'director'"
            :data="nodeData.value.director"
            textFieldName="nodeText"
            :onCloseCbs="onCloseDirector"
            :onClearCbs="onClearDirector"
          ></TagList>
          <!-- <Checkbox v-model="nodeData.value.selfSelect.isSelect">允许发起人自选抄送人</Checkbox> -->
        </div>
      </div>
      <ContactsModal
        ref="contactsModal"
        modalTitle="选择部门/人员"
        :fieldData="nodeData.value.contacts"
        @on-addressbook-model-confirm="onSelectedContacts"
      ></ContactsModal>
      <SelectBoxModal
        ref="selectRolesModal"
        :value="nodeData.value.roles"
        :data="rolesData"
        @on-selectbox-confirm="onConfirmRolesModal"
      ></SelectBoxModal>
      <SelectBoxModal
        ref="selectDirectorModal"
        modalTitle="选择主管"
        :value="nodeData.value.director"
        :data="directorData"
        @on-selectbox-confirm="onConfirmDirectorModal"
      ></SelectBoxModal>
    </template>
  </ProcessNodeModal>
</template>

<script>
import { GET_NODES_DATA, UPDATE_NODES_DATA } from "store/modules/workflow/type";
import { mapGetters, mapMutations } from "vuex";
import ProcessNodeModal from "./ProcessNodeModal.vue";
import TagList from "components/Common/TagList";
import { ContactsModal } from "components/Common/AddressBook";
import { SelectBoxModal } from "components/Common/SelectBox";
import { updateNodeData, getRolesData, getDirectorData } from "./scripts/utils";
export default {
  name: "CopyGiveModal",
  components: {
    ProcessNodeModal,
    TagList,
    ContactsModal,
    SelectBoxModal
  },
  data() {
    return {
      activeType: "contacts",
      rolesData: [],
      directorData: []
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
      this.$copyGiveModal = this.$refs.copyGiveModal;
      getRolesData().then(data => {
        this.rolesData = [...data];
      });
      getDirectorData().then(data => {
        this.directorData = [...data];
      });
    },
    show() {
      this.$copyGiveModal.show();
    },
    hide() {
      this.$copyGiveModal.hide();
    },
    onAddCotacts() {
      this.activeType = "contacts";
      this.$refs.contactsModal.show();
    },
    onAddRoles() {
      this.activeType = "roles";
      this.$refs.selectRolesModal.show();
    },
    onAddDirector() {
      this.activeType = "director";
      this.$refs.selectDirectorModal.show();
    },
    onSelectedContacts(data) {
      const updateData = this.nodeData;
      updateData.value.contacts.value = data;
      const nodesList = updateNodeData(
        this.processNodesData,
        this.nodeData,
        updateData
      );
      this.updateProcessData(nodesList);
    },
    onConfirmRolesModal(data) {
      const updateData = this.nodeData;
      updateData.value.roles = data;
      const nodesList = updateNodeData(
        this.processNodesData,
        this.nodeData,
        updateData
      );
      this.updateProcessData(nodesList);
    },
    onConfirmDirectorModal(data) {
      const updateData = this.nodeData;
      updateData.value.director = data;
      const nodesList = updateNodeData(
        this.processNodesData,
        this.nodeData,
        updateData
      );
      this.updateProcessData(nodesList);
    },
    onCloseContacts(item) {
      const updateData = this.nodeData;
      const contacts = updateData.value.contacts.value;
      let index = 0;
      contacts.forEach((contact, i) => {
        const id = contact.id || contact.departmentId;
        if (id === item.id) {
          index = i;
        }
      });
      contacts.splice(index, 1);
      updateData.value.contacts.value = contacts;
      const nodesList = updateNodeData(
        this.processNodesData,
        this.nodeData,
        updateData
      );
      this.updateProcessData(nodesList);
    },
    onClearContacts() {
      const updateData = this.nodeData;
      updateData.value.contacts.value = [];
      const nodesList = updateNodeData(
        this.processNodesData,
        this.nodeData,
        updateData
      );
      this.updateProcessData(nodesList);
    },
    onCloseRoles(item) {
      const updateData = this.nodeData;
      const roles = updateData.value.roles;
      let index = 0;
      roles.forEach((contact, i) => {
        const id = roles.id;
        if (id === item.id) {
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
      const updateData = this.nodeData;
      updateData.value.roles = [];
      const nodesList = updateNodeData(
        this.processNodesData,
        this.nodeData,
        updateData
      );
      this.updateProcessData(nodesList);
    },
    onCloseDirector(item) {
      const updateData = this.nodeData;
      const director = updateData.value.director;
      let index = 0;
      director.forEach((contact, i) => {
        const id = director.id;
        if (id === item.id) {
          index = i;
        }
      });
      director.splice(index, 1);
      updateData.value.director = director;
      const nodesList = updateNodeData(
        this.processNodesData,
        this.nodeData,
        updateData
      );
      this.updateProcessData(nodesList);
    },
    onClearDirector() {
      const updateData = this.nodeData;
      updateData.value.director = [];
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
<style lang="less">
.df-copygive-modal {
  .select {
    .ivu-btn {
      margin-right: 15px;
    }
  }
  .select-ret {
    margin-top: 15px;
  }
  .df-taglist {
    margin-bottom: 15px;
  }
}
</style>