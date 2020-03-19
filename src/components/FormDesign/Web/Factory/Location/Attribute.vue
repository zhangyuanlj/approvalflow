<template>
  <div class="attribute-content">
    <Form :model="attribute">
      <FormItem>
        <div class="df-attribute-item">
          <div class="item-title">验证</div>
          <div class="item-content">
            <Checkbox v-model="attribute.validation.required" @on-change="onChange">必填</Checkbox>
          </div>
        </div>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { Form, FormItem, Checkbox } from "view-design";
import { UPDATE_VALIDATION } from "store/modules/formDesign/type";
import { mapMutations } from "vuex";
import model from "./model";
export default {
  name: "LocationAttribute",
  components: {
    Form,
    FormItem,
    Checkbox
  },
  props: {
    attribute: {
      type: Object,
      default: () => {
        return model.attribute;
      }
    }
  },
  methods: {
    ...mapMutations({
      updateValidation: UPDATE_VALIDATION
    }),
    onChange(required) {
      let rules = [];
      if (required) {
        rules = [
          {
            required: true,
            message: `地点不能为空`,
            trigger: "change"
          }
        ];
      }
      this.updateValidation({
        name: this.attribute.name,
        rules: rules
      });
    }
  }
};
</script>