<template>
  <div class="position">
    <Icon class="home-icon" type="md-bookmarks" :size="16" />
    <a href="javascript:void(0);" @click="onHome()">通讯录</a>
    <span class="item" v-for="(item, i) in items" :key="i">
      <Icon type="ios-arrow-forward" :size="16" />
      <a
        v-if="i !== items.length - 1"
        href="javascript:void(0);"
        @click="onGoTarget(item, i)"
        >{{ item.menuName }}</a
      >
      <span v-else>{{ item.menuName }}</span>
    </span>
  </div>
</template>

<script>
import { UPDATE_CURRENT_DEPARTMENTS } from "store/modules/addressBook/type";
import { mapMutations } from "vuex";
export default {
  name: "AddressBookPosition",
  data() {
    return {
      rootNodes: [],
      items: [],
    };
  },
  props: {
    currentDepartments: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  watch: {
    currentDepartments: {
      handler(val) {
        if (val.length) {
          this.items.push(val[0]);
          this.unique();
        } else {
          this.items = [];
        }
      },
    },
  },
  methods: {
    ...mapMutations({
      updateCurrentDepartments: UPDATE_CURRENT_DEPARTMENTS,
    }),
    unique() {
      const items = {};
      this.items.forEach((item) => {
        if (item) {
          items[item.id] = item;
        }
      });
      this.items = Object.values(items);
    },
    onHome() {
      this.items = [];
      this.updateCurrentDepartments([]);
    },
    onGoTarget(item, i) {
      const position = this.items;
      this.items.splice(i + 1, position.length - 1);
      this.updateCurrentDepartments([item]);
    },
  },
};
</script>

<style lang="less">
.df-addressbook {
  .position {
    display: flex;
    align-items: center;
    height: 40px;
    color: #a0a5ab;
    background-color: #fff;
    padding-left: 16px;
    margin-bottom: 10px;

    .home-icon {
      color: #2d8cf0;
      margin-right: 5px;
    }

    .item .ivu-icon {
      color: #a0a5ab;
    }
  }
}
</style>
