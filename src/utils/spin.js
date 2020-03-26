import $ from "jquery";
const SPIN_ID = "#df-spin-container";
export const spinShow = function () {
    $(SPIN_ID).show();
};
export const spinHide = function () {
    $(SPIN_ID).hide();
};