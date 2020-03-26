<template>
  <div class="attribute-content">
    <div class="df-attribute-item">
      <div class="item-content">
        <Table :columns="columns" :data="leaveData"></Table>
      </div>
    </div>
  </div>
</template>

<script>
import config from "@/config";
import { UPDATE_CHILDREN } from "store/modules/formDesign/type";
import { mapMutations } from "vuex";
import radioModel from "formDesign/Web/Factory/Radio/model";
import dateTimeRangeModel from "formDesign/Web/Factory/DateTimeRange/model";
import numberInputModel from "formDesign/Web/Factory/NumberInput/model";
import model from "./model";
import { Table } from "view-design";
import Http from "utils/http";
export default {
  name: "LeaveAttribute",
  data() {
    return {
      columns: [
        {
          title: "请假类型",
          key: "vacationName"
        },
        {
          render: (h, params) => {
            const type = params.row.minUnit === 1 ? "按天请" : "按小时请";
            return h("div", type);
          }
        }
      ],
      leaveData: []
    };
  },
  components: {
    Table
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
    //获取调休类型列表
    getTypeItems() {
      return new Promise(resolve => {
        Http.get({
          url: config.apiUrl.VacationTypes,
          succeed: (res, data) => {
            this.leaveData = data;
            resolve(data);
          }
        });
      });
    },
    setTypeFiledData() {
      const model = {};
      const title = "调休类型";
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
      model.attribute.parentComponent = "Leave";
      model.attribute.validation.required = true;
      model.attribute.validationRules = [
        {
          required: true,
          message: `${title}不能为空`,
          trigger: "change"
        }
      ];
      return this.getTypeItems().then(data => {
        const items = [];
        model.attribute.approvalVacationType = data;
        data.forEach(item => {
          items.push({
            value: item.vacationName
          });
        });
        model.attribute.items = items;
        return model;
      });
    },
    setRangeFiledData() {
      const model = {};
      const title = "时间区间";
      const name = `${this.attribute.name}-${title}`;
      const value = [];
      model.attribute = {
        ...dateTimeRangeModel.attribute
      };
      model.name = name;
      model.component = dateTimeRangeModel.component;
      model.value = value;
      model.attribute.name = name;
      model.attribute.title = title;
      model.attribute.props.type = "datetime";
      model.attribute.validation.required = true;
      return model;
    },
    setDurationFiledData() {
      const model = {};
      const title = "时长";
      const name = `${this.attribute.name}-${title}`;
      const value = "";
      model.attribute = {
        ...numberInputModel.attribute
      };
      model.name = name;
      model.component = numberInputModel.component;
      model.value = value;
      model.attribute.title = title;
      model.attribute.parentComponent = `Leave`;
      model.attribute.relatedName = `${this.attribute.name}-时间区间`;
      model.attribute.name = name;
      model.attribute.validation.required = true;
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
      let children = [];
      this.setTypeFiledData().then(radioModel => {
        children = [radioModel, dateTimeRangeModel, numberInputFiledData];
        this.updateChildren({
          name: this.attribute.name,
          children: children
        });
      });
    }
  }
};
</script>
