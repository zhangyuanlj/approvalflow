<template>
  <div class="item-remove" @click="onRemove">
    <Icon type="md-trash" />
  </div>
</template>

<script>
import { GET_NODES_DATA, UPDATE_NODES_DATA } from "store/modules/workflow/type";
import { GET_ONE_FIELD, UPDATE_ONE_FIELD } from "store/modules/formDesign/type";
import { mapGetters, mapMutations } from "vuex";
import { updateNodeData } from "./scripts/utils";
export default {
  name: "ConditionRemoveItem",
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
      processNodesData: GET_NODES_DATA,
      getOneField: GET_ONE_FIELD
    })
  },
  methods: {
    ...mapMutations({
      updateProcessData: UPDATE_NODES_DATA,
      updateOneField: UPDATE_ONE_FIELD
    }),

    onRemove() {
      const { name, component } = this.itemData;
      const updateData = this.nodeData;
      updateData.value.data[this.index].checked = false;
      if (component === "originator") {
        updateData.value.data[this.index].contacts = {
          value: []
        };
        updateData.value.data[this.index].roles = [];
      } else if (component === "Radio") {
        updateData.value.data[this.index].value = [];
      } else {
        updateData.value.data[this.index].value = {
          type: "1",
          data: {
            num: "",
            min: {
              type: "1",
              value: ""
            },
            max: {
              type: "1",
              value: ""
            }
          }
        };
      }
      const designField = this.getOneField(name);
      if (designField) {
        designField.attribute.props.isConditionField = false;
        this.updateOneField(designField);
      }
      const nodesList = updateNodeData(
        this.processNodesData,
        this.nodeData,
        updateData
      );
      this.updateProcessData(nodesList);
    }
  }
};
</script>