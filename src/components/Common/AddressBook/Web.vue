<template>
  <div class="df-addressbook">
    <div class="addressbook-header">
      <Search></Search>
      <Position></Position>
      <Add></Add>
    </div>
    <div class="addressbook-content">
      <Department
        :multiple="isMultiple()"
        :departmentData="departmentData"
        :currentDepartment="currentDepartment"
        @on-change-department="onChangeDepartment"
      ></Department>
      <Contacts
        :multiple="isMultiple()"
        :checkAll="checkAll"
        :contactsData="contactsData"
        :departmentId="departmentId"
        @on-selected-contact="onSelectedContact"
      ></Contacts>
    </div>
    <div class="addressbook-footer">
      <Select></Select>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import {
  UPDATE_DEPARTMENTS,
  UPDATE_CONTACTS
} from "store/modules/addressBook/type";
import { mapGetters, mapMutations } from "vuex";
import $ from "jquery";
import Search from "./Search.vue";
import Position from "./Position.vue";
import Add from "./Add.vue";
import Department from "./Department.vue";
import Contacts from "./Contacts.vue";
import Select from "./Select.vue";
import Http from "utils/http";
export default {
  name: "AddressBookWeb",
  components: {
    Search,
    Position,
    Add,
    Department,
    Contacts,
    Select
  },
  data() {
    return {
      departmentId: "",
      departmentData: [],
      contactsData: []
    };
  },
  props: {
    fieldData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    index: {
      type: Number,
      default: 0
    },
    containerHeight: {
      type: Number,
      default: 596
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$el = $(this.$el);
      this.setContentHeight();
      this.getDeparmentsData();
      this.getContactsData();
    },
    getDeparmentsData() {
      Http.get({
        url: "DepartmentInfo/GetListTree",
        succeed: (res, data) => {
          this.departmentData = data;
        }
      });
    },
    getContactsData(departmentId) {
      const requestData = {
        page: 1,
        pageSize: 500
      };
      if (departmentId) {
        requestData["departmentId"] = departmentId;
      }
      Http.post({
        url: "Teacher/GetList",
        data: requestData,
        succeed: (res, data) => {
          this.contactsData = data;
        }
      });
    },
    ...mapMutations({
      UPDATE_DEPARTMENTS,
      UPDATE_CONTACTS
    }),
    //设置内容区高度,显示滚动条
    setContentHeight() {
      const headHeight = this.$el.find(".addressbook-header").height();
      const footHeight = this.$el.find(".addressbook-footer").height();
      const height = this.containerHeight - headHeight - footHeight;
      this.$el.find(".addressbook-content").height(height);
    },
    updateDepartmentsData(id) {
      this.departmentData.forEach(department => {
        if (department.departmentId === id) {
          this.departmentData = department.childNode;
          return false;
        }
      });
    },
    updateContactsData(name) {
      const contactsData = this.contactsData;
      contactsData.filter(contact => {
        return contact.departmentName === name;
      });
      this.contactsData = contactsData;
    },
    isMultiple() {
      const attribute = this.fieldData.attribute;
      const multiple = attribute && attribute.multiple;
      if (multiple !== undefined) {
        if (multiple === "只能选择一人") {
          return false;
        }
        return true;
      }
      return true;
    },
    onChangeDepartment(department) {
      const id = department.id;
      const name = department.departmentName;
      this.departmentId = id;
      this.updateDepartmentsData(id);
      this.updateContactsData(name);
    },
    onSelectedContact(contacts) {
      this.contacts = contacts;
    }
  }
};
</script>

<style lang="less">
.df-addressbook {
  font-size: 13px;

  .addressbook-content {
    overflow-y: auto;
  }
}
</style>
