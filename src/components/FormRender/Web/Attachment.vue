<template>
  <Uploader
    :action="action"
    :uploadedList="fileList"
    :accept="['doc','docx','xls', 'xlsx', 'rar', 'zip', 'ppt', 'pptx', 'txt']"
    @on-upload-complete="onUploadComplete"
    @on-delete="onDelete"
  ></Uploader>
</template>

<script>
import config from "@/config";
import { Uploader } from "components/Common/Uploader";
import Emitter from "view-design/src/mixins/emitter";
import mixinsForm from "view-design/src/mixins/form";
export default {
  name: "RenderAttachment",
  components: {
    Uploader
  },
  mixins: [Emitter, mixinsForm],
  data() {
    return {
      action: config.apiUrl.attachment,
      fileList: []
    };
  },
  props: {
    fieldData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    parentIndex: {
      type: Number
    },
    index: {
      type: Number,
      default: 0
    }
  },
  watch: {
    fieldData: {
      handler(val) {
        this.setFileList(val);
      }
    }
  },
  mounted() {
    this.setFileList(this.fieldData);
  },
  methods: {
    setFileList(val) {
      const fileList = [];
      const value = val.value;
      value.forEach(item => {
        fileList.push({
          name: item.fileName,
          size: item.fileSize,
          type: item.suffix,
          imgUrl: item.fileServerPath
        });
      });
      this.fileList = fileList;
    },
    onUploadComplete(fileList) {
      this.$emit("on-value-change", fileList, this.index, this.parentIndex);
      this.dispatch("FormItem", "on-form-change", fileList);
    },
    onDelete(fileList) {
      this.$emit("on-value-change", fileList, this.index, this.parentIndex);
      this.dispatch("FormItem", "on-form-change", fileList);
    }
  }
};
</script>