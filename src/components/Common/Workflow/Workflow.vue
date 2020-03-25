<template>
  <div id="df-process-design" :class="setClass">
    <div class="main" :style="setZoom">
      <Originator id="originator-node" :nodeData="originatorData"></Originator>
      <div class="node-wrap-cntainer" v-for="item in nodesData" :key="item.id">
        <ProcessNode :nodeData="item"></ProcessNode>
      </div>
      <End id="end-node" :nodeData="endData"></End>
    </div>
    <div class="zoom non-select-text">
      <div class="zoom-out" @click="onZoomOut">
        <Icon type="md-remove" />
      </div>
      <span>{{zoomValue}}%</span>
      <div class="zoom-in" @click="onZoomIn">
        <Icon type="md-add" />
      </div>
    </div>
    <div class="clear-fl"></div>
    <WorkflowNodeModal></WorkflowNodeModal>
  </div>
</template>

<script>
import $ from "jquery";
import { GET_NODES_DATA } from "store/modules/workflow/type";
import { mapGetters } from "vuex";
import Originator from "./Originator.vue";
import End from "./End.vue";
import WorkflowNodeModal from "./Modal.vue";
import { isIe } from "utils/helper";
import classNames from "classnames";
import "./Workflow.less";
const MIN_ZOOM_VALUE = 50;
const MAX_ZOOM_VALUE = 300;
export default {
  name: "Workflow",
  components: {
    Originator,
    End,
    WorkflowNodeModal
  },
  data() {
    return {
      originatorData: {},
      nodesData: [],
      endData: {},
      zoomValue: 100
    };
  },
  watch: {
    processNodesData: {
      handler(val) {
        this.setData(val);
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters({
      processNodesData: GET_NODES_DATA
    }),
    setZoom() {
      const scale = `scale(${this.zoomValue / 100})`;
      return {
        "-moz-transform": scale,
        "-webkit-transform": scale,
        "-ms-transform": scale,
        transform: scale
      };
    },
    setClass() {
      const baseClass = "df-process-design";
      return classNames({
        [baseClass]: true,
        [`${baseClass}_for-ie`]: isIe()
      });
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.setData(this.processNodesData);
      this.$nextTick(() => {
        this.setScrollLeft();
      });
    },
    setData(val) {
      this.originatorData = val[0];
      this.nodesData = val.length === 2 ? null : val.slice(1, val.length - 1);
      this.endData = val[val.length - 1];
    },
    setScrollLeft() {
      const $dfProcessDesign = $("#df-process-design");
      const $originatorNode = $("#originator-node .process-node");
      const left = $originatorNode.offset().left;
      $dfProcessDesign.scrollLeft(left);
    },
    onZoomOut() {
      let value = this.zoomValue;
      value -= 10;
      if (value <= MIN_ZOOM_VALUE) {
        value = MIN_ZOOM_VALUE;
      }
      this.zoomValue = value;
      return false;
    },
    onZoomIn() {
      let value = this.zoomValue;
      value += 10;
      if (value >= MAX_ZOOM_VALUE) {
        value = MAX_ZOOM_VALUE;
      }
      this.zoomValue = value;
      return false;
    }
  }
};
</script>