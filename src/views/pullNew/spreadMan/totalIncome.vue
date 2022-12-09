<!-- 拉新团长-拉新收益 -->
<template>
    <div id='total' :class='stateSkin' :style='"padding-top:"+top+"px"'>
        <md-head class='header' backIcon='backWhite' :backMode='backMode'></md-head>
        <div class='box' @scroll='pageScroll' ref='box'>
            <div class='top'>
                <div class='list_data'>
                    <p>本月拉新收益</p>
                    <p>{{priceTransition(total.data.month_cash).integer}}<span>.{{priceTransition(total.data.month_cash).decimal}}</span></p>
                    <img v-if='total.data.is_forecast==1' src='@/assets/img/pullNew/spreadMan/index/guess.png'>
                </div>
                <div class='list_data'>
                    <p>上月拉新收益</p>
                    <p>{{priceTransition(total.data.last_month_cash).integer}}<span>.{{priceTransition(total.data.last_month_cash).decimal}}</span></p>
                </div>
                <div class='list_data'>
                    <p>累计拉新收益</p>
                    <p>{{priceTransition(total.data.total_cash).integer}}<span>.{{priceTransition(total.data.total_cash).decimal}}</span></p>
                </div>
            </div>
            <div :class='["teamTip",{"teamTip_un":isEmpty(total.data.reward_tips)}]'>{{total.data.reward_tips}}</div>

            <div class='con'>
                <div class='con_top'>
                    <div class='tit'>拉新收益明细</div>

                    <div ref='con'>
                        <div :class='["date_tab", {"con_top_fixed":topFix}]' :style='"top:"+(topFix?top:"0")+"px"' >
                            <div class='date'>
                                <div class='title date_list'>
                                    <span @click='profit.picker = true'>{{profit.pickerDefault}}</span>
                                    <img src='@/assets/img/pullNew/spreadMan/myIncome/down.png' v-if='stateSkin!="dark"'>
                                    <img src='@/assets/img/pullNew/spreadMan/myIncome/down_dark.png'  v-if='stateSkin=="dark"'>
                                </div>
                                <div class='time date_list' v-if='profit.pickerDefault!="累计"'>
                                    <span v-if='profit.pickerDefault=="年度"' @click='profit.datetimeYear=true'>{{profit.year}}</span>
                                    <span v-if='profit.pickerDefault=="月度"' @click='profit.datetimeMonth=true'>{{profit.year}} - {{profit.month>9?profit.month:"0"+profit.month}}</span>
                                    <img src='@/assets/img/pullNew/spreadMan/myIncome/down.png'  v-if='stateSkin!="dark"'>
                                    <img src='@/assets/img/pullNew/spreadMan/myIncome/down_dark.png'  v-if='stateSkin=="dark"'>
                                </div>
                            </div>

                            <div class='tip'>激活<span>{{total.data.total_count}}</span>收益<span>{{priceTransition(total.data.search_cash).integer}}.{{priceTransition(total.data.search_cash).decimal}}</span></div>

                            <div class='tab'>
                                <p :class='{"tab_act":tabIndex==0}' @click='changeTab(0)'>全部({{total.data.total_count}})</p>
                                <p :class='{"tab_act":tabIndex==1}' @click='changeTab(1)'>拉新奖励({{total.data.first_count}})</p>
                                <p :class='{"tab_act":tabIndex==2}' @click='changeTab(2)'>拉新提成({{total.data.second_count}})</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div class='list_box' ref='record'>
                    <div v-show='tabIndex==0'>
                        <div v-if='!isEmpty(total.list) && total.isHas'>
                            <van-list
                                v-model='total.loading'
                                :finished='total.finished'
                                :error.sync='total.error'
                                finished-text="-没有更多内容-"
                                error-text='请求失败，点击重新加载'
                                @load='initTotal'
                            >
                                <div class='list' v-for='(item, index) in total.list' :key='index'>
                                    <img class='type_img' v-if='item.type==1' src='@/assets/img/pullNew/spreadMan/totalIncome/reward.png'>
                                    <img class='type_img' v-if='item.type==2' src='@/assets/img/pullNew/spreadMan/totalIncome/commission.png'>
                                    <div :class='["list_right",{"list_right_last":index==total.list.length-1}]'>
                                        <p class='list_tit'>{{item.invite_text}}</p>
                                        <p class='list_time'>{{item.activate_time}}</p>
                                        <div :class='["list_money", {"list_money_un":item.cash_status==3},{"list_money_pre":item.cash_status==1}]'>+{{priceTransition(item.cash).integer}}.{{priceTransition(item.cash).decimal}}</div>
                                        <img class='list_status' v-if='item.cash_status==1' src='@/assets/img/pullNew/spreadMan/totalIncome/status_guess.png'>
                                        <img class='list_status' v-if='item.cash_status==3' src='@/assets/img/pullNew/spreadMan/totalIncome/status_unvalid.png'>
                                    </div>
                                </div>
                            </van-list>
                        </div>
                        <div class='none' v-if='isEmpty(total.list) && total.isHas'>
                            <p></p>
                            <div>暂无记录</div>
                        </div>
                    </div>

                    <div v-show='tabIndex==1'>
                        <div v-if='!isEmpty(award.list) && award.isHas'>
                            <van-list
                                v-model='award.loading'
                                :finished='award.finished'
                                :error.sync='award.error'
                                finished-text="-没有更多内容-"
                                error-text='请求失败，点击重新加载'
                                @load='initAward'
                            >
                                <div class='list' v-for='(item, index) in award.list' :key='index'>
                                    <img src='@/assets/img/pullNew/spreadMan/totalIncome/reward.png' class='type_img' v-if='item.type==1'>
                                    <img src='@/assets/img/pullNew/spreadMan/totalIncome/commission.png' class='type_img' v-if='item.type==2'>
                                    <div :class='["list_right",{"list_right_last":index==award.list.length-1}]'>
                                        <p class='list_tit'>{{item.invite_text}}</p>
                                        <p class='list_time'>{{item.activate_time}}</p>
                                        <div :class='["list_money", {"list_money_un":item.cash_status==3},{"list_money_pre":item.cash_status==1}]'>+{{priceTransition(item.cash).integer}}.{{priceTransition(item.cash).decimal}}</div>
                                        <img class='list_status' v-if='item.cash_status==1' src='@/assets/img/pullNew/spreadMan/totalIncome/status_guess.png'>
                                        <img class='list_status' v-if='item.cash_status==3' src='@/assets/img/pullNew/spreadMan/totalIncome/status_unvalid.png'>
                                    </div>
                                </div>
                            </van-list>
                        </div>
                        <div class='none' v-if='isEmpty(award.list) && award.isHas'>
                            <p></p>
                            <div>暂无记录</div>
                        </div>
                    </div>

                    <div v-show='tabIndex==2'>
                        <div v-if='!isEmpty(commission.list) && commission.isHas'>
                            <van-list
                                v-model='commission.loading'
                                :finished='commission.finished'
                                :error.sync='commission.error'
                                finished-text="-没有更多内容-"
                                error-text='请求失败，点击重新加载'
                                @load='initCommis'
                            >
                                <div class='list' v-for='(item, index) in commission.list' :key='index'>
                                    <img src='@/assets/img/pullNew/spreadMan/totalIncome/reward.png' class='type_img' v-if='item.type==1'>
                                    <img src='@/assets/img/pullNew/spreadMan/totalIncome/commission.png' class='type_img' v-if='item.type==2'>
                                    <div :class='["list_right",{"list_right_last":index==commission.list.length-1}]'>
                                        <p class='list_tit'>{{item.invite_text}}</p>
                                        <p class='list_time'>{{item.activate_time}}</p>
                                        <div :class='["list_money", {"list_money_un":item.cash_status==3},{"list_money_pre":item.cash_status==1}]'>+{{priceTransition(item.cash).integer}}.{{priceTransition(item.cash).decimal}}</div>
                                        <img class='list_status' v-if='item.cash_status==1' src='@/assets/img/pullNew/spreadMan/totalIncome/status_guess.png'>
                                        <img class='list_status' v-if='item.cash_status==3' src='@/assets/img/pullNew/spreadMan/totalIncome/status_unvalid.png'>
                                    </div>
                                </div>
                            </van-list>
                        </div>
                        <div class='none' v-if='isEmpty(commission.list) && commission.isHas'>
                            <p></p>
                            <div>暂无记录</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <md-picker :show.sync='profit.picker' :datas='profit.type' :default='profit.pickerDefault' @confirm='pickerConfirm'></md-picker>

        <md-datetime :show.sync='profit.datetimeYear' type='year' @confirm='datetimeConfirm'
            :start='profit.startYear' :end='profit.endYear' :default='profit.year'>
        </md-datetime>

        <md-datetime :show.sync='profit.datetimeMonth' type='year-month' @confirm='datetimeConfirm'
            :start='`${profit.startYear}-${profit.startMonth}`' :end='`${profit.endYear}-${profit.endMonth}`' :default='`${profit.year}-${profit.month}`'>
        </md-datetime>
    </div>
