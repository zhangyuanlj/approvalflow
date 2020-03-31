<template>
  <div>
    <Input
      v-model="fieldData.value"
      type="number"
      :placeholder="setPlaceholder"
      :readonly="fieldData.attribute.readonly"
      style="width:100%;"
    >
      <span v-if="showAppend" slot="append">{{fieldData.attribute.unit}}</span>
    </Input>
  </div>
</template>

<script>
import { GET_FIELD_LISTS } from "store/modules/formDesign/type";
import { mapGetters } from "vuex";
import { Input } from "view-design";
import { getDurationCalculation } from "./scripts/utils";
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
        getDurationCalculation({
          context: this,
          startDate: startDate,
          endDate: endDate,
          fieldData: this.fieldData,
          fieldLists: this.fieldLists,
          parentIndex: this.parentIndex,
          index: this.index
        });
      }
    },
    bindChangeEvent() {
      this.$EventBus.$off("on-datetimerange-change", this.onChange);
      this.$EventBus.$on("on-datetimerange-change", this.onChange);
    }
  }
};
</script>
