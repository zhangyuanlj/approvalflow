<template>
  <div>
    <Input
      v-model="fieldData.value"
      type="number"
      :placeholder="setPlaceholder"
      style="width:100%;"
    >
      <span v-if="showAppend" slot="append">{{fieldData.attribute.unit}}</span>
    </Input>
  </div>
</template>

<script>
import config from "@/config";
import { GET_FIELD_LISTS } from "store/modules/formDesign/type";
import { mapGetters } from "vuex";
import { Input } from "view-design";
import Http from "utils/http";
export default {
  name: "RenderNumberInput",
  components: {
    Input
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
  mounted() {
    this.bindChangeEvent();
  },
  computed: {
    ...mapGetters({
      fieldLists: GET_FIELD_LISTS
    }),
    showAppend() {
      return this.fieldData.attribute.unit;
    },
    setPlaceholder() {
      const props = this.fieldData.attribute.props;
      return props && props.placeholder;
    }
  },
  methods: {
    onChange(data) {
      const parentKey = data.parentKey;
      const relatedName = data.relatedName;
      if (
        relatedName === this.fieldData.attribute.relatedName &&
        parentKey === this.fieldData.parentKey
      ) {
        const dateTime = data.dateTime;
        const startDate = dateTime[0];
        const endDate = dateTime[1];
        if (startDate && endDate) {
          const parentComponent = this.fieldData.attribute.parentComponent;
          const requestData = {
            component: parentComponent,
            startTime: startDate,
            endTime: endDate
          };
          if (parentComponent === "Leave") {
            const parentField = this.fieldLists[this.parentIndex];
            const type = parentField.attribute.children.find(item => {
              return item.name === `${parentField.attribute.name}-调休类型`;
            });
            const approvalVacationType = type.attribute.approvalVacationType;
            const ret = approvalVacationType.find(item => {
              return item.vacationName === type.value;
            });
            requestData["approvalVacationTypeId"] = ret
              ? ret.approvalVacationTypeId
              : "";
          }
          Http.post({
            url: config.apiUrl.DurationCalculation,
            data: requestData,
            succeed: (res, data) => {
              this.$emit("on-value-change", data, this.index, this.parentIndex);
            },
            errorCbs: () => {
              if (parentComponent === "Leave") {
                this.$Message.error(
                  "时长计算失败,请重新选择起始时间及请假类型!"
                );
              } else {
                this.$Message.error("时长计算失败,请重新选择起始时间!");
              }
            }
          });
        }
      }
    },
    bindChangeEvent() {
      this.$EventBus.$off("on-datetimerange-change", this.onChange);
      this.$EventBus.$on("on-datetimerange-change", this.onChange);
    }
  }
};
</script>
