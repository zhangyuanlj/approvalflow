<template>
  <div class="checkall" v-if="multiple" @click="onCheckAll">
    <span :class="setCheckboxClass()">
      <Icon type="ios-checkmark-circle" size="18" />
    </span>全选
  </div>
</template>

<script>
import classNames from "classnames";
export default {
  name: "AddressBookCheckAll",
  data() {
    return {
      checked: false
    };
  },
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    checkAll: {
      type: Boolean,
      default: false
    },
    currentDepartments: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  watch: {
    currentDepartments: {
      handler() {
        this.checked = false;
      }
    },
    checkAll: {
      handler(val) {
        this.checked = val;
      }
    }
  },
  methods: {
    setCheckboxClass() {
      const baseClass = "checkbox";
      return classNames({
        [baseClass]: true,
        [`${baseClass}_checked`]: this.checked
      });
    },
    //全选、反选
    onCheckAll() {
      const checked = this.checked;
      this.checked = !checked;
      this.$emit("on-departments-checkall", this.checked);
    }
  }
};
</script>

<style lang="less">
.df-addressbook {
  .checkall {
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 20px;
    margin-bottom: 10px;
    background-color: #fff;
    cursor: pointer;
  }

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
}
</style>
