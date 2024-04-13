const baseUrl = "";
export default {
    //审批单接口
    CheckToken: `Common/CheckToken`,
    //审批单接口
    Approval: `ApprovalFormTemplate/GetModel`,
    //创建审批单
    CreateApproval: `ApprovalFormTemplate/Add`,
    //更新审批单
    UpdateApproval: `ApprovalFormTemplate/Update`,
    //获取表单
    ApprovalFormTemplateGetList: "Rpc_ApprovalFormTemplate/GetList",
    //多个部门下的联系人
    getContacts: `Common/GetContacts`,
    //部门
    getDepartments: `Common/GetDepartments`,
    //搜索联系人
    searchContacts: `Common/SearchUser`,
    //附件上传
    attachment: `Common/UpLoadFile`,
    //图片上传
    image: `Common/UpLoadFile`,
    //审批分组
    ApprovalGroup: `ApprovalGroup/GetList`,
    //请假类型
    VacationTypes: `VacationTypes/GetList`,
    //提交表单
    Submit: `ApprovalApply/Add`,
    //获取角色列表
    GetRolesList: `Common/GetRoles`,
    //获取主管列表
    GetApprovalList: `Rpc_Approval_Director/GetList`,
    //时长计算
    DurationCalculation: `VacationTypes/DurationCalculation`
};