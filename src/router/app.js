const title = "流程审批系统";
export default [{
    path: '/form',
    meta: {
        title: title
    },
    component: (resolve) => require(['components/Form/App.vue'], resolve)
}, {
    path: '/',
    meta: {
        title: title + '->工作台'
    },
    component: (resolve) => require(['components/MainView/App.vue'], resolve),
    children: [{
            path: '/',
            meta: {
                title: title + '->表单设计'
            },
            component: (resolve) => require(['components/FormDesign/App/Canvas'], resolve)
        }, {
            path: 'basicSetting/(.*)',
            meta: {
                title: title + '->基础设置'
            },
            component: (resolve) => require(['components/BasicSetting/App.vue'], resolve)
        }, {
            path: 'webFormDesign/(.*)',
            meta: {
                title: title + '->表单设计'
            },
            component: (resolve) => require(['components/FormDesign/App/Canvas'], resolve)
        }, {
            path: '/advancedSetting/(.*)',
            meta: {
                title: title + '->高级设置'
            },
            component: (resolve) => require(['components/AdvancedSetting/App.vue'], resolve)
        }, {
            path: '/processDesign/(.*)',
            meta: {
                title: title + '->流程设计'
            },
            component: (resolve) => require(['components/ProcessDesign'], resolve)
        },
        {
            path: "*",
            meta: {
                title: title + '->404'
            },
            component: (resolve) => require(['components/Common/NotFound.vue'], resolve)
        }
    ]
}];