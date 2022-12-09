<template>
    <div id='member' :class='stateSkin' :style='"padding-top:"+top+"px"'>
        <md-head class='header' backIcon='backWhite'></md-head>

        <div class='top' ref='top' :style='"top:"+top+"px;"'>
            <div class='top_total'>
                <div :class='["list_data",{"list_data_act":tabIndex==0}]' @click='changeTab(0)'>
                    <p>团队成员</p>
                    <p>{{member.data.member_count}}</p>
                </div>
                <div :class='["list_data",{"list_data_act":tabIndex==1}]' @click='changeTab(1)'>
                    <p>团员总拉新</p>
                    <p>{{member.data.member_activate_num}}</p>
                </div>
                <div :class='["list_data",{"list_data_act":tabIndex==2}]' @click='changeTab(2)'>
                    <p>拉新总提成</p>
                    <p>{{priceTransition(member.data.second_cash).integer}}<span>.{{priceTransition(member.data.second_cash).decimal}}</span></p>
                </div>
            </div>
            <div class='top_con'>
                <div class='con_list_tit' v-show='tabIndex==0'>团队成员</div>
                <div class='con_list rank_list' v-show='tabIndex==1'>
                    <div class='con_list_tit'>排行榜</div>
                    <div class='date'>
                        <div class='title date_list'>
                            <span @click='rank.picker = true'>{{rank.pickerDefault}}</span>
                            <img src='@/assets/img/pullNew/spreadMan/myIncome/down.png' v-if='stateSkin!="dark"'>
                            <img src='@/assets/img/pullNew/spreadMan/myIncome/down_dark.png'  v-if='stateSkin=="dark"'>
                        </div>
                        <div class='time date_list' v-if='rank.pickerDefault!="累计"'>
                            <span v-if='rank.pickerDefault=="年度"' @click='rank.datetimeYear=true'>{{rank.year}}</span>
                            <span v-if='rank.pickerDefault=="月度"' @click='rank.datetimeMonth=true'>{{rank.year}} - {{rank.month>9?rank.month:"0"+rank.month}}</span>
                            <img src='@/assets/img/pullNew/spreadMan/myIncome/down.png'  v-if='stateSkin!="dark"'>
                            <img src='@/assets/img/pullNew/spreadMan/myIncome/down_dark.png'  v-if='stateSkin=="dark"'>
                        </div>
                    </div>
                    <div class='list_box' v-if='!isEmpty(rank.data.list) && rank.isHas'>
                        <div class='list_tit_all'>
                            <p>排名</p>
                            <p>团员</p>
                            <p>激活人数</p>
                            <p>拉新奖励</p>
                        </div>
                    </div>
                </div>
                <div class='con_list' v-show='tabIndex==2'>
                    <div class='con_list_tit'>提成记录</div>
                    <div class='date'>
                        <div class='title date_list'>
                            <span @click='commission.picker = true'>{{commission.pickerDefault}}</span>
                            <img src='@/assets/img/pullNew/spreadMan/myIncome/down.png' v-if='stateSkin!="dark"'>
                            <img src='@/assets/img/pullNew/spreadMan/myIncome/down_dark.png'  v-if='stateSkin=="dark"'>
                        </div>
                        <div class='time date_list' v-if='commission.pickerDefault!="累计"'>
                            <span v-if='commission.pickerDefault=="年度"' @click='commission.datetimeYear=true'>{{commission.year}}</span>
                            <span v-if='commission.pickerDefault=="月度"' @click='commission.datetimeMonth=true'>{{commission.year}} - {{commission.month>9?commission.month:"0"+commission.month}}</span>
                            <img src='@/assets/img/pullNew/spreadMan/myIncome/down.png'  v-if='stateSkin!="dark"'>
                            <img src='@/assets/img/pullNew/spreadMan/myIncome/down_dark.png'  v-if='stateSkin=="dark"'>
                        </div>
                    </div>
                    <div class='tip' v-if='!isEmpty(commission.list) && commission.isHas'>提成 {{priceTransition(commission.data.search_second_income_cash).integer}}.{{priceTransition(commission.data.search_second_income_cash).decimal}}</div>
                </div>
            </div>
        </div> 

        <div class='con' :style='"padding-top:"+(tabIndex==0?"17.1":(tabIndex==1?"23.2":"24"))+"rem"'>
            <div class='con_list member_list' v-show='tabIndex==0'>
                <div class='list_box' v-if='!isEmpty(member.data.list) && member.isHas'>
                    <div class='list' v-for='(item, index) in member.data.list' :key='index'>
                        <img :src='item.avatar' class='avt'>
                        <div :class='["list_right",{"list_right_last":index==member.data.list.length-1}]'>
                            <p class='list_tit'><i class='text_ellipsis'>{{item.name}}</i>({{item.phone}})<span></span></p>
                            <p class='list_time'>加入时间 {{item.gmt_create}}</p>
                        </div>
                    </div>
                </div>
                <div class='none' v-if='isEmpty(member.data.list) && member.isHas'>
                    <div class='none_con'>
                        <p></p>
                        <div>暂无团员</div>
                        <div class='none_btn' @click='recruit'>立即招募</div>
                    </div>
                </div>
            </div>

            <div class='con_list rank_list' v-show='tabIndex==1'>
                <div class='list_box' v-if='!isEmpty(rank.data.list) && rank.isHas'>
                    <div :class='["list", {"list_del":item.is_delete==1}]' v-for='(item, index) in rank.data.list' :key='index'>
                        <div class='list_grade'>
                            <img src='@/assets/img/pullNew/spreadMan/memberIncome/one.png' v-if='item.rank_no==1'>
                            <img src='@/assets/img/pullNew/spreadMan/memberIncome/two.png' v-if='item.rank_no==2'>
                            <img src='@/assets/img/pullNew/spreadMan/memberIncome/three.png' v-if='item.rank_no==3'>
                            <span v-if='item.rank_no>3'>{{item.rank_no}}</span>
                        </div>
                        <div class='list_mem'>
                            <img :src='item.avatar' class='list_mem_avt'>
                            <img src='@/assets/img/pullNew/spreadMan/memberIncome/dele.png' class='list_mem_logo' v-if='item.is_delete==1'>
                            <div class='list_mem_info'>
                                <p class='list_mem_info_name text_ellipsis'>{{item.name}}</p>
                                <p class='list_mem_info_phone'>{{item.phone}}</p>
                            </div>
                        </div>
                        <div class='list_num'>{{item.activate_num}}人</div>
                        <div class='list_award'>{{priceTransition(item.first_income_cash).integer}}<span>.{{priceTransition(item.first_income_cash).decimal}}</span></div>
                    </div> 
                </div>
                <div :class='["none", {"no_btn":member.data.member_count>0}]' v-if='isEmpty(rank.data.list) && rank.isHas'>
                    <div class='none_con'>
                        <p></p>
                        <div>暂无团员排行榜</div>
                        <div class='none_btn' @click='recruit' v-if='member.data.member_count<=0'>立即招募</div>
                    </div>
                </div>
            </div>

            <div class='con_list commission_list' v-show='tabIndex==2'>
                <div v-if='!isEmpty(commission.list) && commission.isHas'>
                    <van-list
                        v-model='commission.loading'
                        :finished='commission.finished'
                        :error.sync='commission.error'
                        finished-text="-没有更多内容-"
                        error-text='请求失败，点击重新加载'
                        @load='initCommis'
                    >
                        <div class='list_box'>
                            <div class='list' v-for='(item, index) in commission.list' :key='index'>
                                <img :src='item.avatar' class='type_img'>
                                <div :class='["list_right",{"list_right_last":index==commission.list.length-1}]'>
                                    <p class='list_tit'><span class='text_ellipsis'>{{item.name}}</span>（{{item.phone}}）</p>
                                    <p class='list_tit'>{{item.invite_text}}</p>
                                    <p class='list_time'>{{item.activate_time}}</p>
                                    <div :class='["list_money", {"list_money_un":item.cash_status==3},{"list_money_pre":item.cash_status==1}]'>+{{priceTransition(item.second_income_cash).integer}}.{{priceTransition(item.second_income_cash).decimal}}</div>
                                    <img class='list_status' v-if='item.cash_status==1' src='@/assets/img/pullNew/spreadMan/totalIncome/status_guess.png'>
                                    <img class='list_status' v-if='item.cash_status==3' src='@/assets/img/pullNew/spreadMan/totalIncome/status_unvalid.png'>
                                </div>
                            </div>
                        </div>
                    </van-list>
                </div>
                <div class='none no_btn' v-if='isEmpty(commission.list)&& commission.isHas'>
                    <div class='none_con'>
                        <p></p>
                        <div>暂无记录</div>
                    </div>
                </div>

            </div>

        </div>   

        <!-- 排行 -->
        <md-picker :show.sync='rank.picker' :datas='time.type' :default='rank.pickerDefault' @confirm='pickerConfirm'></md-picker>

        <md-datetime :show.sync='rank.datetimeYear' type='year' @confirm='datetimeConfirm'
            :start='time.startYear' :end='time.endYear' :default='rank.year'>
        </md-datetime>

        <md-datetime :show.sync='rank.datetimeMonth' type='year-month' @confirm='datetimeConfirm'
            :start='`${time.startYear}-${time.startMonth}`' :end='`${time.endYear}-${time.endMonth}`' :default='`${rank.year}-${rank.month}`'>
        </md-datetime>

        <!-- 提成 -->
        <md-picker :show.sync='commission.picker' :datas='time.type' :default='commission.pickerDefault' @confirm='pickerConfirm'></md-picker>

        <md-datetime :show.sync='commission.datetimeYear' type='year' @confirm='datetimeConfirm'
            :start='time.startYear' :end='time.endYear' :default='commission.year'>
        </md-datetime>

        <md-datetime :show.sync='commission.datetimeMonth' type='year-month' @confirm='datetimeConfirm'
            :start='`${time.startYear}-${time.startMonth}`' :end='`${time.endYear}-${time.endMonth}`' :default='`${commission.year}-${commission.month}`'>
        </md-datetime>

    </div>
