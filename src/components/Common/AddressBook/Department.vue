<template>
  <div class="departments">
    <CheckAll
      :multiple="multiple"
      :checkAll="checkAll"
      @on-departments-checkall="onCheckAll"
    ></CheckAll>
    <div :class="setDepartmentsMainClass">
      <div class="items-list">
        <div
          class="item"
          v-for="(item, i) in listData.departments"
          :key="i"
          @click="onSelected(item)"
        >
          <div v-if="multiple" :class="setCheckboxClass(item)">
            <Icon type="ios-checkmark-circle" size="18" />
          </div>
          <div class="item-content">
            <div class="text" :title="item.menuName">
              <div class="item-inner">
                {{ item.menuName }}
                <strong v-if="item.count">({{ item.count }}人)</strong>
              </div>
            </div>
            <a
              href="javascript:void(0);"
              :class="setLowerLevel(item)"
              @click.stop="onLowerLevel(item)"
            >
              <Icon type="ios-folder" size="18" />下级
            </a>
          </div>
        </div>
      </div>
      <Contacts
        v-if="showContacts"
        :multiple="multiple"
        :contacts="listData.contacts"
        @on-contacts-checked="onContactsChecked"
      ></Contacts>
    </div>
  </div>
</template>

<script>
import config from "@/config";
import {
  GET_DEPARTMENTS,
  GET_CONTACTS,
  GET_SELECTED_DEPARTMENTS,
  GET_CURRENT_DEPARTMENTS,
  GET_SELECTED_CONTACTS,
  UPDATE_DEPARTMENTS,
  UPDATE_CONTACTS,
  UPDATE_CURRENT_DEPARTMENTS,
  UPDATE_SELECTED_DEPARTMENTS,
  UPDATE_SELECTED_CONTACTS,
} from "store/modules/addressBook/type";
import { mapGetters, mapMutations } from "vuex";
import CheckAll from "./CheckAll.vue";
import Contacts from "./Contacts.vue";
import classNames from "classnames";
import Http from "utils/http";
export default {
  name: "Departments",
  components: {
    CheckAll,
    Contacts,
  },
  data() {
    return {
      listData: {
        departments: [],
        contacts: [],
      },
      checkAll: false,
    };
  },
  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
    showContacts: {
      type: Boolean,
      default: true,
    },
    currentDepartments: {
      type: Array,
      default: () => {
        return [];
      },
    },
    selectedDepartments: {
      type: Object,
      default: () => {
        return {};
      },
    },
    selectedContacts: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  watch: {
    currentDepartments: {
      handler(val) {
        //回到首页
        if (!val.length) {
          this.listData.departments = this.getDepartments();
          this.listData.contacts = this.getContacts();
        } else {
          this.showLowerLevelData(val[0]);
        }
        this.checkAll = this.isCheckAll();
      },
    },
    selectedDepartments: {
      handler(val) {
        this.selectedDepartmentsHandler(val);
      },
    },
    selectedContacts: {
      handler(val) {
        this.selectedContactsHandler(val);
      },
    },
  },
  computed: {
    setDepartmentsMainClass() {
      const baseClass = "departments-main";
      return classNames({
        [`${baseClass}`]: true,
        [`${baseClass}_has-checkall`]: this.multiple,
      });
    },
  },
  mounted() {
    this.getDepartmentsData();
  },
  methods: {
    getDepartmentsData() {
      Http.get({
        url: config.apiUrl.getDepartments,
        succeed: (res, data) => {
          this.listData.departments = data;
          this.listData.departments.forEach((item) => {
            if (!item.childNode) {
              this.listData.contacts.push(item);
            }
          });
          this.updateDepartments(data);
          this.selectedDepartmentsHandler(this.selectedDepartments);
          if (this.showContacts) {
            this.selectedContactsHandler(this.selectedContacts);
          }
        },
      });
    },
    getCheckedList() {
      const departments = this.listData.departments;
      const contacts = this.listData.contacts;
      const departmentsCheckedList = departments.filter((item) => {
        return item.checked;
      });
      const contactsCheckedList = contacts.filter((item) => {
        return item.checked;
      });
      return {
        departments: departmentsCheckedList,
        contacts: contactsCheckedList,
      };
    },
    getCheckedListLen() {
      const checkedList = this.getCheckedList();
      if (this.showContacts) {
        return checkedList.departments.length + checkedList.contacts.length;
      }
      return checkedList.departments.length;
    },
    getListLen() {
      const departments = this.listData.departments;
      const contacts = this.listData.contacts;
      if (this.showContacts) {
        return departments.length + contacts.length;
      }
      return departments.length;
    },
    setLowerLevel(item) {
      const baseClass = "lower-level";
      if (!this.isLowerLevel(item)) {
        return `${baseClass} ${baseClass}_disable`;
      }
      return baseClass;
    },
    setCheckboxClass(item) {
      const baseClass = "checkbox";
      return classNames({
        [baseClass]: true,
        [`${baseClass}_checked`]: item.checked,
      });
    },
    setSelectedDepartments(item) {
      const id = item.id;
      const selectedDepartments = this.multiple
        ? this.getSelectedDepartments()
        : {};
      if (item.checked) {
        selectedDepartments[id] = item;
      } else {
        selectedDepartments[id] && delete selectedDepartments[id];
      }
      if (!this.multiple) {
        this.updateSelectedContacts({});
      }
      this.updateSelectedDepartments(selectedDepartments);
    },
    setSelectedContacts(item) {
      const id = item.id ? item.id : item.userId;
      const selectedContacts = this.multiple ? this.getSelectedContacts() : {};
      if (item.checked) {
        selectedContacts[id] = item;
      } else {
        selectedContacts[id] && delete selectedContacts[id];
      }
      this.updateSelectedContacts(selectedContacts);
    },
    ...mapGetters({
      getDepartments: GET_DEPARTMENTS,
      getContacts: GET_CONTACTS,
      getCurrentDepartments: GET_CURRENT_DEPARTMENTS,
      getSelectedDepartments: GET_SELECTED_DEPARTMENTS,
      getSelectedContacts: GET_SELECTED_CONTACTS,
    }),
    ...mapMutations({
      updateDepartments: UPDATE_DEPARTMENTS,
      updateContacts: UPDATE_CONTACTS,
      updateCurrentDepartments: UPDATE_CURRENT_DEPARTMENTS,
      updateSelectedDepartments: UPDATE_SELECTED_DEPARTMENTS,
      updateSelectedContacts: UPDATE_SELECTED_CONTACTS,
    }),
    selectedItem(item) {
      const checked = item.checked;
      if (this.multiple) {
        item.checked = !checked;
        this.checkAll = this.isCheckAll();
        this.setSelectedDepartments(item);
      } else {
        this.listData.departments.forEach((department) => {
          department.checked = false;
          this.setSelectedDepartments(department);
        });
        item.checked = true;
        this.setSelectedDepartments(item);
      }
      this.$forceUpdate();
    },
    selectedDepartmentsHandler(val) {
      this.listData.departments.forEach((item) => {
        const id = item.id ? item.id : item.departmentId;
        if (val[id]) {
          item.checked = true;
        } else {
          item.checked = false;
        }
      });
      this.checkAll = this.isCheckAll();
      this.$forceUpdate();
    },
    selectedContactsHandler(val) {
      const contacts = this.listData.contacts;
      contacts.forEach((item, i) => {
        const id = item.id ? item.id : item.userId;
        if (val[id]) {
          item.checked = true;
        } else {
          item.checked = false;
        }
        this.$set(contacts, i, item);
      });
      this.checkAll = this.isCheckAll();
    },
    isLowerLevel(item) {
      return !item.checked && item.childNode && item.childNode.length;
    },
    isCheckAll() {
      if (this.getCheckedListLen() === this.getListLen()) {
        return true;
      } else {
        return false;
      }
    },
    //从某一层数据中删选出部门
    filterDeparments(levelData) {
      const deparments = levelData.filter((item) => {
        return item.childNode;
      });
      this.listData.departments = deparments;
    },
    //从某一层数据中删选出联系人
    filterContacts(levelData) {
      const contacts = levelData.filter((item) => {
        return !item.childNode;
      });
      this.listData.contacts = contacts;
    },
    //显示下一级数据
    showLowerLevelData(department) {
      const childNode = department.childNode;
      this.filterDeparments(childNode);
      this.filterContacts(childNode);
      this.selectedDepartmentsHandler(this.selectedDepartments);
      if (this.showContacts) {
        this.selectedContactsHandler(this.selectedContacts);
      }
    },
    //选择一个部门
    onSelected(item) {
      this.selectedItem(item);
    },
    //进入下级部门
    onLowerLevel(item) {
      if (!this.isLowerLevel(item)) {
        return;
      }
      this.updateCurrentDepartments([item]);
    },
    //全选、反选
    onCheckAll(checkAll) {
      const departments = this.listData.departments;
      this.checkAll = checkAll;
      departments.forEach((item) => {
        item.checked = checkAll;
        this.setSelectedDepartments(item);
      });
      if (this.showContacts) {
        const contacts = this.listData.contacts;
        contacts.forEach((item, i) => {
          item.checked = checkAll;
          this.setSelectedContacts(item);
          this.$set(contacts, i, item);
        });
      }
    },
    onContactsChecked(item) {
      if (item.checked) {
        this.checkAll = this.isCheckAll();
      } else {
        this.checkAll = false;
      }
    },
  },
};
</script>

