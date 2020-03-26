<template>
  <div :class="setClass">
    <div class="attribute-pannel-title">{{getDesignFieldName()}}</div>
    <component :is="getComponent(getDesignField())" :attribute="getDesignFieldAttribute"></component>
  </div>
</template>

<script>
import {
  GET_DESIGN_FIELD,
  GET_DESIGN_FIELD_ATTRIBUTE
} from "store/modules/formDesign/type";
import { mapGetters } from "vuex";
import classNames from "classnames";
export default {
  name: "Attribute",
  computed: {
    setClass() {
      const baseClass = "attribute";
      return classNames({
        [baseClass]: true,
        [`${baseClass}_show`]: this.getDesignField()
      });
    },
    ...mapGetters({
      getDesignFieldAttribute: GET_DESIGN_FIELD_ATTRIBUTE
    })
  },
  methods: {
    ...mapGetters({
      getDesignField: GET_DESIGN_FIELD
    }),
    getDesignFieldName() {
      const designField = this.getDesignField();
      return designField && designField.name;
    },
    getComponent(designField) {
      if (!designField) {
        return;
      }
      const component = designField.component;
      const ret = this.componentModel.list.find(item => {
        return item.component === component;
      });
      return ret.attributeComp;
    }
  }
};
</script>

<style lang="less">
.form-design-pannel {
  .attribute-pannel-title {
    line-height: 46px;
    height: 46px;
    font-size: 14px;
    color: #191f25;
    font-weight: 700;
    padding: 0 16px;
    background: #fff;
    box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.09);
  }

  .attribute {
    position: fixed;
    top: 60px;
    right: 0;
    bottom: 0;
    width: 330px;
    background-color: #fff;
    overflow-x: hidden;
    overflow-y: auto;
    transition: all 0.1s ease-in-out;
    transform: translateX(330px);
    opacity: 0;
    &_show {
      transform: translateX(0);
      opacity: 1;
    }
    .ivu-form-item {
      margin-bottom: 0;
    }
    .ivu-checkbox {
      margin-right: 8px;
    }
    .ivu-form-item-error-tip {
      font-size: 12px;
    }
    &-content {
      padding: 20px 16px;
    }

    .df-attribute-item,
    .ivu-form-item-error {
      margin-bottom: 16px;
    }

    .item-title {
      color: #191f25;
      line-height: 16px;
      font-weight: 700;
      font-size: 14px;

      span {
        color: rgba(25, 31, 37, 0.4);
        font-size: 12px;
        font-weight: 400;
        margin-left: 8px;
      }
    }

    .item-content {
      margin: 5px 0;
      .description {
        font-size: 12px;
      }
    }
  }
  .df-arrow,
  .df-icon {
    color: #e0e0e0;
    margin-left: 5px;
  }
  .df-attribute-required {
    .ivu-tooltip-rel {
      font-size: 0;
    }
    .ivu-tooltip-inner {
      font-size: 12px;
      white-space: inherit;
    }
    .required-tip {
      font-size: 14px;
      strong {
        color: #3296fa;
        font-weight: 100;
      }
    }
  }
}
</style>
