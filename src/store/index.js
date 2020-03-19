import Vue from "vue";
import Vuex from "vuex";
import common from "./modules/common/index";
import formDesign from "./modules/formDesign/index";
import addressBook from "./modules/addressBook/index";
import workflow from "./modules/workflow/index";
import basicSetting from "./modules/basicSetting/index";
import advancedSetting from "./modules/advancedSetting/index";
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        common,
        formDesign,
        addressBook,
        basicSetting,
        workflow,
        advancedSetting
    }
});