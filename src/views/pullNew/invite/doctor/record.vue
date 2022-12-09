<template>
    <div id='record' :class='stateSkin' :style='"padding-top:"+top+"px"'>
        <md-head class='header' backIcon='backWhite'>
            <div class='question_btn' @click='popupShow = true'>
                <img src='@/assets/img/pullNew/spreadMan/myIncome/question.png'>
            </div>
        </md-head>

        <div class='box' @scroll='pageScroll' ref='box'>
            <div class='top' ref='top'>
                <div class='list_data'>
                    <p>本月激活</p>
                    <p>{{total.data.this_month_active_users}}</p>
                </div>
                <div class='list_data'>
                    <p>累计激活</p>
                    <p>{{total.data.total_active_users}}</p>
                </div>
                <div class='list_data'>
                    <p>累计邀请</p>
                    <p>{{total.data.total_invite_users}}</p>
                </div>
            </div>

            <div class='con' >
                <div class='con_top'>
                    <div class='tit'>邀请记录</div>
                    <div ref='con'>
                        <div :class='["date_tab", {"con_top_fixed":topFix}]' :style='"top:"+(topFix?top:"0")+"px"' >
                            <div class='date'>
                                <div class='title date_list'>
                                    <span @click='record.picker = true'>{{record.pickerDefault}}</span>
                                    <img src='@/assets/img/pullNew/spreadMan/myIncome/down.png' v-if='stateSkin!="dark"'>
                                    <img src='@/assets/img/pullNew/spreadMan/myIncome/down_dark.png'  v-if='stateSkin=="dark"'>
                                </div>
                                <div class='time date_list' v-if='record.pickerDefault!="累计"'>
                                    <span v-if='record.pickerDefault=="年度"' @click='record.datetimeYear=true'>{{record.year}}</span>
                                    <span v-if='record.pickerDefault=="月度"' @click='record.datetimeMonth=true'>{{record.year}} - {{record.month>9?record.month:"0"+record.month}}</span>
                                    <img src='@/assets/img/pullNew/spreadMan/myIncome/down.png'  v-if='stateSkin!="dark"'>
                                    <img src='@/assets/img/pullNew/spreadMan/myIncome/down_dark.png'  v-if='stateSkin=="dark"'>
                                </div>
                            </div>

                            <div class='record_tab'>
                                <p :class='{"record_tab_act":recordTabIndex==0}' @click='changeRecordTab(0)'>全部({{total.data.list_total_users}})</p>
                                <p :class='{"record_tab_act":recordTabIndex==1}' @click='changeRecordTab(1)'>已激活({{total.data.list_total_active_users}})</p>
                                <p :class='{"record_tab_act":recordTabIndex==2}' @click='changeRecordTab(2)'>未激活({{total.data.list_total_no_active_users}})</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class='list_box' ref='record'>
                    <div v-show='recordTabIndex==0'>
                        <div v-if='!isEmpty(total.list) && total.isHas'>
                            <van-list
                                v-model='total.loading'
                                :finished='total.finished'
                                :error.sync='total.error'
                                finished-text="-没有更多内容-"
                                error-text='请求失败，点击重新加载'
                                @load='initAll'
                            >
                                <div class='list' v-for='(item, index) in total.list' :key='index'>
                                    <img :src='item.avatar' class='atr'>
                                    <img src='@/assets/img/pullNew/spreadMan/myIncome/logo.png' class='logo' v-if='item.is_active!=1'>
                                    <div :class='["list_right",{"list_right_last":index==total.list.length-1}]'>
                                        <p>{{item.phone}}</p>
                                        <p>{{item.title}}</p>
                                        <p class='list_right_time'>{{item.gmt_create}}</p>
                                        <img src='@/assets/img/pullNew/spreadMan/myIncome/remind.png' class='remind_btn' v-if='item.is_active!=1 && item.is_remind!=1' @click='remind({index:index,uuid:item.uuid})'>
                                        <img src='@/assets/img/pullNew/spreadMan/myIncome/remind_has.png' class='remind_btn' v-if='item.is_active!=1 && item.is_remind==1'>
                                    </div>
                                </div>
                            </van-list>
                        </div>
                        <div class='none' v-if='isEmpty(total.list) && total.isHas'>
                            <p></p>
                            <div>暂无记录</div>
                        </div>
                    </div>
                    <div v-show='recordTabIndex==1'>
                        <div v-if='!isEmpty(active.list) && active.isHas'>
                            <van-list
                                v-model='active.loading'
                                :finished='active.finished'
                                :error.sync='active.error'
                                finished-text="-没有更多内容-"
                                error-text='请求失败，点击重新加载'
                                @load='initActived'
                            >
                                <div class='list' v-for='(item, index) in active.list' :key='index'>
                                    <img :src='item.avatar' class='atr'>
                                    <img src='@/assets/img/pullNew/spreadMan/myIncome/logo.png' class='logo' v-if='item.is_active!=1'>
                                    <div :class='["list_right",{"list_right_last":index==active.list.length-1}]'>
                                        <p>{{item.phone}}</p>
                                        <p>{{item.title}}</p>
                                        <p class='list_right_time'>{{item.gmt_create}}</p>
                                    </div>
                                </div>
                            </van-list>
                        </div>
                        <div class='none' v-if='isEmpty(active.list) && active.isHas'>
                            <p></p>
                            <div>暂无记录</div>
                        </div>
                    </div>
                    <div v-show='recordTabIndex==2'>
                        <div v-if='!isEmpty(noActive.list) && noActive.isHas'>
                            <van-list
                                v-model='noActive.loading'
                                :finished='noActive.finished'
                                :error.sync='noActive.error'
                                finished-text="-没有更多内容-"
                                error-text='请求失败，点击重新加载'
                                @load='initNoActived'
                            >
                                <div class='list' v-for='(item, index) in noActive.list' :key='index'>
                                    <img :src='item.avatar' class='atr'>
                                    <img src='@/assets/img/pullNew/spreadMan/myIncome/logo.png' class='logo' v-if='item.is_active!=1'>
                                    <div :class='["list_right",{"list_right_last":index==noActive.list.length-1}]'>
                                        <p>{{item.phone}}</p>
                                        <p>{{item.title}}</p>
                                        <p class='list_right_time'>{{item.gmt_create}}</p>
                                        <img src='@/assets/img/pullNew/spreadMan/myIncome/remind.png' class='remind_btn' v-if='item.is_active!=1 && item.is_remind!=1' @click='remind({index:index,uuid:item.uuid})'>
                                        <img src='@/assets/img/pullNew/spreadMan/myIncome/remind_has.png' class='remind_btn' v-if='item.is_active!=1 && item.is_remind==1'>
                                    </div>
                                </div>
                            </van-list>
                        </div>
                        <div class='none' v-if='isEmpty(noActive.list) && noActive.isHas'>
                            <p></p>
                            <div>暂无记录</div>
                        </div>
                    </div>
                </div>


            </div>
        </div>

        <md-toast :show.sync='toastShow' type='success' content='已提醒'></md-toast>

        <md-toast :show.sync='errorShow' :content='tip'></md-toast>

        <md-popup :show.sync='popupShow'>
            <div class='pop_desc'>
                <div class='pop_desc_title'>邀请说明</div>
                <div class='pop_desc_box'>
                    <p class='pop_desc_item_tit'>累计邀请</p>
                    <p class='pop_desc_item_desc'>通过您分享的二维码或活动链接成功领取新人礼包的新用户总数。</p>
                    <p class='pop_desc_item_tit'>累计激活</p>
                    <p class='pop_desc_item_desc'>通过您分享的二维码或活动链接成功领取新人礼包后，下载App并登录激活账号的新用户总数。</p>
                    <p class='pop_desc_item_tit'>已激活</p>
                    <p class='pop_desc_item_desc'>领取新人礼包后，下载App并登录激活账号的新用户状态。</p>
                    <p class='pop_desc_item_tit'>未激活</p>
                    <p class='pop_desc_item_desc'>领取新人礼包后，未下载App或下载App但未登录激活账号的新用户状态。</p>
                </div>
            </div>
        </md-popup>

        <!-- 记录 -->
        <md-picker :show.sync='record.picker' :datas='time.type' :default='record.pickerDefault' @confirm='pickerConfirm'></md-picker>

        <md-datetime :show.sync='record.datetimeYear' type='year' @confirm='datetimeConfirm'
            :start='time.startYear' :end='time.endYear' :default='record.year'>
        </md-datetime>

        <md-datetime :show.sync='record.datetimeMonth' type='year-month' @confirm='datetimeConfirm'
            :start='`${time.startYear}-${time.startMonth}`' :end='`${time.endYear}-${time.endMonth}`' :default='`${record.year}-${record.month}`'>
        </md-datetime>

    </div>
