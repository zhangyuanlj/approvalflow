<template>
  <Modal
    v-model="modalVisible"
    class-name="df-contacts-modal"
    :title="modalTitle"
    :width="630"
    :styles="modelStyles"
    :fullscreen="isMobile"
    @on-ok="onConfirm"
    @on-visible-change="onVisibleChange"
  >
    <AddressBook v-if="modalVisible" ref="addressBook" :fieldData="fieldData"></AddressBook>
  </Modal>
</template>

<script>
import { RESET_STATE } from "store/modules/addressBook/type";
import { mapMutations } from "vuex";
import AddressBook from "./AddressBook.vue";
import { isMobile } from "@/utils/helper";
export default {
  name: "ContactsModal",
  components: {
    AddressBook
  },
  data() {
    return {
      modalVisible: false,
      isMobile: isMobile()
    };
  },
  props: {
    modalTitle: {
      type: String,
      default: "选择联系人"
    },
    fieldData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    modelStyles() {
      if (!this.isMobile) {
        return {
          top: "30px"
        };
      }
      return null;
    }
  },
  methods: {
    ...mapMutations({
      resetState: RESET_STATE
    }),
    setValue(value) {
      let names = [];
      value.forEach(item => {
        const name = item.userName ? item.userName : item.menuName;
        names.push(name);
      });
      if (names.length > 2) {
        names = `${names[0]},${names[1]}等${names.length}个`;
      } else {
        names = names.join(",");
      }
      return names;
    },
    setSelectedDepartments() {
      const ret = {};
      const selectedValue = this.fieldData.value;
      selectedValue.forEach(item => {
        if (item.childNode) {
          const id = item.id ? item.id : item.departmentId;
          item.checked = true;
          ret[id] = item;
        }
      });
      return ret;
    },
    setSelectedContacts() {
      const ret = {};
      const selectedValue = this.fieldData.value;
      selectedValue.forEach(item => {
        if (!item.childNode) {
          const id = item.id ? item.id : item.userId;
          item.checked = true;
          ret[id] = item;
        }
      });
      return ret;
    },
    show() {
      this.modalVisible = true;
    },
    onConfirm() {
      this.modalVisible = false;
      this.$refs.addressBook.onContactsConfirm().then(data => {
        this.$emit("on-contacts-model-confirm", data);
      });
      this.$refs.addressBook.onDepartmentsConfirm().then(data => {
        this.$emit("on-department-model-confirm", data);
      });
      this.$refs.addressBook.onSelectedAll().then(data => {
        this.$emit("on-addressbook-model-confirm", data);
      });
    },
    onVisibleChange(visible) {
      this.modalVisible = visible;
      if (visible) {
        this.resetState({
          selectedDepartments: this.setSelectedDepartments(),
          selectedContacts: this.setSelectedContacts()
        });
      }
    }
  }
};
</script>
<style lang="less">
.df-contacts-modal {
  .ivu-modal-body {
    height: 470px;
    background-color: #f6f6f6;
    padding: 0;
  }
}

@media screen and (min-width: 320px) and (max-width: 768px) {
  .df-contacts-modal {
    .ivu-modal-body {
      height: auto;
    }
  }
  .ivu-modal-footer {
    z-index: 3;
  }
}
</style>