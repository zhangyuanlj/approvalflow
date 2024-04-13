<template>
  <div>
    <Input
      v-model="value"
      :placeholder="fieldData.attribute.props.placeholder"
      readonly
      @on-focus="onFocus"
      @on-clear="onClear"
      clearable
    />
    <Modal
      v-model="modalVisible"
      class-name="select-departments-modal"
      :title="setModalTitle"
      :width="630"
      :styles="modelStyles"
      :fullscreen="isMobile"
      @on-ok="onConfirm"
      @on-visible-change="onVisibleChange"
    >
      <AddressBook
        v-if="modalVisible"
        ref="addressBook"
        :fieldData="fieldData"
        :index="index"
        :showContacts="false"
        @on-slected-department="onSelectedDepartments"
      ></AddressBook>
    </Modal>
  </div>
</template>

<script>
import { RESET_STATE } from "store/modules/addressBook/type";
import { mapMutations } from "vuex";
import { AddressBook } from "components/Common/AddressBook";
import { isMobile } from "@/utils/helper";
export default {
  name: "RenderDepartments",
  components: {
    AddressBook
  },
  data() {
    return {
      value: "",
      modalVisible: false,
      isMobile: isMobile(),
      listData: [],
      levelData: [],
      position: []
    };
  },
  props: {
    fieldData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    parentIndex: {
      type: Number
    },
    index: {
      type: Number,
      default: 0
    }
  },
  watch: {
    fieldData: {
      handler(val) {
        this.value = this.setValue(val.value);
      },
      deep: true
    }
  },
  mounted() {
    this.value = this.setValue(this.fieldData.value);
  },
  computed: {
    showCheckbox() {
      const multiple = this.fieldData.attribute.multiple;
      if (multiple === "只能选择一个部门") {
        return false;
      }
      return true;
    },
    setModalTitle() {
      const title = this.fieldData.attribute.title;
      return `选择${title}`;
    },
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
        const name = item.departmentName ? item.departmentName : item.menuName;
        names.push(name);
      });
      if (names.length > 2) {
        names = `${names[0]},${names[1]}等${names.length}个部门`;
      } else {
        names = names.join(",");
      }
      return names;
    },
    setSelectedDepartments() {
      const ret = {};
      const selectedDepartments = this.fieldData.value;
      selectedDepartments.forEach(item => {
        const id = item.id ? item.id : item.departmentId;
        item.checked = true;
        ret[id] = item;
      });
      return ret;
    },
    onFocus() {
      this.modalVisible = true;
    },
    onClear() {
      this.$emit("on-value-change", [], this.index, this.parentIndex);
    },
    onConfirm() {
      this.$refs.addressBook.onDepartmentsConfirm().then(data => {
        this.$emit("on-value-change", data, this.index, this.parentIndex);
      });
    },
    onVisibleChange(visible) {
      this.modalVisible = visible;
      if (this.modalVisible) {
        this.resetState({
          selectedDepartments: this.setSelectedDepartments(),
          selectedContacts: {}
        });
      }
    },
    onSelectedDepartments(multiple) {
      if (!multiple) {
        this.modalVisible = false;
        this.onConfirm();
      }
    }
  }
};
</script>

<style lang="less">
.select-departments-modal {
  .ivu-modal-body {
    height: 420px;
    background-color: #f6f6f6;
    padding: 0;
  }
}
@media screen and (min-width: 320px) and (max-width: 768px) {
  .select-departments-modal {
    .ivu-modal-body {
      height: auto;
    }
  }
}
</style>
