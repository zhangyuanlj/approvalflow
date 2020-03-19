<template>
  <div class="attribute-content df-overtime-attribute">
    <div class="df-attribute-item">
      <div class="item-title">
        <Checkbox v-model="attribute.includeType">包含类型</Checkbox>
        <span>包含类型最多200项，每项最多20个字</span>
      </div>
    </div>
    <div class="df-attribute-item">
      <div class="item-content">加班时间将自动同步至考勤报表（若当日未排班， 员工可手动修改时长）</div>
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
import contactsModel from "formDesign/Web/Factory/Contacts/model";
import dateTimeRangeModel from "formDesign/Web/Factory/DateTimeRange/model";
import numberInputModel from "formDesign/Web/Factory/NumberInput/model";
import model from "./model";
export default {
  name: "OvertimeAttribute",
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
    setInputModelFiledData() {
      const model = {};
      const title = "加班人";
      const name = `${this.attribute.name}-${title}`;
      const value = "";
      model.attribute = {
        ...contactsModel.attribute
      };
      model.name = name;
      model.component = contactsModel.component;
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
    setDurationFiledData() {
      const model = {};
      const title = "时长";
      const name = `${this.attribute.name}-${title}`;
      const value = "";
      model.attribute = { ...numberInputModel.attribute };
      model.name = name;
      model.component = numberInputModel.component;
      model.value = value;
      model.attribute.title = title;
      model.attribute.name = name;
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
      const inputModel = this.setInputModelFiledData();
      const dateTimeRangeModel = this.setRangeFiledData();
      const numberInputFiledData = this.setDurationFiledData();
      const children = [inputModel, dateTimeRangeModel, numberInputFiledData];
      this.updateChildren({
        name: this.attribute.name,
        children: children
      });
    }
  }
};
</script>
<style lang="less">
.df-overtime-attribute {
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