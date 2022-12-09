<!-- 拉新大使-主页 -->
<template>
    <div id='invite' ref='invite'>
        <img src='@/assets/img/pullNew/inviteMan/index/top.png' class='top'>
        <img src='@/assets/img/sys/common/backbtn_blue.png' @click='goBack' class='back_btn' :style='"top:"+top+"px"'>
        <p @click='goRule' class='rule_btn' :style='"top:"+top+"px"'>邀请规则</p>
        <div class='content'>
            <div class='reward'>
                <div class='reward_num'>
                    <span class='font_color'>得</span>
                    <span class='font_color'>{{priceInteger(info.first_max_cash)}}</span>
                    <div>
                        <img src='@/assets/img/pullNew/inviteMan/index/height.png'>
                        <p class='font_color'>元</p>
                    </div>
                </div>
                <p class='reward_desc'>每激活1位新用户</p>
                <img class='reward_int' src='@/assets/img/pullNew/inviteMan/index/question.png' @click='showUserTip()'>
            </div>

            <div class='my'>
                <div class='my_top'>
                    <p>我的邀请奖励</p>
                    <img src='@/assets/img/pullNew/spreadMan/index/int.png' class='int' @click='descShow=true'>
                </div>
                <div class='my_data'>
                    <div class='my_item'>
                        <div class='list'>
                            <p class='list_num'>{{info.my_month_active_num}}</p>
                            <p class='list_tit'>本月激活</p>
                        </div>
                        <div class='list'>
                            <p class='list_num'>{{priceTransition(info.month_first_cash).integer}}<span>.{{priceTransition(info.month_first_cash).decimal}}</span></p>
                            <p class='list_tit'>本月奖励</p>
                            <img class='list_mark' v-if='info.is_forecast==1' src='@/assets/img/pullNew/spreadMan/index/guess.png'>
                        </div>
                        <div class='list'>
                            <p class='list_num'>{{priceTransition(info.my_first_cash).integer}}<span>.{{priceTransition(info.my_first_cash).decimal}}</span></p>
                            <p class='list_tit'>累计奖励</p>
                        </div>
                    </div>
                    <img src='@/assets/img/pullNew/inviteMan/index/btn.png' class='go_btn' @click='goMy'>
                </div>
            </div>

            <div class='extension'>
                <div class='title'>推广App</div>
                <div class='extend_list' v-for='(item, index) in info.app_list' :key='index'>
                    <div class='extend_title'>邀请新用户登录激活【{{item.name}}】App</div>
                    <div class='extend_con'>
                        <img :src='item.icon'>
                        <p>奖励:<span>￥</span><i>{{priceTransition(item.first_income_cash).integer}}</i><span>.{{priceTransition(item.first_income_cash).decimal}}/人</span></p>
                        <div class='extend_btn' @click='invite(item.app)'>立即邀请</div>
                    </div>
                </div>
            </div>

            <div class='method'>
                <div class='title'>邀请攻略</div>
                <p><span>1</span>分享申请新人活动链接或二维码给好友</p>
                <p><span>2</span>好友点开链接或扫码，输入手机号领取新人礼包</p>
                <p><span>3</span>新用户登录App激活账号后，可获对应奖励至我的钱包</p>
            </div>

            <div class='welfare'>
                <div class='title_box'>
                    <div :class='["title_list", {"title_act":tabIndex==0}]' @click='changeTab(0)'>澜渟新人福利</div>
                    <div :class='["title_list", {"title_act":tabIndex==1}]' @click='changeTab(1)'>澜渟医生新人福利</div>
                </div>
                <div class='welfare_con'>
                    <div class='welfare_list' v-show='tabIndex==0'>
                        <p>
                            <img src='@/assets/img/pullNew/inviteMan/index/wf_one.png'>
                            <img src='@/assets/img/pullNew/inviteMan/index/wf_two.png'>
                        </p>
                        <div class='recruit_btn bg_small' @click='inviteUser'>立即邀请用户</div>
                    </div>
                    <div class='welfare_list' v-show='tabIndex==1'>
                        <img src='@/assets/img/pullNew/inviteMan/index/doc.png'>
                        <div class='recruit_btn bg_small' @click='inviteDoc'>立即邀请医生</div>
                    </div>
                </div>
            </div>
        </div>

        <md-popup :show.sync='descShow'>
            <div class='pop_desc'>
                <div class='pop_desc_title'>邀请奖励说明</div>
                <div class='pop_desc_box'>
                    <p class='pop_desc_item_tit'>本月激活</p>
                    <p class='pop_desc_item_desc'>本月内通过您分享的二维码或活动链接成功领取新人礼包后，下载App并登录激活账号的新用户总数。</p>
                    <p class='pop_desc_item_tit'>本月奖励</p>
                    <p class='pop_desc_item_desc'>本月内，您成功激活新用户获得的所有奖励总额。如未满奖励基数，奖励金额为预估金额值。</p>
                    <p class='pop_desc_item_tit'>累计奖励</p>
                    <p class='pop_desc_item_desc'>您成功激活新用户获得的所有奖励总额。</p>
                </div>
            </div>
        </md-popup>

        <md-alert :show.sync='alert.show' title='拉新奖励说明' :content='alert.content' confirmLabel='知道了'></md-alert>
    </div>
