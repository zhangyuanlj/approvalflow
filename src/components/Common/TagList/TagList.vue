<template>
  <div class="df-taglist">
    <Tag v-for="(item, i) in data" :key="i" closable :title="setName(item)" @on-close="onCloseCbs(item)">{{setName(item)}}</Tag>
    <a
      v-if="data.length && showClearBtn"
      class="clear-btn"
      href="javascript:void(0);"
      @click="onClear"
    >清空</a>
  </div>
</template>

<script>
export default {
  name: "TagList",
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    textFieldName: {
      type: String,
      default: "text"
    },
    showClearBtn: {
      type: Boolean,
      default: true
    },
    onCloseCbs: {
      type: Function,
      default: () => {
        return () => {};
      }
    },
    onClearCbs: {
      type: Function,
      default: () => {
        return () => {};
      }
    }
  },
  methods: {
    setName(item) {
      return item[this.textFieldName]
        ? item[this.textFieldName]
        : item["menuName"];
    },
    onClear() {
      this.onClearCbs();
    }
  }
};
</script>
<style lang="less">
.df-taglist {
  .clear-btn {
    margin-left: 10px;
  }
}
</style>