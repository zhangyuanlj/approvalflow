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
import { RadioGroup, Radio } from "view-design";
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
    showInput() {
      return this.fieldData.value === "其他";
    }
  },
  methods: {
    onRadioChange(value) {
      if (value !== "其他") {
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