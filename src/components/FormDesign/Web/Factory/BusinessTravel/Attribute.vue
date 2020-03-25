<template>
  <div class="attribute-content df-egress-attribute">
    <div class="df-attribute-item">
      <div class="item-content">
        <p>出差事由：最多可填写100个中文字</p>
        <p>交通工具：员工可选择飞机、火车、汽车、其他</p>
        <p>单程往返：员工可选择单程或往返</p>
        <p>出发-目的城市：员工自行选择或填写</p>
        <p>开始-结束时间：按天/按半天/按小时</p>
      </div>
    </div>
    <!-- <div class="df-attribute-item">
      <div class="item-title">
        选择时长单位：
        <Select v-model="attribute.unitValue" size="small" style="width:100px;">
          <Option v-for="item in units" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
    </div>-->
    <div class="df-attribute-item">
      <div class="item-content">
        <p>各段行程会根据开始和结束时间自动计算时长</p>
      </div>
    </div>
    <!-- <div class="item-title">
      <Checkbox v-model="attribute.daysOfBusinessTrip">出差天数：</Checkbox>
      <span>差旅开始第一天至最后一天的总天数（自然日）</span>
    </div>-->
    <div class="df-attribute-item">
      <div class="item-content">
        <p>出差备注：最多可填写100个中文字</p>
        <p>同行人：员工从企业通讯录中选择，可选多人</p>
      </div>
    </div>
    <div class="item-title">
      <Checkbox v-model="attribute.peers" @on-change="onChange">同行人：</Checkbox>
      <span>员工从企业通讯录中选择，可选多人</span>
    </div>
  </div>
</template>

<script>
import { UPDATE_CHILDREN } from "store/modules/formDesign/type";
import { mapMutations } from "vuex";
import MultipleInput from "formDesign/Web/Factory/MultipleInput/model";
import NumberInput from "formDesign/Web/Factory/NumberInput/model";
import radioModel from "formDesign/Web/Factory/Radio/model";
import inputModel from "formDesign/Web/Factory/Input/model";
import dateTimeRangeModel from "formDesign/Web/Factory/DateTimeRange/model";
import contactsModel from "formDesign/Web/Factory/Contacts/model";
import model from "./model";
const validator = function(rule, value, callback) {
  if (value.length <= 100) {
    callback();
  } else {
    callback(new Error(`最多输入100个字,请重新输入!`));
  }
};
export default {
  name: "BusinessTravelAttribute",
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
    //获取交通工具
    getVehicle() {
      return new Promise(resolve => {
        setTimeout(() => {
          const items = [
            {
              value: "火车"
            },
            {
              value: "飞机"
            },
            {
              value: "汽车"
            },
            {
              value: "轮船"
            },
            {
              value: "其他"
            }
          ];
          resolve(items);
        }, 200);
      });
    },
    setReason() {
      const model = {};
      const title = "出差事由";
      const name = `${this.attribute.name}-${title}`;
      const value = "";
      model.attribute = {
        ...MultipleInput.attribute
      };
      model.name = name;
      model.component = MultipleInput.component;
      model.value = value;
      model.attribute.name = name;
      model.attribute.title = title;
      model.attribute.validationRules = [
        {
          required: true,
          message: `${title}不能为空`,
          trigger: "change"
        },
        {
          validator: validator,
          trigger: "change"
        }
      ];
      return model;
    },
    setVehicle() {
      const model = {};
      const title = "交通工具";
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
      return this.getVehicle().then(data => {
        model.attribute.items = data;
        return model;
      });
    },
    setRoundtrip() {
      const model = {};
      const title = "单程往返";
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
      model.attribute.items = [
        {
          value: "单程"
        },
        {
          value: "往返"
        }
      ];
      return model;
    },
    setDepartureCity() {
      const model = {};
      const title = "出发城市";
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
      model.attribute.validationRules = [
        {
          required: true,
          message: `${title}不能为空`,
          trigger: "change"
        }
      ];
      return model;
    },
    setDestinationCity() {
      const model = {};
      const title = "目的城市";
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
      model.attribute.validationRules = [
        {
          required: true,
          message: `${title}不能为空`,
          trigger: "change"
        }
      ];
      return model;
    },
    setRangeDate() {
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
    setDuration() {
      const model = {};
      const title = "时长";
      const name = `${this.attribute.name}-${title}`;
      const value = "";
      model.attribute = {
        ...NumberInput.attribute
      };
      model.name = name;
      model.component = NumberInput.component;
      model.value = value;
      model.attribute.name = name;
      model.attribute.title = title;
      model.attribute.parentComponent = `BusinessTravel`;
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
    setRemarks() {
      const model = {};
      const title = "出差备注";
      const name = `${this.attribute.name}-${title}`;
      const value = "";
      model.attribute = {
        ...MultipleInput.attribute
      };
      model.name = name;
      model.component = MultipleInput.component;
      model.value = value;
      model.attribute.name = name;
      model.attribute.title = title;
      model.attribute.validationRules = [
        {
          required: true,
          message: `${title}不能为空`,
          trigger: "change"
        },
        {
          validator: validator,
          trigger: "change"
        }
      ];
      return model;
    },
    setPeers() {
      const model = {};
      const title = "同行人";
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
      model.attribute.multiple = "可同时选择多人";
      model.attribute.validation.required = true;
      return model;
    },
    setChildren() {
      const reason = this.setReason();
      const roundtrip = this.setRoundtrip();
      const departureCity = this.setDepartureCity();
      const destinationCity = this.setDestinationCity();
      const rangeDate = this.setRangeDate();
      const duration = this.setDuration();
      const remarks = this.setRemarks();
      const peers = this.setPeers();
      let children = [];
      this.setVehicle().then(vehicle => {
        children = [
          reason,
          vehicle,
          roundtrip,
          departureCity,
          destinationCity,
          rangeDate,
          duration,
          remarks
        ];
        if (this.attribute.peers) {
          children.push(peers);
        }
        this.updateChildren({
          name: this.attribute.name,
          children: children
        });
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