<template>
  <div class="df-detail-field">
    <h4 class="detail-title">{{attribute.title}}</h4>
    <div class="detail-content df-groups">
      <template v-if="attribute.children.length">
        <div
          v-for="(item,i) in attribute.children"
          :key="i"
          class="df-component"
          :data-name="item.name"
          :data-component="item.component"
        >
          <component :is="getComponent(item.component).designComp" :attribute="item.attribute"></component>
          <a href="javascript:void(0);" class="df-component-remove">
            <Icon type="md-close" :size="16" />
          </a>
        </div>
      </template>
      <div v-else class="empty">可拖入多个组件（不包含明细组件）</div>
    </div>
    <a class="detail-button">
      <Icon type="md-add" :size="20" />
      {{attribute.actionName}}
    </a>
  </div>
</template>

<script>
import { Icon } from "view-design";
import componentModel from "formDesign/Web/Factory/model";
import model from "./model";
export default {
  name: "DetailDesign",
  components: {
    Icon
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
    getComponent(component) {
      const ret = componentModel.list.find(item => {
        return item.component === component;
      });
      return ret;
    },
    itemIsHover(index) {
      return (
        this.hoverIndex === index &&
        this.hoverIndex !== this.activeIndex &&
        !this.isDrag
      );
    },
    itemIsPlaceholder(index) {
      window.console.log(this.placeholderIndex);
      return this.placeholderIndex === index && !this.isPlaceholder;
    }
  }
};
</script>
<style lang="less">
.placeholder() {
  background-color: #ccc;
  opacity: 0.8;
}
.df-detail-field {
  .detail-title {
    padding: 14px 10px;
    color: rgba(25, 31, 37, 0.56);
    background: #fff;
    border-bottom: 1px solid rgba(25, 31, 37, 0.08);
  }
  .detail-content {
    min-height: 50px;
    background: #ddeff3;
    padding: 3px 0;
    .empty {
      text-align: center;
      line-height: 50px;
    }
    .df-component {
      margin: 0 0 3px;
    }
  }
  .detail-button {
    display: block;
    height: 56px;
    line-height: 56px;
    color: #008cee;
    text-align: center;
    padding: 0 15px;
    background: #f7f9ff;
    border-bottom: 1px solid hsla(240, 2%, 79%, 0.5);
  }
}
.df-component_placeholder {
  .detail-title,
  .detail-button {
    .placeholder();
  }
}
</style>