</template>

<script lang='ts'>
    import { Component, Vue } from 'vue-property-decorator'
    import {isEmpty,priceTransitionYuanFen,priceInteger} from '@/utils/common'
    import {mdToast, mdAlert, mdPopup} from '@/components'
    import { closeWindow, getHeadTop} from '@/utils/app'

    @Component({
        components: {
            mdToast,
            mdAlert,
            mdPopup,
        }
    })
    export default class inviteManIndex extends Vue {
        private top:any = getHeadTop()
        private descShow:boolean = false
        private info = {
            referral_code: ''
        }
        private tabIndex:number = 0
        private priceTransition = priceTransitionYuanFen
        private priceInteger = priceInteger
        private alert = {
            show: false,
            title: '',
            content: ''
        }

        activated() {
            if (sessionStorage.routeDirection == 'forward') {
                this.initData()
            }
        }
        /**
         * 初始页面
         * @param 
         * @return
         */
        initData() {
           (this as any).$axios.post(`${(this as any).$request.live}/pull/invite/index`, {}).then((res: any) => {
                if (res.code == 200) {
                    this.info = res.data
                }
            })
        }
        /**
         * 返回
         * @param 
         * @return
         */
        goBack(){
            closeWindow()
        }
        /**
         * 切换tab
         * @param {number} index 下标
         * @return
         */
        changeTab(index:number) {
            this.tabIndex = index
        }
        /**
         * 跳转规则
         * @param 
         * @return
         */
        goRule() {
            this.$router.push(`./rule?first_max_cash=${priceInteger((this as any).info.first_max_cash)}&invite_num=${isEmpty((this as any).info.invite_num)?'':(this as any).info.invite_num}`)
        }
        /**
         * 跳转我的收益
         * @param 
         * @return
         */
        goMy() {
            this.$router.push('./income?from=activity')
        }
        /**
         * 跳转邀请注册
         * @param {string} type 类型 1：澜渟 3：医生
         * @return
         */
        invite(type:string) {
            if(type == '1') {
                this.inviteUser()
            } else if(type == '3') {
                this.inviteDoc()
            } 
        }
        /**
         * 跳转邀请注册-澜渟
         * @param
         * @return
         */
        inviteUser() {
            this.$router.push(`../invite/user/index?referral_code=${this.info.referral_code}&from=activity`)
        }
        /**
         * 跳转邀请注册-医生
         * @param
         * @return
         */
        inviteDoc() {
            this.$router.push(`../invite/doctor/index?referral_code=${this.info.referral_code}&from=activity`)
        }

        /**
         * 显示激活用户提示
         * @param
         * @return
         */
        showUserTip() {
            this.alert.show = true
            this.alert.content = `每月激活${isEmpty((this as any).info.invite_num)?'':(this as any).info.invite_num}人及以上，您可获得每人最高${priceInteger((this as any).info.first_max_cash)}元的拉新奖励。`
        }
    }
</script>

