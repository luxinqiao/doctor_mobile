<!-- 申请拉新大使 -->
<template>
    <div id='main' :class='browserType' :style='"padding-top:"+headTop+"px"'>
        <div class='head_info' :style='"padding-top:"+headTop+"px"' v-if='browserType=="app"'>
            <img :src='stateSkin=="dark"?require("@/assets/img/sys/common/backbtn_white.png"):require("@/assets/img/sys/common/backbtn_blue.png")' :style='"top:"+headTop+"px"' @click='closeWindow'>
        </div>
        <img class='banner' :src='require("@/assets/img/pullNew/applyInviteMan/banner.png")'>
        <button class='rule' @click='goRule()' :style='"top:"+getRuleTop()'>申请规则</button>
        <div class='content'>
            <div class='content-card'>
                <img class='card-bg' :src='require("@/assets/img/pullNew/applyInviteMan/card.png")'>
                <p class='card-money'>
                    得<font>{{money}}</font>元
                </p>
                <span class='card-mark'>最高</span>
                <p class='card-desc'>每激活1位用户</p>
            </div>
            <div class='content-method'>
                <p class='method-title'>邀请攻略</p>
                <p class='method-step'>
                    <img :src='require("@/assets/img/pullNew/applyInviteMan/step-1.png")'>
                    <span>分享申请新人活动链接或二维码给好友</span>
                <p class='method-step'>
                    <img :src='require("@/assets/img/pullNew/applyInviteMan/step-2.png")'>
                    <span>好友点开链接或扫码，输入手机号领取新人礼包</span>
                </p>
                <p class='method-step'>
                    <img :src='require("@/assets/img/pullNew/applyInviteMan/step-3.png")'>
                    <span>新用户登录App激活账号后，可获对应奖励至我的钱包</span>
                </p>
                <input type='text' class='method-phone' v-if='browserType!="app"' v-model='phone' @input='inputPhone()' placeholder='请输入手机号'>
                <button :class='getJoinClass()' @click='join()'>加入“拉新大使”赚赏金</button>
            </div>
        </div>

        <md-alert ref='alert' :show.sync='alertShow' :content='alertContent' @bindConfirm='goInvite()'></md-alert>
        <md-open-app class='alert_dom' domId='open_btn' :canUseWx='appOpen.canUse' :style='appOpen.dom' v-if='browserType!="app" && !isEmpty(appOpen.dom) && (alertShow)' @callbackFn='goInvite'></md-open-app>
    </div>
</template>

