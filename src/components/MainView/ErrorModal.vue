<template>
  <Modal
    v-model="modalVisible"
    class-name="df-error-modal"
    title="错误提示"
    :width="400"
    :fullscreen="isMobile"
    cancel-text="我知道了"
    ok-text="前往修改"
    @on-ok="onConfirm"
  >
    <Alert type="error" show-icon>当前无法发布</Alert>
    <p class="error-title">以下内容不完善，需进行修改</p>
    <div class="error-item" v-for="(item, i) in items" :key="i">
      <h4>{{setGroup(item)}}</h4>
      <span>{{item.nodeText}} {{item.message}}</span>
    </div>
  </Modal>
</template>

<script>
import { GET_ERROR_LIST } from "store/modules/common/type";
import { mapGetters } from "vuex";
import { redirect, isMobile } from "utils/helper";
export default {
  name: "ErrorModal",
  data() {
    return {
      items: [],
      modalVisible: false,
      isMobile: isMobile(),
      group: "basicSetting",
      url: ""
    };
  },
  computed: {
    ...mapGetters({
      errorList: GET_ERROR_LIST
    })
  },
  methods: {
    setItems() {
      this.items = Object.values(this.errorList);
    },
    setGroup(item) {
      const group = item.group;
      if (group === "basicSetting") {
        return "基础设置";
      } else if (group === "formDesign") {
        return "表单设计";
      } else if (group === "process") {
        return "流程设计";
      }
    },
    getId() {
      return this.$Route.getParam("id");
    },
    show() {
      const errorList = Object.values(this.errorList);
      this.modalVisible = true;
      this.group = errorList[0].group;
      this.setItems();
      if (this.group === "basicSetting") {
        this.url = "basicSetting/";
      } else if (this.group === "formDesign") {
        this.url = "webFormDesign/";
      } else if (this.group === "process") {
        this.url = "processDesign/";
      }
    },
    hide() {
      this.modalVisible = false;
    },
    onConfirm() {
      const id = this.getId();
      let href = this.url;
      if (id) {
        href += `?id=${id}`;
      }
      redirect(href);
    }
  }
};
</script>

<style lang="less">
.df-error-modal {
  .error-title {
    font-size: 13px;
    color: rgba(25, 31, 37, 0.56);
    line-height: 22px;
    margin-bottom: 14px;
  }

  .error-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 21px;
    background: #f6f6f6;
    padding: 10px 20px;
    margin-bottom: 8px;
    border-radius: 4px;

    h4 {
      color: rgba(25, 31, 37, 0.56);
      font-size: 15px;
      font-weight: 400;
      padding-right: 10px;
    }

    span {
      text-align: right;
      flex: 1;
      font-size: 13px;
      color: #191f25;
    }
  }
}
</style>
