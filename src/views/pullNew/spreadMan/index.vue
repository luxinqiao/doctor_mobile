<!-- 拉新团长-主页 -->
<template>
    <div id='sprea' ref='sprea'>
        <img src='@/assets/img/pullNew/spreadMan/index/top.png' class='top'>
        <img src='@/assets/img/sys/common/backbtn_blue.png' @click='goBack' class='back_btn' :style='"top:"+top+"px"'>
        <p @click='goRule' class='rule_btn' :style='"top:"+top+"px"'>邀请规则</p>
        <div class='content'>
            <div class='reward'>
                <div class='reward_item' @click='showRewardInfo()'>
                    <div class='reward_tit'>拉新奖励</div>
                    <div class='reward_num'>
                        <span>￥</span>{{priceInteger(info.first_max_cash)}}<span class=''>/人</span>
                    </div>
                    <div class='reward_desc'>
                        <p>成功邀请用户可获奖励</p>
                        <p>具体规则 ></p>
                    </div>
                </div>
                <div class='reward_item' @click='showPercentInfo()'>
                    <div class='reward_tit'>拉新提成</div>
                    <div class='reward_num'>
                        <span>￥</span>{{priceInteger(info.second_max_cash)}}<span class=''>/人</span>
                    </div>
                    <div class='reward_desc'>
                        <p>团员成功邀请用户可得提成</p>
                        <p>具体规则 ></p>
                    </div>
                </div>
            </div>

            <div class='group'>
                <div class='group_top'>
                    <img src='@/assets/img/pullNew/spreadMan/index/avt.png' class='avt'>
                    <div class='name'>
                        <p>我的团队：{{info.tema_name}}</p>
                        <img src='@/assets/img/pullNew/spreadMan/index/edit.png' class='edit' @click='customShow = true'>
                    </div>
                    <div class='num' @click='goTotal'>
                        <p>招募团员<span>{{info.member_num}}</span></p>
                        <p>总拉新数<span>{{info.total_active_num}}</span></p>
                        <img src='@/assets/img/pullNew/spreadMan/index/next.png'>
                    </div>
                    <img src='@/assets/img/pullNew/spreadMan/index/int.png' class='int' @click='descShow=true'>
                    <div class='recruit_mem' @click='recruit'>招募团员</div>
                </div>
                <div class='group_bot'>
                    <div class='group_data'>
                        <div class='tit'>我的业绩</div>
                        <div class='look' @click='goMy'>
                            <span>查看详情</span>
                            <img src='@/assets/img/pullNew/spreadMan/index/next.png'>
                        </div>
                        <div class='group_item'>
                            <div class='list'>
                                <p class='list_num'>{{info.month_active_num}}</p>
                                <p class='list_tit'>我的本月拉新</p>
                            </div>
                            <div class='list'>
                                <p class='list_num'>{{priceTransition(info.month_first_cash).integer}}<span>.{{priceTransition(info.month_first_cash).decimal}}</span></p>
                                <p class='list_tit'>本月拉新奖励</p>
                                <img class='list_mark' v-if='info.first_is_forecast==1' src='@/assets/img/pullNew/spreadMan/index/guess.png'>
                            </div>
                            <div class='list'>
                                <p class='list_num'>{{priceTransition(info.my_first_cash).integer}}<span>.{{priceTransition(info.my_first_cash).decimal}}</span></p>
                                <p class='list_tit'>累计拉新奖励</p>
                            </div>
                        </div>
                    </div>
                    <div class='group_data'>
                        <div class='tit'>我的团队</div>
                        <div class='look' @click='goGroup'>
                            <span>查看详情</span>
                            <img src='@/assets/img/pullNew/spreadMan/index/next.png'>
                        </div>
                        <div class='group_item'>
                            <div class='list'>
                                <p class='list_num'>{{info.team_month_active_num}}</p>
                                <p class='list_tit'>团员本月拉新</p>
                            </div>
                            <div class='list'>
                                <p class='list_num'>{{priceTransition(info.month_second_cash).integer}}<span>.{{priceTransition(info.month_second_cash).decimal}}</span></p>
                                <p class='list_tit'>本月拉新提成</p>
                                <img class='list_mark' v-if='info.second_is_forecast==1' src='@/assets/img/pullNew/spreadMan/index/guess.png'>
                            </div>
                            <div class='list'>
                                <p class='list_num'>{{priceTransition(info.my_second_cash).integer}}<span>.{{priceTransition(info.my_second_cash).decimal}}</span></p>
                                <p class='list_tit'>累计拉新提成</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class='extension'>
                <div class='title'><span>推广App</span></div>
                <div class='extend_list' v-for='(item, index) in info.app_list' :key='index'>
                    <div class='extend_title'>邀请新用户登录激活【{{item.name}}】App</div>
                    <div class='extend_con'>
                        <img :src='item.icon'>
                        <p>奖励:<span>￥</span><i>{{priceTransition(item.first_income_cash).integer}}</i><span>.{{priceTransition(item.first_income_cash).decimal}}/人</span></p>
                        <p>提成:<span>￥</span><i>{{priceTransition(item.second_income_cash).integer}}</i><span>.{{priceTransition(item.second_income_cash).decimal}}/人</span></p>
                        <div class='extend_btn' @click='invite(item.app)'>立即邀请</div>
                    </div>
                </div>
            </div>

            <div class='method'>
                <div class='title_box'>
                    <div :class='["title_list", {"title_act":tabIndex==0}]' @click='changeTab(0)'>团员招募攻略</div>
                    <div :class='["title_list", {"title_act":tabIndex==1}]' @click='changeTab(1)'>拉新攻略</div>
                </div>
                <div class='meth_con'>
                    <div class='meth_list' v-show='tabIndex==0'>
                        <p><span>1</span>分享申请拉新大使链接或二维码给好友</p>
                        <p><span>2</span>好友点开链接或扫码，输入手机号申请拉新大使</p>
                        <p><span>3</span>成为拉新大使的团员成功激活新用户，您即可获得对应提成奖励至我的钱包</p>
                        <div class='recruit_btn bg_small' @click='recruit'>立即招募</div>
                    </div>
                    <div class='meth_list' v-show='tabIndex==1'>
                        <p><span>1</span>分享申请新人活动链接或二维码给好友</p>
                        <p><span>2</span>好友点开链接或扫码，输入手机号领取新人礼包</p>
                        <p><span>3</span>成为拉新大使的团员成功激活新用户，您即可获得对应提成奖励至我的钱包</p>
                    </div>
                </div>
            </div>
        </div>

        
        <md-custom :show.sync='customShow' ref='custom'>
            <div class='group_dialog'>
                <div class='group_dialog_tit'>团名修改</div>
                <img src='@/assets/img/pullNew/spreadMan/index/cancle.png' class='group_dialog_cancle' @click='closeCustom'>
                <input type='text' placeholder='团名2~7个字符' v-model='groupName'  @input='getGroupName()'>
                <p :class='["group_dialog_btn", {"group_dialog_btn_act":(groupName.length>1)}]' @click='change'>确认修改</p>
                <div class='group_dialog_warn' v-show='nameHas'>
                    <img src='@/assets/img/pullNew/spreadMan/index/warn.png' class=''>
                    <span>{{msg}}</span>
                </div>
            </div>
        </md-custom>

        <md-popup :show.sync='descShow'>
            <div class='pop_desc'>
                <div class='pop_desc_title'>拉新收益说明</div>
                <div class='pop_desc_box'>
                    <p class='pop_desc_item_tit'>我的本月拉新</p>
                    <p class='pop_desc_item_desc'>本月内通过您分享的二维码或活动链接成功领取新人礼包后，下载App并登录激活账号的新用户总数。</p>
                    <p class='pop_desc_item_tit'>本月拉新奖励</p>
                    <p class='pop_desc_item_desc'>本月内，您成功激活新用户获得的所有奖励总额。如未满拉新基数，奖励金额为预估金额值。</p>
                    <p class='pop_desc_item_tit'>累计拉新奖励</p>
                    <p class='pop_desc_item_desc'>您成功激活新用户后已结算的奖励总额。</p>
                    <p class='pop_desc_item_tit'>团员本月拉新</p>
                    <p class='pop_desc_item_desc'>本月内通过您的团员分享的二维码或活动链接成功领取新人礼包后，下载App并登录激活账号的新用户总数。</p>
                    <p class='pop_desc_item_tit'>本月拉新提成</p>
                    <p class='pop_desc_item_desc'>本月内，您的团员成功激活新用户您获得的拉新提成。如团员未满拉新基数，提成金额为预估金额值。</p>
                    <p class='pop_desc_item_tit'>累计拉新提成</p>
                    <p class='pop_desc_item_desc'>您的团员成功激活新用户后已结算的拉新提成。</p>
                </div>
            </div>
        </md-popup>

        <md-toast :show.sync='errorShow' :content='tip'></md-toast>
        <md-alert :show.sync='alert.show' :title='alert.title' :content='alert.content' confirmLabel='知道了'></md-alert>
    </div>
