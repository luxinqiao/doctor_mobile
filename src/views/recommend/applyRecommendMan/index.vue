<!-- 申请推广大使-主页（入口：微信/app） -->
<template>
    <div id='main'>
        <img id='banner' :src='require("@/assets/img/recommend/applyRecommendMan/banner.png")'>
        <img id='back' :src='require("@/assets/img/sys/common/backbtn_white.png")' v-if='browserType=="app"' @click='closeWindow()'>
        <button id='rule' @click='goRule()'>申请规则</button>
        <div id='cardArea'>
            <div class='card left'>
                <span class='mark'>最高</span>
                <p class='money'>
                    <span>¥</span>{{max_income}}
                </p>
                <p class='desc'>每分享一件商品赚</p>
            </div>
            <div class='card right'>
                <span class='mark'>最高</span>
                <p class='money'>
                    <span>¥</span>{{max_remiss}}
                </p>
                <p class='desc'>您的客户购买直降</p>
            </div>
        </div>
        <div id='step'>
            <span class='step-mark'></span>
            <p class='step-title'>简单3步 赚取分享赏金</p>
            <p class='step-item'>
                <span class='no'>1</span>
                <span class='content'>分享商品链接或商品码给客户</span>
            </p>
            <p class='step-item'>
                <span class='no'>2</span>
                <span class='content'>客户点开链接或扫码，在小程序中完成购买</span>
            </p>
            <p class='step-item'>
                <span class='no'>3</span>
                <span class='content'>客户确认收货7天后，赏金到账至我的钱包</span>
            </p>
            <input class='step-phone' type='text' v-if='browserType!="app"' v-model='phone' @input='inputPhone()' placeholder='请输入手机号'>
            <button :class='"step-join "+getJoinClass()' @click='join()'>加入“推广大使”赚赏金</button>
        </div>
        <md-alert ref='alert' :show.sync='alertShow' :content='alertContent' @bindConfirm='goRecommend()'></md-alert>
        <md-open-app class='open_dom' domId='open_btn' :canUseWx='appOpen.canUse' :style='appOpen.dom' v-if='browserType!="app" && !isEmpty(appOpen.dom) && (alertShow)' @callbackFn='goRecommend'></md-open-app>
    </div>
</template>

<script lang='ts'>
    import {Component, Vue} from 'vue-property-decorator'
    import {getBrowserType, priceTransitionYuanFen as priceTransition, isEmpty} from '@/utils/common'
    import {mdAlert, mdOpenApp} from '@/components'
    import {validPhone, convertPhone} from '@/utils/reg'
    import {closeWindow} from '@/utils/app'
    import {curBury} from '@/utils/buryPoint'
    import {initConfig as initWxSdkConfig} from '@/utils/weChat'

    @Component({
        components: {
            mdAlert,
            mdOpenApp
        }
    })

    export default class applyRecommendManIndex extends Vue {
        private browserType: string = getBrowserType()
        private max_income: string = ''
        private max_remiss: string = ''
        private phone: string = ''
        private alertShow: boolean = false
        private alertContent: string = ''
        private alertId: string = ''
        private closeWindow: Function = closeWindow
        private isEmpty:Function = isEmpty
        private appOpen:any = {
            canUse: false,
            dom: {}
        }

        mounted() {
            this.initOpenApp()
            this.initData()
        }

        /**
            初始化打开App（打开app、打开小程序的能力）
            @param
            @return
         */
        initOpenApp() {
            if (this.browserType == 'wechat') {
                (async () => {
                    const canUse = await initWxSdkConfig()
                    this.appOpen.canUse = canUse
                })()
            }
        }

        /**
            初始化数据
            @param
            @return
         */
        initData() {
            (this as any).$axios.post(`${(this as any).$request.rec}/rec/referral/info`, {
                referral_code: (this as any).$route.query.referral_code
            }).then((res: any) => {
                if (res.code == 200) {
                    this.max_income = priceTransition(res.data.max_income).integer
                    this.max_remiss = priceTransition(res.data.max_remiss).integer
                    curBury({
                        module: 'REFERRAL',
                        event: 'SCAN_REFERRAL',
                        business_id: (this as any).$route.query.referral_code
                    })
                }
            })
        }

        /**
            获取加入按钮class
            @param
            @return 按钮class
         */
        getJoinClass() {
            if (this.browserType == 'app') {
                return 'active'
            }
            if (validPhone(this.phone)) {
                return 'active'
            }
            return ''
        }

        /**
            输入手机号
            @param
            @return
         */
        inputPhone() {
            this.phone = convertPhone(this.phone)
        }

        /**
            加入邀请大使
            @param
            @return
         */
        join() {
            if (this.browserType == 'app') {
                this.joinApp()
            } else {
                this.joinH5()
            }
        }
        /**
            加入邀请大使-App
            @param
            @return
         */
        joinApp() {
            (this as any).$axios.post(`${(this as any).$request.rec}/rec/v5/apply`, {
                referral_code: (this as any).$route.query.referral_code
            }).then((res: any) => {
                this.alertContent = res.msg
                this.alertId = res.data.rule_name
                this.alertShow = true
            })
        }
        /**
            加入邀请大使-H5
            @param
            @return
         */
        joinH5() {
            if (!validPhone(this.phone)) {
                return
            }
            (this as any).$axios.post(`${(this as any).$request.rec}/rec/v5/apply-h5`, {
                phone: this.phone,
                referral_code: (this as any).$route.query.referral_code
            }).then((res: any) => {
                this.alertContent = res.msg
                this.alertId = res.data.rule_name
                this.alertShow = true
                this.$nextTick(()=>{
                    let dom = (this.$refs.alert as any).$refs.alertBtn.getBoundingClientRect()
                    this.appOpen.dom = {
                        top: `${dom.top}px`,
                        left: `${dom.left}px`,
                        width: `${dom.width}px`,
                        height: `${dom.height}px`
                    }
                })
            })
        }

        /**
            页面跳转-申请规则
            @param
            @return
         */
        goRule() {
            (this as any).$router.push('./rule')
        }

        /*
            去分享商品
            @param
            @return
         */
        goRecommend() {
            if (this.browserType == 'app') {
                console.log(111)
                if (this.alertId == 'INNER') {
                    (this as any).$router.replace('../channelMan/index')
                } else if (this.alertId == 'LTD_NORMAL') {
                    (this as any).$router.replace('../recommendMan/index')
                }
            }
            this.alertShow = false
        }
    }
