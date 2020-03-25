<template>
  <div v-if="previewData.length" class="df-form-render">
    <FormPreview ref="FormPreview" :isPreview="isPreview" :formData="previewData" :genera="genera"></FormPreview>
    <div class="button-wrapper">
      <Button type="primary" long @click="submit">提交</Button>
    </div>
  </div>
</template>

<script>
import config from "@/config";
import FormPreview from "./Preview.vue";
import { UPDATE_BASIC_SETTING } from "store/modules/basicSetting/type";
import {
  GET_PREVIEW_DATA,
  UPDATE_PREVIEW_DATA
} from "store/modules/formDesign/type";
import {
  UPDATE_NODES_DATA,
  UPDATE_PERSON_LIST
} from "store/modules/workflow/type";
import { UPDATE_ADVANCED_SETTING } from "store/modules/advancedSetting/type";
import { mapGetters, mapMutations } from "vuex";
import { hashChangeMixin } from "mixins";
import Http from "utils/http";
import { redirect } from "utils/helper";
import processDesignData from "components/Common/Workflow/scripts/nodesData";
export default {
  name: "FormRender",
  data() {
    return {
      genera: null
    };
  },
  components: {
    FormPreview
  },
  mixins: [hashChangeMixin],
  props: {
    isPreview: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      previewData: GET_PREVIEW_DATA
    })
  },
  created() {
    this.bindHash();
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.unBindHash();
  },
  methods: {
    ...mapMutations({
      updatePreviewData: UPDATE_PREVIEW_DATA,
      updatePersonList: UPDATE_PERSON_LIST,
      updateBasicSetting: UPDATE_BASIC_SETTING,
      updateProcessData: UPDATE_NODES_DATA,
      updateAdvancedSetting: UPDATE_ADVANCED_SETTING
    }),
    init() {
      !this.isPreview && this.getData();
    },
    getData() {
      const id = this.getId();
      if (id) {
        const requestUrl = `${config.apiUrl.Approval}?approvalFormTemplateId=${id}`;
        Http.get({
          url: requestUrl,
          succeed: (res, data) => {
            const basicSetting = data.basicSetting;
            const formDesign = data.formDesign;
            const personList = {
              FreeFlow: data.freeFlow,
              Contacts: data.contacts
            };
            const processDesign = [
              processDesignData[0],
              ...data.processDesign,
              processDesignData[1]
            ];
            const advancedSetting = data.advancedSetting;
            this.genera = data.genera;
            this.updateBasicSetting(basicSetting);
            this.updatePreviewData(formDesign);
            this.updateProcessData(processDesign);
            this.updatePersonList(personList);
            this.updateAdvancedSetting(advancedSetting);
          }
        });
      }
    },
    getId() {
      return this.$Route.getParam("id");
    },
    hashChange() {
      this.getData();
    },
    submit() {
      this.$refs.FormPreview.submit();
    },
    onCreate() {
      let href = `webFormDesign/`;
      redirect(href);
    }
  }
};
</script>

<style lang="less">
.df-form-render {
  background-color: #fff;
  padding: 30px 20px;
  margin: 0 auto;
}

@media screen and (min-width: 768px) {
  .df-form-render {
    width: 480px;
  }

  .button-wrapper {
    margin-top: 50px;
  }
}

@media screen and (min-width: 320px) and (max-width: 768px) {
  .df-form-render {
    padding-bottom: 60px;

    .button-wrapper {
      display: flex;
      align-items: center;
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 50px;
      padding: 0 20px;
      background-color: #fff;
      box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2);
      z-index: 200;
    }
  }
}
</style>
