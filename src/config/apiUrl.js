// import devConfig from "./dev";
// import prodConfig from "./prod";
// const env = window.ENV ? window.ENV : "development";
// const requestUrl = env === "development" ? devConfig.requestUrl : prodConfig.prodConfig;
const baseUrl = "http://xwbg.sslxzc.cn/api";
export default {
    //审批单接口
    Approval: `Rpc_Approval/GetList`,
    //创建审批单
    CreateApproval: `${baseUrl}/ApprovalFormTemplate/Add`,
    //更新审批单
    UpdateApproval: `Rpc_Approval/Update`,
    //获取表单
    ApprovalFormTemplateGetList: "Rpc_ApprovalFormTemplate/GetList",
    //多个部门下的联系人
    getContacts: `${baseUrl}/Teacher/GetTeacherByDepartmentIds`,
    //部门
    getDepartments: `${baseUrl}/Teacher/GetTeacherOrganizationalStructure`,
    //搜索联系人
    searchContacts: `${baseUrl}/Teacher/GetList`,
    //附件上传
    attachment: `${baseUrl}/Attachment/UpLoadFile`,
    //图片上传
    image: `${baseUrl}/Attachment/UpLoadImg`,
    ApprovalGroup: `${baseUrl}/ApprovalGroup/GetList`
};