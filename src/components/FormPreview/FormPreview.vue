<template>
  <div class="df-form-preview">
    <div class="header">
      <ul class="header-nav">
        <li :class="setClass(0)" @click="onClick(0)">
          <Icon type="ios-desktop-outline" :size="iconSize" />
          <h4>电脑端</h4>
        </li>
        <li :class="setClass(1)" @click="onClick(1)">
          <Icon type="ios-phone-portrait" :size="iconSize" />
          <h4>手机端</h4>
        </li>
      </ul>
    </div>
    <div class="content">
      <div v-if="activeIndex === 0" class="web-preview">
        <h1 class="df-form-preview_title">{{getBasicSetting.approvalName}}</h1>
        <p
          v-if="getBasicSetting.approvalStatement !== ''"
          class="df-form-preview_describe"
        >{{getBasicSetting.approvalStatement}}</p>
        <FormRender :isPreview="true"></FormRender>
      </div>
      <div v-if="activeIndex === 1" class="app-preview">
        <div class="top">
          <h1 class="df-form-preview_title">{{getBasicSetting.approvalName}}</h1>
          <p
            v-if="getBasicSetting.approvalStatement !== ''"
            class="df-form-preview_describe"
          >{{getBasicSetting.approvalStatement}}</p>
        </div>
        <FormRender :isPreview="true"></FormRender>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_BASIC_SETTING } from "store/modules/basicSetting/type";
import { mapGetters } from "vuex";
import FormRender from "FormRender/Web/Render.vue";
import classNames from "classnames";
import "view-design/dist/styles/iview.css";
export default {
  name: "FormPreviewView",
  components: { FormRender },
  data() {
    return {
      iconSize: 24,
      activeIndex: 0
    };
  },
  computed: {
    ...mapGetters({
      getBasicSetting: GET_BASIC_SETTING
    })
  },
  methods: {
    setClass(i) {
      return classNames({
        ["current"]: this.activeIndex === i
      });
    },
    onClick(i) {
      this.activeIndex = i;
    }
  }
};
</script>