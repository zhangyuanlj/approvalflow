<template>
  <div class="modal-edit-item">
    <div class="item-label ellipsis">{{itemData.attribute.title}}</div>
    <div class="item-content">
      <template v-if="itemData.value.type === '6'">
        <Select v-model="itemData.value.type">
          <Option v-for="(item,i) in numberSelect" :value="item.value" :key="i">{{ item.text }}</Option>
        </Select>
        <Row :gutter="15" class="more-setting">
          <Col span="5">
            <Input
              type="number"
              v-model="itemData.value.data.min.value"
              style="width:100%;"
              @on-change="onChange"
            ></Input>
          </Col>
          <Col span="5">
            <Select v-model="itemData.value.data.min.type">
              <Option v-for="(item,i) in betweenSelect" :value="item.value" :key="i">{{ item.text }}</Option>
            </Select>
          </Col>
          <Col span="4">
            <div class="number-title ellipsis">{{itemData.attribute.title}}</div>
          </Col>
          <Col span="5">
            <Select v-model="itemData.value.data.max.type">
              <Option v-for="(item,i) in betweenSelect" :value="item.value" :key="i">{{ item.text }}</Option>
            </Select>
          </Col>
          <Col span="5">
            <Input
              type="number"
              v-model="itemData.value.data.max.value"
              style="width:100%;"
              @on-change="onChange"
            ></Input>
          </Col>
        </Row>
      </template>
      <Row :gutter="15" v-else>
        <Col span="12">
          <Select v-model="itemData.value.type">
            <Option v-for="(item,i) in numberSelect" :value="item.value" :key="i">{{ item.text }}</Option>
          </Select>
        </Col>
        <Col span="12">
          <Input
            type="number"
            v-model="itemData.value.data.num"
            style="width:100%;"
            @on-change="onChange"
          ></Input>
        </Col>
      </Row>
    </div>
    <ConditionRemoveItem :nodeData="nodeData" :itemData="itemData" :index="index"></ConditionRemoveItem>
  </div>
</template>

<script>
import { GET_ONE_FIELD, UPDATE_ONE_FIELD } from "store/modules/formDesign/type";
import { mapGetters, mapMutations } from "vuex";
import processNodeModalData from "./scripts/processNodeModalData";
import ConditionRemoveItem from "./ConditionRemoveItem.vue";
export default {
  name: "ConditionNumber",
  components: {
    ConditionRemoveItem
  },
  data() {
    return {
      numberSelect: processNodeModalData.numberSelect,
      betweenSelect: processNodeModalData.betweenSelect
    };
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
    onChange(e) {
      const value = e.target.value;
      if (value) {
        const designField = this.getOneField(this.itemData.name);
        designField.attribute.props.isConditionField = true;
        this.updateOneField(designField);
      }
    }
  }
};
</script>