</template>

<script lang='ts'>
    import {Component, Vue } from 'vue-property-decorator'
    import {mdToast, mdPicker, mdDatetime, mdHead} from '@/components'
    import {State} from 'vuex-class'

    import {isEmpty, priceTransitionYuanFen,} from '@/utils/common'
    import {getHeadTop} from '@/utils/app'

    import {List} from 'vant'
    import 'vant/lib/list/style'
    Vue.use(List)

    @Component({
        components: {
            mdToast, 
            mdPicker, 
            mdDatetime,
            mdHead
        }
    })
    export default class spreadManTotal extends Vue {
        private top = getHeadTop()
        private tabIndex:number = 0
        private isHas:boolean = false
        private isRefresh:boolean =  false

        private profit = {
            picker: false,
            datetimeYear: false,
            datetimeMonth: false,
            type: ['累计', '年度', '月度'],
            pickerDefault: '月度',
            year: (new Date()).getFullYear(),
            month: Number((new Date()).getMonth())+1,
            startYear: 2021,
            endYear: (new Date()).getFullYear(),
            startMonth: 2,
            endMonth: Number((new Date()).getMonth())+1
        }

        private total:any = {  //全部
            data: {},
            list: [],
            loading: false,
            finished: false,
            error: false,
            page: 1
        }
        private award:any = {  //拉新奖励
            data: [],
            loading: false,
            finished: false,
            error: false,
            page: 1
        }
        private commission:any = {  //拉新提成
            data: [],
            loading: false,
            finished: false,
            error: false,
            page: 1
        }

        private isEmpty = isEmpty
        private priceTransition = priceTransitionYuanFen

        private titleHeight:number = Math.floor(document.body.clientWidth/375*44)+Number(getHeadTop())
        private topFix:boolean = false
        private backMode:string = 'close'

        mounted() {
            if (this.$route.query.from != 'activity') { //不是活动页跳转
                this.backMode = 'close'
            } else {
                this.backMode = 'back'
            }
            this.initTime()
            this.initTotal()
            this.initAward()
            this.initCommis()
        }

        @State('skin') stateSkin: any

        /**
            页面滚动
            @param
            @return
        */
        pageScroll() {
            let conMT = (this.$refs.con as any).getBoundingClientRect().top + 5
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
                    if(year>=2021) {
                        this.profit.startYear = year
                        this.profit.startMonth = Number(res.data.time.split('-')[1])
                    } else {
                        this.profit.startYear = 2021
                        this.profit.startMonth = 2
                    }
                }
            })
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
         * 切换年度/月度
         * @param {any} data 选择的
         * @return
         */
        pickerConfirm(data: any) {
            this.profit.pickerDefault = data
            if(this.profit.pickerDefault == '月度') {
                if(this.profit.startYear == this.profit.year && this.profit.month<this.profit.startMonth) {
                    this.profit.month = this.profit.startMonth
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
            if(this.profit.pickerDefault == '年度') {
                this.profit.year = data.year
            } else {
                this.profit.year = data.year
                this.profit.month = data.month
            }
            this.onRefresh()
        }
        /**
         * 初始化全部
         * @param 
         * @return
         */
        initTotal() {
            let param = {
                page: this.total.page,
                type: 0,
                year: 0,
                month: 0
            }
            if(this.profit.pickerDefault == '年度') {
                param.year = this.profit.year
            }
            if(this.profit.pickerDefault == '月度') {
                param.year = this.profit.year
                param.month = this.profit.month
            } 
            ;(this as any).$axios.post(`${(this as any).$request.live}/pull/rec/income-list`, param).then((res: any) => {
                if (res.code == 200) {
                    let data = res.data
                    this.total.data = data
                    this.total.list = (this.total.page==1)?data.list:this.total.list.concat(data.list)
                }
                this.total.isHas = true
                this.total.loading = false
                if(res.data.is_last_page==1) {
                    this.total.finished = true
                }
                this.total.page++
            })
        }
        /**
         * 初始化拉新奖励
         * @param 
         * @return
         */
        initAward() {
            let param = {
                page: this.award.page,
                type: 1,
                year: 0,
                month: 0
            }
            if(this.profit.pickerDefault == '年度') {
                param.year = this.profit.year
            }
            if(this.profit.pickerDefault == '月度') {
                param.year = this.profit.year
                param.month = this.profit.month
            } 
            ;(this as any).$axios.post(`${(this as any).$request.live}/pull/rec/income-list`, param).then((res: any) => {
                if (res.code == 200) {
                    let data = res.data
                    this.award.list = (this.award.page==1)?data.list:this.award.list.concat(data.list)
                }
                this.award.isHas = true
                this.award.loading = false
                if(res.data.is_last_page==1) {
                    this.award.finished = true
                }
                this.award.page++
            })
        }

        /**
         * 初始化拉新提成
         * @param 
         * @return
         */
        initCommis() {
            let param = {
                page: this.commission.page,
                type: 2,
                year: 0,
                month: 0
            }
            if(this.profit.pickerDefault == '年度') {
                param.year = this.profit.year
            }
            if(this.profit.pickerDefault == '月度') {
                param.year = this.profit.year
                param.month = this.profit.month
            } 
            ;(this as any).$axios.post(`${(this as any).$request.live}/pull/rec/income-list`, param).then((res: any) => {
                if (res.code == 200) {
                    let data = res.data
                    this.commission.list = (this.commission.page==1)?data.list:this.commission.list.concat(data.list)
                }
                this.commission.isHas = true
                this.commission.loading = false
                if(res.data.is_last_page==1) {
                    this.commission.finished = true
                }
                this.commission.page++
            })
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

            this.award.loading = false
            this.award.finished = false
            this.award.error = false
            this.award.isHas = false
            this.award.page = 1

            this.commission.loading = false
            this.commission.finished = false
            this.commission.error = false
            this.commission.isHas = false
            this.commission.page = 1

            this.initTotal()
            this.initAward()
            this.initCommis()
        }
    }
</script>

<style lang='scss' scoped>
    .header{
        background: url('../../../assets/img/pullNew/spreadMan/myIncome/head_bg.png') no-repeat 0;
        background-size: 100% 100%;
        /deep/.title {
            color: #fff !important;
        }
    }
    #total {
        height: 100%;
        background: url('../../../assets/img/pullNew/spreadMan/myIncome/bg.png') no-repeat 100%;
        background-size: 100%;
        background-position: 0 0;
        background-color: #26C2C4;
    }
    .box {
        position: relative;
        height: 100%;
        overflow: auto;
        .top {
            position: relative;
            padding-top: 6.3rem;
            height: 12.4rem; width: 100%;
            display: flex;
            .list_data {
                position: relative;
                width: 33%;
                text-align: center;
                p:nth-of-type(1) {
                    height: 1.7rem;
                    line-height: 1.7rem;
                    font-size: 1.2rem; color: rgba(255,255,255,0.8);
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
                img {
                    position: absolute;
                    top: 1.8rem; right: 1.2rem;
                    width: 2.6rem; height: 1.4rem;
                }
            }
        }
        .teamTip {
            height: 2rem;
            text-align: center; line-height: 2rem;
            color: #FFD582; background-color: rgba(28,143,144,0.49);
            font-size: 1.1rem;
        }
        .teamTip_un {
            background-color: transparent;
        }
        .con {
            position: relative;
            padding-top: 1px; 
            height: 100%;
            height: calc(100% - 14.4rem);
            border-radius: 1rem 1rem 0 0 ;
            background-color: #fff;
            .con_top {
                position: absolute;
                top: 0; left: 0;
                width: 100%;
                padding: 1.6rem  0 0 0;
                background-color: #fff;
                border-radius: 1rem 1rem 0 0 ;
                z-index: 1;
            }
            .tit {
                height: 1.4rem;
                line-height: 1.4rem; text-align: center;
                font-size: 1.4rem; font-weight: bold;
            }
            .date_tab {
                background-color: #fff;
            }
            .date {
                position: relative;
                padding-top: 2rem; padding-left: 1rem; 
                height: 2rem;
                display: flex;
                align-items: center;
                box-sizing: content-box;
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
                .type {
                    position: absolute;
                    top: 0; bottom: 0; right: 1.2rem;
                    margin-right: 0;
                }
            }

            .tip {
                position: relative;
                padding-left: 1.2rem; margin-top: 0.8rem;
                height: 1.7rem;
                line-height: 1.7rem;
                font-size: 1.2rem; color: #999;
                span {
                    margin: 0 1.9rem 0 0.4rem;
                    font-size: 1.2rem; color: #999;
                }
            }

            .tab {
                position: relative;
                margin: 1.9rem 0 1.3rem 0;
                display: flex;
                align-items: center;
                p {
                    position: relative;
                    width: 33%; height: 1.8rem;
                    text-align: center; line-height: 1.8rem;
                    font-size: 1.3rem;
                }
                .tab_act {
                    color: #26C2C4; font-weight: bold;
                }
                .tab_act::after {
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
                border-radius: 1rem 1rem 0 0 ;
            }



            .list_box {
                position: relative;
                margin-top: 14.4rem;
                min-height: calc(100% - 14.4rem);
                background-color: #fff;
                .list {
                    position: relative;
                    padding-left: 1.2rem;
                    .type_img {
                        position: absolute;
                        top: 1.6rem; left: 1.2rem;
                        width: 3.4rem; height: 3.4rem;
                    }
                    .list_right {
                        position: relative;
                        padding: 1.6rem 0 1.5rem 0; margin-left: 4rem;
                        height: 100%;
                        border-bottom: 1px solid #F4F4F4;
                        .list_tit {
                            width: 23.5rem; 
                            line-height: 1.8rem; 
                            font-size: 1.3rem; color: #666;
                        }
                        .list_time {
                            margin-top: 0.4rem;
                            height: 1.7rem; 
                            line-height: 1.7rem;
                            font-size: 1.2rem; color: #999;
                        }
                        .list_money {
                            position: absolute;
                            top: 1.6rem; right: 1.2rem;
                            height: 1.8rem;
                            line-height: 1.8rem;
                            font-size: 1.3rem; color: #FF8F43;
                        }
                        .list_money_pre {
                            color: #F75551;
                        }
                        .list_money_un {
                            color: #999;
                        }
                        .list_status {
                            position: absolute;
                            top: 3.8rem; right: 1.2rem;
                            width: 3.4rem; height: 1.8rem;
                        }
                    }
                    .list_right_last {
                        border-bottom: none;
                    }
                }
            }
        }
    }

    .none {
        padding: 6rem 0 8rem 0;
        text-align: center;
        p {
            width: 15rem; height: 10.9rem;
            margin: auto;
            background: url('../../../assets/img/pullNew/spreadMan/myIncome/none.png') no-repeat 0;
            background-size: 100%;
        }
        div {
            height: 2.4rem;
            line-height: 2.4rem;
            font-size: 1.4rem; color: #666;
        }
        div:nth-of-type(1) {
            margin-top: 1.6rem;
        }
    }

    .dark#total {
        .header::before {
            display: block;
            content: '';
            width: 100%; height: 100%;
            background-color: rgba(0,0,0,0.4);
            position: absolute;
            top: 0; left: 0;
        }
        .box {
            .con {
                background-color: #0D101C;
                .con_top {
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
                .tip {
                    color: #666;
                    span {
                        color: #666;
                    }
                }
                .date_tab {
                    background-color: #0D101C;
                }
                .list_box {
                    background-color: #0D101C;
                    .list {
                        .list_right {
                            border-color: #272A36;
                            .list_tit{
                                color: #999;
                            }
                            .list_time {
                                color: #666;
                            }
                        }
                    }
                }
                .tab {
                    p {
                        color: #E3E3E3;
                    }
                    .tab_act {
                        color: #26C2C4;
                    }
                }
            }
        }
        .none {
            p {
                background-image: url('../../../assets/img/pullNew/spreadMan/myIncome/none_dark.png');
            }
        }
    }

    
    .dark#total::before{
        display: block;
        content: '';
        width: 100%; height: 100%;
        background-color: rgba(0,0,0,0.4);
        position: fixed;
        top: 0; left: 0;
    }
</style>