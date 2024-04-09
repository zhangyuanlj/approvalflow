const baseUrl = "";
export default {
    //审批单接口
    CheckToken: `${baseUrl}/Common/CheckToken`,
    // CheckToken: `Common/CheckToken`,
    //审批单接口
    Approval: `${baseUrl}/ApprovalFormTemplate/GetModel`,
    //创建审批单
    CreateApproval: `${baseUrl}/ApprovalFormTemplate/Add`,
    //更新审批单
    UpdateApproval: `${baseUrl}/ApprovalFormTemplate/Update`,
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
    //审批分组
    ApprovalGroup: `${baseUrl}/ApprovalGroup/GetList`,
    //请假类型
    VacationTypes: `${baseUrl}/VacationTypes/GetList`,
    //提交表单
    Submit: `${baseUrl}/ApprovalApply/Add`,
    //获取角色列表
    GetRolesList: `${baseUrl}/Role/GetApprovalRole`,
    //获取主管列表
    GetApprovalList: `Rpc_Approval_Director/GetList`,
    //时长计算
    DurationCalculation: `${baseUrl}/VacationTypes/DurationCalculation`
};