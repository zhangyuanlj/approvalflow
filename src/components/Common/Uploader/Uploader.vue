<template>
  <div class="v-uploader">
    <List v-if="fileList.length" :fileList="fileList" @on-delete="onDelete"></List>
    <div class="upload-button">
      <Icon type="ios-add" />
    </div>
  </div>
</template>

<script>
import config from "@/config";
import $ from "jquery";
import Plupload from "plupload";
import List from "./List.vue";
import { redirect, isMobile } from "@/utils/helper";
const IMG_MAX_W = 1280;
const IMG_MAX_H = 720;
import { testImage, bytesToSize } from "./scripts/utils";
export default {
  name: "Uploader",
  components: {
    List: List
  },
  data() {
    return {
      fileList: []
    };
  },
  props: {
    //请求地址
    action: {
      type: String,
      default: "//jsonplaceholder.typicode.com/posts/"
    },
    uploadedList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    //是否触发自动上传
    autoUpload: {
      type: Boolean,
      default: true
    },
    //请求附加请求头
    headers: {
      type: Object
    },
    //是否允许多选
    multiple: {
      type: Boolean,
      default: true
    },
    //允许上传的文件数量
    acceptFileNum: {
      type: Number,
      default: 10
    },
    //上传时附带的额外参数
    data: {
      type: Object,
      default: () => {}
    },
    //上传的文件字段名
    name: {
      type: String,
      default: "file"
    },
    //接受上传的文件类型，值为包含文件后缀名的数组
    accept: {
      type: Array,
      default: () => {
        return [];
      }
    },
    //文件大小限制
    maxSize: {
      type: String,
      default: "1mb"
    },
    //图片压缩配置
    resize: {
      type: Object,
      default: () => {
        return {
          width: IMG_MAX_W,
          height: IMG_MAX_H
        };
      }
    },
    //自定义服务器返回的文件名、地址字段名称
    severFileField: {
      type: Object,
      default: () => {
        return {
          name: "fileName",
          imgUrl: "fileServerPath"
        };
      }
    }
  },
  watch: {
    uploadedList: {
      handler() {
        this.setUploadedList();
      }
    }
  },
  mounted() {
    this.$uploder = $(this.$el);
    this.$button = this.$uploder.find(".upload-button");
    this.initUploader();
  },
  methods: {
    bytesToSize: bytesToSize,
    //创建Uploader配置项
    setOptions() {
      const self = this;
      const resize = {
        width: this.resize.width >= IMG_MAX_W ? IMG_MAX_W : this.resize.width,
        height:
          this.resize.height >= IMG_MAX_H ? IMG_MAX_H : this.resize.height,
        crop: false,
        quality: 60
      };
      const filters = {
        max_file_size: this.maxSize
      };
      if (this.accept.length) {
        filters["mime_types"] = [self.setMimeType()];
      }
      const options = {
        runtimes: "html5,html4",
        browse_button: this.$button[0],
        url: this.action,
        filters: filters,
        headers: this.headers,
        multi_selection: this.multiple,
        file_data_name: this.name,
        unique_names: true,
        //使用该参数对将要上传的图片进行压缩（仅对图片上传控件有效）
        resize: resize,
        init: {
          PostInit: self.onPostInit,
          FilesAdded: self.onFilesAdded.bind(this),
          BeforeUpload: self.onBeforeUpload,
          UploadProgress: self.onUploadProgress.bind(this),
          FileUploaded: self.onFileUploaded,
          UploadComplete: self.onUploadComplete,
          Error: self.onError
        }
      };
      return options;
    },
    setUploadedList() {
      const fileList = this.fileList;
      this.fileList = [...this.uploadedList, ...fileList];
    },
    initUploader() {
      //实例化plupload
      const options = this.setOptions();
      this.uploader = new Plupload.Uploader(options);
      this.uploader.init();
      //微信浏览器必须将input的accept属性去掉，不然无法掉起文件选择浏览框
      if (isMobile()) {
        setTimeout(() => {
          this.$uploder.find("input[type='file']").removeAttr("accept");
        }, 0);
      }
    },
    setMimeType() {
      return {
        title: "attachment",
        extensions: this.accept.join(",")
      };
    },
    isAcceptFileNum(files) {
      if (files.length + this.fileList.length > this.acceptFileNum) {
        return false;
      }
      return true;
    },
    onPostInit() {
      this.$emit("on-init", this.fileList);
    },
    onFilesAdded(up, files) {
      if (!this.isAcceptFileNum(files)) {
        this.$Message.error({
          content: `只允许上传${this.acceptFileNum}个文件，请删除其他文件再进行上传！`
        });
        return;
      }
      const fileList = [];
      files.forEach(item => {
        item["uploadErr"] = false;
        item["uploading"] = false;
        fileList.push(item);
        if (this.autoUpload) {
          this.uploader.start();
        }
      });
      this.fileList = [...this.fileList, ...fileList];
      this.$emit("on-files-added", this.fileList);
    },
    onBeforeUpload() {
      this.$emit("on-before-upload", this.fileList);
    },
    onUploadProgress(up, file) {
      file["uploading"] = true;
      this.$emit("on-upload-progress", file);
    },
    onFileUploaded(up, file, res) {
      const response = JSON.parse(res.response);
      const data = response.data;
      const code = parseInt(response.code);
      if (code === 1) {
        file["name"] = data[this.severFileField.name];
        file["data"] = data;
        if (testImage(file)) {
          file["imgUrl"] = data[this.severFileField.imgUrl];
        }
      }
      //没有登录
      else if (code === 3) {
        const loginUrl = config.loginUrl;
        redirect(loginUrl);
      }
      file["uploading"] = false;
      this.$emit("on-file-uploaded", file);
    },
    onUploadComplete(up, files) {
      const fileList = [];
      files.forEach(item => {
        fileList.push(item.data);
      });
      this.$emit("on-upload-complete", fileList);
    },
    onError(up, err) {
      const code = err.code;
      const fileName = err.file.name;
      let errMsg = `上传${fileName}时产生错误，请重试！`;
      err.file["uploadErr"] = true;
      err.file["uploading"] = false;
      if (code === -200) {
        errMsg = `上传${fileName}时产生网络错误，请重试！`;
      } else if (code === -600) {
        errMsg = `${fileName}超过指定大小${this.maxSize}，请重试！`;
      } else if (code === -601) {
        errMsg = errMsg = `${fileName}的文件类型不符合要求，只能上传后缀名为${this.accept.join(
          ","
        )}，请重试！`;
      }
      this.$Message.error({
        content: errMsg
      });
      this.$emit("on-error", err);
    },
    onDelete(i) {
      this.fileList.splice(i, 1);
      this.uploader.splice(i, 1);
      this.$emit("on-delete", this.fileList);
    }
  }
};
</script>

<style lang="less">
@upload-button-color: #dcdee2;

.v-uploader {
  .upload-button {
    display: inline-block;
    border: 1px solid @upload-button-color;
    border-radius: 3px;

    .ivu-icon {
      color: @upload-button-color;
      font-size: 60px;
    }
  }
}
</style>
