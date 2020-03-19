<template>
  <ProcessNodeModal ref="originatorNodeModal" :nodeData="nodeData">
    <template slot="process-node-model">
      <div class="df-originator-node-modal">
        <h4>谁可以提交</h4>
        <Input v-model="contacts" @on-focus="onSelect"></Input>
      </div>
      <ContactsModal
        ref="contactsModal"
        modalTitle="选择成员"
        :fieldData="nodeData.value.contacts"
        @on-addressbook-model-confirm="onContactsModelConfirm"
      ></ContactsModal>
    </template>
  </ProcessNodeModal>
</template>

<script>
import { GET_NODES_DATA, UPDATE_NODES_DATA } from "store/modules/workflow/type";
import { mapGetters, mapMutations } from "vuex";
import ProcessNodeModal from "./ProcessNodeModal.vue";
import { ContactsModal } from "components/Common/AddressBook";
import { updateNodeData } from "./scripts/utils";
export default {
  name: "OriginatorModal",
  components: {
    ProcessNodeModal,
    ContactsModal
  },
  data() {
    return {
      contacts: ""
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
  watch: {
    nodeData: {
      handler(val) {
        this.setValue(val.value.contacts);
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters({
      processNodesData: GET_NODES_DATA
    })
  },
  mounted() {
    this.setValue(this.nodeData);
  },
  methods: {
    ...mapMutations({
      updateProcessData: UPDATE_NODES_DATA
    }),
    setValue(data) {
      const value = data.value;
      const contacts = [];
      if (value.length) {
        value.forEach(item => {
          const name = item.userName ? item.userName : item.menuName;
          contacts.push(name);
        });
        this.contacts = contacts.join(",");
      } else {
        this.contacts = "所有人";
      }
    },
    show() {
      this.$refs.originatorNodeModal.show();
    },
    hide() {
      this.$refs.originatorNodeModal.hide();
    },
    onSelect() {
      this.$refs.contactsModal.show();
    },
    onContactsModelConfirm(data) {
      const updateData = this.nodeData;
      updateData.value.contacts.value = data;
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
.df-originator-node-modal {
  h4 {
    font-size: 14px;
    font-weight: 400;
  }
  .ivu-input-wrapper {
    margin-top: 10px;
  }
}
</style>