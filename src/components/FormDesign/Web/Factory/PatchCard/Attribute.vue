<template>
  <div></div>
</template>

<script>
import { UPDATE_CHILDREN } from "store/modules/formDesign/type";
import { mapMutations } from "vuex";
import DateTimeModel from "formDesign/Web/Factory/DateTime/model";
import model from "./model";
export default {
  name: "PatchCardAttribute",
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
    setDateTimeFiledData() {
      const model = {};
      const title = "补卡时间";
      const name = `${this.attribute.name}-${title}`;
      const value = "";
      model.attribute = {
        ...DateTimeModel.attribute
      };
      model.name = name;
      model.component = DateTimeModel.component;
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
      const dateTimeModel = this.setDateTimeFiledData();
      const children = [dateTimeModel];
      this.updateChildren({
        name: this.attribute.name,
        children: children
      });
    }
  }
};
</script>
