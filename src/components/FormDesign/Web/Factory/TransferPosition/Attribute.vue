<template>
  <div class="attribute-content df-transfer-position-attribute">
    <div class="df-attribute-item">
      <div class="item-content">审批通过后，智能人事中的员工状态将自动变为待离职</div>
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
import inputModel from "formDesign/Web/Factory/Input/model";
import dateTimeModel from "formDesign/Web/Factory/DateTime/model";
import contactsModel from "formDesign/Web/Factory/Contacts/model";
import departmentsModel from "formDesign/Web/Factory/Departments/model";
import model from "./model";
export default {
  name: "TransferPositionAttribute",
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
    setDepartment() {
      const model = {};
      const title = "原部门";
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
    setPosition() {
      const model = {};
      const title = "原职位";
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
    setRank() {
      const model = {};
      const title = "原岗位职级";
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
    setIntoDepartment() {
      const model = {};
      const title = "转入部门";
      const name = `${this.attribute.name}-${title}`;
      const value = [];
      model.attribute = {
        ...departmentsModel.attribute
      };
      model.name = name;
      model.component = departmentsModel.component;
      model.value = value;
      model.attribute.name = name;
      model.attribute.title = title;
      model.attribute.validation.required = true;
      return model;
    },
    setIntoPosition() {
      const model = {};
      const title = "转入职位";
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
    setIntoRank() {
      const model = {};
      const title = "新岗位职级";
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
    setEffectiveDate() {
      const model = {};
      const title = "生效日期";
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
    setChildren() {
      const applicant = this.setApplicant();
      const entryDate = this.setEntryDate();
      const department = this.setDepartment();
      const position = this.setPosition();
      const rank = this.setRank();
      const intoDepartment = this.setIntoDepartment();
      const intoPosition = this.setIntoPosition();
      const intoRank = this.setIntoRank();
      const effectiveDate = this.setEffectiveDate();
      const children = [
        applicant,
        entryDate,
        department,
        position,
        rank,
        intoDepartment,
        intoPosition,
        intoRank,
        effectiveDate
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
.df-transfer-position-attribute {
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