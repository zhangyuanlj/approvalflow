<template>
  <div class="treelist">
    <div v-for="(item ,i) in data" :key="i">
      <TreeListItem :itemData="item" :multiple="multiple" @on-selectbox-selected="onSelected"></TreeListItem>
    </div>
  </div>
</template>

<script>
import TreeListItem from "./TreeListItem.vue";
export default {
  name: "TreeList",
  components: {
    TreeListItem
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    selectedItems: {
      type: Array,
      default: () => {
        return [];
      }
    },
    multiple: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onSelected(selectedItem) {
      const selectedItems = {};
      if (this.multiple) {
        this.selectedItems.forEach(item => {
          selectedItems[item.id] = item;
        });
        if (selectedItem.checked) {
          selectedItems[selectedItem.id] = selectedItem;
        } else {
          delete selectedItems[selectedItem.id];
        }
      } else {
        selectedItems[selectedItem.id] = selectedItem;
      }
      this.$emit("on-selectbox-selected", Object.values(selectedItems));
    }
  }
};
</script>
<style lang="less">
.df-selectbox {
  .treelist {
    &-item {
      font-size: 14px;
      display: flex;
      align-items: center;
      line-height: 37px;
      padding: 0px 20px;
      overflow: hidden;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
      .ivu-checkbox-wrapper {
        margin-right: 2px;
      }
      .ivu-icon {
        color: #399efa;
        font-size: 16px;
        margin-right: 3px;
      }
      .fold-icon {
        color: #7d8790;
        font-size: 22px;
        transition: transform 0.2s ease-in-out;
      }
      &-text {
        display: inline-block;
        width: 80%;
      }
      &:hover {
        background-color: #ebf7ff;
      }
      &_open {
        .fold-icon {
          transform: rotate(90deg);
        }
      }
    }
    .treelist-children {
      padding-left: 25px;
    }
  }
}
</style>