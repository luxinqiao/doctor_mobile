export default [{
    path: '/recommend',
    component: (resolve: (...modules: any[]) => void) => require(['@/views/sys/routerView/index.vue'], resolve),
    children: [{
        path: 'applyRecommendMan',
        redirect: '/applyRecommendMan/index',
        component: (resolve: (...modules: any[]) => void) => require(['@/views/sys/routerView/index.vue'], resolve),
        children: [{
            name: "applyRecommendManIndex",
            path: "index",
            component: (resolve: (...modules: any[]) => void) => require(['@/views/recommend/applyRecommendMan/index.vue'], resolve),
            meta: {
                title: '分享购买赚赏金',
                keepAlive: true,
                root: true
            }
        }, {
            name: "applyRecommendManRule",
            path: "rule",
            component: (resolve: (...modules: any[]) => void) => require(['@/views/recommend/applyRecommendMan/rule.vue'], resolve),
            meta: {
                title: '申请规则'
            }
        }]
    }, {
        path: 'channelMan',
        redirect: '/channelMan/index',
        component: (resolve: (...modules: any[]) => void) => require(['@/views/sys/routerView/index.vue'], resolve),
        children: [{
            name: "channelManIndex",
            path: "index",
            component: (resolve: (...modules: any[]) => void) => require(['@/views/recommend/channelMan/index.vue'], resolve),
            meta: {
                title: '分享购买赚赏金',
                keepAlive: true,
                root: true
            }
        }, {
            name: "channelManRule",
            path: "rule",
            component: (resolve: (...modules: any[]) => void) => require(['@/views/recommend/channelMan/rule.vue'], resolve),
            meta: {
                title: '分享活动规则'
            }
        }, {
            name: "channelManRecruit",
            path: "recruit",
            component: (resolve: (...modules: any[]) => void) => require(['@/views/recommend/channelMan/recruit.vue'], resolve),
            meta: {
                title: '招募推广大使'
            }
        }, {
            name: 'channelManGoodsShare',
            path: 'goodsShare',
            component: (resolve: (...modules: any[]) => void) => require(['@/views/recommend/goodsShare/index.vue'], resolve),
            meta: {
                title: '分享商品'
            }
        }]
    }, {
        path: 'recommendMan',
        redirect: '/recommendMan/index',
        component: (resolve: (...modules: any[]) => void) => require(['@/views/sys/routerView/index.vue'], resolve),
        children: [{
            name: "recommendManIndex",
            path: "index",
            component: (resolve: (...modules: any[]) => void) => require(['@/views/recommend/recommendMan/index.vue'], resolve),
            meta: {
                title: '分享购买赚赏金',
                keepAlive: true,
                root: true
            }
        }, {
            name: "recommendManRule",
            path: "rule",
            component: (resolve: (...modules: any[]) => void) => require(['@/views/recommend/recommendMan/rule.vue'], resolve),
            meta: {
                title: '分享规则'
            }
        }, {
            name: 'recommendGoodsShare',
            path: 'goodsShare',
            component: (resolve: (...modules: any[]) => void) => require(['@/views/recommend/goodsShare/index.vue'], resolve),
            meta: {
                title: '分享商品'
            }
        }]
    }]
}]