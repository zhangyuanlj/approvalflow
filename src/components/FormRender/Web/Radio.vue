<template>
  <div>
    <RadioGroup v-model="fieldData.value" class="df-render-radio" @on-change="onRadioChange">
      <p v-for="item in fieldData.attribute.items" :key="item.value">
        <Radio :label="item.value"></Radio>
      </p>
    </RadioGroup>
    <div v-if="showInput" class="input">
      <Input
        v-model="fieldData.inputValue"
        type="text"
        :placeholder="fieldData.attribute.props.placeholder"
        @on-change="onInputChange"
      />
    </div>
  </div>
</template>

<script>
import config from "@/config";
import { GET_FIELD_LISTS } from "store/modules/formDesign/type";
import { mapGetters } from "vuex";
import { RadioGroup, Radio } from "view-design";
import Http from "utils/http";
import { getDurationCalculation } from "./scripts/utils";
export default {
  name: "RenderRadio",
  components: {
    RadioGroup,
    Radio
  },
  props: {
    fieldData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    parentIndex: {
      type: Number
    },
    index: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters({
      fieldLists: GET_FIELD_LISTS
    }),
    showInput() {
      return this.fieldData.value === "其他";
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (this.fieldData.attribute.parentComponent === "Leave") {
        this.getTypeItems().then(data => {
          const fieldData = this.fieldData;
          const items = [];
          fieldData.attribute.approvalVacationType = data;
          data.forEach(item => {
            items.push({
              value: item.vacationName
            });
          });
          fieldData.attribute.items = items;
          this.$emit(
            "on-field-change",
            this.parentIndex,
            this.index,
            fieldData
          );
        });
      }
    },
    //获取请假类型列表
    getTypeItems() {
      return new Promise(resolve => {
        Http.get({
          url: config.apiUrl.VacationTypes,
          succeed: (res, data) => {
            resolve(data);
          }
        });
      });
    },
    onRadioChange(value) {
      if (value !== "其他") {
        if (this.fieldData.attribute.parentComponent === "Leave") {
          const parentField = this.fieldLists[this.parentIndex];
          const dateTime = parentField.attribute.children.find(item => {
            return item.name === `${parentField.attribute.name}-时间区间`;
          });
          const startDate = dateTime.value[0];
          const endDate = dateTime.value[1];
          let index = 0;
          let durationFiledIndex = 0;
          let unit = "小时";
          parentField.attribute.children.find((item, i) => {
            index = i;
            return item.name === `${parentField.attribute.name}-时长`;
          });
          const durationFiled = parentField.attribute.children.find(
            (item, i) => {
              durationFiledIndex = i;
              return item.name === `${parentField.attribute.name}-时长`;
            }
          );
          const ret = this.fieldData.attribute.approvalVacationType.find(
            item => {
              return item.vacationName === this.fieldData.value;
            }
          );
          if (ret.minUnit === 1) {
            unit = "天";
          } else if (ret.minUnit === 2) {
            unit = "半天";
          } else if (ret.minUnit === 3) {
            unit = "小时";
          }
          durationFiled.attribute.unit = unit;
          getDurationCalculation({
            context: this,
            startDate: startDate,
            endDate: endDate,
            fieldData: this.fieldData,
            fieldLists: this.fieldLists,
            parentIndex: this.parentIndex,
            index: index
          });
          this.$emit(
            "on-field-change",
            this.parentIndex,
            durationFiledIndex,
            durationFiled
          );
        }
        this.$emit(
          "on-value-change",
          "",
          this.index,
          this.parentIndex,
          "inputValue"
        );
      }
    },
    onInputChange(e) {
      const value = e.target.value;
      this.$emit(
        "on-value-change",
        value,
        this.index,
        this.parentIndex,
        "inputValue"
      );
    }
  }
};
</script>

<style lang="less">
.df-render-radio {
  .ivu-radio {
    margin-right: 10px;
  }

  .input {
    margin-top: 10px;

    .ivu-input {
      width: 100%;
    }
  }
}
</style>
