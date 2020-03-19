<template>
  <div class="select">
    <div class="pannel-title">已选择列表</div>
    <div class="pannel-content">
      <div v-if="selectedItems.length" class="list-container">
        <div class="list-item" v-for="(item, i) in selectedItems" :key="i">
          <div class="img">
            <Icon type="ios-person" />
          </div>
          <div class="item-text">{{item.nodeText}}</div>
          <a href="javascript:void(0);" class="remove-btn" @click="onRemove(item)">
            <Icon class="icon" type="md-trash" :size="13" />
            <span class="text">移除</span>
          </a>
        </div>
      </div>
      <div v-else class="no-select-content">
        <Icon type="ios-alert" :size="90" />
        <h4>{{noData}}</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectBoxSelect",
  props: {
    selectedItems: {
      type: Array,
      default: () => {
        return [];
      }
    },
    noData: {
      type: String,
      default: "请选择角色"
    }
  },
  computed: {
    showTitleClass() {
      return "pannel-title";
      //   const baseClass = "pannel-title";
      //   return classNames({
      //     [baseClass]: true,
      //     [`${baseClass}_show`]: this.show
      //   });
    }
  },
  methods: {
    onRemove(item) {
      this.$emit("on-selectbox-remove", item);
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
.df-selectbox {
  .select {
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

      .list-item {
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
          .ivu-icon {
            color: #fff;
            font-size: 20px;
            margin-top: -2px;
          }

          span {
            color: #fff;
            font-size: 16px;
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