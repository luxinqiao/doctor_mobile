export default [{
    path: '/xcx',
    component: (resolve: (...modules: any[]) => void) => require(['@/views/sys/routerView/index.vue'], resolve),
    children: [{
        name: "meetingInvoice",
        path: "meetingInvoice",
        component: (resolve: (...modules: any[]) => void) => require(['@/views/xcx/meeting/invoice.vue'], resolve),
        meta: {
            title: '电子发票'
        }
    }]
}]
