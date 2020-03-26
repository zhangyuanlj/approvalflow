<template>
  <div class="form-design-pannel">
    <ThumbPannel @on-move-end="onMoveEnd"></ThumbPannel>
    <Canvas :insertItem="insertItem"></Canvas>
    <Attribute></Attribute>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "FormDesign",
  data() {
    return {
      insertItem: null
    };
  },
  methods: {
    getComponent(component) {
      const ret = this.componentModel.list.find(item => {
        return item.component === component;
      });
      return ret;
    },
    onMoveEnd(item) {
      item.attribute = $.extend(
        true,
        {},
        this.getComponent(item.component).attribute
      );
      item.attribute.name = item.name;
      item.attribute.title = item.name;
      this.insertItem = item;
    }
  }
};
</script>