</script>

<style lang='scss' scoped>
    #main {
        position: relative;
        padding-bottom: 1.7rem;
        min-height: 100%;
        overflow: hidden;
        background: linear-gradient(90deg, #FF876D 0%, #FA6554 100%);
        >#banner {
            width: 100%; height: 32.4rem;
        }
        >#back {
            position: fixed;
            top: 3.4rem; left: 1.2rem;
            width: 0.9rem; height: 1.5rem;
        }
        >#rule {
            position: fixed;
            top: 2.9rem; right: 0;
            width: 6.2rem; height: 2.4rem;
            text-align: center; line-height: 2.4rem;
            border-radius: 1.3rem 0 0 1.3rem;
            background: rgba(255, 255, 255, 0.29); color: #fff;
            font-size: 1.2rem;
        }
        >#cardArea {
            position: relative;
            margin-bottom: 3rem;
            height: 9.3rem;
            >.card {
                position: absolute;
                top: 0;
                width: 14rem; height: 9.3rem;
                background: url(../../../assets/img/recommend/applyRecommendMan/card.png) no-repeat center center;
                background-size: 100% 100%;
                >.mark {
                    position: absolute;
                    top: 0.8rem; right: 1.2rem;
                    width: 2.8rem; height: 1.4rem;
                    text-align: center; line-height: 1.4rem;
                    border-radius: 0.7rem 0.7rem 0.7rem 0;
                    font-size: 0.9rem;
                    background: linear-gradient(90deg, #FF8E50 0%, #FF544F 100%); color: #fff;
                }
                >.money {
                    position: absolute;
                    top: 1.5rem; left: 0; right: 0.8rem;
                    height: 4rem;
                    text-align: center;
                    font-size: 2.8rem;
                    color: #774C00;
                    >span {
                        font-size: 1.6rem; font-weight: bold;
                        color: #774C00;
                    }
                }
                >.desc {
                    position: absolute;
                    bottom: 1.1rem; left: 0; right: 0;
                    height: 1.8rem;
                    text-align: center; line-height: 1.8rem;
                    font-size: 1.3rem;
                    color: #774C00;
                }
            }
            >.card.left {
                left: 3.4rem;
            }
            >.card.right {
                right: 3.4rem;
            }
        }
        #step {
            position: relative;
            margin: 1.7rem 1.2rem 0 1.2rem; padding: 2rem 1.8rem 2.8rem 1.8rem;
            border-radius: 1rem;
            background-color: #fff;
            >.step-mark {
                position: absolute; z-index: 0;
                top: 3.6rem; left: 0; right: 0;
                margin: auto;
                width: 8rem; height: 0.6rem;
                border-radius: 0.3rem;
                background-color: rgba(252, 136, 106, 0.39);
            }
            >.step-title {
                position: relative; z-index: 1;
                height: 2.2rem;
                text-align: center; line-height: 2.2rem;
                font-size: 1.6rem; font-weight: bold;
                letter-spacing: 0.2rem;
            }
            >.step-item {
                position: relative;
                margin-top: 1.2rem;
                >.no {
                    position: absolute;
                    top: 0; left: 0;
                    width: 2.2rem; height: 2.2rem;
                    text-align: center; line-height: 2.2rem;
                    border-radius: 2.2rem;
                    font-size: 1.6rem;
                    background-color: rgba(253, 221, 218, 0.58); color: #F2AC9A;
                }
                >.content {
                    display: block;
                    height: 2.2rem;
                    line-height: 2.2rem;
                    text-indent: 3.2rem;
                    font-size: 1.4rem;
                    color: #666;
                }
            }
            >.step-phone {
                display: block;
                margin: 3rem auto 0 auto;
                width: 27.1rem; height: 3.6rem;
                text-align: center; line-height: 3.6rem;
                border: 0.1rem solid #ccc;
                border-radius: 2.2rem;
                font-size: 1.3rem;
            }
            >.step-phone::placeholder {
                color: #999;
                font-size: 1.3rem;
            }
            >.step-join {
                display: block;
                margin: 2rem auto 0 auto;
                width: 27.1rem; height: 3.6rem;
                text-align: center; line-height: 3.6rem;
                border-radius: 2.2rem;
                color: #fff; background: linear-gradient(90deg, #FF9A7C 0%, #FF564C 100%);
                opacity: 0.3;
            }
            >.step-join.active {
                opacity: 1;
            }
        }
    }
    .open_dom {
        position: fixed;
        z-index: 100;
    }
</style>
