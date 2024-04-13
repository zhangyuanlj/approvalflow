<template>
  <div>
    <div class="v-uploader-list">
      <div :class="setItemClass(item)" v-for="(item,i) in fileList" :key="i" :title="item.name">
        <div :class="setThumb(item)" :style="setImage(item)"></div>
        <div :class="setDetailClass(item)">
          <strong>{{item.name}}</strong>
          <p>{{bytesToSize(item.size)}}</p>
        </div>
        <div class="more">
          <span v-if="showViewIcon(item)" class="more-icon" @click="onView(item,i)">
            <Icon type="ios-eye"></Icon>
          </span>
          <span class="more-icon" @click="onDelete(i)">
            <Icon type="ios-trash-outline"></Icon>
          </span>
        </div>
        <div v-if="item.uploading" class="progress">
          <Progress :percent="item.percent" :stroke-color="['#108ee9', '#87d068']" hide-info />
        </div>
      </div>
      <div class="item-clear"></div>
    </div>
    <ImageViewer ref="imageViewer"></ImageViewer>
  </div>
</template>

<script>
import { ImageViewer } from "components/Common/ImageViewer";
import { testImage, bytesToSize } from "./scripts/utils";
import classNames from "classnames";
const FILE_TYPE = {
  doc: "thumb-word",
  docx: "thumb-word",
  xls: "thumb-excel",
  xlsx: "thumb-excel",
  ppt: "thumb-ppt",
  mp3: "thumb-sound",
  wav: "thumb-sound",
  mp4: "thumb-video",
  avi: "thumb-video",
  mkv: "thumb-video",
  zip: "thumb-zip",
  rar: "thumb-zip"
};
export default {
  name: "UploaderList",
  components: {
    ImageViewer
  },
  data() {
    return {
      imageList: []
    };
  },
  props: {
    fileList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  watch: {
    fileList: {
      handler() {
        this.getImageList();
      },
      deep: true
    }
  },
  mounted() {
    this.$imageViewer = this.$refs.imageViewer;
    this.getImageList();
  },
  methods: {
    testImage: testImage,
    bytesToSize(size) {
      if (isNaN(size)) {
        return size;
      }
      return bytesToSize(size);
    },
    getImageList() {
      const list = [];
      this.fileList.forEach(item => {
        list.push(item.imgUrl);
      });
      this.imageList = list;
    },
    setItemClass(file) {
      const baseClass = "item";
      return classNames({
        [`${baseClass}`]: true,
        [`${baseClass}-uploading`]: file.uploading
      });
    },
    setDetailClass(file) {
      const baseClass = "detail";
      return classNames({
        [`${baseClass}`]: true,
        [`${baseClass}-error`]: file.uploadErr
      });
    },
    setThumb(file) {
      const styleName = "icon";
      if (this.testImage(file)) {
        return `${styleName} thumb-image`;
      } else {
        const name = file.name;
        for (let key in FILE_TYPE) {
          if (name.indexOf(key) != -1) {
            return `${styleName} ${FILE_TYPE[key]}`;
          }
        }
        return `${styleName} thumb-file`;
      }
    },
    setImage(file) {
      const imgUrl = file.imgUrl;
      window.console.log(imgUrl);
      if (file.imgUrl) {
        return {
          "background-image": `url('${imgUrl}')`
        };
      }
      return null;
    },
    showViewIcon(file) {
      return !file.uploadErr && this.testImage(file);
    },
    onView(file, i) {
      this.$imageViewer.onReset();
      this.$imageViewer.viewImages(this.imageList, file.imgUrl);
      this.$imageViewer.moveImageIndex(i);
    },
    onDelete(i) {
      this.$emit("on-delete", i);
    }
  }
};
</script>

<style lang="less">
@item-height: 50px;
.v-uploader-list {
  .item {
    position: relative;
    float: left;
    width: 210px;
    height: @item-height;
    margin-right: 10px;
    margin-bottom: 10px;
    background-color: #f3f3f3;
    border: 1px solid #eee;
    border-radius: 5px;
    &-clear {
      clear: both;
    }
    .progress {
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      width: 100%;
      height: @item-height;
      justify-content: center;
      align-items: center;
      padding: 0 10px;
      background-color: rgba(0, 0, 0, 0.4);
      border-radius: 5px;
      z-index: 10;
    }
    .icon {
      position: relative;
      float: left;
      width: 50px;
      height: 48px;
      background-color: #fff;
      background-image: url("./images/file.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: auto @item-height;
      border-radius: 5px;
      overflow: hidden;
      z-index: 10;
    }

    .thumb-image {
      background-image: url("./images/img.png");
    }

    .thumb-word {
      background-image: url("./images/word.png");
    }

    .thumb-excel {
      background-image: url("./images/excel.png");
    }

    .thumb-ppt {
      background-image: url("./images/ppt.png");
    }

    .thumb-sound {
      background-image: url("./images/sound.png");
    }

    .thumb-video {
      background-image: url("./images/video.png");
    }

    .thumb-zip {
      background-image: url("./images/zip.png");
    }

    .detail {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-right: 15px;
      margin-left: 62px;

      strong {
        display: inline-block;
        width: 60%;
        height: 30px;
        color: #515a6e;
        font-weight: 500;
        font-size: 13px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      p {
        color: #bfbfbf;
        font-size: 12px;
        line-height: 12px;
      }
    }

    .detail-error {
      strong,
      p {
        color: #ff0000;
      }
    }

    .more {
      display: flex;
      justify-content: flex-end;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: @item-height;
      line-height: @item-height;
    }

    .more-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: @item-height;
      color: #fff;
      color: #515a6e;
      font-size: 22px;
      cursor: pointer;
      vertical-align: -8px;
    }
  }

  .item:not(.item-uploading):hover .more {
    opacity: 1;
  }
}
@media screen and (min-width: 320px) and (max-width: 768px) {
  .v-uploader-list {
    .item {
      float: none;
      width: 100%;
      margin-right: 0;
    }
  }
}
</style>