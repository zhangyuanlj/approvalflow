<template>
  <div class="df-form-preview">
    <div class="header">
      <ul class="header-nav">
        <li @click="onClick(0)">
          <Icon type="md-home" :size="iconSize" />
          <h4>主页</h4>
        </li>
        <li @click="onClick(1)">
          <Icon type="ios-create" :size="iconSize" />
          <h4>编辑</h4>
        </li>
      </ul>
    </div>
    <div class="content">
      <div class="web-preview">
        <h1 class="df-form-preview_title">{{getBasicSetting.approvalName}}</h1>
        <p
          v-if="getBasicSetting.approvalStatement !== ''"
          class="df-form-preview_describe"
        >{{getBasicSetting.approvalStatement}}</p>
        <FormRender></FormRender>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_BASIC_SETTING } from "store/modules/basicSetting/type";
import { mapGetters } from "vuex";
import FormRender from "FormRender/Web/Render.vue";
import { redirect } from "utils/helper";
import "view-design/dist/styles/iview.css";
export default {
  name: "FormView",
  components: { FormRender },
  data() {
    return {
      iconSize: 24
    };
  },
  computed: {
    ...mapGetters({
      getBasicSetting: GET_BASIC_SETTING
    })
  },
  methods: {
    getId() {
      return this.$Route.getParam("id");
    },
    onClick(i) {
      const id = this.getId();
      let href = "";
      if (i === 0) {
        href = `basicSetting/`;
      } else {
        href = id ? `basicSetting/?id=${id}` : `basicSetting/`;
      }
      redirect(href);
    }
  }
};
</script>
<style lang="less">
@import "~components/Styles/index.module.less";
.df-form-preview {
  margin-top: 0;
}
</style>