</template>

<script lang='ts'>
    import {Component, Vue } from 'vue-property-decorator'
    import {mdPicker, mdDatetime, mdToast, mdPopup, mdHead} from '@/components'
    import {isEmpty} from '@/utils/common'
    import {getHeadTop} from '@/utils/app'

    import {State} from 'vuex-class'

    import {PullRefresh, List} from 'vant'
    import 'vant/lib/list/style'
    import 'vant/lib/pull-refresh/style'
    Vue.use(PullRefresh).use(List)

    interface remindParam {
        index: number,
        uuid: string
    }

    @Component({
        components: {
            mdPicker, 
            mdDatetime,
            mdToast,
            mdPopup,
            mdHead
        }
    })
    export default class inviteDocRecord extends Vue {
        private top = getHeadTop()
        private toastShow:boolean =  false
        private errorShow:boolean =  false
        private tip:string = ''
        private popupShow: boolean = false

        private recordTabIndex:number = 0

        private time = {
            type: ['累计', '年度', '月度'],
            startYear: 2021,
            endYear: (new Date()).getFullYear(),
            startMonth: 2,
            endMonth: Number((new Date()).getMonth())+1
        }

        private record = {
            picker: false,
            datetimeYear: false,
            datetimeMonth: false,
            pickerDefault: '月度',
            year: (new Date()).getFullYear(),
            month: Number((new Date()).getMonth())+1,
        }

        private total:any = {  //全部
            data: {},
            list: [],
            loading: false,
            finished: false,
            error: false,
            page: 1
        }
        private active:any = {  //已激活
            list: [],
            loading: false,
            finished: false,
            error: false,
            isHas: false,
            page: 1
        }
        private noActive:any = {  //未激活
            list: [],
            loading: false,
            finished: false,
            error: false,
            isHas: false,
            page: 1
        }

        private isEmpty = isEmpty

        private titleHeight:number = Math.floor(document.body.clientWidth/375)*44+Number(getHeadTop())
        private topFix:boolean = false

        mounted() {
            this.initTime()
            this.initAll()
            this.initActived()
            this.initNoActived()
        }

        @State('skin') stateSkin: any

        /**
            页面滚动
            @param
            @return
        */
        pageScroll() {
            let conMT = (this.$refs.con as any).getBoundingClientRect().top+10
            if(conMT<=this.titleHeight && !this.topFix) {
                this.topFix = true
            }else if(conMT>this.titleHeight && this.topFix){
                this.topFix = false
            }
        }

        /**
         * 初始化时间
         * @param
         * @return
         */
        initTime() {
            (this as any).$axios.post(`${(this as any).$request.live}/pull/reg/time`, {}).then((res: any) => {
                if (res.code == 200) {
                    let year = Number(res.data.time.split('-')[0])
                    let month = Number(res.data.time.split('-')[1])
                    if(year>=2018) {
                        this.time.startYear = year
                        if(year==2018 && month<5) {
                            this.time.startMonth = 5
                        } else {
                            this.time.startMonth = month
                        }
                    } else {
                        this.time.startYear = 2018
                        this.time.startMonth = 5
                    }
                }
            })
        }

        /**
         * 切换年度/月度
         * @param {any} data 选择的
         * @return
         */
        pickerConfirm(data: any) {
            this.record.pickerDefault = data
            if(this.record.pickerDefault == '月度') {
                if(this.time.startYear == this.record.year && this.record.month<this.time.startMonth) {
                    this.record.month = this.time.startMonth
                }
            }
            this.onRefresh()
        }
        /**
         * 切换具体的年/月
         * @param {any} data 选择的
         * @return
         */
        datetimeConfirm(data: any) {
            if(this.record.pickerDefault == '年度') {
                this.record.year = data.year
            } else {
                this.record.year = data.year
                this.record.month = data.month
            }
            this.onRefresh()
        }

        /**
         * 初始化全部
         * @param 
         * @return
         */
        initAll() {
            let param = {
                invite_app: 3,
                page: this.total.page,
                year: 0,
                month: 0
            }
            if(this.record.pickerDefault == '年度') {
                param.year = this.record.year
            }
            if(this.record.pickerDefault == '月度') {
                param.year = this.record.year
                param.month = this.record.month
            } 
            ;(this as any).$axios.post(`${(this as any).$request.live}/pull/invite/records`, param).then((res: any) => {
                if (res.code == 200) {
                    let data = res.data
                    if(this.total.page==1) {
                        this.total.data = data
                    }
                    
                    this.total.list = (this.total.page==1)?data.invite_list:this.total.list.concat(data.invite_list)
                }
                this.total.isHas = true
                this.total.loading = false
                if(res.data.is_last==1) {
                    this.total.finished = true
                }
                this.total.page++
            })
        }
        /**
         * 初始化已激活
         * @param 
         * @return
         */
        initActived() {
            let param = {
                invite_app: 3,
                page: this.active.page,
                active: 1,
                year: 0,
                month: 0
            }
            if(this.record.pickerDefault == '年度') {
                param.year = this.record.year
            }
            if(this.record.pickerDefault == '月度') {
                param.year = this.record.year
                param.month = this.record.month
            } 
            (this as any).$axios.post(`${(this as any).$request.live}/pull/invite/records`, param).then((res: any) => {
                if (res.code == 200) {
                    let data = res.data
                    this.active.list = (this.active.page==1)?data.invite_list:this.active.list.concat(data.invite_list)
                }
                this.active.isHas = true
                this.active.loading = false
                if(res.data.is_last==1) {
                    this.active.finished = true
                }
                this.active.page++
            })
        }
        /**
         * 初始化未激活
         * @param 
         * @return
         */
        initNoActived() {
            let param = {
                invite_app: 3,
                page: this.noActive.page,
                active: 0,
                year: 0,
                month: 0
            }
            if(this.record.pickerDefault == '年度') {
                param.year = this.record.year
            }
            if(this.record.pickerDefault == '月度') {
                param.year = this.record.year
                param.month = this.record.month
            } 
            (this as any).$axios.post(`${(this as any).$request.live}/pull/invite/records`, param).then((res: any) => {
                if (res.code == 200) {
                    let data = res.data
                    this.noActive.list = (this.noActive.page==1)?data.invite_list:this.noActive.list.concat(data.invite_list)
                }
                this.noActive.isHas = true
                this.noActive.loading = false
                if(res.data.is_last==1) {
                    this.noActive.finished = true
                }
                this.noActive.page++
            })
        }
        /**
         * 提醒
         * @param {remindParam} {
         *  uuid 用户id，
         *  index 记录下标
         * }
         * @return
         */
        remind(param: remindParam) {
            ;(this as any).$axios.post(`${(this as any).$request.live}/pull/invite/tip`, {
                invite_uuid: param.uuid,
            }).then((res: any) => {
                if (res.code == 200) {
                    this.toastShow = true
                    if(this.recordTabIndex == 0) {
                        this.total.list[param.index].is_remind = 1
                        this.noActive.loading = false
                        this.noActive.finished = true
                        this.noActive.error = false
                        this.noActive.page = 1
                        this.initNoActived()
                    } else if(this.recordTabIndex == 2) {
                        this.noActive.list[param.index].is_remind = 1
                        this.total.loading = false
                        this.total.finished = true
                        this.total.error = false
                        this.total.page = 1
                        this.initAll()
                    }
                } else {
                    this.tip = res.msg
                    this.errorShow = true
                }
            })

        }
        /**
         * 切换记录tab
         * @param {number} index 下标
         * @return
         */
        changeRecordTab(index:number) {
            this.recordTabIndex = index
            ;(this.$refs.box as any).scrollTo(0,0)
        }

        /**
         * 下拉刷新
         * @param 
         * @return
         */
        onRefresh() {
            this.total.loading = false
            this.total.finished = false
            this.total.error = false
            this.total.isHas = false
            this.total.page = 1

            this.active.loading = false
            this.active.finished = false
            this.active.error = false
            this.active.isHas = false
            this.active.page = 1

            this.noActive.loading = false
            this.noActive.finished = false
            this.noActive.error = false
            this.noActive.isHas = false
            this.noActive.page = 1

            this.initAll()
            this.initActived()
            this.initNoActived()
        }
    }
