<template>
  <div class="attribute-content df-quit-attribute">
    <div class="df-attribute-item">
      <div class="item-content">审批通过后，智能人事中的员工状态将自动变为待离职。审批单将自动转交给交接人</div>
    </div>
  </div>
</template>

<script>
import { UPDATE_CHILDREN } from "store/modules/formDesign/type";
import { mapMutations } from "vuex";
import inputModel from "formDesign/Web/Factory/Input/model";
import dateTimeModel from "formDesign/Web/Factory/DateTime/model";
import contactsModel from "formDesign/Web/Factory/Contacts/model";
import radioModel from "formDesign/Web/Factory/Radio/model";
import multipleInputModel from "formDesign/Web/Factory/MultipleInput/model";
import model from "./model";
export default {
  name: "HandoverAttribute",
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
    //获取离职原因列表
    getQuitReasonItems() {
      return new Promise(resolve => {
        setTimeout(() => {
          const items = [
            {
              value: "原因1"
            },
            {
              value: "原因2"
            },
            {
              value: "原因3"
            }
          ];
          resolve(items);
        }, 200);
      });
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
    setQuitReason() {
      const model = {};
      const title = "离职原因";
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
      return this.getQuitReasonItems().then(data => {
        model.attribute.items = data;
        return model;
      });
    },
    setQuitRemarks() {
      const model = {};
      const title = "离职原因备注";
      const name = `${this.attribute.name}-${title}`;
      const value = "";
      model.attribute = {
        ...multipleInputModel.attribute
      };
      model.name = name;
      model.component = multipleInputModel.component;
      model.value = value;
      model.attribute.name = name;
      model.attribute.title = title;
      return model;
    },
    setHandoverPerson() {
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
    setMatter() {
      const model = {};
      const title = "工作交接事项";
      const name = `${this.attribute.name}-${title}`;
      const value = "";
      model.attribute = {
        ...multipleInputModel.attribute
      };
      model.name = name;
      model.component = multipleInputModel.component;
      model.value = value;
      model.attribute.name = name;
      model.attribute.title = title;
      return model;
    },
    setChildren() {
      const entryDate = this.setEntryDate();
      const quit = this.setQuit();
      const quitRemarks = this.setQuitRemarks();
      const handover = this.setHandoverPerson();
      const matter = this.setMatter();
      let children = [];
      this.setQuitReason().then(quitReason => {
        children = [entryDate, quit, quitReason, quitRemarks, handover, matter];
        this.updateChildren({
          name: this.attribute.name,
          children: children
        });
      });
    }
  }
};
</script>
