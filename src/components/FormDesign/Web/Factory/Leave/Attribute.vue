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
import { UPDATE_CHILDREN } from "store/modules/formDesign/type";
import { mapMutations } from "vuex";
import radioModel from "formDesign/Web/Factory/Radio/model";
import dateTimeRangeModel from "formDesign/Web/Factory/DateTimeRange/model";
import numberInputModel from "formDesign/Web/Factory/NumberInput/model";
import model from "./model";
import { Table } from "view-design";
export default {
  name: "LeaveAttribute",
  data() {
    return {
      columns: [
        {
          key: "type",
          title: "请假类型"
        },
        {
          key: "content"
        }
      ],
      leaveData: [
        {
          type: "事假",
          content: "按小时请"
        },
        {
          type: "病假",
          content: "按小时请"
        },
        {
          type: "调休",
          content: "按小时请"
        },
        {
          type: "产假",
          content: "按天请"
        },
        {
          type: "陪产假",
          content: "按天请"
        },
        {
          type: "婚假",
          content: "按天请"
        }
      ]
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
        setTimeout(() => {
          const items = [
            {
              value: "事假"
            },
            {
              value: "病假"
            },
            {
              value: "调休"
            },
            {
              value: "产假"
            },
            {
              value: "陪产假"
            },
            {
              value: "婚假"
            }
          ];
          resolve(items);
        }, 200);
      });
    },
    setTypeFiledData() {
      const model = {};
      const title = "调休类型";
      const name = `${this.attribute.name}-${title}`;
      const value = "";
      model.attribute = { ...radioModel.attribute };
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
      return this.getTypeItems().then(data => {
        model.attribute.items = data;
        return model;
      });
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
      model.attribute.props.type = "datetime";
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
