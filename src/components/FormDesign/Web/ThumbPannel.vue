<template>
  <div id="thumb-pannel" class="thumb-pannel">
    <Tabs>
      <TabPane label="控件库">
        <div
          v-for="(model,i) in thumbModel.widgets"
          :key="i"
          class="thumb-item"
          :data-name="model.name"
          :data-component="model.component"
        >
          <component :is="model.thumb"></component>
        </div>
      </TabPane>
      <TabPane label="出勤套件" :class="setWidgetsClass">
        <div
          v-for="(model,i) in thumbModel.works"
          :key="i"
          class="thumb-item"
          :data-name="model.name"
          :data-component="model.component"
          data-has-widget="true"
        >
          <component :is="model.thumb"></component>
        </div>
      </TabPane>
      <TabPane label="人事套件" :class="setWidgetsClass">
        <div
          v-for="(model,i) in thumbModel.personnel"
          :key="i"
          class="thumb-item thumb-item-hasdesc"
          :data-name="model.name"
          :data-component="model.component"
          data-has-widget="true"
        >
          <component :is="model.thumb"></component>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import { GET_HAS_WIDGET, UPDATE_IS_DRAG } from "store/modules/formDesign/type";
import { mapGetters, mapMutations } from "vuex";
import { Tabs, TabPane } from "view-design";
import Draggle from "libs/Draggle";
export default {
  name: "ThumbPannel",
  components: {
    Tabs,
    TabPane
  },
  data() {
    return {
      thumbModel: this.componentModel
    };
  },
  computed: {
    setWidgetsClass() {
      if (this.getHasWidget) {
        return `thumb-pannel_disable`;
      }
      return undefined;
    },
    ...mapGetters({
      getHasWidget: GET_HAS_WIDGET
    })
  },
  created() {
    this.baseClass = "thumb-item";
  },
  mounted() {
    this.draggle = new Draggle({
      onMove: this.onMove,
      onMoveEnd: this.onMoveEnd
    });
  },
  beforeDestroy() {
    this.draggle.destroy();
  },
  methods: {
    ...mapMutations({
      updateIsDrag: UPDATE_IS_DRAG
    }),
    onMove() {
      this.updateIsDrag(true);
    },
    onMoveEnd(item) {
      this.updateIsDrag(false);
      this.$emit("on-move-end", item);
    }
  }
};
</script>

<style lang="less">
@import "~components/Styles/base.module.less";

.thumb-pannel {
  position: fixed;
  left: 0;
  top: @head-height;
  bottom: 0;
  width: 350px;
  background-color: #fff;
  overflow-y: auto;
  overflow-y: overlay;

  .ivu-tabs-bar {
    text-align: center;
    margin-bottom: 20px;
  }

  .ivu-tabs-nav {
    display: inline-block;
    float: none;

    .ivu-tabs-tab:last-child {
      margin-right: 0;
    }
  }

  .ivu-tabs-tabpane {
    font-size: 0;
    padding: 0 8px;
  }

  .thumb-item {
    display: inline-block;
    margin-right: 9px;
    margin-bottom: 10px;
  }
  &_disable {
    .thumb-item {
      opacity: 0.2;
    }
    .form-design-thumb {
      cursor: not-allowed;
    }
  }
}
</style>
