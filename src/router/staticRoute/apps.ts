export default [{
    path: '/apps',
    component: (resolve: (...modules: any[]) => void) => require(['@/views/sys/routerView/index.vue'], resolve),
    children: [{
        name: 'appsWrightindoc',
        path: "wrightindoc",
        component: (resolve: (...modules: any[]) => void) => require(['@/views/apps/wrightindoc.vue'], resolve),
        meta: {
            title: '澜渟医生'
        }
    }]
}]
