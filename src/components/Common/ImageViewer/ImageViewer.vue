<template>
  <div v-if="visible" class="v-image-viewer" :style="wrapperPostionStyle">
    <div class="v-image-viewer-mask"></div>
    <div @click="onClose" v-if="showBtnClose" class="v-image-viewer-btn-close" title="关闭"></div>
    <div ref="imageViewContainer" class="v-image-viewer-container">
      <ImageHolder
        ref="ImageHolder"
        :getImageViewContainer="getImageViewContainer"
        v-if="imageList.length > 0"
        :rotate="rotate"
        :scale="scale"
        :src="currentImageUrl"
      />
    </div>
    <div class="v-image-viewer-tool-bar">
      <ul>
        <li v-if="imageList.length > 1" @click="onBackward" action="backward" title="上一张"></li>
        <li @click="onReset" action="reset" title="还原"></li>
        <li @click="onZoomIn" action="zoom-in" title="放大"></li>
        <li @click="onZoomOut" action="zoom-out" title="缩小"></li>
        <li @click="onRotate" action="rotate" title="旋转"></li>
        <li v-if="imageList.length > 1" @click="onForward" action="forward" title="下一张"></li>
      </ul>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import ImageHolder from "./ImageHolder.vue";
import "./styles/imageViewer.less";
export default {
  name: "ImageViewer",
  components: {
    ImageHolder
  },
  props: {
    fixed: {
      type: Boolean,
      default: true
    },
    showBtnClose: {
      type: Boolean,
      default: true
    },
    defaultVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: this.defaultVisible,
      wrapperPostionStyle: `position: ${this.fixed ? "fixed" : "absolute"}`,
      rotate: 0,
      scale: 100,
      imageIndex: 0,
      x: 0,
      y: 0,
      imageList: [],
      getImageUrl: function(item) {
        return item;
      }
    };
  },
  computed: {
    currentImageUrl: function() {
      let total = this.imageList.length;
      if (total) {
        let item = this.imageList[this.imageIndex];
        window.console.log("RouteEditor.indexChange = ", this.imageIndex);
        this.$emit("indexChange", this.imageIndex);
        return this.getImageUrl.call(item, item);
      } else {
        window.console.log("RouteEditor.indexChange = ", this.imageIndex);
        this.$emit("indexChange", 0);
        return "";
      }
    }
  },
  created() {},
  methods: {
    moveImageIndex(step) {
      let total = this.imageList.length;
      let imageIndex = this.imageIndex + total + step;
      imageIndex = imageIndex % total;
      this.imageIndex = imageIndex;
    },
    getImageViewContainer() {
      return this.$refs.imageViewContainer;
    },
    onBackward() {
      this.onReset();
      this.moveImageIndex(-1);
    },
    onReset() {
      if (this.$refs.ImageHolder) {
        this.$refs.ImageHolder.reset();
      }
      this.rotate = 0;
      this.scale = 100;
    },
    onZoomIn() {
      this.scale += 20;
    },
    onZoomOut() {
      let scale = this.scale - 20;

      if (scale > 0) {
        this.scale = scale;
      }
    },
    onRotate() {
      let rotate = this.rotate + 90;
      this.rotate = rotate % 360;
    },
    onForward() {
      this.onReset();
      this.moveImageIndex(1);
    },
    viewImages(imageList, getImageUrl) {
      const self = this;
      this.imageList = imageList;
      this.imageIndex = 0;
      if (typeof getImageUrl === "function") {
        this.getImageUrl = getImageUrl;
      } else {
        this.getImageUrl = function(item) {
          return item;
        };
      }
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    getCurrentImageIndex() {
      return this.imageIndex;
    },
    getCurrentImage() {
      return this.imageList[this.imageIndex] || null;
    }
  }
};
</script>