</template>

<script lang='ts'>
    import {Component, Vue } from 'vue-property-decorator'
    import {mdPicker, mdDatetime, mdHead} from '@/components'
    import {isEmpty, priceTransitionYuanFen} from '@/utils/common'
    import {getHeadTop} from '@/utils/app'

    import {PullRefresh, List} from 'vant'
    import 'vant/lib/list/style'
    import 'vant/lib/pull-refresh/style'
    Vue.use(PullRefresh).use(List)
    import {State} from 'vuex-class'

    @Component({
        components: {
            mdPicker, 
            mdDatetime,
            mdHead
        }
    })
    export default class spreadMember extends Vue {
        private top = getHeadTop()
        private tabIndex:number = 1
        private isHas:boolean = false

        private member:any = {  //全部
            data: {
                list:[]
            },
            isHas: false,
        }
        private time = {
            type: ['累计', '年度', '月度'],
            startYear: 2021,
            endYear: (new Date()).getFullYear(),
            startMonth: 2,
            endMonth: Number((new Date()).getMonth())+1
        }
        private rank:any = {  //拉新排行
            picker: false,
            datetimeYear: false,
            datetimeMonth: false,
            pickerDefault: '月度',
            year: (new Date()).getFullYear(),
            month: Number((new Date()).getMonth())+1,
            data: {
                list:[]
            },
            isHas: false,
        }
        private commission:any = {  //拉新提成
            picker: false,
            datetimeYear: false,
            datetimeMonth: false,
            pickerDefault: '月度',
            year: (new Date()).getFullYear(),
            month: Number((new Date()).getMonth())+1,
            data: {},
            list: [],
            loading: false,
            finished: false,
            error: false,
            isHas: false,
            page: 1
        }

        private isEmpty = isEmpty
        private priceTransition = priceTransitionYuanFen
        

        mounted() {
            this.initTime()
            this.initMember()
            this.initRank()
            this.initCommis()
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
                        this.time.startYear = year
                        this.time.startMonth = Number(res.data.time.split('-')[1])
                    } else {
                        this.time.startYear = 2021
                        this.time.startMonth = 2
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
            if(this.tabIndex == 1) {
                this.rank.pickerDefault = data
                if(this.rank.pickerDefault == '月度') {
                    if(this.time.startYear == this.rank.year && this.rank.month<this.time.startMonth) {
                        this.rank.month = this.time.startMonth
                    }
                }
            } else if(this.tabIndex == 2){
                this.commission.pickerDefault = data
                if(this.commission.pickerDefault == '月度') {
                    if(this.time.startYear == this.commission.year && this.commission.month<this.time.startMonth) {
                        this.commission.month = this.time.startMonth
                    }
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
            if(this.tabIndex == 1) {
                if(this.rank.pickerDefault == '年度') {
                    this.rank.year = data.year
                } else {
                    this.rank.year = data.year
                    this.rank.month = data.month
                }
            } else if(this.tabIndex == 2){
                if(this.commission.pickerDefault == '年度') {
                    this.commission.year = data.year
                } else {
                    this.commission.year = data.year
                    this.commission.month = data.month
                }
            }
            this.onRefresh()
        }
        /**
         * 初始化团员
         * @param 
         * @return
         */
        initMember() {
            (this as any).$axios.post(`${(this as any).$request.live}/pull/rec/member-list`, {
                page: this.member.page,
            }).then((res: any) => {
                if (res.code == 200) {
                    this.member.data = res.data
                }
                this.member.isHas = true
            })
        }
        /**
         * 初始化排行
         * @param 
         * @return
         */
        initRank() {
            let param = {
                year: 0,
                month: 0
            }
            if(this.rank.pickerDefault == '年度') {
                param.year = this.rank.year
            }
            if(this.rank.pickerDefault == '月度') {
                param.year = this.rank.year
                param.month = this.rank.month
            } 
            ;(this as any).$axios.post(`${(this as any).$request.live}/pull/rec/member-rank`, param).then((res: any) => {
                if (res.code == 200) {
                    this.rank.data = res.data
                }
                this.rank.isHas = true
            })
        }
        /**
         * 初始化提成
         * @param 
         * @return
         */
        initCommis() {
            let param = {
                page: this.commission.page,
                year: 0,
                month: 0
            }
            if(this.commission.pickerDefault == '年度') {
                param.year = this.commission.year
            }
            if(this.commission.pickerDefault == '月度') {
                param.year = this.commission.year
                param.month = this.commission.month
            } 
            ;(this as any).$axios.post(`${(this as any).$request.live}/pull/rec/member-invite`, param).then((res: any) => {
                if (res.code == 200) {
                    let data = res.data
                    this.commission.data = data
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
            this.commission.loading = false
            this.commission.finished = false
            this.commission.error = false
            this.commission.isHas = false
            this.commission.page = 1

            this.initMember()
            this.initRank()
            this.initCommis()
        }

        /**
         * 跳转拉新大使
         * @param 
         * @return
         */
        recruit() {
            this.$router.push(`./inviteNew?referral_code=${this.$route.query.referral_code}`)
        }
        
        @State('skin') stateSkin: any
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
    #member {
        padding-top: 2rem;
        height: 100vh;
        background: url('../../../assets/img/pullNew/spreadMan/myIncome/bg.png') no-repeat 100%;
        background-size: 100%;
        background-position: 0 0;
        background-color: #26C2C4;
    }

    .none {
        position: relative;
        height: 100%;
        text-align: center;
        .none_con {
            position: absolute;
            top: 0; bottom: 0; left: 0; right: 0;
            margin: auto;
            height: 28rem;
            p {
                width: 15rem; height: 10.9rem;
                margin: auto;
                background: url('../../../assets/img/pullNew/spreadMan/myIncome/none.png') no-repeat 0;
                background-size: 100%;
            }
            div:nth-of-type(1) {
                margin-top: 1.6rem;
                height: 2rem;
                line-height: 2rem;
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
    }
    .no_btn {
        .none_con {
            height: 17rem;
        }
    }

    .top {
        position: fixed;
        top: 0; left: 0;
        width: 100%; 
        background: url('../../../assets/img/pullNew/spreadMan/myIncome/bg.png') no-repeat 100%;
        background-size: 100%;
        background-position: 0 0;
        z-index: 1;
    }

    .top_total {
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
        }
        .list_data_act::after {
            display: block;
            content: '';
            width: 1.7rem; height: 1rem;
            position: absolute;
            bottom: -1px; left: 0; right: 0;
            margin: auto;
            background: url('../../../assets/img/pullNew/spreadMan/memberIncome/tab.png') no-repeat 100%;
            background-size: 100%;
            background-position: 0 0;
        }
    }
    .top_con {
        position: relative;
        padding: 1.6rem  0 0 0;  margin-top: -1px;
        background-color: #fff;
        border-radius: 1rem 1rem 0 0 ;
        z-index: 1;
        .con_list_tit {
            height: 2rem;
            line-height: 2rem; text-align: center;
            font-size: 1.4rem; font-weight: bold;
        }
        .con_list {
            position: relative;
            .date {
                position: relative;
                padding-left: 1.1rem; margin-top: 2rem;
                height: 2rem;
                display: flex;
                align-items: center;
                .date_list {
                    position: relative;
                    margin-right: 2.2rem;
                    height: 2rem;
                    display: flex;
                    align-items: center;
                    span {
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
        }
        .tip {
            position: relative;
            padding:  0 0 1rem 1.2rem; margin-top: 0.8rem;
            height: 1.7rem;
            line-height: 1.7rem;
            font-size: 1.2rem; color: #999;
            box-sizing: content-box;
            span {
                margin: 0 1.9rem 0 0.4rem;
                font-size: 1.2rem; color: #999;
            }
        }
        .member_list {
            .con_list_tit {
                margin-bottom: 0.6rem;
            }
        }
    }
    .con {
        position: relative;
        height: 100%; 
        background-color: #fff;
        z-index: 0;
        .con_list {
            position: relative;
            height: 100%;
            background-color: #fff;
        }
        .list_box {
            position: relative;
            min-height: 100%;
            .list {
                position: relative;
                padding-left: 1.2rem;
                .type_img {
                    position: absolute;
                    top: 1.6rem; left: 1.2rem;
                    width: 3.4rem; height: 3.4rem;
                    border-radius: 50%;
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
                        top: 1.4rem; right: 1.2rem;
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
                        top: 3.6rem; right: 1.2rem;
                        width: 3.4rem; height: 1.8rem;
                    }
                }
                .list_right_last {
                    border-bottom: none;
                }
            }
        }
    }

    
    .member_list {
        .list_box {
            .list {
                margin: 0 1.2rem; padding-left: 0;
                border-bottom: 1px solid rgba(244,244,244,0.6);
                .avt {
                    position: absolute;
                    top: 1.6rem; left: 0;
                    width: 3.2rem; height: 3.2rem;
                    border-radius: 50%;
                }
                .list_right {
                    border-bottom: none;
                    .list_tit { 
                        position: relative;
                        width: 100%; height: 1.8rem;
                        white-space: nowrap;
                        display: flex;
                        align-items: center;
                        i {
                            display: inline-block;
                            margin-right: 0.8rem;
                            max-width: 14.3rem;
                            font-style: normal;
                            vertical-align: middle;
                        }
                        span {
                            display: inline-block;
                            margin: auto  0 auto 0.8rem;
                            width: 5rem; height: 1.6rem;
                            background: url('../../../assets/img/pullNew/spreadMan/memberIncome/logo.png') no-repeat 0 0; 
                            background-size: 100% 100%;
                        }
                    }  
                }
            }
        }
        .none {
            p {
                width: 15rem; height: 14.4rem;
                background-image: url('../../../assets/img/pullNew/spreadMan/memberIncome/none_member.png'); 
            }
        }
    }

    .rank_list{
        .list_box {
            margin-top: 1.6rem;
            .list_tit_all {
                display: flex;
                align-items: center; justify-content: space-between;
                margin: 0 1.2rem;
                height: 1.8rem;
                p {
                    font-size: 1.3rem; color: #666;
                }
                p:nth-of-type(1) {
                    width: 2.6rem;
                }
                p:nth-of-type(2) {
                    width: 10.6rem;
                    text-align: center;
                }
                p:nth-of-type(3), p:nth-of-type(4) {
                    width: 5.2rem;
                    text-align: center;
                }
            }
            .list {
                position: relative;
                display: flex;
                align-items: center; justify-content: space-between;
                margin: 0 1.2rem; padding: 0;
                height: 6.1rem;
                border-bottom: 1px solid #f4f4f4;
                .list_grade {
                    width: 2.8rem; height: 2.8rem;
                    text-align: center;
                    img {
                        display: block;
                        margin: auto;
                        width: 2rem; height: 2.6rem;
                    }
                    span {
                        font-size: 1.4rem; color: #666;
                    }
                }
                .list_mem {
                    position: relative;
                    width: 10.6rem; height: 3.4rem;
                    .list_mem_avt {
                        position: absolute;
                        top: 0; left: 0;
                        width: 3.4rem; height: 3.4rem;
                        border-radius: 50%;
                    }
                    .list_mem_logo {
                        position: absolute;
                        top: 2.9rem; left: 0;
                        width: 3.2rem; height: 1.6rem;
                    }
                    .list_mem_info {
                        position: relative;
                        padding: 0.3rem 0 0 3.7rem;
                        .list_mem_info_name {
                            margin-bottom: 0.4rem;
                            height: 1.2rem;
                            line-height: 1.3rem;
                            font-size: 1.2rem;
                        }
                        .list_mem_info_phone {
                            line-height: 1;
                            font-size: 1.2rem; color: #666;
                        }
                    }
                }
                .list_num {
                    width: 5.2rem; height: 1.8rem;
                    text-align: center; line-height: 1.8rem;
                    font-size: 1.3rem;
                }
                .list_award {
                    width: 5.2rem; height: 2.2rem;
                    text-align: center; line-height: 2.2rem;
                    font-size: 1.6rem; color: #FF8F43; font-weight: bold;
                    span {
                        font-size: 1rem; color: #FF8F43; font-weight: normal;
                    }
                }
            }
            .list_del {
                height: 7.3rem;
            }
        }
        .none {
            p {
                background-image: url('../../../assets/img/pullNew/spreadMan/memberIncome/none_rank.png'); 
            }
        }
    }


    .dark#member {
        .header::before {
            display: block;
            content: '';
            width: 100%; height: 100%;
            background-color: rgba(0,0,0,0.4);
            position: absolute;
            top: 0; left: 0;
        }
        .list_data_act::after {
            background-image: url('../../../assets/img/pullNew/spreadMan/memberIncome/tab_dark.png');
        }
        .top::before {
            display: block;
            content: '';
            width: 100%; height: 100%;
            background-color: rgba(0,0,0,0.4);
            position: absolute;
            top: 0; left: 0;
        }
        .top_con {
            background-color: #0D101C;
            .con_list_tit {
                color: #E3E3E3;
            }
            .date_list {
                span {
                    color: #E3E3E3;
                }
            }
            .tip {
                color: #666;
            }
        }
        .con {
            background-color: #0D101C;
            .con_list {
                background-color: #0D101C;
                >div {
                    background-color: #0D101C;
                }
            }
            .list_box {
                background-color: #0D101C;
                .list {
                    .list_right {
                        border-color: #272A36;
                        .list_tit{
                            color: #E3E3E3;
                            i {
                                color: #E3E3E3;
                            }
                            span {
                                color: #E3E3E3;
                            }
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
        .none {
            p {
                background-image: url('../../../assets/img/pullNew/spreadMan/myIncome/none_dark.png');
            }
        }

        .member_list {
            .list_box {
                .list {
                    border-bottom: 1px solid #272A36;
                }
            }
            .none {
                p {
                    background-image: url('../../../assets/img/pullNew/spreadMan/memberIncome/none_member_dark.png'); 
                }
            }
        }

        .rank_list {
            .list_box {
                background-color: #0D101C;
                .list_tit_all {
                    p {
                        font-size: 1.3rem; color: #999;
                    }
                }
                .list {
                    border-bottom: 1px solid #272A36;
                    .list_grade {
                        span {
                            color: #999;
                        }
                    }
                    .list_mem {
                        .list_mem_info {
                            .list_mem_info_name {
                                color: #E3E3E3;
                            }
                            .list_mem_info_phone {
                                color: #999;
                            }
                        }
                    }
                    .list_num {
                        color: #E3E3E3;
                    }
                }
            }
            .none {
                p {
                    background-image: url('../../../assets/img/pullNew/spreadMan/memberIncome/none_rank_dark.png'); 
                }
            }
        }
    }

    
    .dark#member::before{
        display: block;
        content: '';
        width: 100%; height: 100%;
        background-color: rgba(0,0,0,0.4);
        position: absolute;
        top: 0; left: 0;
    }
</style>