</template>

<script lang='ts'>
    import { Component, Vue, Watch } from 'vue-property-decorator'
    import {mdToast, mdAlert, mdPopup, mdCustom} from '@/components'
    import { closeWindow} from '@/utils/app'

    import {isEmpty,priceTransitionYuanFen, trimStr, priceInteger} from '@/utils/common'
    import {getHeadTop} from '@/utils/app'
    
    @Component({
        components: {
            mdToast,
            mdAlert,
            mdPopup,
            mdCustom
        }
    })
    export default class spreadManIndex extends Vue {
        private top:any = getHeadTop()

        private descShow:boolean = false
        private customShow:boolean = false
        private errorShow:boolean =  false
        private tip:string = ''
        private msg:string = ''
        private alert = {
            show: false,
            title: '',
            content: ''
        }

        private tabIndex:number = 0

        private groupName:string = ''
        private nameHas:boolean = false

        private priceTransition = priceTransitionYuanFen
        private priceInteger = priceInteger

        private info = {
            tema_name: '',
            referral_code: ''
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
            (this as any).$axios.post(`${(this as any).$request.live}/pull/rec/index`, {}).then((res: any) => {
                if (res.code == 200) {
                    this.info = res.data
                    this.groupName = res.data.tema_name
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
            (this as any).$router.push(`./rule?first_max_cash=${priceInteger((this as any).info.first_max_cash)}&invite_num=${isEmpty((this as any).info.invite_num)?'':(this as any).info.invite_num}`)
        }

        /**
         * 监听团名
         * @param 
         * @return
         */
        getGroupName() {
            this.groupName = this.groupName.replace(/(\ud83c[\udc00-\udfff])|(\ud83d[\udc00-\udfff])|(\ud83e[\udc00-\udfff])|[\u2100-\u32ff]|[\u0030-\u007f][\u20d0-\u20ff]|[\u0080-\u00ff]/g,'')
            if(this.groupName.length>7){
                this.groupName=this.groupName.slice(0,7)
            }
            this.nameHas = false
        }

        /**
         * 确认修改队名
         * @param 
         * @return
         */
        change() {
            this.groupName = trimStr(this.groupName)
            if(isEmpty(this.groupName)) {
                this.msg = '团名不能为空'
                this.nameHas = true
                return
            }
            if(this.groupName.length<2 || this.groupName.length>7) {
                return
            } 
            ;(this as any).$axios.post(`${(this as any).$request.live}/pull/rec/team-name`, {
                name: this.groupName
            }).then((res: any) => {
                if (res.code == 200) {
                    (this as any).$refs.custom.close()
                    this.initData()
                } else if (res.code == 211) {
                    this.msg = '该团名已存在'
                    this.nameHas = true
                } else {
                    this.tip = res.msg
                    this.errorShow = true
                }
            })
        }

        /**
         * 显示拉新奖励
         * @param
         * @return
         */
        showRewardInfo() {
            this.alert.show = true
            this.alert.title = '拉新奖励说明'
            this.alert.content = `团队每月拉新${isEmpty((this as any).info.invite_num)?'':(this as any).info.invite_num}人及以上，您可获得个人拉新每人最高${priceInteger((this as any).info.first_max_cash)}元的拉新奖励。`
        }
        /**
         * 显示拉新提成
         * @param
         * @return
         */
        showPercentInfo() {
            this.alert.show = true
            this.alert.title = '拉新提成说明'
            this.alert.content = `团队每月拉新${isEmpty((this as any).info.invite_num)?'':(this as any).info.invite_num}人及以上，您可获得团员拉新每人最高${priceInteger((this as any).info.second_max_cash)}元的提成奖励。`
        }

        /**
         * 跳转全部
         * @param 
         * @return
         */
        goTotal() {
            this.$router.push('./totalIncome?&from=activity')
        }
        /**
         * 跳转我的收益
         * @param 
         * @return
         */
        goMy() {
            this.$router.push('./myIncome')
        }
        /**
         * 跳转团队
         * @param 
         * @return
         */
        goGroup() {
            this.$router.push(`./memberIncome?referral_code=${this.info.referral_code}`)
        }
        /**
         * 跳转邀请注册
         * @param {string} type 类型 1：澜渟 3：医生
         * @return
         */
        invite(type:string) {
            if(type == '1') {
                this.$router.push(`../invite/user/index?referral_code=${this.info.referral_code}&from=activity`)
            } else if(type == '3') {
                this.$router.push(`../invite/doctor/index?referral_code=${this.info.referral_code}&from=activity`)
            } 
        }
        /**
         * 跳转拉新大使
         * @param 
         * @return
         */
        recruit() {
            this.$router.push(`./inviteNew?referral_code=${this.info.referral_code}`)
        }
        /**
         * 关闭修改队名弹窗
         * @param 
         * @return
         */
        closeCustom() {
            (this as any).$refs.custom.close()
            this.groupName = this.info.tema_name
        }
    }
</script>

<style lang='scss' scoped>
    #sprea {
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
            margin-top: -4.2rem;
            display: flex;
            .reward_item {
                position: relative;
                padding-top: 1.2rem;
                width: 19rem; height: 18.1rem;
                background: url('../../../assets/img/pullNew/spreadMan/index/money_bg.png') no-repeat 100%;
                background-size: 100%;
                background-position: 0 0;
                .reward_tit {
                    position: relative;
                    height: 2rem;
                    line-height: 2rem; text-align: center;
                    font-size: 1.4rem; color: #666;
                }
                .reward_num {
                    position: relative;
                    height: 5.6rem;
                    line-height: 5.6rem; text-align: center;
                    font-size: 4rem; color: #000; font-weight: bold;
                    >span:nth-of-type(1) {
                        font-size: 1.8rem; color: #000; font-weight: normal;
                    }
                    span:last-of-type {
                        position: relative;
                        margin-left: 0.2rem;
                        font-size: 1.2rem; color: #000; font-weight: normal;
                    }
                    span:last-of-type::after {
                        display: block;
                        content: '';
                        width: 2.6rem; height: 1.4rem;
                        background: url('../../../assets/img/pullNew/spreadMan/index/height.png') no-repeat 100%;
                        background-size: 100%;
                        background-position: 0 0;
                        position: absolute;
                        top: -2.2rem; right: -1rem;
                    }
                }
                .reward_desc {
                    position: absolute;
                    bottom: 3.4rem; left: 0; right: 0;
                    margin: auto; 
                    text-align: center;
                    p {
                        height: 1.8rem;
                        line-height: 1.8rem;
                        font-size: 1.2rem; color: #fff;
                    }
                }
            }
        }
        .group {
            position: relative;
            margin-top: 0.7rem;
            width: 100%; 
            background-color: #fff;
            border-radius: 0.8rem;
            .group_top {
                position: relative;
                width: 100%; height: 8rem;
                background: url('../../../assets/img/pullNew/spreadMan/index/group_bg.png') no-repeat 100%;
                background-size: 100%;
                background-position: 0 0;
                box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.04);
                .avt {
                    position: absolute;
                    top: 1.5rem; left: 2rem;
                    width: 5rem; height: 5rem;
                }
                .name {
                    position: absolute;
                    top: 1.7rem; left: 8.2rem;
                    height: 1.8rem;
                    display: flex;
                    align-items: center;
                    p {
                        font-size: 1.3rem;
                    }
                    img {
                        width: 1.1rem; height: 1.1rem;
                        margin-left: 0.5rem;
                    }
                }
                .num {
                    position: absolute;
                    top: 4.1rem; left: 8.2rem;
                    height: 2.2rem;
                    display: flex;
                    align-items: center;
                    p {
                        line-height: 1;
                        font-size: 1.2rem;
                        span {
                            margin-left: 0.4rem;
                            font-size: 1.6rem; color: #FB5146; font-weight: bold;
                        }
                    }
                    p:nth-of-type(2) {
                        margin-left: 1.2rem;
                    }
                    img {
                        margin-left: 0.8rem;
                        width: 0.7rem; height: 1rem;
                    }
                }
                .int {
                    position: absolute;
                    top: 0; right: 0;
                    padding: 0.5rem 0.8rem;
                    width: 1.4rem; height: 1.4rem;
                    box-sizing: content-box; 
                }
                .recruit_mem {
                    position: absolute;
                    bottom: 1.6rem; right: 0.8rem;
                    width: 6.8rem; height: 2.4rem;
                    display: flex;
                    align-items: center; justify-content: center; line-height: 1;
                    font-size: 1.2rem; color: #4E7DD7;
                    border: 1px solid #4E7DD7; border-radius: 3.4rem;
                }
            }
            .group_bot {
                position: relative;
                padding: 0.4rem 1.2rem;
                .group_data {
                    position: relative;
                    .tit {
                        margin: 1.2rem 0 0 0.4rem;
                        height: 1.8rem;
                        line-height: 1.8rem;
                        font-size: 1.3rem; font-weight: bold;
                    }
                    .look {
                        position: absolute;
                        top: 0.2rem; right: 0;
                        height: 1.6rem;
                        display: flex;
                        align-items: center;
                        span {
                            font-size: 1.1rem; color: #999;
                        }
                        img {
                            margin-left: 0.4rem;
                            width: 0.7rem; height: 1rem;
                        }
                    }
                    .group_item {
                        position: relative;
                        margin-top: 1.2rem; padding-bottom: 1.2rem;
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
                                top: -0.8rem; right: 0.6rem;
                                width: 2.6rem; height: 1.4rem;
                            }
                        }
                        .list:nth-of-type(1)::after,.list:nth-of-type(2)::after {
                            display: block;
                            content: '';
                            width: 1px; height: 3.3rem;
                            background-color: rgba($color: #f4f4f4, $alpha: 0.6);
                            position: absolute;
                            bottom: 0; right: 0; top: 0;
                            margin: auto;
                        }
                    }
                }
                .group_data:nth-of-type(1) {
                    border-bottom: 1px solid rgba($color: #f4f4f4, $alpha: 0.5);
                }
            }
        }
        .method {
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
            .meth_con {
                position: relative;
                width: 100%;
                padding: 1rem 1.8rem 2.8rem 1.8rem;
                border-bottom-left-radius: 0.8rem;
                border-bottom-right-radius: 0.8rem;
                background-color: #fff;
                .meth_list {
                    position: relative;
                    p {
                        position: relative;
                        padding-left: 2.9rem; margin-top: 1.4rem;
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
                    .recruit_btn {
                        margin: 2.8rem auto 0 auto;
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
                span {
                    position: relative;
                    font-size: 1.6rem; font-weight: bold;
                    z-index: 2;
                }
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
                        top: 0.2rem; left: 5.5rem;
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
                    p:nth-of-type(2) {
                        top: 2.4rem;
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
    }

    .group_dialog {
        position: fixed;
        top: 0; bottom: 0; left: 0; right: 0;
        margin: auto; padding: 2rem 2.3rem 3.2rem 2.3rem;
        width: 32.5rem; height: 21.3rem;
        background-color: #fff;
        border-radius: 1.2rem;
        .group_dialog_tit {
            position: relative;
            height: 2.5rem;
            text-align: center; line-height: 2.5rem;
            font-size: 1.8rem; font-weight: bold;
        }
        .group_dialog_cancle {
            position: absolute;
            top: 0; right: 0;
            padding: 1.6rem;
            height: 1.2rem; height: 1.2rem;
            box-sizing: content-box;
        }
        input {
            display: block;
            margin-top: 2.4rem;
            text-align: center;
            width: 27.9rem; height: 4.4rem;
            border: 1px solid #CCCCCC;
            border-radius: 2.4rem;
        }
        ::-webkit-input-placeholder {
            font-size: 1.4rem; color: #ccc;
        }
        :-ms-input-placeholder {
            font-size: 1.4rem; color: #ccc;
        }
        .group_dialog_warn {
            position: absolute;
            bottom: 8rem; left: 0; right: 0;
            margin: auto; 
            height: 1.6rem;
            display: flex;
            align-items: center; justify-content: center;
            img {
                width: 1.2rem; height: 1.2rem;
            }
            span {
                margin-left: 0.2rem;
                font-size: 1.1rem; color: #F7534F;
            }
        }
        .group_dialog_btn {
            margin-top: 2.4rem;
            width: 27.9rem; height: 4.4rem;
            text-align: center; line-height: 4.4rem;
            font-size: 1.6rem; color: #fff;
            border-radius: 2.4rem;
            background: linear-gradient(90deg,#ADCBFD 0%,#5F86D1 100%);
            background: -moz-linear-gradient(90deg,#ADCBFD 0%,#5F86D1 100%);
            background: -webkit-gradient(linear, 90deg,#ADCBFD 0%,#5F86D1 100%);
            background: -webkit-linear-gradient(90deg,#ADCBFD 0%,#5F86D1 100%);
            background: -o-linear-gradient(90deg,#ADCBFD 0%,#5F86D1 100%);
            background: -ms-linear-gradient(90deg,#ADCBFD 0%,#5F86D1 100%);
            opacity: 0.5;
        }
        .group_dialog_btn_act {
            background: linear-gradient(90deg,#AECCFD 0%,#5D85D1 100%);
            background: -moz-linear-gradient(90deg,#AECCFD 0%,#5D85D1 100%);
            background: -webkit-gradient(linear, 90deg,#AECCFD 0%,#5D85D1 100%);
            background: -webkit-linear-gradient(90deg,#AECCFD 0%,#5D85D1 100%);
            background: -o-linear-gradient(90deg,#AECCFD 0%,#5D85D1 100%);
            background: -ms-linear-gradient(90deg,#AECCFD 0%,#5D85D1 100%);
            opacity: 1;
        }
    }

    .bg_small {
        animation: big_animation 1s infinite linear;
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
        overflow-y: scroll;
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