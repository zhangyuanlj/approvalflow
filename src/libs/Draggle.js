import {
    Message
} from "view-design";
import $ from "jquery";
const APP_CONTAINER = "app-container";
const CANVAS = "canvas-area-inner";
const CANVAS_BODY = "canvas-area-body";
const DRAGGING_PROXY_NAME = "df-dragging-proxy";
const DRAGGING_MARK = "df-dragging-mark";
const DF_COMPONENT = "df-component";
const DF_GROUPS = "df-groups";
const THESHOLD_VALUE = 15;
const MSG_TEXT = {
    WIDGET_ERROR_TEXT: "每个单据只能添加一个套件，如需更换，请删除后再添加！"
};
/**
 * 组件拖拽插入
 *
 * @class Draggle
 */
class Draggle {
    /**
     * Creates an instance of Draggle.
     * @param {object} options
     * @options {object} $dragContainer 拖动元素的父容器
     * @options {string} drag 拖动元素选择器
     * @options {boolean} isSort 是否具备排序功能
     * @options {function} onMoveStart:void($drag:object) 拖动开始时触发的函数
     * @options {function} onMove:void(oldIndex:number) 拖动时触发的函数
     * @options {function} onMoveEnd:void(name:string,sortIndex:number) 拖动结束时触发的函数
     * @options {function} onMoveReset:void() 重置拖动的函数
     * @memberof Draggle
     */
    constructor(options) {
        this.$doc = $(document);
        this.$body = $("body");
        this.$canvas = $(`#${CANVAS}`);
        this.$activeCanvas = this.$canvas;
        this.defaults = {
            $dragContainer: $("#thumb-pannel"),
            drag: ".thumb-item",
            isSort: false,
            onMoveStart: () => {},
            onMove: () => {},
            onMoveEnd: () => {},
            onMoveReset: () => {}
        };
        this.$drag = null;
        this.dragStart = false;
        this.dragMove = false;
        this.startX = 0;
        this.startY = 0;
        this.moveX = 0;
        this.moveY = 0;
        this.parentIndex = -1;
        this.init(options);
    }
    init(options) {
        $.extend(this.defaults, options);
        this.$dragContainer = this.defaults.$dragContainer;
        this.drag = this.defaults.drag;
        this.on();
    }
    destroy() {
        this.reset();
        this.off();
    }
    clone() {
        const $draggingProxy = $(`.${DRAGGING_PROXY_NAME}`);
        const component = this.$drag.attr("data-component");
        const left = this.$drag.offset().left;
        const top = this.$drag.offset().top;
        this.$clone = $(`#thumb-pannel .thumb-item[data-component='${component}']`);
        $draggingProxy.html(this.$clone.clone()).css({
            left: left,
            top: top - $(window).scrollTop()
        });
    }
    updateProxyPos(x, y) {
        const $draggingProxy = $(`.${DRAGGING_PROXY_NAME}`);
        const left = this.getUpdateX(x);
        const top = this.getUpdateY(y);
        const canvasTop = this.$canvas.offset().top;
        const canvasHeight = this.$canvas.height();
        const scrollTop = this.$canvas.scrollTop();
        const scrollHeight = this.getScrollHeight(canvasHeight, y);
        const boundaryValue = y - canvasTop;
        if (boundaryValue <= 0) {
            this.$canvas.scrollTop(scrollTop - scrollHeight);
        } else if (boundaryValue >= canvasHeight - 30) {
            this.$canvas.scrollTop(scrollTop + scrollHeight);
        }
        $draggingProxy.css({
            left: left,
            top: top
        }).show();
    }
    addDraggingMark($dfComponent, sortIndex) {
        const draggingMarkHtml = `<div class="${DRAGGING_MARK}"></div>`;
        let $item = null;
        $(`.${APP_CONTAINER}`).addClass(`${APP_CONTAINER}-unselect ${APP_CONTAINER}-move`);
        $(`.${DRAGGING_MARK}`).remove();
        if (!$dfComponent.length) {
            this.$activeCanvas.append(draggingMarkHtml);
        } else {
            if (sortIndex === -1 || sortIndex === undefined) {
                $item = $dfComponent.eq(0);
                $item.before(draggingMarkHtml);
            } else {
                $item = $dfComponent.eq(sortIndex);
                $item.after(draggingMarkHtml);
            }
        }
    }
    //是否为套件
    isWidget() {
        return this.$drag.attr("data-has-widget") !== "true";
    }
    //是否可以添加到明细组件中
    isAddInGroups($item) {
        return $item.attr("data-component") === "Detail" && this.$drag.attr("data-component") !== "Detail" && this.isWidget();
    }
    //是否被禁用
    isDisable() {
        return this.$drag.parent(".ivu-tabs-tabpane").hasClass("thumb-pannel_disable");
    }
    //是否可以触发拖动
    isMousemove() {
        return this.startX !== this.moveX || this.startY !== this.moveY;
    }
    groupsPlaceholder($item, x, y) {
        let sortIndex;
        const $dfComponent = $item.find(`.${DF_COMPONENT}`);
        const $canvas = $item.find(`.${DF_GROUPS}`);
        const $children = $item.find(`.${DF_COMPONENT}`);
        const left = $canvas.offset().left;
        const width = $canvas.width();
        if (y <= $canvas.offset().top) {
            sortIndex = -1;
        } else {
            $children.each(function (i) {
                const $this = $(this);
                const top = $this.offset().top;
                const height = $this.height();
                if ((x >= left && x <= left + width) && (y >= top && y <= top + height + THESHOLD_VALUE)) {
                    sortIndex = i;
                    return false;
                }
            });
        }
        return {
            $dfComponent: $dfComponent,
            index: sortIndex
        };
    }
    placeholder(x, y) {
        const self = this;
        const $dfComponent = this.$canvas.find(`.${DF_COMPONENT}:not(.${DF_GROUPS} .${DF_COMPONENT})`);
        let $taget = $dfComponent;
        let left = this.$canvas.offset().left;
        let width = this.$canvas.width();
        if (x >= left && x <= left + width) {
            let sortIndex;
            if (y <= this.$canvas.offset().top) {
                sortIndex = -1;
            } else {
                $dfComponent.each(function (i) {
                    const $item = $(this);
                    const computedSortIndex = () => {
                        self.parentIndex = -1;
                        self.$endTarget = $item.parent();
                        if (x >= left && x <= left + width) {
                            if (y >= top - THESHOLD_VALUE && y <= top + middle) {
                                sortIndex = i - 1 === -1 ? -1 : i - 1;
                            } else if (y > top + middle) {
                                sortIndex = i;
                            }
                        }
                    };
                    let top = $item.offset().top;
                    let height = $item.height();
                    let middle = height / 2;
                    if (self.isAddInGroups($item)) {
                        if (y >= top && y < top + height - 56) {
                            const sortRet = self.groupsPlaceholder($item, x, y);
                            $taget = sortRet.$dfComponent;
                            self.$activeCanvas = $item.find(`.${DF_GROUPS}`);
                            self.$endTarget = self.$activeCanvas;
                            sortIndex = sortRet.index;
                            self.parentIndex = i;
                            return false;
                        } else {
                            computedSortIndex();
                        }
                    } else {
                        computedSortIndex();
                    }
                });
            }
            this.sortIndex = sortIndex;
            this.addDraggingMark($taget, sortIndex);
        } else {
            $(`.${DRAGGING_MARK}`).remove();
        }
    }
    getStartTarget($drag) {
        this.$startTarget = null;
        if ($drag.parent(`.${CANVAS_BODY}`).length) {
            this.$startTarget = $drag.parent(`.${CANVAS_BODY}`);
        } else if ($drag.parent(`.${DF_GROUPS}`).length) {
            this.$startTarget = $drag.parent(`.${DF_GROUPS}`);
        }
    }
    getScrollHeight(canvasHeight, y) {
        const $dfComponent = $(`.${CANVAS} .${DF_COMPONENT}`);
        const top = y > 0 ? y : 0 - y;
        if ($dfComponent.length < 20) {
            return 10;
        }
        return top > canvasHeight ? top - canvasHeight : top;
    }
    getSortIndex() {
        if (this.sortIndex === -1) {
            this.sortIndex = 0;
        } else {
            this.sortIndex = $(`.${DRAGGING_MARK}`).prevAll(`.${DF_COMPONENT}`).length;
        }
        return this.sortIndex;
    }
    getUpdateX(x) {
        return x - this.$clone.width() / 2;
    }
    getUpdateY(y) {
        return y - this.$clone.height() / 2 - $(window).scrollTop();
    }
    getName(component) {
        const $dfComponent = $(`.${CANVAS} .${DF_COMPONENT}[data-component='${component}']`);
        let name = this.$drag.attr("data-name");
        let num = 0;
        $dfComponent.each((i) => {
            const nameAttr = $dfComponent.eq(i).attr("data-name");
            const ret = nameAttr.match(/\d{1,}/);
            const nameNum = ret !== null ? parseInt(ret[0]) : 0;
            if (nameNum > num) {
                num = nameNum;
            }
        });
        if (!this.defaults.isSort) {
            name = $dfComponent.length ? `${name}(${++num})` : name;
        }
        return name;
    }
    getDragType() {
        const startTargetClass = this.$startTarget && this.$startTarget.attr("class");
        const endTargetClass = this.$endTarget && this.$endTarget.attr("class");
        let dragType = 1;
        if (startTargetClass === CANVAS_BODY && endTargetClass === CANVAS_BODY) {
            dragType = 1;
        } else if (startTargetClass === CANVAS_BODY && this.$endTarget.hasClass(DF_GROUPS)) {
            dragType = 2;
        } else if (this.$startTarget.hasClass(DF_GROUPS) && endTargetClass === CANVAS_BODY) {
            dragType = 3;
        } else if (this.$startTarget.hasClass(DF_GROUPS) && this.$endTarget.hasClass(DF_GROUPS)) {
            dragType = 4;
        }
        return dragType;
    }
    getDragInfo() {
        const dragType = this.getDragType();
        const ret = {
            dragType: dragType
        };
        if (dragType === 2) {
            ret["startTargetIndex"] = this.$drag.index();
            ret["endTargetIndex"] = this.$endTarget.parents(`.${DF_COMPONENT}`).index();
        } else if (dragType === 3) {
            const prevLen = this.$drag.parents(`.${DF_COMPONENT}`).prevAll(`.${DRAGGING_MARK}`).length;
            ret["startTargetIndex"] = this.$drag.parents(`.${DF_COMPONENT}`).index();
            if (prevLen === 1) {
                ret["startTargetIndex"] = ret["startTargetIndex"] - 1;
            }
        } else if (dragType === 4) {
            ret["startTargetIndex"] = this.$drag.parents(`.${DF_COMPONENT}`).index();
            ret["endTargetIndex"] = this.$endTarget.parents(`.${DF_COMPONENT}`).index();
        }
        return ret;
    }
    reset() {
        const $draggingProxy = $(`.${DRAGGING_PROXY_NAME}`);
        this.$drag = null;
        this.$clone = null;
        this.dragStart = false;
        this.dragMove = false;
        this.startX = 0;
        this.startY = 0;
        this.moveX = 0;
        this.moveY = 0;
        this.parentIndex = -1;
        $(`.${APP_CONTAINER}`).removeClass(`${APP_CONTAINER}-unselect ${APP_CONTAINER}-move`);
        $draggingProxy.html("").removeAttr("style").hide();
        $(`.${DRAGGING_MARK}`).remove();
    }
    showMessage(type, config) {
        Message[type](config);
    }
    onMousedown(e, $drag) {
        if (e.which !== 1) {
            return;
        }
        this.$drag = $drag;
        if (this.isDisable()) {
            this.showMessage("error", {
                content: MSG_TEXT.WIDGET_ERROR_TEXT
            });
            return;
        }
        this.startX = e.pageX;
        this.startY = e.pageY;
        this.$startTarget = $drag.parent();
        this.oldIndex = this.$drag.index();
        this.dragStart = true;
        this.clone();
        this.defaults.onMoveStart(this.$drag);
    }
    onMousemove(e) {
        if (!this.dragStart) {
            return;
        }
        this.moveX = e.pageX;
        this.moveY = e.pageY;
        if (this.isMousemove()) {
            this.dragMove = true;
            this.updateProxyPos(this.moveX, this.moveY);
            this.placeholder(this.moveX, this.moveY);
            this.defaults.onMove(this.oldIndex);
        }
    }
    onMouseup(e) {
        if (!this.dragStart && !this.dragMove) {
            return;
        }
        const x = e.pageX;
        const left = this.$canvas.offset().left;
        const width = this.$canvas.width();
        if ((x >= left && x <= left + width) && this.dragMove) {
            const component = this.$drag.attr("data-component");
            const hasWidget = this.$drag.attr("data-has-widget");
            const name = this.getName(component);
            this.getSortIndex();
            const endOptions = {
                name: name,
                component: component,
                hasWidget: hasWidget,
                sortIndex: this.sortIndex,
                oldIndex: this.oldIndex,
                parentIndex: this.parentIndex
            };
            if (this.defaults.isSort) {
                const dragInfo = this.getDragInfo();
                endOptions["dragInfo"] = dragInfo;
            }
            this.defaults.onMoveEnd(endOptions);
        }
        this.defaults.onMoveReset();
        this.reset();
    }
    on() {
        this.$dragContainer.on("mousedown", this.drag, (e) => {
            const $drag = $(e.currentTarget);
            this.onMousedown(e, $drag);
            e.stopPropagation();
            return false;
        });
        this.$dragContainer.on("mousemove", this.drag, this.onMousemove.bind(this));
        this.$dragContainer.on("mouseup", this.drag, this.onMouseup.bind(this));
        this.$doc.on(`mousemove.${this.drag}`, this.onMousemove.bind(this));
        this.$doc.on(`mouseup.${this.drag}`, this.onMouseup.bind(this));
    }
    off() {
        this.$dragContainer.off("mousedown", this.drag);
        this.$dragContainer.off("mousemove", this.drag);
        this.$dragContainer.off("mouseup", this.drag);
        this.$doc.off(`mousemove.${this.drag}`);
        this.$doc.off(`mouseup.${this.drag}`);
    }
}
export default Draggle;