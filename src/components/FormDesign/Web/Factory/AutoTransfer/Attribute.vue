<template>
  <div class="attribute-content df-auto-transfer-attribute">
    <div class="df-attribute-item">
      <div class="item-content">审批通过后且开通智能人事微应用，员工未处理的审批单将自动转交工作交接人处理</div>
    </div>
    <div class="df-attribute-item">
      <div class="item-title">
        <Checkbox v-model="attribute.otherSubmited">允许代他人提交（勾选后发起人可以为同事提交申请）</Checkbox>
      </div>
    </div>
  </div>
</template>

<script>
import { UPDATE_CHILDREN } from "store/modules/formDesign/type";
import { mapMutations } from "vuex";
import { Checkbox } from "view-design";
import dateTimeModel from "formDesign/Web/Factory/DateTime/model";
import contactsModel from "formDesign/Web/Factory/Contacts/model";
import model from "./model";
export default {
  name: "AutoTransferAttribute",
  components: {
    Checkbox
  },
  data() {
    return {};
  },
  props: {
    attribute: {
      type: Object,
      default: () => {
        return model.attribute;
      }
    }
  },
  mounted() {
    this.setChildren();
  },
  methods: {
    ...mapMutations({
      updateChildren: UPDATE_CHILDREN
    }),
    setApplicant() {
      const model = {};
      const title = "实际申请人";
      const name = `${this.attribute.name}-${title}`;
      const value = [];
      model.attribute = {
        ...contactsModel.attribute
      };
      model.name = name;
      model.component = contactsModel.component;
      model.value = value;
      model.attribute.name = name;
      model.attribute.title = title;
      model.attribute.validation.required = true;
      return model;
    },
    setQuit() {
      const model = {};
      const title = "预计离职日期";
      const name = `${this.attribute.name}-${title}`;
      const value = "";
      model.attribute = {
        ...dateTimeModel.attribute
      };
      model.name = name;
      model.component = dateTimeModel.component;
      model.value = value;
      model.attribute.name = name;
      model.attribute.title = title;
      model.attribute.validation.required = true;
      model.attribute.validationRules = [
        {
          required: true,
          message: `${title}不能为空`,
          trigger: "change"
        }
      ];
      return model;
    },
    setHandover() {
      const model = {};
      const title = "工作交接人";
      const name = `${this.attribute.name}-${title}`;
      const value = [];
      model.attribute = {
        ...contactsModel.attribute
      };
      model.name = name;
      model.component = contactsModel.component;
      model.value = value;
      model.attribute.name = name;
      model.attribute.title = title;
      model.attribute.validation.required = true;
      return model;
    },
    setChildren() {
      const applicant = this.setApplicant();
      const quit = this.setQuit();
      const handover = this.setHandover();
      const children = [applicant, quit, handover];
      this.updateChildren({
        name: this.attribute.name,
        children: children
      });
    }
  }
};
</script>
<style lang="less">
.df-auto-transfer-attribute {
  .item-title {
    font-weight: 400 !important;
    span {
      margin-left: 0 !important;
    }
  }
  .ivu-checkbox {
    &-wrapper {
      font-size: 12px;
    }
  }
}
</style>