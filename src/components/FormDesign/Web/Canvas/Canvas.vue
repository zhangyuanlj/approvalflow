<template>
  <div class="canvas">
    <div class="canvas-area">
      <div id="canvas-area-inner" class="canvas-area-inner">
        <div class="canvas-area-body">
          <template v-if="items.length">
            <div
              v-for="(item,i) in items"
              :key="i"
              class="df-component"
              :data-name="item.name"
              :data-component="item.component"
              :data-has-widget="item.attribute.isWidget"
            >
              <component :is="getComponent(item.component).designComp" :attribute="item.attribute"></component>
              <a href="javascript:void(0);" class="df-component-remove">
                <Icon type="md-close" :size="16" />
              </a>
            </div>
          </template>
          <div v-else class="canvas-no-content">
            <p>选择左侧控件拖动到此处</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  GET_IS_DRAG,
  UPDATE_DESIGN_FIELD,
  GET_FIELD_LISTS,
  UPDATE_FIELD_LISTS,
  UPDATE_IS_DRAG,
  UPDATE_HAS_WIDGET
} from "store/modules/formDesign/type";
import { mapGetters, mapMutations } from "vuex";
import $ from "jquery";
import { Icon, Message } from "view-design";
import componentModel from "formDesign/Web/Factory/model";
import Draggle from "libs/Draggle";
const CANVAS = "canvas-area-inner";
const BASE_CALSS = "df-component";
const REMOVE_CALSS = "df-component-remove";
const GROUP_CLASS = "df-groups";
export default {
  name: "CanvasDesign",
  components: {
    Icon
  },
  data() {
    return {
      hasParent: true
    };
  },
  props: {
    insertItem: {
      type: Object,
      value: () => {
        return null;
      }
    }
  },
  watch: {
    insertItem: {
      handler(item) {
        const attribute = item.attribute;
        this.updateItems(item);
        this.$nextTick(() => {
          this.activeItem(item.name);
        });
        if (item.hasWidget) {
          this.updateHasWidget(true);
        }
        if (attribute.showMsg) {
          Message.warning({
            content: attribute.msgContent
          });
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      items: GET_FIELD_LISTS,
      isDrag: GET_IS_DRAG
    })
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.draggle.destroy();
    this.off();
  },
  methods: {
    init() {
      this.draggle = new Draggle({
        $dragContainer: $(`#${CANVAS}`),
        drag: `.${BASE_CALSS}`,
        isSort: true,
        onMoveStart: this.onMoveStart,
        onMove: this.onMove,
        onMoveEnd: this.onMoveEnd
      });
      this.on();
    },
    setPlaceholderClass() {
      const placeholderClassName = `${BASE_CALSS}_placeholder`;
      $(`#${CANVAS} .${BASE_CALSS}`).removeClass(placeholderClassName);
      this.$drag.addClass(placeholderClassName);
    },
    resetPlaceholderClass() {
      const placeholderClassName = `${BASE_CALSS}_placeholder`;
      this.$drag.removeClass(placeholderClassName);
    },
    activeItem(name) {
      const activeClassName = `${BASE_CALSS}_active`;
      $(`#${CANVAS} .${BASE_CALSS}`).removeClass(activeClassName);
      $(`#${CANVAS} .${BASE_CALSS}[data-name='${name}']`).addClass(
        activeClassName
      );
      this.updateDesignField(name);
    },
    getComponent(component) {
      const ret = componentModel.list.find(item => {
        return item.component === component;
      });
      return ret;
    },
    ...mapMutations({
      updateDesignField: UPDATE_DESIGN_FIELD,
      updateIsDrag: UPDATE_IS_DRAG,
      setItems: UPDATE_FIELD_LISTS,
      updateHasWidget: UPDATE_HAS_WIDGET
    }),
    sortItems(list, item) {
      const sortIndex = item.sortIndex;
      const len = list.length;
      let start = [];
      let middle = [];
      let end = [];
      let ret = [];
      if (sortIndex === 0) {
        start = [item];
        end = list;
        ret = ret.concat(start, end);
      } else if (sortIndex === len) {
        start = list;
        end = [item];
        ret = ret.concat(start, end);
      } else {
        start = list.slice(0, sortIndex);
        middle = [item];
        end = list.slice(sortIndex, len);
        ret = ret.concat(start, middle, end);
      }
      return ret;
    },
    updateItems(item) {
      const parentIndex = item.parentIndex;
      let ret = [];
      if (parentIndex !== -1) {
        const detailItems = this.items[parentIndex].attribute.children;
        const sortRet = this.sortItems(detailItems, item);
        this.items[parentIndex].attribute.children = sortRet;
        ret = this.items;
        this.parentIndex = parentIndex;
      } else {
        ret = this.sortItems(this.items, item);
        this.parentIndex = -1;
      }
      this.setItems(ret);
    },
    moveEndSort(list, item) {
      const len = list.length;
      const sortIndex = item.sortIndex;
      const oldIndex = item.oldIndex;
      let activeIndex = sortIndex;
      let ret = list.slice(0, len);
      if (list.length) {
        ret = list.filter(component => {
          return component.name !== item.name;
        });
      }
      if (sortIndex === 0) {
        ret = [item].concat(ret);
      } else if (sortIndex === len) {
        ret = ret.concat([item]);
        activeIndex = len - 1;
      } else {
        if (sortIndex - oldIndex === 0 || sortIndex - oldIndex === 1) {
          return;
        }
        let boundaryValue = sortIndex;
        if (sortIndex > oldIndex) {
          boundaryValue = sortIndex - 1;
          activeIndex = boundaryValue;
        }
        const start = ret.slice(0, boundaryValue);
        const end = ret.slice(boundaryValue, ret.length);
        ret = start.concat([item], end);
      }
      return {
        ret,
        activeIndex
      };
    },
    onMoveStart($drag) {
      const $parent = $drag.parent(`.${GROUP_CLASS}`);
      this.$drag = $drag;
      this.hasParent = $parent.length ? true : false;
    },
    onMove() {
      this.updateIsDrag(true);
      this.setPlaceholderClass();
    },
    onMoveEnd(item) {
      const oldIndex = item.oldIndex;
      const dragInfo = item.dragInfo;
      const dragType = dragInfo.dragType;
      let ret = [];
      if (dragType === 1) {
        item.attribute = this.items[oldIndex].attribute;
        const sortRet = this.moveEndSort(this.items, item);
        if (sortRet) {
          ret = sortRet.ret;
        } else {
          ret = this.items;
        }
      } else if (dragType === 2) {
        const endTargetIndex = dragInfo.endTargetIndex;
        const items = this.items[endTargetIndex].attribute.children;
        item.attribute = this.items[oldIndex].attribute;
        ret = this.sortItems(items, item);
        this.items[endTargetIndex].attribute.children = ret;
        this.items.splice(dragInfo.startTargetIndex, 1);
        ret = this.items;
      } else if (dragType === 3) {
        const startTargetIndex = dragInfo.startTargetIndex;
        const items = this.items[startTargetIndex].attribute.children;
        item.attribute = items[oldIndex].attribute;
        items.splice(oldIndex, 1);
        this.items[startTargetIndex].attribute.children = items;
        const sortRet = this.sortItems(this.items, item);
        ret = sortRet;
      } else if (dragType === 4) {
        const startTargetIndex = dragInfo.startTargetIndex;
        const endTargetIndex = dragInfo.endTargetIndex;
        const startItems = this.items[startTargetIndex].attribute.children;
        const endItems = this.items[endTargetIndex].attribute.children;
        item.attribute = startItems[oldIndex].attribute;
        startItems.splice(oldIndex, 1);
        this.items[startTargetIndex].attribute.children = startItems;
        const sortRet = this.sortItems(endItems, item);
        this.items[endTargetIndex].attribute.children = sortRet;
        ret = this.items;
      }
      this.placeholderIndex = -1;
      this.updateIsDrag(false);
      this.resetPlaceholderClass();
      this.setItems(ret);
      this.$nextTick(() => {
        this.activeItem(item.name);
      });
    },
    onRemove(ops) {
      const activeClassName = `${BASE_CALSS}_active`;
      const errMsg = "该组件已被设为审批条件，不可删除!";
      //删除明细组件中的某个子组件
      if (ops.$group.length) {
        const children = this.items[ops.groupIndex].attribute.children;
        if (children[ops.parentIndex].attribute.props.isConditionField) {
          this.$Message.error({
            content: errMsg
          });
          return;
        }
        children.splice(ops.parentIndex, 1);
        this.items[ops.groupIndex].attribute.children = children;
      } else {
        //检查套件中是否有字段设置为流程条件
        const children = this.items[ops.parentIndex].attribute.children;
        if (children && children.length) {
          for (let i = 0; i < children.length; i++) {
            const item = children[i];
            if (item.attribute.props.isConditionField) {
              this.$Message.error({
                content: errMsg
              });
              return;
            }
          }
        }
        if (this.items[ops.parentIndex].attribute.props.isConditionField) {
          this.$Message.error({
            content: errMsg
          });
          return;
        }
        this.items.splice(ops.parentIndex, 1);
      }
      this.setItems(this.items);
      this.updateDesignField();
      if (ops.$parent.attr("data-has-widget") === "true") {
        this.updateHasWidget(false);
      }
      this.$nextTick(() => {
        $(`#${CANVAS} .${BASE_CALSS}`).removeClass(activeClassName);
      });
    },
    on() {
      const self = this;
      const hoverClassName = `${BASE_CALSS}_hover`;
      const activeClassName = `${BASE_CALSS}_active`;
      $(`#${CANVAS}`).on("mouseover", `.${BASE_CALSS}`, function(e) {
        const $this = $(this);
        $(`#${CANVAS} .${BASE_CALSS}`).removeClass(hoverClassName);
        if (!self.isDrag && !$this.hasClass(activeClassName)) {
          $this.addClass(hoverClassName);
        }
        e.stopPropagation();
      });
      $(`#${CANVAS}`).on("mouseout", `.${BASE_CALSS}`, function(e) {
        $(`#${CANVAS} .${BASE_CALSS}`).removeClass(hoverClassName);
        e.stopPropagation();
      });
      $(`#${CANVAS}`).on("click", `.${BASE_CALSS}`, function(e) {
        const $this = $(this);
        const name = $this.attr("data-name");
        $(`#${CANVAS} .${BASE_CALSS}`).removeClass(activeClassName);
        $this.removeClass(hoverClassName).addClass(activeClassName);
        self.updateDesignField(name);
        e.stopPropagation();
      });
      $(`#${CANVAS}`).on("click", `.${REMOVE_CALSS}`, function(e) {
        const $this = $(this);
        const $parent = $this.parents(`.${BASE_CALSS}`);
        const $group = $this.parents(`.${GROUP_CLASS}`);
        const parentIndex = $parent.index();
        const groupIndex = $group.parents(`.${BASE_CALSS}`).index();
        self.onRemove({
          $parent,
          $group,
          parentIndex,
          groupIndex
        });
        e.stopPropagation();
      });
    },
    off() {
      $(`#${CANVAS}`).off("mouseover", `.${BASE_CALSS}`);
      $(`#${CANVAS}`).off("mouseout", `.${BASE_CALSS}`);
      $(`#${CANVAS}`).off("click", `.${BASE_CALSS}`);
      $(`#${CANVAS}`).off("click", `.${REMOVE_CALSS}`);
    }
  }
};
</script>

<style lang="less">
@import "~components/Styles/base.module.less";
@component-height: 50px;

.transition() {
  transition: all 0.1s ease-in-out;
}

.component-remove() {
  color: #fff;
  display: block;
}

.placeholder() {
  border-style: dashed;
  border-color: #666;
  background-color: #ccc;
  opacity: 0.8;
}

.canvas {
  &-no-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 480px;
    background: #fff url("./images/canvas-no-content.png") no-repeat 50%;
    background-size: 239px 96px;
    p {
      text-align: center;
      color: #999;
      padding-top: 130px;
    }
  }
  &-area {
    position: relative;
    width: 490px;
    height: 670px;
    margin: 0 auto;
    background: url("images/canva-bg.png") no-repeat;
    background-size: 100%;

    .canvas-area-inner {
      position: absolute;
      left: 50%;
      top: 73px;
      width: 292px;
      height: 480px;
      margin-left: -146px;
      overflow-x: hidden;
      overflow-y: auto;

      .df-field-design {
        display: flex;
        align-items: center;
        padding: 14px 10px;

        .label {
          flex: 3;
          text-align: left;
          color: #222;
          font-size: 14px;
          margin-right: 15px;
          overflow: hidden;
        }

        .placeholder {
          max-width: 130px;
          height: 20px;
          text-align: right;
          color: rgba(25, 31, 37, 0.4);
          font-size: 13px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          .icon {
            display: block;
            width: 18px;
            height: 18px;
          }
        }
      }

      .df-field-has-border {
        .df-field-design {
          border-bottom: 1px solid rgba(25, 31, 37, 0.08);
        }
      }
    }

    .canvas-area-body {
      padding-bottom: 30px;
    }
  }
}

