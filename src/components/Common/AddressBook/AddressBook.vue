<template>
  <div class="df-addressbook">
    <div class="addressbook-header">
      <Search v-if="showContacts" :showContacts="showContacts" :multiple="isMultiple()"></Search>
      <Position :currentDepartments="currentDepartments"></Position>
    </div>
    <div class="addressbook-content">
      <div class="left">
        <Department
          :multiple="isMultiple()"
          :showContacts="showContacts"
          :currentDepartments="currentDepartments"
          :selectedDepartments="selectedDepartments"
          :selectedContacts="selectedContacts"
        ></Department>
      </div>
      <div :class="setRightClass">
        <Select
          :selectedDepartments="selectedDepartments"
          :selectedContacts="selectedContacts"
          @on-open-select="onOpenSelect"
        ></Select>
      </div>
    </div>
  </div>
</template>

<script>
import config from "@/config";
import {
  GET_CURRENT_DEPARTMENTS,
  GET_SELECTED_DEPARTMENTS,
  GET_SELECTED_CONTACTS
} from "store/modules/addressBook/type";
import { mapGetters } from "vuex";
import Search from "./Search.vue";
import Position from "./Position.vue";
import Department from "./Department.vue";
import Select from "./Select.vue";
import Http from "utils/http";
import classNames from "classnames";
export default {
  name: "AddressBookWeb",
  components: {
    Search,
    Position,
    Department,
    Select
  },
  data() {
    return {
      showRight: false
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
    showContacts: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters({
      currentDepartments: GET_CURRENT_DEPARTMENTS,
      selectedDepartments: GET_SELECTED_DEPARTMENTS,
      selectedContacts: GET_SELECTED_CONTACTS
    }),
    setRightClass() {
      const baseClass = "right";
      return classNames({
        [baseClass]: true,
        [`${baseClass}_show`]: this.showRight
      });
    }
  },
  methods: {
    //获取部门下的联系人
    getContacts(departmentsIds) {
      const requestData = {
        departmentIds: departmentsIds,
        page: 1,
        pageSize: 500
      };
      return new Promise(resolve => {
        Http.post({
          url: config.apiUrl.getContacts,
          data: requestData,
          succeed: (res, data) => {
            resolve(data);
          }
        });
      });
    },
    isMultiple() {
      const attribute = this.fieldData.attribute;
      const multiple = attribute && attribute.multiple;
      if (multiple !== undefined) {
        if (multiple.indexOf("只能选择一") !== -1) {
          return false;
        }
        return true;
      }
      return true;
    },
    onContactsConfirm() {
      const departments = Object.values(this.selectedDepartments);
      const selectedContacts = this.selectedContacts;
      const departmentsIds = [];
      departments.forEach(item => {
        departmentsIds.push(item.id);
      });
      if (departmentsIds.length) {
        return this.getContacts(departmentsIds).then(data => {
          const filterData = data.filter(item => {
            return !selectedContacts[item.userId];
          });
          const contacts = [...Object.values(selectedContacts), ...filterData];
          return contacts;
        });
      } else {
        const contacts = Object.values(selectedContacts);
        return new Promise(resolve => {
          resolve(contacts);
        });
      }
    },
    onDepartmentsConfirm() {
      const selectedDepartments = Object.values(this.selectedDepartments);
      return new Promise(resolve => {
        resolve(selectedDepartments);
      });
    },
    onSelectedAll() {
      return new Promise(resolve => {
        this.onDepartmentsConfirm()
          .then(selectedDepartments => {
            return selectedDepartments;
          })
          .then(data => {
            let ret = [];
            this.onContactsConfirm().then(selectedContacts => {
              ret = [...data, ...selectedContacts];
              resolve(ret);
            });
          });
      });
    },
    onOpenSelect(showSelect) {
      this.showRight = showSelect;
    }
  }
};
</script>

<style lang="less">
.df-addressbook {
  font-size: 13px;

  .addressbook-content {
    display: flex;

    .left,
    .right {
      flex: 1;
    }

    .right {
      margin-left: 10px;
    }
  }
}

@media screen and (min-width: 320px) and (max-width: 768px) {
  .df-addressbook {
    .addressbook-content {
      position: relative;
      display: block;
      padding-bottom: 40px;
      overflow: hidden;
      .right {
        position: fixed;
        left: 0;
        bottom: 50px;
        width: 100%;
        margin-left: 0;
        transform: translateY(320px);
        transform-origin: 0, 0;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
        transition: transform 0.3s ease-in-out;
        z-index: 2;

        &_show {
          transform: translateY(0);
        }
      }
    }
  }
  .ivu-modal-footer {
    background-color: #fff;
  }
}
</style>
