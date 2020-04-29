<template>
  <div class="app-root">
    <div class="app-head clear-fl">
      <div class="goback" @click="onHome">
        <Icon type="md-arrow-back" />返回
      </div>
      <div class="title">{{basicSetting.approvalName}}</div>
      <!-- <div class="more" @click="onEdit">
        <Button type="text">编辑</Button>
      </div> -->
    </div>
    <FormRender></FormRender>
  </div>
</template>

<script>
import { GET_BASIC_SETTING } from "store/modules/basicSetting/type";
import { mapGetters } from "vuex";
import FormRender from "FormRender/Web/Render.vue";
import { commonMixin } from "mixins";
import "view-design/dist/styles/iview.css";
import "components/Styles/index.module.less";
import "components/MainView/styles/App.less";
export default {
  name: "AppFormView",
  components: { FormRender },
  mixins: [commonMixin],
  computed: {
    ...mapGetters({
      basicSetting: GET_BASIC_SETTING
    })
  },
  methods: {
    getId() {
      return this.$Route.getParam("id");
    },
    onHome() {
      this.goHome();
    },
    onEdit() {
      this.redirect("webFormDesign/");
    }
  }
};
</script>