
export default [{
    path: '/',
    redirect: '/404'
}, {
    path: '/404',
    component: (resolve: (...modules: any[]) => void) => require(['@/views/sys/error/404.vue'], resolve)
}, {
    path: '/login',
    component: (resolve: (...modules: any[]) => void) => require(['@/views/sys/routerView/index.vue'], resolve),
    children: [{
        name: "loginIndex",
        path: "index",
        component: (resolve: (...modules: any[]) => void) => require(['@/views/sys/login/index.vue'], resolve),
        meta: {
            title: '登录',
        }
    },{
        name: "phoneLoginIndex",
        path: "phoneLogin",
        component: (resolve: (...modules: any[]) => void) => require(['@/views/sys/login/phoneLogin.vue'], resolve),
        meta: {
            title: '登录'
        }
    }]
}]