<template>
  <img ref="image" :style="imageStyle" :src="src" />
</template>
<script>
/* eslint-disable */
import { isMobile } from "@/utils/helper";

const getPositon = function(event) {
  let target = event;
  if ("touches" in event && event.touches.length) {
    target = event.touches[0];
  }
  return {
    x: target.clientX,
    y: target.clientY
  };
};

const onStart = function(e) {
  let ImageHolder = this.$ImageHolder;
  let image = this;

  if (!ImageHolder) {
    window.window.console.error("The ImageHolder is not defined.");
    return;
  }

  let position = getPositon(e);

  image.dragStarted = true;
  image.startPointX = position.x;
  image.startPointY = position.y;
  image.initX = ImageHolder.x;
  image.initY = ImageHolder.y;

  // window.console.log('onStart');
};

const onMove = function(e) {
  let ImageHolder = this.$ImageHolder;
  let image = this;

  if (!ImageHolder) {
    window.console.error("The ImageHolder is not defined.");
    return;
  }

  if (image.dragStarted) {
    e.preventDefault();

    let position = getPositon(e);
    let deltaX = position.x - image.startPointX;
    let deltaY = position.y - image.startPointY;
    let rotate = ImageHolder.rotate;
    let scale = ImageHolder.scale;

    // 新版本浏览器不用处理，可能存在向后兼容
    // if (rotate % 360 === 0) {
    //   // 不处理
    // } else if (rotate % 270 === 0) {
    //   let temp = deltaX;
    //   deltaX = -deltaY;
    //   deltaY = temp;
    // } else if (rotate % 180 === 0) {
    //   deltaX = -deltaX;
    //   deltaY = -deltaY;
    // } else if (rotate % 90 === 0) {
    //   let temp = deltaX;
    //   deltaX = deltaY;
    //   deltaY = -temp;
    // }

    let radio = scale / 100;

    // deltaX *= radio;
    // deltaY *= radio;

    window.console.log(ImageHolder.rotate);

    ImageHolder.x = image.initX + deltaX;
    ImageHolder.y = image.initY + deltaY;
  }
};

const onEnd = function() {
  let ImageHolder = this.$ImageHolder;
  let image = this;

  if (!ImageHolder) {
    window.console.error("The ImageHolder is not defined.");
    return;
  }

  image.dragStarted = false;
};

export default {
  props: {
    rotate: {
      type: Number,
      default: 0
    },
    scale: {
      type: Number,
      default: 0
    },
    src: {
      type: String,
      default: ""
    },
    getImageViewContainer: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      initialY: 0,
      x: 0,
      y: 0,
      loaded: false,
      loadId: 0
    };
  },
  mounted() {
    let image = this.$refs.image;

    window.console.warn("ImageHolder has been mounted.");

    if (!image) {
      window.console.error("The <img> is not mounted!");
      return;
    }

    image.$ImageHolder = this;

    if (isMobile()) {
      image.removeEventListener("touchstart", onStart, false);
      image.removeEventListener("touchmove", onMove, false);
      image.removeEventListener("touchend", onEnd, false);
      image.removeEventListener("touchcancel", onEnd, false);

      image.addEventListener("touchstart", onStart, false);
      image.addEventListener("touchmove", onMove, false);
      image.addEventListener("touchend", onEnd, false);
      image.addEventListener("touchcancel", onEnd, false);
    } else {
      image.removeEventListener("mousedown", onStart, false);
      image.removeEventListener("mousemove", onMove, false);
      image.removeEventListener("mouseup", onEnd, false);
      image.removeEventListener("mouseleave", onEnd, false);

      image.addEventListener("mousedown", onStart, false);
      image.addEventListener("mousemove", onMove, false);
      image.addEventListener("mouseup", onEnd, false);
      image.addEventListener("mouseleave", onEnd, false);
    }

    this.loadImage(this.src);
  },
  computed: {
    imageStyle: function() {
      let style = `
        transform: rotate(${this.rotate}deg) scale(${this.scale / 100});
        opacity: ${this.loaded ? "1" : "0"};
        position: relative;
        top: ${this.y}px;
        left: ${this.x}px;
      `;
      return style;
    }
  },
  watch: {
    src: function(src) {
      this.loadImage(src);
    }
  },
  methods: {
    loadImage(src) {
      let image = document.createElement("img");
      let loadId = (this.loadId = this.loadId + 1);

      image.style.opacity = "0.001";

      this.loaded = false;

      this.$Loading.start();

      this.$emit("beforeLoad");

      image.onload = () => {
        if (loadId === this.loadId) {
          let container = this.getImageViewContainer();
          let containerHeight = container.offsetHeight;
          let containerWidth = container.offsetWidth;

          window.console.log("imageViewer", image.height, image.width);
          window.console.log("imageViewer", containerHeight, containerWidth);

          let x = (containerWidth - image.width) / 2;
          let y = (containerHeight - image.height) / 2;

          x = x > 0 ? x : 0;
          y = y > 0 ? y : 0;

          // this.x = x;
          this.initialY = this.y = y;

          if (image) {
            image.parentNode.removeChild(image);
          }
          this.$Loading.finish();
          this.$emit("load");
          this.loaded = true;
        } else if (image.parentNode) {
          image.parentNode.removeChild(image);
        }
      };

      image.onerror = () => {
        if (loadId === this.loadId) {
          if (image) {
            image.parentNode.removeChild(image);
          }
          this.loaded = false;
          this.$Loading.error();
          this.$Message.error("加载图片失败!");
          this.$emit("error");
          this.initialY = 0;
        }
      };

      image.src = src;

      document.body.appendChild(image);
    },
    reset() {
      this.x = 0;
      this.y = this.initialY;
    }
  }
};
</script>
