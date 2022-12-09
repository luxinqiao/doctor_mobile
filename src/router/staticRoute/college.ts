export default [{
    path: '/college',
    component: (resolve: (...modules: any[]) => void) => require(['@/views/sys/routerView/index.vue'], resolve),
    children: [{
        path: 'spec',
        component: (resolve: (...modules: any[]) => void) => require(['@/views/sys/routerView/index.vue'], resolve),
        children: [{
            name: "collegeSpecDetail",
            path: "detail",
            component: (resolve: (...modules: any[]) => void) => require(['@/views/college/spec/detail.vue'], resolve),
            meta: {
                title: '专栏详情',
                keepAlive: true
            }
        }]
    }, {
        path: 'course',
        component: (resolve: (...modules: any[]) => void) => require(['@/views/sys/routerView/index.vue'], resolve),
        children: [{
            name: "collegeCourseDetail",
            path: "detail",
            component: (resolve: (...modules: any[]) => void) => require(['@/views/college/course/detail.vue'], resolve),
            meta: {
                title: '课程详情',
                keepAlive: true
            }
        }]
    }, {
        path: 'live',
        component: (resolve: (...modules: any[]) => void) => require(['@/views/sys/routerView/index.vue'], resolve),
        children: [{
            name: "collegeLiveDetail",
            path: "detail",
            component: (resolve: (...modules: any[]) => void) => require(['@/views/college/live/detail.vue'], resolve),
            meta: {
                title: '直播详情'
            }
        }]
    }]
}]