<style lang='scss' scoped>
    #invite {
        position: relative;
        min-height: 100vh; width: 100vw;
    }
    .top {
        width: 100%; height: auto;
    }
    .back_btn {
        position: fixed;
        top: 0; left: 0;
        padding: 1rem 1.2rem; 
        width: 0.9rem; height: 1.5rem;
        box-sizing: content-box;
        z-index: 1;
    }
    .rule_btn {
        position: absolute;
        top: 0; right: 0; 
        margin-top: 1rem;
        height: 2.4rem; width: 6.2rem;
        line-height: 1; 
        display: flex;
        align-items: center; justify-content: center;
        color: #fff; font-size: 1.2rem;
        background: rgba(13, 56, 136, 0.5);
        border-radius: 1.3rem 0px 0px 1.3rem;
    }
    .content {
        position: relative;
        padding: 0 1.2rem 4.6rem 1.2rem; 
        background: linear-gradient(180deg, #F2F9FF 0%, #CCE0FD 100%);
        background: -moz-linear-gradient(180deg, #F2F9FF 0%, #CCE0FD 100%);
        background: -webkit-gradient(linear, 180deg, #F2F9FF 0%, #CCE0FD 100%);
        background: -webkit-linear-gradient(180deg, #F2F9FF 0%, #CCE0FD 100%);
        background: -o-linear-gradient(180deg, #F2F9FF 0%, #CCE0FD 100%);
        background: -ms-linear-gradient(180deg, #F2F9FF 0%, #CCE0FD 100%);

        .reward {
            position: relative;
            margin: -2rem auto 0 auto; padding-top: 1.6rem;
            width: 31.5rem; height: 19.2rem;
            background: url('../../../assets/img/pullNew/inviteMan/index/money_bg.png') no-repeat 100%;
            background-size: 100%;
            background-position: 0 0;
            .reward_num {
                position: relative;
                height: 7.9rem;
                display: flex;
                justify-content: center;
                >span:nth-of-type(1) {
                    line-height: 9rem;
                    font-size: 3rem; color: transparent;
                    letter-spacing: 8px;

                    background: linear-gradient(180deg, #FBD44D 0%, #F2A043 100%);
                    background: -moz-linear-gradient(180deg, #FBD44D 0%, #F2A043 100%);
                    background: -webkit-gradient(linear, 180deg, #FBD44D 0%, #F2A043 100%);
                    background: -webkit-linear-gradient(180deg, #FBD44D 0%, #F2A043 100%);
                    background: -o-linear-gradient(180deg, #FBD44D 0%, #F2A043 100%);
                    background: -ms-linear-gradient(180deg, #FBD44D 0%, #F2A043 100%);
                    -webkit-background-clip:text;
                    background-clip:text;
                }
                >span:nth-of-type(2) {
                    font-size: 6rem; color: transparent; font-weight: bold;
                    letter-spacing: 8px;

                    background: linear-gradient(180deg, #FBD44D 0%, #F2A043 100%);
                    background: -moz-linear-gradient(180deg, #FBD44D 0%, #F2A043 100%);
                    background: -webkit-gradient(linear, 180deg, #FBD44D 0%, #F2A043 100%);
                    background: -webkit-linear-gradient(180deg, #FBD44D 0%, #F2A043 100%);
                    background: -o-linear-gradient(180deg, #FBD44D 0%, #F2A043 100%);
                    background: -ms-linear-gradient(180deg, #FBD44D 0%, #F2A043 100%);
                    -webkit-background-clip:text;
                    background-clip:text;
                }
                div {
                    position: relative;
                    margin-left: 0.2rem;
                    img {
                        margin-top: 1rem; padding-left: 1rem;
                        width: 2.6rem; height: 1.4rem;
                        box-sizing: content-box;
                    }
                    p {
                        margin-top: 0.2rem;
                        line-height: 1;
                        font-size: 3rem; color: transparent;

                        background: linear-gradient(180deg, #FBD44D 0%, #F2A043 100%);
                        background: -moz-linear-gradient(180deg, #FBD44D 0%, #F2A043 100%);
                        background: -webkit-gradient(linear, 180deg, #FBD44D 0%, #F2A043 100%);
                        background: -webkit-linear-gradient(180deg, #FBD44D 0%, #F2A043 100%);
                        background: -o-linear-gradient(180deg, #FBD44D 0%, #F2A043 100%);
                        background: -ms-linear-gradient(180deg, #FBD44D 0%, #F2A043 100%);
                        -webkit-background-clip:text;
                        background-clip:text;
                    }
                }
                .font_color {
                    color: transparent;
                    background: linear-gradient(90deg, #FBD44D 0%, #F2A043 100%);
                    background: -moz-linear-gradient(90deg, #FBD44D 0%, #F2A043 100%);
                    background: -webkit-gradient(linear, 90deg, #FBD44D 0%, #F2A043 100%);
                    background: -webkit-linear-gradient(90deg, #FBD44D 0%, #F2A043 100%);
                    background: -o-linear-gradient(90deg, #FBD44D 0%, #F2A043 100%);
                    background: -ms-linear-gradient(90deg, #FBD44D 0%, #F2A043 100%);
                    -webkit-background-clip:text;
                    background-clip:text;
                }
            }
            .reward_desc {
                position: absolute;
                bottom: 3.6rem; left: 0; right: 0;
                margin: auto; 
                text-align: center; line-height: 1.8rem;
                height: 1.8rem;
                font-size: 2rem; color: #fff;
            }
            .reward_int {
                position: absolute;
                bottom: 4.4rem; right: 6.5rem;
                width: 1.4rem; height: 1.5rem;
            }
        }
        .my {
            position: relative;
            margin-top: 0.7rem;
            width: 100%; 
            background-color: #fff;
            border-radius: 0.8rem;
            .my_top {
                position: relative;
                width: 100%; height: 4.4rem;
                background: url('../../../assets/img/pullNew/inviteMan/index/my_bg.png') no-repeat 100%;
                background-size: 100%;
                background-position: 0 0;
                box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.04);
                p {
                    line-height: 4.4rem; text-align: center;
                    font-size: 1.6rem; font-weight: bold;
                }
                .int {
                    position: absolute;
                    top: 0; right: 0;
                    padding: 0.5rem 0.8rem;
                    width: 1.4rem; height: 1.4rem;
                    box-sizing: content-box; 
                }
            }
            .my_data {
                position: relative;
                padding: 1.6rem 1.2rem 2rem 1.2rem;
                .my_item {
                    position: relative;
                    display: flex;
                    .list {
                        position: relative;
                        width: 33%;
                        text-align: center;
                        .list_num {
                            margin-bottom: 0.5rem;
                            height: 2.2rem;
                            line-height: 2.2rem;
                            font-size: 1.6rem; font-weight: bold;
                            span {
                                font-size: 1.2rem; font-weight: normal;
                            }
                        }
                        .list_tit {
                            height: 1.6rem;
                            line-height: 1.6rem;
                            font-size: 1.1rem; color: #999;
                        }
                        .list_mark {
                            position: absolute;
                            top: -0.8rem; right: 1rem;
                            width: 2.6rem; height: 1.4rem;
                        }
                    }
                }
                .go_btn {
                    display: block;
                    margin: 2rem auto 0 auto;
                    width: 11.2rem; height: 2.8rem;
                }
            }
        }
        
        .extension {
            position: relative;
            margin-top: 1.6rem; padding: 1.5rem 2rem;
            width: 100%;
            border-radius: 0.8rem;
            background-color: #fff;
            .title {
                position: relative;
                margin-bottom: 1.2rem;
                height: 2.2rem;
                line-height: 2.2rem; text-align: center;
                font-size: 1.6rem; font-weight: bold;
                z-index: 1;
            }
            .title::before {
                display: block;
                content: '';
                width: 8rem; height: 0.6rem;
                position: absolute;
                bottom: 0; left: 0; right: 0;
                margin: auto;
                background: url('../../../assets/img/pullNew/spreadMan/index/extend.png') no-repeat 100%;
                background-size: 100%;
                background-position: 0 0;
            }
            .extend_list {
                position: relative;
                border-bottom: 1px solid #f4f4f4;
                .extend_title {
                    position: relative;
                    padding-top: 2rem;
                    font-size: 1.3rem;
                }
                .extend_con {
                    position: relative;
                    margin-top: 1.4rem; padding-bottom: 1rem;
                    img {
                        width: 5.2rem; height: 5.2rem;
                    }
                    p {
                        position: absolute;
                        top: 1.1rem; left: 5.5rem;
                        height: 2.2rem;
                        line-height: 2.2rem;
                        font-size: 1.2rem; color: #666;
                        span {
                            font-size: 1.2rem; color: #FF9B10;
                        }
                        i {
                            font-style: normal;
                            font-size: 1.6rem; color: #FF9B10;
                        }
                    }
                    .extend_btn {
                        position: absolute;
                        top: 1rem; right: 0;
                        width: 8.8rem; height: 2.8rem;
                        line-height: 2.8rem; text-align: center;
                        font-size: 1.2rem; color: #fff;
                        border-radius: 1.6rem;
                        background: linear-gradient(90deg, #AECCFD 0%,#5D85D0 100%);
                        background: -moz-linear-gradient(90deg, #AECCFD 0%,#5D85D0 100%);
                        background: -webkit-gradient(linear, 90deg, #AECCFD 0%,#5D85D0 100%);
                        background: -webkit-linear-gradient(90deg, #AECCFD 0%,#5D85D0 100%);
                        background: -o-linear-gradient(90deg, #AECCFD 0%,#5D85D0 100%);
                        background: -ms-linear-gradient(90deg, #AECCFD 0%,#5D85D0 100%);
                    }
                }
            }
            .extend_list:last-of-type {
                border-bottom:  none;
            }
        }

        .method {
            position: relative;
            margin-top: 2rem; padding: 2rem 1rem 1.4rem 1.8rem;
            width: 100%;
            background-color: #fff;
            border-radius: 1rem;
            .title {
                margin-bottom: 3.1rem;
                height: 2.2rem;
                line-height: 2.2rem; text-align: center;
                font-size: 1.6rem; font-weight: bold;
            }
            p {
                position: relative;
                padding-left: 2.9rem; margin-bottom: 1.4rem;
                line-height: 2rem;
                font-size: 1.4rem; color: #666;
                span {
                    position: absolute;
                    top: 0; left: 0;
                    width: 2.2rem; height: 2.2rem;
                    line-height: 2.2rem; text-align: center;
                    border-radius: 50%;
                    font-size: 1.6rem; color: #98B7ED;
                    background-color: rgba(210, 228, 253, 0.4);
                }
            }
        }


        .welfare {
            position: relative;
            margin-top: 2rem;
            width: 100%;
            .title_box {
                position: relative;
                height: 4.6rem; width: 100%;
                .title_list {
                    position: absolute;
                    bottom: 0; 
                    width: 17.2rem; height: 3.8rem;
                    text-align: center; line-height: 3.8rem;
                    font-size: 1.6rem; color: #425F90;
                    border-top-right-radius: 1rem;
                    border-top-left-radius: 1rem;
                    background-color: #C4D9FC;
                }
                .title_list:nth-of-type(1) {
                    left: 0;
                }
                .title_list:nth-of-type(2) {
                    right: 0;
                }
                .title_act {
                    height: 4.6rem;
                    line-height: 4.6rem;
                    color: #333; font-weight: bold;
                    background-color: #fff;
                }
            }
            .welfare_con {
                position: relative;
                width: 100%;
                padding: 4.5rem 2.2rem 3.6rem 2.2rem;
                border-bottom-left-radius: 0.8rem;
                border-bottom-right-radius: 0.8rem;
                background-color: #fff;
                .welfare_list {
                    position: relative;
                    p {
                        position: relative;
                        img {
                            width: 14.7rem; height: 6.4rem;
                        }
                        img:nth-of-type(1) {
                            margin-right: 1.3rem;
                        }
                    }
                    >img {
                        display: block;
                        margin: auto;
                        width: 23.7rem; height: 6.5rem;
                    }
                    .recruit_btn {
                        margin: 3rem auto 0 auto;
                        width: 27.1rem; height: 3.6rem;
                        line-height: 3.6rem; text-align: center;
                        font-size: 1.6rem; color: #fff;
                        background: linear-gradient(90deg, #FBD44D 0%, #F2A043 100%);
                        background: -moz-linear-gradient(90deg, #FBD44D 0%, #F2A043 100%);
                        background: -webkit-gradient(linear, 90deg, #FBD44D 0%, #F2A043 100%);
                        background: -webkit-linear-gradient(90deg, #FBD44D 0%, #F2A043 100%);
                        background: -o-linear-gradient(90deg, #FBD44D 0%, #F2A043 100%);
                        background: -ms-linear-gradient(90deg, #FBD44D 0%, #F2A043 100%);
                        border-radius: 22px;
                    }
                }
            }
        }
    }


    .bg_small {
        animation: big_animation 0.6s infinite linear;
    }
    @keyframes big_animation{ 
        0% { 
            transform: scale(1,1); 
        } 
        50% {
            transform: scale(0.9, 0.9)
        }
        100% { 
            transform: scale(1,1); 
        } 
    }

    .pop_desc {
        padding-top: 1.3rem;
        height: 53.4rem;
        border-radius: 0.7rem 0.7rem 0 0;
        background-color: #fff;
        >.pop_desc_title {
            height: 2.2rem;
            text-align: center; line-height: 2.2rem;
            font-size: 1.6rem; font-weight: bold;
        }
        >.pop_desc_box {
            margin-top: 1.6rem; padding: 0 1.2rem 2.4rem 1.2rem;
            height: 48.3rem;
            overflow: auto;
            >.pop_desc_item_tit {
                margin-top: 2.4rem;
                font-size: 1.5rem; font-weight: bold;
            }
            >.pop_desc_item_tit:nth-child(1) {
                margin-top: 0;
            }
            >.pop_desc_item_desc {
                margin-top: 0.4rem;
                line-height: 2rem;
                font-size: 1.3rem;
                color: #666;
            }
        }
    }
</style>