.df-component {
  position: relative;
  min-height: @component-height;
  background-color: #fff;
  border: 1px solid transparent;
  margin: 15px 0;
  .transition();
  cursor: move;

  &-remove {
    position: absolute;
    right: 0;
    top: 0;
    width: 18px;
    height: 18px;
    text-align: center;
    line-height: 18px;
    color: #fff;
    background-color: #38adff;
    display: none;
  }

  &_hover {
    border-style: dashed;
    border-color: #38adff;

    .df-component-remove {
      .component-remove();
    }

    .df-groups {
      .df-component:not(.df-component_active) .df-component-remove {
        display: none;
      }
    }
  }

  &_active {
    border-color: #38adff;

    .df-component-remove {
      .component-remove();
    }

    .df-groups {
      .df-component-remove {
        display: none;
      }
    }
  }

  &_placeholder {
    .placeholder();

    .df-groups {
      .df-component {
        .placeholder();
        border: 0;
      }
    }

    .df-component-remove {
      display: none;
    }
  }
}

.df-dragging-mark {
  background: @mark-bg-color;
  height: 2px;
  position: relative;
  margin: 3px 0;

  .df-component-remove {
    display: none;
  }

  &:after,
  &:before {
    position: absolute;
    content: "";
    display: block;
    height: 0;
    width: 0;
    border-style: solid;
    border-color: transparent;
    border-width: 4px 8px;
    top: -3px;
  }

  &:before {
    left: 0;
    border-left-color: @mark-bg-color;
  }

  &:after {
    right: 0;
    border-right-color: @mark-bg-color;
  }
}
</style>
