<template>
  <div class="df-selectbox">
    <div class="selectbox-content">
      <div class="left">
        <div class="search-container">
          <Input prefix="ios-search" placeholder="搜索" @on-change="onChange" />
        </div>
        <div class="left-content">
          <div v-show="loading" class="loading">
            <Icon type="ios-loading" :size="16" />搜索中,请稍后...
          </div>
          <TreeList
            :data="listData"
            :selectedItems="selectedItems"
            :multiple="multiple"
            @on-selectbox-selected="onSelected"
          ></TreeList>
        </div>
      </div>
      <div :class="setRightClass">
        <Select :selectedItems="selectedItems" :noData="noData" @on-selectbox-remove="onRemove"></Select>
      </div>
    </div>
  </div>
</template>

<script>
import TreeList from "./TreeList.vue";
import Select from "./Select.vue";
import classNames from "classnames";
import { searchName, checkedNodes, unChecked } from "./scripts/utils";
export default {
  name: "SelectBox",
  components: {
    TreeList,
    Select
  },
  data() {
    return {
      loading: false,
      listData: [],
      selectedItems: []
    };
  },
  props: {
    value: {
      type: Array,
      default: () => {
        return [];
      }
    },
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    multiple: {
      type: Boolean,
      default: true
    },
    noData: {
      type: String,
      default: "请选择角色"
    }
  },
  watch: {
    value: {
      handler(val) {
        this.setSelectedItems(val);
      }
    },
    data: {
      handler() {
        this.init();
      }
    }
  },
  computed: {
    setRightClass() {
      const baseClass = "right";
      return classNames({
        [baseClass]: true,
        [`${baseClass}_show`]: this.showRight
      });
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    deleteNode(node) {
      this.selectedItems.forEach((item, i) => {
        if (item.id === node.id) {
          this.selectedItems.splice(i, 1);
        }
      });
    },
    init() {
      this.setSelectedItems(this.value);
      this.setListData(this.data);
    },
    setSelectedItems(value) {
      this.selectedItems = value;
    },
    setListData(data) {
      if (this.multiple) {
        this.listData = checkedNodes(data, this.selectedItems);
      } else {
        this.listData = data;
      }
    },
    getData() {
      return this.selectedItems;
    },
    onChange(e) {
      const value = e.target.value;
      this.loading = true;
      if (value === "") {
        this.listData = this.data;
      } else {
        this.listData = searchName(this.listData, value);
      }
      this.$nextTick(() => {
        this.loading = false;
      });
    },
    onSelected(selectedItems) {
      this.selectedItems = selectedItems;
    },
    onRemove(item) {
      this.deleteNode(item);
      this.listData = unChecked(this.listData, item);
    }
  }
};
</script>
<style lang="less">
.df-selectbox {
  font-size: 13px;
  background-color: #f6f6f6;
  .search-container {
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 20px;
    background-color: #fff;
  }
  .selectbox-content {
    display: flex;
    .left,
    .right {
      flex: 1;
      height: 370px;
      background-color: #fff;
      &-content {
        height: 320px;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }
    }
    .left {
      .loading {
        color: #a3a3a3;
        padding: 7px 20px;
        .ivu-icon {
          margin-right: 8px;
          animation: loading 1s linear infinite;
        }
      }
    }
    .right {
      margin-left: 10px;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
  }
}

@media screen and (min-width: 320px) and (max-width: 768px) {
  .df-selectbox {
    .selectbox-content {
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

        &_show {
          transform: translateY(0);
        }
      }
    }
  }
}
@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>