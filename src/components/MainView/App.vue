<template>
  <div class="app-root">
    <Head :currentLocation="currentLocation"></Head>
    <div class="app-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import config from "@/config";
import { UPDATE_GENERA } from "store/modules/common/type";
import {
  GET_FIELD_LISTS,
  UPDATE_FIELD_LISTS,
  UPDATE_PREVIEW_DATA,
  UPDATE_HAS_WIDGET
} from "store/modules/formDesign/type";
import {
  GET_BASIC_SETTING,
  UPDATE_BASIC_SETTING
} from "store/modules/basicSetting/type";
import {
  GET_ADVANCED_SETTING,
  UPDATE_ADVANCED_SETTING
} from "store/modules/advancedSetting/type";
import {
  GET_NODES_DATA,
  GET_PERSON_LIST,
  UPDATE_NODES_DATA,
  UPDATE_PERSON_LIST
} from "store/modules/workflow/type";
import { mapGetters, mapMutations } from "vuex";
import Head from "./AppHead.vue";
import { commonMixin, hashChangeMixin } from "mixins";
import processDesignData from "components/Common/Workflow/scripts/nodesData";
import Http from "utils/http";
import "view-design/dist/styles/iview.css";
import "./styles/App.less";
export default {
  name: "AppMainView",
  components: {
    Head
  },
  mixins: [commonMixin, hashChangeMixin],
  data() {
    return {
      currentLocation: window.location.href
    };
  },
  created() {
    this.bindHash();
  },
  mounted() {
    this.init();
  },
  updated() {
    this.currentLocation = window.location.href;
  },
  beforeDestroy() {
    this.unBindHash();
  },
  methods: {
    ...mapGetters({
      getFieldLists: GET_FIELD_LISTS,
      getBasicSetting: GET_BASIC_SETTING,
      getNodesData: GET_NODES_DATA,
      getPersonList: GET_PERSON_LIST,
      getAdvancedSetting: GET_ADVANCED_SETTING
    }),
    ...mapMutations({
      updatePreviewData: UPDATE_PREVIEW_DATA,
      updateBasicSetting: UPDATE_BASIC_SETTING,
      updateFieldLists: UPDATE_FIELD_LISTS,
      updateHasWidget: UPDATE_HAS_WIDGET,
      updateProcessData: UPDATE_NODES_DATA,
      updatePersonList: UPDATE_PERSON_LIST,
      updateAdvancedSetting: UPDATE_ADVANCED_SETTING,
      updateGenera: UPDATE_GENERA
    }),
    init() {
      this.getData();
    },
    getData() {
      const id = this.getId();
      //是否包含套件
      const hasWidget = formDesign => {
        let len = formDesign.length;
        for (let i = 0; i < len; i++) {
          const item = formDesign[i];
          if (item.attribute.isWidget) {
            return true;
          }
        }
        return false;
      };
      const updateData = data => {
        const genera = data.genera;
        const basicSetting = data.basicSetting;
        const formDesign = data.formDesign;
        const personList = {
          FreeFlow: data.freeFlow,
          Contacts: data.contacts
        };
        const processDesign = data.processDesign;
        const advancedSetting = data.advancedSetting;
        this.updateGenera(genera);
        this.updateBasicSetting(basicSetting);
        this.updateFieldLists(formDesign);
        this.updatePersonList(personList);
        this.updateProcessData(processDesign);
        this.updateAdvancedSetting(advancedSetting);
        if (hasWidget(formDesign)) {
          this.updateHasWidget(true);
        }
      };
      if (id) {
        const requestUrl = `${config.apiUrl.Approval}?approvalFormTemplateId=${id}`;
        Http.get({
          url: requestUrl,
          succeed: (res, data) => {
            updateData(data);
          },
          errorCbs: () => {
            this.updateProcessData(processDesignData);
          }
        });
      } else {
        this.updateProcessData(processDesignData);
      }
    }
  }
};
</script>