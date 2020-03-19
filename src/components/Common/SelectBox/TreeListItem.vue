<template>
  <div>
    <template v-if="itemData.children">
      <div :class="setTitleItemClass(itemData)" @click="onClickItem(itemData)">
        <Icon type="md-arrow-dropright" class="fold-icon" />
        <span class="treelist-item-text ellipsis">{{itemData.nodeText}}</span>
      </div>
      <div v-show="isVisible(itemData)" class="treelist-children">
        <div
          class="treelist-item"
          v-for="(item,i) in itemData.children"
          :key="i"
          @click="onSelected(item)"
        >
          <Checkbox v-if="multiple" v-model="item.checked"></Checkbox>
          <Icon type="ios-person" />
          <span class="treelist-item-text ellipsis">{{item.nodeText}}</span>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="treelist-item" @click="onSelected(itemData)">
        <Checkbox v-if="multiple" v-model="itemData.checked"></Checkbox>
        <Icon type="ios-person" />
        <span class="treelist-item-text ellipsis">{{itemData.nodeText}}</span>
      </div>
    </template>
  </div>
</template>

<script>
import classNames from "classnames";
export default {
  name: "TreeListItem",
  props: {
    itemData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    multiple: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    setTitleItemClass(item) {
      const baseClass = "treelist-item";
      return classNames({
        [baseClass]: true,
        ["non-select-text"]: true,
        [`${baseClass}_open`]: this.isVisible(item)
      });
    },
    isVisible(item) {
      return item.visible === undefined || item.visible;
    },
    onClickItem(item) {
      if (item.visible === undefined) {
        item.visible = false;
      } else {
        item.visible = !item.visible;
      }
      this.$forceUpdate();
    },
    onSelected(item) {
      let selectedItem = item;
      if (this.multiple) {
        item.checked = !item.checked;
      } else {
        item.checked = true;
      }
      this.$forceUpdate();
      this.$emit("on-selectbox-selected", selectedItem);
    }
  }
};
</script>