</script>

<style lang='scss' scoped>
    .header{
        background: url('../../../../assets/img/pullNew/spreadMan/myIncome/head_bg.png') no-repeat 0;
        background-size: 100% 100%;
        /deep/.title {
            color: #fff !important;
        }
        .question_btn {
            position: absolute;
            top: 0; bottom: 0; right: 0;
            margin: auto; padding: 1.2rem;
            img {
                display: block;
                width: 1.8rem; height: 1.8rem;
            }
        }
    }
    #record {
        padding-top: 2rem;
        height: 100%;
        background: url('../../../../assets/img/pullNew/spreadMan/myIncome/bg.png') no-repeat 100%;
        background-size: 100%;
        background-position: 0 0;
        background-color: #26C2C4;
    }

    .none {
        padding: 10rem 0 8rem 0; 
        text-align: center;
        p {
            width: 15rem; height: 10.9rem;
            margin: auto;
            background: url('../../../../assets/img/pullNew/spreadMan/myIncome/none.png') no-repeat 0;
            background-size: 100%;
        }
        div:nth-of-type(1) {
            margin-top: 1.6rem;
            height: 2.4rem;
            line-height: 2.4rem;
            font-size: 1.4rem; color: #666;
        }
        .none_btn {
            margin: 8.9rem auto 0 auto;
            width: 30.5rem; height: 4.4rem;
            line-height: 4.4rem; text-align: center;
            font-size: 1.6rem; color: #fff;
            border-radius: 2.2rem;
            background: linear-gradient(157deg, #3CD2BA 0%, #26C2C4 59%, #26C2C4 100%);
        }
    }

    .box {
        position: relative;
        height: 100%;
        overflow: auto;
    }

    .top {
        position: relative;
        padding-top: 6.3rem;
        width: 100%; height: 7.4rem;
        display: flex;
        box-sizing: content-box;
        .list_data {
            position: relative;
            width: 33%;
            text-align: center;
            p:nth-of-type(1) {
                height: 1.7rem;
                line-height: 1.7rem;
                font-size: 1.2rem; color: #fff;
            }
            p:nth-of-type(2) {
                margin-top: 0.6rem;
                height: 2.8rem;
                line-height: 2.8rem;
                font-size: 2rem; color: #fff;
                span {
                    font-size: 1.4rem; color: #fff;
                }
            }
        }
        .list_data_act::after {
            display: block;
            content: '';
            width: 1.7rem; height: 1rem;
            position: absolute;
            bottom: 0; left: 0; right: 0;
            margin: auto;
            background: url('../../../../assets/img/pullNew/spreadMan/memberIncome/tab.png') no-repeat 100%;
            background-size: 100%;
            background-position: 0 0;
        }
    }
    .con {
        position: relative;
        padding-top: 1px; 
        height: calc(100% - 13.7rem);
        background-color: #fff;
        border-radius: 1rem 1rem 0 0 ;
        .con_top {
            position: absolute;
            top: 0; left: 0;
            width: 100%;
            padding: 1.6rem  0 0 0;
            background-color: #fff;
            border-radius: 1rem 1rem 0 0 ;
            z-index: 1;
        }
        .date_tab {
            background-color: #fff;
        }
        .tit {
            height: 1.4rem;
            line-height: 1.4rem; text-align: center;
            font-size: 1.4rem; font-weight: bold;
        }
        .date {
            position: relative;
            padding-left: 1rem; margin-top: 2rem;
            height: 2rem; width: 100%;
            display: flex;
            align-items: center;
            .date_list {
                position: relative;
                margin-right: 2.2rem;
                height: 2rem;
                display: flex;
                align-items: center;
                span {
                    display: block;
                    margin-right: 0.8rem;
                    line-height: 1.1;
                    font-size: 1.4rem;
                }
                img {
                    display: block;
                    width: 0.8rem; height: 0.6rem;
                }
            }
        }

        .record_tab {
            position: relative;
            padding: 1.2rem 0 1.3rem 0;
            width: 100%;
            display: flex;
            align-items: center;
            p {
                position: relative;
                width: 33%; height: 1.8rem;
                text-align: center; line-height: 1.8rem;
                font-size: 1.3rem;
            }
            .record_tab_act {
                color: #26C2C4; font-weight: bold;
            }
            .record_tab_act::after {
                display: block;
                content: '';
                width: 1.6rem; height: 0.2rem;
                border-radius: 1px;
                background-color: #26C2C4;
                position: absolute;
                left: 0; right: 0; bottom: -0.5rem;
                margin: auto;
            }
        }

        .con_top_fixed {
            position: fixed;
            top: 0; left: 0;
            padding-top: 4rem;
            width: 100%;
        }

        .list_box {
            position: relative;
            margin-top: 11rem;
            min-height: calc(100% - 11rem);
            background-color: #fff;
            .list {
                position: relative;
                padding-left: 1.2rem;
                height: 8.6rem;
                .logo {
                    position: absolute;
                    top: 4.3rem; left: 1.2rem;
                    width: 3.2rem; height: 1.6rem;
                }
                .atr {
                    position: absolute;
                    top: 1.4rem; left: 1.2rem;
                    width: 3.4rem; height: 3.4rem;
                    border-radius: 50%;
                }
                .list_right {
                    position: relative;
                    padding: 1.6rem 0 1.5rem 0; margin-left: 4rem;
                    height: 8.6rem;
                    border-bottom: 1px solid #F4F4F4;
                    p {
                        height: 1.8rem; width: 23.5rem;
                        line-height: 1.8rem; 
                        font-size: 1.3rem; color: #666;
                    }
                    p:nth-of-type(2) {
                        margin-top: 0.2rem;
                    }
                    .list_right_time {
                        margin-top: 0.2rem;
                        height: 1.7rem; 
                        line-height: 1.7rem;
                        font-size: 1.2rem; color: #999;
                    }
                    .remind_btn {
                        position: absolute;
                        top: 2.9rem; right: 1.2rem;
                        width: 6.8rem; height: 2.8rem;
                    }
                }
                .list_right_last {
                    border-bottom: none;
                }
            }
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
    



    .dark#record {
        .header::before {
            display: block;
            content: '';
            width: 100%; height: 100%;
            background-color: rgba(0,0,0,0.4);
            position: absolute;
            top: 0; left: 0;
        }
        .list_data_act::after {
            background-image: url('../../../../assets/img/pullNew/spreadMan/memberIncome/tab_dark.png');
        }
        .con {
            background-color: #0D101C;
            .con_top {
                background-color: #0D101C;
            }
            .date_tab {
                background-color: #0D101C;
            }
            .tit {
                color: #E3E3E3;
            }
            .date_list {
                span {
                    color: #E3E3E3;
                }
            }
            .record_tab {
                p {
                    color: #E3E3E3;
                }
                .record_tab_act {
                    color: #26C2C4;
                }
            }
            .list_box {
                background-color: #0D101C;
                .list {
                    .list_right {
                        border-color: #272A36;
                        p {
                            color: #999;
                        }
                        .list_right_time {
                            color: #666;
                        }
                    }
                }
            }
        }
        .none {
            p {
                background-image: url('../../../../assets/img/pullNew/spreadMan/myIncome/none_dark.png');
            }
        }
    }

    
    .dark#record::before{
        display: block;
        content: '';
        width: 100%; height: 100%;
        background-color: rgba(0,0,0,0.4);
        position: absolute;
        top: 0; left: 0;
    }
</style>