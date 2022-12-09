export default [{
    path: '/pullNew',
    component: (resolve: (...modules: any[]) => void) => require(['@/views/sys/routerView/index.vue'], resolve),
    children: [{
        path: 'applyInviteMan',
        redirect: '/applyInviteMan/index',
        component: (resolve: (...modules: any[]) => void) => require(['@/views/sys/routerView/index.vue'], resolve),
        children: [{
            name: "applyInviteManIndex",
            path: "index",
            component: (resolve: (...modules: any[]) => void) => require(['@/views/pullNew/applyInviteMan/index.vue'],resolve),
            meta: {
                title: '邀请注册',
                keepAlive: true
            }
        }, {
            name: "applyInviteManRule",
            path: "rule",
            component: (resolve: (...modules: any[]) => void) => require(['@/views/pullNew/applyInviteMan/rule.vue'], resolve),
            meta: {
                title: '申请规则'
            }
        }]
    }, {
        path: 'invite',
        redirect: '/invite/doctor/index',
        component: (resolve: (...modules: any[]) => void) => require(['@/views/sys/routerView/index.vue'], resolve),
        children: [{
            path: "doctor",
            redirect: '/invite/doctor/index',
            component: (resolve: (...modules: any[]) => void) => require(['@/views/sys/routerView/index.vue'], resolve),
            children: [{
                name: "inviteDocIndex",
                path: "index",
                component: (resolve: (...modules: any[]) => void) => require(['@/views/pullNew/invite/doctor/index.vue'], resolve),
                meta: {
                    title: '邀请医生'
                }
            }, {
                name: "inviteDocRecord",
                path: "record",
                component: (resolve: (...modules: any[]) => void) => require(['@/views/pullNew/invite/doctor/record.vue'], resolve),
                meta: {
                    title: '澜渟医生邀请记录'
                }
            }, {
                name: "inviteDocSign",
                path: "sign",
                component: (resolve: (...modules: any[]) => void) => require(['@/views/pullNew/invite/doctor/sign.vue'], resolve),
                meta: {
                    title: '澜渟医生注册有礼'
                }
            }]
        }, {
            path: "user",
            redirect: '/invite/user/index',
            component: (resolve: (...modules: any[]) => void) => require(['@/views/sys/routerView/index.vue'], resolve),
            children: [{
                name: "inviteUserIndex",
                path: "index",
                component: (resolve: (...modules: any[]) => void) => require(['@/views/pullNew/invite/user/index.vue'], resolve),
                meta: {
                    title: '邀请用户'
                }
            }, {
                name: "inviteUserRecord",
                path: "record",
                component: (resolve: (...modules: any[]) => void) => require(['@/views/pullNew/invite/user/record.vue'], resolve),
                meta: {
                    title: '澜渟邀请记录'
                }
            }]
        }]
    }, {
        path: 'inviteMan',
        redirect: '/inviteMan/index',
        component: (resolve: (...modules: any[]) => void) => require(['@/views/sys/routerView/index.vue'], resolve),
        children: [{
            name: "inviteManIndex",
            path: "index",
            component: (resolve: (...modules: any[]) => void) => require(['@/views/pullNew/inviteMan/index.vue'], resolve),
            meta: {
                keepAlive: true
            }
        }, {
            name: "inviteMy",
            path: "income",
            component: (resolve: (...modules: any[]) => void) => require(['@/views/pullNew/inviteMan/income.vue'], resolve),
            meta: {
                title: '我的邀请奖励'
            }
        }, {
            name: "inviteManRule",
            path: "rule",
            component: (resolve: (...modules: any[]) => void) => require(['@/views/pullNew/inviteMan/rule.vue'], resolve),
            meta: {
                title: '邀请规则'
            }
        }]
    }, {
        path: 'spreadMan',
        redirect: '/spreadMan/index',
        component: (resolve: (...modules: any[]) => void) => require(['@/views/sys/routerView/index.vue'], resolve),
        children: [{
            name: "spreadManIndex",
            path: "index",
            component: (resolve: (...modules: any[]) => void) => require(['@/views/pullNew/spreadMan/index.vue'], resolve),
            meta: {
                keepAlive: true
            }
        }, {
            name: "spreadManInviteNew",
            path: "inviteNew",
            component: (resolve: (...modules: any[]) => void) => require(['@/views/pullNew/spreadMan/inviteNew.vue'], resolve),
            meta: {
                title: '招募拉新大使',
                keepAlive: true
            }
        }, {
            name: "spreadMember",
            path: "memberIncome",
            component: (resolve: (...modules: any[]) => void) => require(['@/views/pullNew/spreadMan/memberIncome.vue'], resolve),
            meta: {
                title: '团员拉新业绩'
            }
        }, {
            name: "spreadManMy",
            path: "myIncome",
            component: (resolve: (...modules: any[]) => void) => require(['@/views/pullNew/spreadMan/myIncome.vue'], resolve),
            meta: {
                title: '我的拉新业绩'
            }
        }, {
            name: "spreadManRule",
            path: "rule",
            component: (resolve: (...modules: any[]) => void) => require(['@/views/pullNew/spreadMan/rule.vue'], resolve),
            meta: {
                title: '邀请规则'
            }
        }, {
            name: "spreadManTotal",
            path: "totalIncome",
            component: (resolve: (...modules: any[]) => void) => require(['@/views/pullNew/spreadMan/totalIncome.vue'], resolve),
            meta: {
                title: '拉新收益'
            }
        }]
    }, {
        path: 'wallet',
        redirect: '/wallet/report',
        component: (resolve: (...modules: any[]) => void) => require(['@/views/sys/routerView/index.vue'], resolve),
        children: [{
            path: "rule",
            component: (resolve: (...modules: any[]) => void) => require(['@/views/pullNew/wallet/rule.vue'], resolve),
            meta: {
                title: '提现规则'
            }
        }]
    }]
}]