<script lang='ts'>
    import {Component, Vue} from 'vue-property-decorator'
    import {mdAlert, mdOpenApp } from '@/components'
    import {validPhone, convertPhone} from '@/utils/reg'
    import {getBrowserType, convertPx, priceTransitionYuanFen, isEmpty} from '@/utils/common'
    import {getHeadTop, closeWindow} from '@/utils/app'
    import {State} from 'vuex-class'
    import {initConfig as initWxSdkConfig} from '@/utils/weChat'

    @Component({
        components: {
            mdAlert, mdOpenApp
        }
    })

    export default class applyInviteManIndex extends Vue {
        @State('skin') stateSkin: any

        private canUse:any = false
        private headTop: number = getHeadTop()
        private browserType: string = getBrowserType()
        private phone: string = ''
        private money: string = ''
        private alertShow: boolean = false
        private alertContent: string = ''
        private alertPersonType: number = 1 //1-拉新大使 2-拉新团长
        private closeWindow:Function = closeWindow
        private appOpen:any = {
            canUse: false,
            dom: {}
        }
        private isEmpty = isEmpty

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
                    this.appOpen.canUse = await initWxSdkConfig()
                })()
            }
        }

        /**
         * 初始化
         * @param 
         * @return
         */
        initData() {
            ;(this as any).$axios.post(`${(this as any).$request.live}/pull/rec/info`, {
                referral_code: (this as any).$route.query.referral_code
            }).then((res: any) => {
                if (res.code == 200) {
                    this.money = priceTransitionYuanFen(res.data.first_max_cash).integer
                }
            })
        }
        /**
            输入手机号
            @param
            @return
         */
        inputPhone() {
            this.phone = convertPhone(this.phone)
        }

        /*
            去邀请用户
            @param
            @return
         */
        goInvite() {
            if (this.browserType == 'app') {
                if (this.alertPersonType == 2) {
                    (this as any).$router.push('/pullNew/spreadMan/index')
                } else {
                    (this as any).$router.push('/pullNew/inviteMan/index')
                }
            } else {
                this.alertShow = false
            }
        }
        /**
            页面跳转-申请规则
            @param
            @return
         */
        goRule() {
            (this as any).$router.push('./rule')
        }
        /**
            获取规则顶部距离
            @param
            @return 顶部距离
         */
        getRuleTop() {
            return this.headTop + convertPx(6.2) + 'px'
        }
        /**
            获取加入按钮class
            @param
            @return 按钮class
         */
        getJoinClass() {
            if (this.browserType == 'app') {
                return 'method-join active'
            }
            if (validPhone(this.phone)) {
                return 'method-join active'
            }
            return 'method-join'
        }
        /**
            加入拉新大使
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
            加入拉新大使-App
            @param
            @return
         */
        joinApp() {
            (this as any).$axios.post(`${(this as any).$request.live}/pull/rec/join-app`, {
                referral_code: (this as any).$route.query.referral_code
            }).then((res: any) => {
                this.alertContent = res.data.message
                this.alertShow = true
                this.alertPersonType = res.data.type
            })
        }
        /**
            加入拉新大使-H5
            @param
            @return
         */
        joinH5() {
            if (!validPhone(this.phone)) {
                return
            }
            (this as any).$axios.post(`${(this as any).$request.live}/pull/rec/join-h5`, {
                phone: this.phone,
                referral_code: (this as any).$route.query.referral_code
            }).then((res: any) => {
                this.alertContent = res.data.message
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
    }
</script>

<style lang='scss' scoped>
    #main {
        position: relative;
        top: -5rem;
        >.head_info {
            position: fixed;
            top: 0; left: 0;
            width: 100%;
            height: 4.4rem;
            box-sizing: content-box;
            img {
                position: absolute;
                top: 0; left: 0; bottom: 0;
                margin: auto; padding: 1rem 1.2rem;
                width: 0.9rem; height: 1.5rem;
                box-sizing: content-box;
            }
        }
        >.banner {
            display: block;
            width: 100%;
        }
        >.rule {
            position: absolute; z-index: 97;
            top: 0; right: 0;
            padding-left: 0.4rem;
            width: 6.2rem; height: 2.4rem;
            text-align: center; line-height: 2.4rem;
            border-radius: 1.3rem 0 0 1.3rem;
            font-size: 1.2rem;
            color: #fff; background-color: #0D3888;
            opacity: 0.5;
        }
        >.content {
            padding-bottom: 3rem;
            background: linear-gradient(to bottom, #F2F9FF, #CCE0FD);
            >.content-card {
                position: relative;
                margin: auto;
                width: 31.5rem; height: 19.2rem;
                >.card-bg {
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    margin: auto;
                    width: 31.5rem; height: 19.2rem;
                }
                >.card-money {
                    position: absolute;
                    top: 1.6rem; left: 0; right: 0;
                    height: 7.9rem;
                    text-align: center; line-height: 7.9rem;
                    font-size: 3rem; letter-spacing: 0.8rem;
                    color: #EEC02E;
                    >font {
                        font-size: 6rem; letter-spacing: 0.8rem;
                        color: #EEC02E;
                    }
                }
                >.card-mark {
                    position: absolute;
                    top: 2.3rem; right: 5.4rem;
                    width: 4rem; height: 2.2rem;
                    text-align: center; line-height: 2.2rem;
                    border-radius: 1.3rem 1.3rem 1.3rem 0;
                    font-size: 1.2rem;
                    color: #fff; background: linear-gradient(to right, #FCBB5D, #FF7E00);
                }
                >.card-desc {
                    position: absolute;
                    bottom: 3.6rem; left: 0; right: 0;
                    height: 1.8rem;
                    text-align: center; line-height: 1.8rem;
                    font-size: 2rem; letter-spacing: 0.2rem;
                    color: #fff;
                }
            }
            >.content-method {
                margin: auto;
                width: 35.1rem;
                border-radius: 1rem;
                background-color: #fff;
                overflow: hidden;
                >.method-title {
                    margin: 2rem 0 3rem 0;
                    height: 2.2rem;
                    text-align: center; line-height: 2.2rem;
                    font-size: 1.6rem; font-weight: bold;
                    letter-spacing: 0.2rem;
                }
                >.method-step {
                    margin-top: 1.2rem; padding: 0 1.6rem 0 1.8rem;
                    >img {
                        float: left;
                        width: 2.2rem; height: 2.2rem;
                    }
                    >span {
                        display: block;
                        margin-left: 3.2rem;
                        line-height: 2.2rem;
                        color: #666;
                    }
                }
                >.method-phone {
                    display: block;
                    margin: 3rem auto 0 auto;
                    width: 27.1rem; height: 3.6rem;
                    text-align:center; line-height: 3.6rem;
                    border: 0.1rem solid #ccc; border-radius: 2.2rem;
                    font-size: 1.3rem;
                    color: #999;
                }
                >.method-phone::-webkit-input-placeholder{
                    color: #999;
                }
                >.method-join {
                    display: block;
                    margin: 2rem auto 2.8rem auto;
                    width: 27.1rem; height: 3.6rem;
                    border-radius: 2.2rem;
                    font-size: 1.6rem;
                    color: #fff; background: linear-gradient(to right, #FBD44D, #F2A043);
                    opacity: 0.5;
                }
                >.method-join.active {
                    opacity: 1;
                }
            }
        }
        .alert_dom {
            position: fixed;
            z-index: 100;
        }
    }
    #main.app {
        >.banner {
            margin-top: 0;
        }
    }
</style> 