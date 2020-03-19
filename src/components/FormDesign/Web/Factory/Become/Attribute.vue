<template>
  <div class="attribute-content df-become-attribute">
    <div class="df-attribute-item">
      <div class="item-content">审批通过后，智能人事中的员工状态将在转正日期后自动变为正式</div>
    </div>
    <div class="df-attribute-item">
      <div class="item-title">
        <Checkbox v-model="attribute.position">职位</Checkbox>
      </div>
    </div>
    <div class="df-attribute-item">
      <div class="item-title">
        <Checkbox v-model="attribute.rank">职级</Checkbox>
      </div>
    </div>
    <div class="df-attribute-item">
      <div class="item-title">
        <Checkbox v-model="attribute.workingPlace">工作地点</Checkbox>
      </div>
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
import model from "./model";
import inputModel from "formDesign/Web/Factory/Input/model";
import dateTimeModel from "formDesign/Web/Factory/DateTime/model";
import contactsModel from "formDesign/Web/Factory/Contacts/model";
export default {
  name: "BecomeAttribute",
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
    setApplicantFiledData() {
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
    setEntryDate() {
      const model = {};
      const title = "入职日期";
      const name = `${this.attribute.name}-${title}`;
      const value = "";
      model.attribute = {
        ...inputModel.attribute
      };
      model.name = name;
      model.component = inputModel.component;
      model.value = value;
      model.attribute.name = name;
      model.attribute.title = title;
      model.attribute.props = {
        readonly: true
      };
      return model;
    },
    setProbation() {
      const model = {};
      const title = "试用期";
      const name = `${this.attribute.name}-${title}`;
      const value = "";
      model.attribute = {
        ...inputModel.attribute
      };
      model.name = name;
      model.component = inputModel.component;
      model.value = value;
      model.attribute.name = name;
      model.attribute.title = title;
      model.attribute.props = {
        readonly: true
      };
      return model;
    },
    setCorrection() {
      const model = {};
      const title = "转正日期";
      const name = `${this.attribute.name}-${title}`;
      const value = "";
      model.attribute = { ...dateTimeModel.attribute };
      model.name = name;
      model.component = dateTimeModel.component;
      model.value = value;
      model.attribute.name = name;
      model.attribute.title = title;
      model.attribute.validation.required = true;
      return model;
    },
    setPosition() {
      const model = {};
      const title = "职位";
      const name = `${this.attribute.name}-${title}`;
      const value = "";
      model.attribute = {
        ...inputModel.attribute
      };
      model.name = name;
      model.component = inputModel.component;
      model.value = value;
      model.attribute.name = name;
      model.attribute.title = title;
      return model;
    },
    setRank() {
      const model = {};
      const title = "职级";
      const name = `${this.attribute.name}-${title}`;
      const value = "";
      model.attribute = {
        ...inputModel.attribute
      };
      model.name = name;
      model.component = inputModel.component;
      model.value = value;
      model.attribute.name = name;
      model.attribute.title = title;
      return model;
    },
    setChildren() {
      const applicant = this.setApplicantFiledData();
      const entryDate = this.setEntryDate();
      const probation = this.setProbation();
      const correction = this.setCorrection();
      const position = this.setPosition();
      const rank = this.setRank();
      const children = [
        applicant,
        entryDate,
        probation,
        correction,
        position,
        rank
      ];
      this.updateChildren({
        name: this.attribute.name,
        children: children
      });
    }
  }
};
</script>
<style lang="less">
.df-become-attribute {
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