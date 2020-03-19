<template>
  <div class="attribute-content">
    <div class="df-attribute-item">
      <div class="item-content">审批通过后且开通智能人事微应用，员工将自动进入待入职名单</div>
    </div>
  </div>
</template>

<script>
import { UPDATE_CHILDREN } from "store/modules/formDesign/type";
import { mapMutations } from "vuex";
import contactsModel from "formDesign/Web/Factory/Contacts/model";
import departmentsModel from "formDesign/Web/Factory/Departments/model";
import inputModel from "formDesign/Web/Factory/Input/model";
import radioModel from "formDesign/Web/Factory/Radio/model";
import dateTimeModel from "formDesign/Web/Factory/DateTime/model";
import model from "./model";
import { validatorMobile } from "utils/validatorRule";
export default {
  name: "InductionAttribute",
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
    //获取员工类型
    getEmployeeType() {
      return new Promise(resolve => {
        setTimeout(() => {
          const items = [
            {
              value: "类型1"
            },
            {
              value: "类型2"
            },
            {
              value: "类型3"
            }
          ];
          resolve(items);
        }, 200);
      });
    },
    setRecruits() {
      const model = {};
      const title = "入职员工姓名";
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
    setDepartment() {
      const model = {};
      const title = "用人部门";
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
    setMobile() {
      const model = {};
      const title = "手机号";
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
        },
        {
          validator: function(rule, value, callback) {
            if (validatorMobile(value)) {
              callback();
            } else {
              callback(new Error(`${title}输入有误,请重新输入!`));
            }
          },
          trigger: "change"
        }
      ];
      return model;
    },
    setEmployeeType() {
      const model = {};
      const title = "员工类型";
      const name = `${this.attribute.name}-${title}`;
      const value = "";
      model.attribute = {
        ...radioModel.attribute
      };
      model.name = name;
      model.component = radioModel.component;
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
      return this.getEmployeeType().then(data => {
        model.attribute.items = data;
        return model;
      });
    },
    setEntryDate() {
      const model = {};
      const title = "预计入职日期";
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
      const recruits = this.setRecruits();
      const department = this.setDepartment();
      const position = this.setPosition();
      const mobile = this.setMobile();
      const entryDate = this.setEntryDate();
      let children = [];
      this.setEmployeeType().then(employeeType => {
        children = [
          recruits,
          department,
          position,
          mobile,
          employeeType,
          entryDate
        ];
        this.updateChildren({
          name: this.attribute.name,
          children: children
        });
      });
    }
  }
};
</script>