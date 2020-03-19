const title = "流程审批系统";
export default [{
    path: '/',
    meta: {
        title: title + '->工作台'
    },
    component: (resolve) => require(['components/MainView/App.vue'], resolve),
    children: [{
            path: '/webFormDesign/(.*)',
            meta: {
                title: title + '->表单设计'
            },
            component: (resolve) => require(['components/FormDesign/Web/FormDesign.vue'], resolve)
        }, {
            path: '/formPreview/(.*)',
            meta: {
                title: title + '->预览表单'
            },
            component: (resolve) => require(['components/FormRender/Web/Render.vue'], resolve)
        },
        {
            path: "*",
            meta: {
                title: title + '->404'
            },
            component: (resolve) => require(['components/HelloWorld.vue'], resolve)
        }
    ]
}];