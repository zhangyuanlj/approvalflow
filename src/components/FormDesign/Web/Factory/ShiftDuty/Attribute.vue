<template>
  <div class="attribute-content">
    <div class="df-attribute-item">
      <div class="item-content">
        <p>排班制员工使用。换班审批通过后，考勤排班表里的班次自动调换。</p>
      </div>
    </div>
  </div>
</template>
<script>
import { UPDATE_CHILDREN } from "store/modules/formDesign/type";
import { mapMutations } from "vuex";
import inputModel from "formDesign/Web/Factory/Input/model";
import dateTimeRangeModel from "formDesign/Web/Factory/DateTimeRange/model";
import model from "./model";
export default {
  name: "ShiftDutyAttribute",
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
      const title = "申请人";
      const name = `${this.attribute.name}-${title}`;
      const value = "";
      model.attribute = { ...inputModel.attribute };
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
    setSubstituteFiledData() {
      const model = {};
      const title = "替班人";
      const name = `${this.attribute.name}-${title}`;
      const value = "";
      model.attribute = { ...inputModel.attribute };
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
    setRangeFiledData() {
      const model = {};
      const title = "时间区间";
      const name = `${this.attribute.name}-${title}`;
      const value = [];
      model.attribute = { ...dateTimeRangeModel.attribute };
      model.name = name;
      model.component = dateTimeRangeModel.component;
      model.value = value;
      model.attribute.name = name;
      model.attribute.title = title;
      model.attribute.validation.required = true;
      return model;
    },
    setChildren() {
      const applicantModel = this.setApplicantFiledData();
      const substituteModel = this.setSubstituteFiledData();
      const dateTimeRangeModel = this.setRangeFiledData();
      const children = [applicantModel, substituteModel, dateTimeRangeModel];
      this.updateChildren({
        name: this.attribute.name,
        children: children
      });
    }
  }
};
</script>