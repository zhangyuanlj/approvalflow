<template>
  <div class="select">
    <div v-if="isMobile" :class="showTitleClass" @click.stop="onClickTitle">
      <Icon type="ios-arrow-up" />已选择列表
    </div>
    <div v-else class="pannel-title">已选择列表</div>
    <div class="pannel-content">
      <div v-if="isShowNoContent()" class="no-select-content">
        <Icon type="ios-alert" :size="90" />
        <h4>请选择人员和部门</h4>
      </div>
      <div class="departments-container">
        <div class="departments-item" v-for="(item, i) in listData.departments" :key="i">
          <strong>
            {{setDepartmentName(item)}}
            <span
              class="contacts-num"
              v-if="item.count"
            >({{item.count}}人)</span>
          </strong>
          <a href="javascript:void(0);" class="remove-btn" @click="onDelDepartment(i)">
            <Icon class="icon" type="md-trash" :size="13" />
            <span class="text">移除</span>
          </a>
        </div>
      </div>
      <div v-if="showContacts" class="contacts-container">
        <div class="contacts-item" v-for="(item, i) in listData.contacts" :key="i">
          <div class="img">
            <img v-if="item.headImg" :src="item.headImg" />
            <span v-else>{{setAccountName(item)}}</span>
          </div>
          <div class="item-text">{{setUserName(item)}}</div>
          <a href="javascript:void(0);" class="remove-btn" @click="onDelContact(i)">
            <Icon class="icon" type="md-trash" :size="13" />
            <span class="text">移除</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  UPDATE_SELECTED_DEPARTMENTS,
  UPDATE_SELECTED_CONTACTS
} from "store/modules/addressBook/type";
import { mapMutations } from "vuex";
import { isMobile } from "@/utils/helper";
import classNames from "classnames";
export default {
  Name: "AddressBookSelect",
  data() {
    return {
      show: false,
      isMobile: isMobile(),
      listData: {
        departments: [],
        contacts: []
      }
    };
  },
  props: {
    selectedDepartments: {
      type: Object,
      default: () => {
        return {};
      }
    },
    selectedContacts: {
      type: Object,
      default: () => {
        return {};
      }
    },
    showContacts: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    selectedDepartments: {
      handler(val) {
        this.selectedDepartmentsHandler(val);
      }
    },
    selectedContacts: {
      handler(val) {
        this.selectedContactsHandler(val);
      }
    }
  },
  computed: {
    showTitleClass() {
      const baseClass = "pannel-title";
      return classNames({
        [baseClass]: true,
        [`${baseClass}_show`]: this.show
      });
    }
  },
  mounted() {
    this.selectedDepartmentsHandler(this.selectedDepartments);
    this.selectedContactsHandler(this.selectedContacts);
  },
  methods: {
    setAccountName(item) {
      const name = this.setUserName(item);
      return name.substring(0, 1);
    },
    setDepartmentName(item) {
      const name = item.departmentName ? item.departmentName : item.menuName;
      return name;
    },
    setUserName(item) {
      const name = item.userName ? item.userName : item.menuName;
      return name;
    },
    isShowNoContent() {
      return (
        !this.listData.departments.length && !this.listData.contacts.length
      );
    },
    ...mapMutations({
      updateSelectedDepartments: UPDATE_SELECTED_DEPARTMENTS,
      updateSelectedContacts: UPDATE_SELECTED_CONTACTS
    }),
    selectedDepartmentsHandler(val) {
      this.listData.departments = [];
      this.listData.departments = Object.values(val);
    },
    selectedContactsHandler(val) {
      this.listData.contacts = Object.values(val);
    },
    onClickTitle() {
      if (isMobile()) {
        this.show = !this.show;
        this.$emit("on-open-select", this.show);
      }
    },
    onDelDepartment(i) {
      const selectedDepartments = {};
      this.listData.departments.splice(i, 1);
      this.listData.departments.forEach(item => {
        selectedDepartments[item.id] = item;
      });
      this.updateSelectedDepartments(selectedDepartments);
    },
    onDelContact(i) {
      const selectedContacts = {};
      this.listData.contacts.splice(i, 1);
      this.listData.contacts.forEach(item => {
        const id = item.id ? item.id : item.userId;
        selectedContacts[id] = item;
      });
      this.updateSelectedContacts(selectedContacts);
    }
  }
};
</script>

<style lang="less">
.item() {
  display: flex;
  align-items: center;
  height: 45px;
}

.df-addressbook {
  .select {
    background-color: #fff;

    .pannel-title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      font-size: 14px;
      font-weight: 600;
      border-bottom: 1px solid #f0f0f0;
      .ivu-icon {
        transition: transform 0.3s ease-in-out;
      }
      &_show {
        .ivu-icon {
          transform: rotate(180deg);
        }
      }
    }

    .contacts-container {
      margin-top: 15px;
    }

    .pannel-content {
      height: 320px;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      .no-select-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 90%;
        color: #a3a3a3;
        h4 {
          font-size: 12px;
          font-weight: 500;
        }
      }
      .remove-btn {
        font-size: 0;
        padding: 7px 0;

        .icon {
          margin-right: 5px;
        }

        .text {
          font-size: 12px;
        }
      }

      .departments-item {
        display: flex;
        align-items: center;
        height: 50px;
        padding: 0 20px;
        transition: background-color 0.2s ease-in-out;

        &:hover {
          background-color: #ebf7ff;
        }

        strong {
          display: block;
          flex: 3;
          font-size: 13px;
          font-weight: 500;
        }
        .contacts-num {
          color: #a3a3a3;
          font-weight: 500;
        }
      }

      .contacts-item {
        .item();
        padding: 0 20px;
        transition: background-color 0.2s ease-in-out;

        &:hover {
          background-color: #ebf7ff;
        }

        .item-text {
          .item();
          flex: 3;
          font-size: 13px;
          padding-right: 20px;
          margin-left: 15px;
          border-bottom: 1px solid #f0f0f0;
        }

        .img {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 35px;
          height: 35px;
          background-color: #399efa;
          border-radius: 100%;

          span {
            color: #fff;
            font-size: 16px;
          }

          img {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 100%;
          }
        }

        &:last-child {
          border-bottom: 0;
        }
      }
    }
  }
}
</style>
