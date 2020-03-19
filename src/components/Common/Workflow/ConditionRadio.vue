<template>
  <div class="modal-edit-item">
    <div class="item-label ellipsis">{{itemData.attribute.title}}</div>
    <div class="item-content">
      <CheckboxGroup v-model="itemData.value" @on-change="onChange">
        <Checkbox v-for="(item, i) in itemData.attribute.items" :key="i" :label="item.value">
          <span>{{item.value}}</span>
        </Checkbox>
      </CheckboxGroup>
    </div>
    <ConditionRemoveItem :nodeData="nodeData" :itemData="itemData" :index="index"></ConditionRemoveItem>
  </div>
</template>

<script>
import { GET_ONE_FIELD, UPDATE_ONE_FIELD } from "store/modules/formDesign/type";
import { mapGetters, mapMutations } from "vuex";
import ConditionRemoveItem from "./ConditionRemoveItem.vue";
export default {
  name: "ConditionRadio",
  components: {
    ConditionRemoveItem
  },
  props: {
    nodeData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    itemData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    index: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters({
      getOneField: GET_ONE_FIELD
    })
  },
  methods: {
    ...mapMutations({
      updateOneField: UPDATE_ONE_FIELD
    }),
    onChange(value) {
      if (value.length) {
        const designField = this.getOneField(this.itemData.name);
        designField.attribute.props.isConditionField = true;
        this.updateOneField(designField);
      }
    }
  }
};
</script>