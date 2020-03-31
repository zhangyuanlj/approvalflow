<template>
  <div class="attribute-content df-egress-attribute">
    <div class="df-attribute-item">
      <div class="item-title">
        <Checkbox v-model="attribute.includeType">包含类型</Checkbox>
        <span>包含类型最多200项，每项最多20个字</span>
      </div>
    </div>
    <!-- <div class="df-attribute-item">
      <div class="item-title">
        选择时长单位：
        <Select
          v-model="attribute.unitValue"
          size="small"
          style="width:100px;"
          @on-change="onChange"
        >
          <Option v-for="item in units" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
    </div> -->
    <div class="df-attribute-item">
      <div class="item-content">
        <p>将根据排班自动计算外出时长，并将时长精确汇总至考勤报表</p>
        <p>若当日未排班， 员工可手动修改时长</p>
      </div>
    </div>
  </div>
</template>

<script>
import { UPDATE_CHILDREN } from "store/modules/formDesign/type";
import { mapMutations } from "vuex";
import dateTimeRangeModel from "formDesign/Web/Factory/DateTimeRange/model";
import numberInputModel from "formDesign/Web/Factory/NumberInput/model";
import model from "./model";
export default {
  name: "EgressAttribute",
  data() {
    return {
      units: [
        {
          value: "1",
          label: "按半天请"
        },
        {
          value: "2",
          label: "按天请"
        },
        {
          value: "3",
          label: "按小时请"
        }
      ]
    };
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
      // const units = this.units.find(item => {
      //   return item.value === this.attribute.unitValue;
      // });
      model.attribute = { ...numberInputModel.attribute };
      model.name = name;
      model.component = numberInputModel.component;
      model.value = value;
      model.attribute.title = title;
      model.attribute.name = name;
      model.attribute.readonly = true;
      model.attribute.validation.required = true;
      model.attribute.parentComponent = `Egress`;
      model.attribute.relatedName = `${this.attribute.name}-时间区间`;
      model.attribute.unit = "小时";
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
      const dateTimeRangeModel = this.setRangeFiledData();
      const numberInputFiledData = this.setDurationFiledData();
      const children = [dateTimeRangeModel, numberInputFiledData];
      this.updateChildren({
        name: this.attribute.name,
        children: children
      });
    },
    onChange() {
      this.setChildren();
    }
  }
};
</script>
<style lang="less">
.df-egress-attribute {
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