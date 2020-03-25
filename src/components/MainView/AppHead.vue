<template>
  <div class="app-head clear-fl">
    <template v-if="currentLocation.indexOf('basicSetting') !== -1">
      <div class="goback" @click="onEdit">
        <Icon type="md-arrow-back" />返回
      </div>
      <div class="title">基础设置</div>
    </template>
    <template
      v-else-if="currentLocation.indexOf('webFormDesign') !== -1 || documentTitle.indexOf('表单') !== -1"
    >
      <div v-if="getId() !== null" class="goback" @click="onHome">
        <Icon type="md-arrow-back" />返回
      </div>
      <div class="title">编辑</div>
    </template>
    <template v-else-if="currentLocation.indexOf('processDesign') !== -1">
      <div class="goback" @click="onEdit">
        <Icon type="md-arrow-back" />返回
      </div>
      <div class="title">流程设置</div>
    </template>
    <template v-else-if="currentLocation.indexOf('advancedSetting') !== -1">
      <div class="goback" @click="onEdit">
        <Icon type="md-arrow-back" />返回
      </div>
      <div class="title">高级设置</div>
    </template>
    <template v-else>
      <div class="title">404</div>
    </template>
  </div>
</template>

<script>
import { commonMixin } from "mixins";
import { redirect } from "utils/helper";
export default {
  name: "AppHead",
  mixins: [commonMixin],
  data() {
    return {
      documentTitle: window.document.title
    };
  },
  props: {
    currentLocation: {
      type: String,
      default: window.location.href
    }
  },
  updated() {
    this.documentTitle = window.document.title;
  },
  methods: {
    getId() {
      return this.$Route.getParam("id");
    },
    onHome() {
      const href = "form/";
      redirect(href);
    },
    onEdit() {
      const href = "webFormDesign/";
      redirect(href);
    }
  }
};
</script>