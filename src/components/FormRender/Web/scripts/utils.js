import config from "@/config";
import Http from "utils/http";
export const getDurationCalculation = (data) => {
    const LEAVE_ERR_MSG = "时长计算失败,请重新选择起始时间及请假类型!";
    const ERR_MSG = "时长计算失败,请重新选择起始时间!";
    const context = data.context;
    const fieldData = data.fieldData;
    const startDate = data.startDate;
    const endDate = data.endDate;
    if (startDate && endDate) {
        const parentComponent = fieldData.attribute.parentComponent;
        const fieldLists = data.fieldLists;
        const parentIndex = data.parentIndex;
        const index = data.index;
        const requestData = {
            component: parentComponent,
            startTime: startDate,
            endTime: endDate
        };
        if (parentComponent === "Leave") {
            const parentField = fieldLists[parentIndex];
            const type = parentField.attribute.children.find(item => {
                return item.name === `${parentField.attribute.name}-调休类型`;
            });
            const approvalVacationType = type.attribute.approvalVacationType;
            const ret = approvalVacationType.find(item => {
                return item.vacationName === type.value;
            });
            requestData["approvalVacationTypeId"] = ret ?
                ret.approvalVacationTypeId :
                "";
        }
        Http.post({
            url: config.apiUrl.DurationCalculation,
            data: requestData,
            succeed: (res, data) => {
                context.$emit("on-value-change", data, index, parentIndex);
            },
            errorCbs: () => {
                if (parentComponent === "Leave") {
                    context.$Message.error(LEAVE_ERR_MSG);
                } else {
                    context.$Message.error(ERR_MSG);
                }
            }
        });
    }
};