<style lang="less">
@white-color: #fff;
@primary-color: #399efa;

.item() {
  display: flex;
  align-items: center;
  min-height: 50px;
  padding-left: 20px;
  .item-inner {
    padding: 5px 0;
  }
}

.df-addressbook {
  background-color: #f6f6f6;

  .departments {
    &-main {
      height: 370px;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;

      &_has-checkall {
        height: 310px;
      }
    }

    .items-list {
      background-color: @white-color;

      .item {
        .item();
        transition: background-color 0.2s ease-in-out;
        cursor: pointer;

        &-content {
          .item();
          flex: 3;
          padding-left: 10px;
          padding-right: 20px;
          border-bottom: 1px solid #f0f0f0;

          .text {
            flex: 3;
            color: #202833;

            strong {
              color: #a3a3a3;
              font-weight: 500;
            }
          }

          .lower-level {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 50px;

            .ivu-icon {
              margin-right: 5px;
            }

            &_disable {
              color: #a3a3a3;
              cursor: not-allowed;
            }
          }
        }

        &:hover {
          background-color: #ebf7ff;
        }

        &:last-child {
          border-bottom: 0;
        }
      }
    }
  }
}

@media screen and (min-width: 320px) and (max-width: 768px) {
  .df-addressbook {
    .departments {
      &-main {
        height: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
      }
    }
  }
}
</style>
