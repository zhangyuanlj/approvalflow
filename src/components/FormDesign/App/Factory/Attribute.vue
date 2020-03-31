<template>
  <Modal v-model="modalVisible" :title="setTitle" :fullscreen="true">
    <div class="form-design-pannel">
      <component :is="getComponent(designField)" :attribute="designFieldAttribute"></component>
    </div>
  </Modal>
</template>

<script>
import {
  GET_DESIGN_FIELD,
  GET_DESIGN_FIELD_ATTRIBUTE
} from "store/modules/formDesign/type";
import { mapGetters } from "vuex";
import model from "../Factory/model";
export default {
  data() {
    return {
      modalVisible: false,
      componentsModel: model
    };
  },
  computed: {
    ...mapGetters({
      designField: GET_DESIGN_FIELD,
      designFieldAttribute: GET_DESIGN_FIELD_ATTRIBUTE
    }),
    setTitle() {
      if (this.designFieldAttribute) {
        return `设置${this.designFieldAttribute.name}属性`;
      }
      return "";
    }
  },
  methods: {
    getComponent(designField) {
      if (!designField) {
        return;
      }
      const component = designField.component;
      const ret = model.find(item => {
        return item.component === component;
      });
      return ret.attributeComp;
    },
    show() {
      this.modalVisible = true;
    },
    hide() {
      this.modalVisible = false;
    }
  }
};
</script>
<style lang="less">
.form-design-pannel {
  .attribute-content {
    .ivu-form-item {
      margin-bottom: 10px;
    }
  }
  .df-attribute-item {
    padding: 0;
    background-color: #fff;
    .item-title {
      color: #000;
      font-size: 15px;
    }
    .item-content {
      margin: 10px 0;
      .ivu-checkbox {
        margin-right: 8px;
      }
    }
  }
  .df-attribute-required .ivu-tooltip-inner {
    font-size: 12px;
    white-space: inherit;
  }
}
</style>