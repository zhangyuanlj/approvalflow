export default [{
    "name": "出差套件",
    "component": "BusinessTravel",
    "value": "",
    "attribute": {
        "name": "出差套件",
        "title": "出差套件",
        "isWidget": true,
        "props": {},
        "actionName": "增加行程",
        "unitValue": "2",
        "daysOfBusinessTrip": true,
        "peers": true,
        "children": [{
            "attribute": {
                "name": "出差套件-出差事由",
                "title": "出差事由",
                "props": {
                    "placeholder": "请输入",
                    "maxlength": 8000
                },
                "validation": {
                    "required": false
                },
                "validationRules": [{
                    "required": true,
                    "message": "出差事由不能为空",
                    "trigger": "change"
                }, {
                    "trigger": "change"
                }]
            },
            "name": "出差套件-出差事由",
            "component": "MultipleInput",
            "value": ""
        }, {
            "attribute": {
                "name": "出差套件-交通工具",
                "title": "交通工具",
                "props": {
                    "placeholder": "请选择"
                },
                "validation": {
                    "required": true
                },
                "validationRules": [{
                    "required": true,
                    "message": "交通工具不能为空",
                    "trigger": "change"
                }],
                "items": [{
                    "value": "火车"
                }, {
                    "value": "飞机"
                }, {
                    "value": "汽车"
                }, {
                    "value": "轮船"
                }]
            },
            "name": "出差套件-交通工具",
            "component": "Radio",
            "value": ""
        }, {
            "attribute": {
                "name": "出差套件-单程往返",
                "title": "单程往返",
                "props": {
                    "placeholder": "请选择"
                },
                "validation": {
                    "required": true
                },
                "validationRules": [{
                    "required": true,
                    "message": "单程往返不能为空",
                    "trigger": "change"
                }],
                "items": [{
                    "value": "单程"
                }, {
                    "value": "往返"
                }]
            },
            "name": "出差套件-单程往返",
            "component": "Radio",
            "value": ""
        }, {
            "attribute": {
                "name": "出差套件-出发城市",
                "title": "出发城市",
                "props": {
                    "placeholder": "请输入",
                    "maxlength": 1000
                },
                "validation": {
                    "required": false
                },
                "validationRules": [{
                    "required": true,
                    "message": "出发城市不能为空",
                    "trigger": "change"
                }]
            },
            "name": "出差套件-出发城市",
            "component": "Input",
            "value": ""
        }, {
            "attribute": {
                "name": "出差套件-目的城市",
                "title": "目的城市",
                "props": {
                    "placeholder": "请输入",
                    "maxlength": 1000
                },
                "validation": {
                    "required": false
                },
                "validationRules": [{
                    "required": true,
                    "message": "目的城市不能为空",
                    "trigger": "change"
                }]
            },
            "name": "出差套件-目的城市",
            "component": "Input",
            "value": ""
        }, {
            "attribute": {
                "name": "出差套件-时间区间",
                "title": "时间区间",
                "startDateTitle": "开始日期",
                "endDateTitle": "结束日期",
                "automatic": false,
                "props": {
                    "placeholder": "请选择",
                    "type": "date"
                },
                "validation": {
                    "required": true
                },
                "validationRules": []
            },
            "name": "出差套件-时间区间",
            "component": "DateTimeRange",
            "value": []
        }, {
            "attribute": {
                "name": "出差套件-出差备注",
                "title": "出差备注",
                "props": {
                    "placeholder": "请输入",
                    "maxlength": 8000
                },
                "validation": {
                    "required": false
                },
                "validationRules": [{
                    "required": true,
                    "message": "出差备注不能为空",
                    "trigger": "change"
                }, {
                    "trigger": "change"
                }]
            },
            "name": "出差套件-出差备注",
            "component": "MultipleInput",
            "value": ""
        }, {
            "attribute": {
                "name": "出差套件-同行人",
                "title": "同行人",
                "props": {
                    "placeholder": "请选择"
                },
                "multiple": "可同时选择多人",
                "validation": {
                    "required": true
                },
                "validationRules": []
            },
            "name": "出差套件-同行人",
            "component": "Contacts",
            "value": []
        }]
    }
}, {
    "name": "说明文字",
    "component": "ExplainText",
    "value": "",
    "attribute": {
        "name": "说明文字",
        "title": "说明文字",
        "text": "请按照实际情况进行填写",
        "props": {},
        "noDisplay": false,
        "jumpUrl": ""
    }
}, {
    "name": "明细",
    "component": "Detail",
    "value": "",
    "attribute": {
        "name": "明细",
        "title": "人员信息",
        "actionName": "增加明细",
        "props": {},
        "validation": {
            "required": false
        },
        "validationRules": [],
        "children": [{
            "name": "单行输入框",
            "component": "Input",
            "value": "",
            "attribute": {
                "name": "单行输入框",
                "title": "姓名",
                "props": {
                    "placeholder": "请输入",
                    "maxlength": 1000
                },
                "validation": {
                    "required": false
                },
                "validationRules": []
            }
        }, {
            "name": "多行输入框",
            "component": "MultipleInput",
            "value": "",
            "attribute": {
                "name": "多行输入框",
                "title": "概述",
                "props": {
                    "placeholder": "请输入",
                    "maxlength": 8000
                },
                "validation": {
                    "required": true
                },
                "validationRules": [{
                    "required": true,
                    "message": "概述不能为空",
                    "trigger": "change"
                }]
            }
        }, {
            "name": "数字输入框",
            "component": "NumberInput",
            "value": "",
            "attribute": {
                "name": "数字输入框",
                "title": "年龄",
                "props": {
                    "placeholder": "请输入"
                },
                "validation": {
                    "required": true
                },
                "unit": "岁",
                "validationRules": [{
                    "required": true,
                    "message": "年龄不能为空",
                    "trigger": "change"
                }]
            }
        }, {
            "name": "图片",
            "component": "Image",
            "value": [],
            "attribute": {
                "name": "图片",
                "title": "身份证",
                "watermark": false,
                "props": {
                    "placeholder": "请选择"
                },
                "validation": {
                    "required": true
                },
                "validationRules": [{
                    "required": true,
                    "message": "身份证不能为空",
                    "trigger": "change"
                }]
            }
        }, {
            "name": "多选框",
            "component": "Checkbox",
            "value": [],
            "attribute": {
                "name": "多选框",
                "title": "性别",
                "props": {
                    "placeholder": "请选择"
                },
                "validation": {
                    "required": false
                },
                "validationRules": [],
                "items": [{
                    "value": "男"
                }, {
                    "value": "女"
                }]
            }
        }, {
            "name": "日期",
            "component": "DateTime",
            "value": "",
            "attribute": {
                "name": "日期",
                "title": "出生日期",
                "props": {
                    "placeholder": "请输入",
                    "type": "date"
                },
                "validation": {
                    "required": false
                },
                "validationRules": []
            }
        }]
    }
}, {
    "name": "附件",
    "component": "Attachment",
    "value": [],
    "attribute": {
        "name": "附件",
        "title": "说明文件",
        "props": {},
        "validation": {
            "required": true
        },
        "validationRules": [{
            "required": true,
            "message": "说明文件不能为空",
            "trigger": "change"
        }]
    }
}, {
    "name": "日期区间",
    "component": "DateTimeRange",
    "value": [],
    "attribute": {
        "name": "日期区间",
        "title": "日期区间",
        "startDateTitle": "开始日期",
        "endDateTitle": "结束日期",
        "automatic": false,
        "props": {
            "placeholder": "请选择",
            "type": "date"
        },
        "validation": {
            "required": false
        },
        "validationRules": []
    }
}, {
    "name": "联系人",
    "component": "Contacts",
    "value": [],
    "attribute": {
        "name": "联系人",
        "title": "联系人",
        "props": {
            "placeholder": "请选择"
        },
        "multiple": "只能选择一人",
        "validation": {
            "required": true
        },
        "validationRules": [{
            "required": true,
            "message": "联系人不能为空",
            "trigger": "change"
        }]
    }
}, {
    "name": "部门",
    "component": "Departments",
    "value": [],
    "attribute": {
        "name": "部门",
        "title": "部门",
        "props": {
            "placeholder": "请选择"
        },
        "multiple": "可同时选择多个部门",
        "validation": {
            "required": true
        },
        "validationRules": [{
            "required": true,
            "message": "部门不能为空",
            "trigger": "change"
        }]
    }
}, {
    "name": "金额（元）",
    "component": "Amount",
    "value": "",
    "attribute": {
        "name": "金额（元）",
        "title": "金额（元）",
        "props": {
            "placeholder": "请输入金额",
            "type": "date"
        },
        "validation": {
            "required": false
        },
        "validationRules": [],
        "showUpperCase": true
    }
}, {
    "name": "地点",
    "component": "Location",
    "value": "",
    "attribute": {
        "name": "地点",
        "title": "地点",
        "props": {},
        "validation": {
            "required": true
        },
        "validationRules": [{
            "required": true,
            "message": "地点不能为空",
            "trigger": "change"
        }]
    }
}];