<template>
  <div class="form-design-thumb">
    <strong class="thumb-text">{{setText}}</strong>
    <img class="thumb-icon" :src="thumbIcon" />
  </div>
</template>

<script>
export default {
  name: "Thumb",
  props: {
    text: {
      type: String,
      value: ""
    },
    thumbIcon: {
      type: String,
      value: ""
    }
  },
  computed: {
    setText() {
      const reg = /（*?）/;
      if (reg.test(this.text)) {
        return this.text.substring(0, this.text.indexOf("（"));
      }
      return this.text;
    }
  }
};
</script>

<style lang="less">
.thumb() {
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}
.form-design-thumb {
  position: relative;
  width: 148px;
  height: 32px;
  line-height: 32px;
  padding-left: 15px;
  .thumb();
  overflow: hidden;
  cursor: move;
  .thumb-text {
    color: #191f25;
    font-size: 12px;
    font-weight: 500;
  }

  .thumb-icon {
    position: absolute;
    right: 7px;
    top: 50%;
    display: inline-block;
    height: 20px;
    width: 20px;
    margin-top: -10px;
  }

  &-proxy {
    position: absolute;
    pointer-events: none;
    z-index: 10;
  }
}
.thumb-item-hasdesc {
  overflow: hidden;
  .thumb-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 50px;
    .thumb();
    cursor: move;
  }
  .form-design-thumb {
    width: 146px;
    height: 24px;
    line-height: 24px;
    border: 0;
    border-radius: 0;
    overflow: visible;
  }
  .thumb-icon {
    margin-top: 0;
  }
  .desc {
    line-height: 18px;
    color: rgba(25, 31, 37, 0.4);
    font-size: 12px;
    padding-left: 15px;
  }
}
</style>
