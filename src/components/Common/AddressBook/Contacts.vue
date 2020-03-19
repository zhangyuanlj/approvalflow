<template>
  <div class="contacts">
    <div class="item" v-for="(item, i) in contacts" :key="i" @click="onSelected(item)">
      <div v-if="multiple" :class="setCheckboxClass(item)">
        <Icon type="ios-checkmark-circle" size="18" />
      </div>
      <div class="img">
        <img v-if="item.headImg" :src="item.headImg" />
        <span v-else>{{setAccountName(item)}}</span>
      </div>
      <div class="item-text" :title="setUserName(item)">
        <div class="item-inner">{{setUserName(item)}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  GET_SELECTED_CONTACTS,
  UPDATE_SELECTED_CONTACTS,
  UPDATE_SELECTED_DEPARTMENTS
} from "store/modules/addressBook/type";
import { mapGetters, mapMutations } from "vuex";
import classNames from "classnames";
export default {
  name: "Contacts",
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    contacts: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  methods: {
    ...mapGetters({
      getSelectedContacts: GET_SELECTED_CONTACTS
    }),
    ...mapMutations({
      updateSelectedContacts: UPDATE_SELECTED_CONTACTS,
      updateSelectedDepartments: UPDATE_SELECTED_DEPARTMENTS
    }),
    setCheckboxClass(item) {
      const baseClass = "checkbox";
      return classNames({
        [baseClass]: true,
        [`${baseClass}_checked`]: item.checked
      });
    },
    setAccountName(item) {
      const name = item.accountName ? item.accountName : item.menuName;
      return name.substring(0, 1);
    },
    setUserName(item) {
      const name = item.userName ? item.userName : item.menuName;
      return name;
    },
    setSelectedContacts(item) {
      const id = item.id ? item.id : item.userId;
      let selectedContacts = {};
      if (this.multiple) {
        selectedContacts = this.getSelectedContacts();
        if (item.checked) {
          selectedContacts[id] = item;
        } else {
          selectedContacts[id] && delete selectedContacts[id];
        }
      } else {
        selectedContacts[id] = item;
      }
      this.updateSelectedContacts(selectedContacts);
    },
    onSelected(item) {
      if (this.multiple) {
        item.checked = !item.checked;
      } else {
        this.contacts.forEach(item => {
          item.checked = false;
        });
        item.checked = true;
      }
      this.$forceUpdate();
      this.setSelectedContacts(item);
      this.updateSelectedDepartments();
      this.$emit("on-contacts-checked", item);
    }
  }
};
</script>

<style lang="less">
.item() {
  display: flex;
  align-items: center;
  min-height: 50px;
  .item-inner {
    padding: 5px 0;
  }
}

.df-addressbook {
  .contacts {
    box-sizing: content-box;
    background-color: #fff;
    margin-top: 15px;
    .checkbox {
      .ivu-icon {
        color: #a0a5ab;
        margin-right: 10px;
      }

      &_checked {
        .ivu-icon {
          color: #399efa;
        }
      }
    }

    .item {
      .item();
      padding-left: 20px;
      transition: background-color 0.2s ease-in-out;
      cursor: pointer;

      &-text {
        .item();
        flex: 3;
        padding-right: 20px;
        margin-left: 15px;
        border-bottom: 1px solid #f0f0f0;
      }
      &:hover {
        background-color: #ebf7ff;
      }
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
</style>
