<!-- 拉新大使-我的邀请奖励 -->
<template>
    <div id='my' :class='stateSkin' :style='"padding-top:"+top+"px"'>
        <md-head class='header' backIcon='backWhite' ref='header' :backMode='backMode'>
            <div class='question_btn' @click='popupShow = true'>
                <img src='@/assets/img/pullNew/spreadMan/myIncome/question.png'>
            </div>
        </md-head>

        <div class='top' ref='top' :style='"top:"+top+"px;"'>
            <div class='top_tab'>
                <p :class='["top_tab_list", {"top_tab_list_act":tabIndex==0}]' @click='changeTab(0)'>我的奖励</p>
                <p :class='["top_tab_list", {"top_tab_list_act":tabIndex==1}]' @click='changeTab(1)'>邀请记录</p>
            </div>
            <div class='tab_desc'>
                <div class='tab_desc_list reward' v-if='tabIndex==0'>
                    <div class='list_data'>
                        <p>本月奖励</p>
                        <p>{{priceTransition(awardData.data.month_cash).integer}}<span>.{{priceTransition(awardData.data.month_cash).decimal}}</span></p>
                        <img v-if='awardData.data.is_forecast==1' src='@/assets/img/pullNew/spreadMan/index/guess.png'>
                    </div>
                    <div class='list_data'>
                        <p>累计奖励</p>
                        <p>{{priceTransition(awardData.data.total_first_cash).integer}}<span>.{{priceTransition(awardData.data.total_first_cash).decimal}}</span></p>
                    </div>
                </div>
                <div :class='["rewardTip",{"rewardTip_un":isEmpty(awardData.data.reward_tips)}]' v-if='tabIndex==0'>{{awardData.data.reward_tips}}</div>
                <div class='tab_desc_list record' v-if='tabIndex==1'>
                    <div class='list_data'>
                        <p>本月激活</p>
                        <p>{{totalData.data.month_activate}}</p>
                    </div>
                    <div class='list_data'>
                        <p>累计激活</p>
                        <p>{{totalData.data.total_activate_num}}</p>
                    </div>
                    <div class='list_data'>
                        <p>累计邀请</p>
                        <p>{{totalData.data.total_invite}}</p>
                    </div>
                </div>
            </div>

            <div class='top_con'>
                <div class='my_profit con_list' v-show='tabIndex==0'>
                    <div class='date'>
                        <div class='title date_list'>
                            <span @click='awardData.picker = true'>{{awardData.pickerDefault}}</span>
                            <img src='@/assets/img/pullNew/spreadMan/myIncome/down.png' v-if='stateSkin!="dark"'>
                            <img src='@/assets/img/pullNew/spreadMan/myIncome/down_dark.png'  v-if='stateSkin=="dark"'>
                        </div>
                        <div class='time date_list' v-if='awardData.pickerDefault!="累计"'>
                            <span v-if='awardData.pickerDefault=="年度"' @click='awardData.datetimeYear=true'>{{awardData.year}}</span>
                            <span v-if='awardData.pickerDefault=="月度"' @click='awardData.datetimeMonth=true'>{{awardData.year}} - {{awardData.month>9?awardData.month:"0"+awardData.month}}</span>
                            <img src='@/assets/img/pullNew/spreadMan/myIncome/down.png'  v-if='stateSkin!="dark"'>
                            <img src='@/assets/img/pullNew/spreadMan/myIncome/down_dark.png'  v-if='stateSkin=="dark"'>
                        </div>
                    </div>
                    <div class='money' v-if='!isEmpty(awardData.list) && awardData.isHas'>奖励 {{priceTransition(awardData.data.search_first_cash).integer}}.{{priceTransition(awardData.data.search_first_cash).decimal}}</div>
                </div>
                <div class='invite_record con_list' v-show='tabIndex==1'>
                    <div class='date'>
                        <div class='title date_list'>
                            <span @click='recordData.picker = true'>{{recordData.pickerDefault}}</span>
                            <img src='@/assets/img/pullNew/spreadMan/myIncome/down.png' v-if='stateSkin!="dark"'>
                            <img src='@/assets/img/pullNew/spreadMan/myIncome/down_dark.png'  v-if='stateSkin=="dark"'>
                        </div>
                        <div class='time date_list' v-if='recordData.pickerDefault!="累计"'>
                            <span v-if='recordData.pickerDefault=="年度"' @click='recordData.datetimeYear=true'>{{recordData.year}}</span>
                            <span v-if='recordData.pickerDefault=="月度"' @click='recordData.datetimeMonth=true'>{{recordData.year}} - {{recordData.month>9?recordData.month:"0"+recordData.month}}</span>
                            <img src='@/assets/img/pullNew/spreadMan/myIncome/down.png' v-if='stateSkin!="dark"'>
                            <img src='@/assets/img/pullNew/spreadMan/myIncome/down_dark.png'  v-if='stateSkin=="dark"'>
                        </div>
                    </div>
                    <div class='record_tab'>
                        <p :class='{"record_tab_act":recordTabIndex==0}' @click='changeRecordTab(0)'>全部({{totalData.data.total_count}})</p>
                        <p :class='{"record_tab_act":recordTabIndex==1}' @click='changeRecordTab(1)'>已激活({{totalData.data.activate_num}})</p>
                        <p :class='{"record_tab_act":recordTabIndex==2}' @click='changeRecordTab(2)'>未激活({{totalData.data.un_activate_num}})</p>
                    </div>
                </div>
            </div>
        </div> 
        <div class='con' :style='"padding-top:"+(tabIndex==0?"24.9":"23.7")+"rem"'>
            <!-- 我的奖励 -->
            <div class='my_profit' v-show='tabIndex==0'>
                <div class='list_box' v-if='!isEmpty(awardData.list) && awardData.isHas'>
                    <van-list
                        v-model='awardData.loading'
                        :finished='awardData.finished'
                        :error.sync='awardData.error'
                        finished-text="-没有更多内容-"
                        error-text='请求失败，点击重新加载'
                        @load='initAward'
                    >
                        <div class='list' v-for='(item, index) in awardData.list' :key='index'>
                            <img :src='item.avatar' class='atr'>
                            <div :class='["list_right",{"list_right_last":index==awardData.list.length-1}]'>
                                <p>{{item.invite_text}}</p>
                                <p class='list_right_time'>{{item.activate_time}}</p>
                                <div :class='["list_money", {"list_money_un":item.cash_status==3},{"list_money_pre":item.cash_status==1}]'>+{{priceTransition(item.cash).integer}}.{{priceTransition(item.cash).decimal}}</div>
                                <img class='list_status' v-if='item.cash_status==1' src='@/assets/img/pullNew/spreadMan/totalIncome/status_guess.png'>
                                <img class='list_status' v-if='item.cash_status==3' src='@/assets/img/pullNew/spreadMan/totalIncome/status_unvalid.png'>
                            </div>
                        </div>
                    </van-list>
                </div>

                <div class='none' v-if='isEmpty(awardData.list) && awardData.isHas'>
                    <p></p>
                    <div>暂无记录</div>
                </div>
            </div>

            <!-- 邀请记录 -->
            <div class='invite_record' v-show='tabIndex==1'>
                <div class='list_box' ref='record'>
                    <div v-show='recordTabIndex==0'>
                        <div v-if='!isEmpty(totalData.list) && totalData.isHas' >
                            <van-list
                                v-model='totalData.loading'
                                :finished='totalData.finished'
                                :error.sync='totalData.error'
                                finished-text="-没有更多内容-"
                                error-text='请求失败，点击重新加载'
                                @load='initAll'
                            >
                                <div class='list' v-for='(item, index) in totalData.list' :key='index'>
                                    <img :src='item.avatar' class='atr'>
                                    <img src='@/assets/img/pullNew/spreadMan/myIncome/logo.png' class='logo' v-if='item.is_activate!=1'>
                                    <div :class='["list_right",{"list_right_last":index==totalData.list.length-1}]'>
                                        <p>{{item.name}}</p>
                                        <p>{{item.invite_text}}</p>
                                        <p class='list_right_time'>{{item.gmt_create}}</p>
                                        <img src='@/assets/img/pullNew/spreadMan/myIncome/remind.png' class='remind_btn' v-if='item.is_activate!=1 && item.is_remind!=1' @click='remind({index:index,uuid:item.uuid})'>
                                        <img src='@/assets/img/pullNew/spreadMan/myIncome/remind_has.png' class='remind_btn' v-if='item.is_activate!=1 && item.is_remind==1'>
                                    </div>
                                </div>
                            </van-list>
                        </div>
                        <div class='none' v-if='isEmpty(totalData.list) && totalData.isHas'>
                            <p></p>
                            <div>暂无记录</div>
                        </div>
                    </div>
                    <div v-show='recordTabIndex==1'>
                        <div v-if='!isEmpty(activeData.list) && activeData.isHas'>
                            <van-list
                                v-model='activeData.loading'
                                :finished='activeData.finished'
                                :error.sync='activeData.error'
                                finished-text="-没有更多内容-"
                                error-text='请求失败，点击重新加载'
                                @load='initActived'
                            >
                                <div class='list' v-for='(item, index) in activeData.list' :key='index'>
                                    <img :src='item.avatar' class='atr'>
                                    <img src='@/assets/img/pullNew/spreadMan/myIncome/logo.png' class='logo' v-if='item.is_activate!=1'>
                                    <div :class='["list_right",{"list_right_last":index==activeData.list.length-1}]'>
                                        <p>{{item.name}}</p>
                                        <p>{{item.invite_text}}</p>
                                        <p class='list_right_time'>{{item.gmt_create}}</p>
                                    </div>
                                </div>
                            </van-list>
                        </div>
                        <div class='none' v-if='isEmpty(activeData.list) && activeData.isHas'>
                            <p></p>
                            <div>暂无记录</div>
                        </div>
                    </div>
                    <div v-show='recordTabIndex==2'>
                        <div v-if='!isEmpty(noActiveData.list) && noActiveData.isHas'>
                            <van-list
                                v-model='noActiveData.loading'
                                :finished='noActiveData.finished'
                                :error.sync='noActiveData.error'
                                finished-text="-没有更多内容-"
                                error-text='请求失败，点击重新加载'
                                @load='initNoActived'
                            >
                                <div class='list' v-for='(item, index) in noActiveData.list' :key='index'>
                                    <img :src='item.avatar' class='atr'>
                                    <img src='@/assets/img/pullNew/spreadMan/myIncome/logo.png' class='logo' v-if='item.is_activate!=1'>
                                    <div :class='["list_right",{"list_right_last":index==noActiveData.list.length-1}]'>
                                        <p>{{item.name}}</p>
                                        <p>{{item.invite_text}}</p>
                                        <p class='list_right_time'>{{item.gmt_create}}</p>
                                        <img src='@/assets/img/pullNew/spreadMan/myIncome/remind.png' class='remind_btn' v-if='item.is_activate!=1 && item.is_remind!=1' @click='remind({index:index,uuid:item.uuid})'>
                                        <img src='@/assets/img/pullNew/spreadMan/myIncome/remind_has.png' class='remind_btn' v-if='item.is_activate!=1 && item.is_remind==1'>
                                    </div>
                                </div>
                            </van-list>
                        </div>
                        <div class='none' v-if='isEmpty(noActiveData.list) && noActiveData.isHas'>
                            <p></p>
                            <div>暂无记录</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
                

        <md-toast :show.sync='toastShow' type='success' content='已提醒'></md-toast>
        <md-popup :show.sync='popupShow'>
            <div class='pop_desc'>
                <div class='pop_desc_title'>邀请奖励说明</div>
                <div class='pop_desc_box'>
                    <p class='pop_desc_item_tit'>累计邀请</p>
                    <p class='pop_desc_item_desc'>通过您分享的二维码或活动链接成功领取新人礼包的新用户总数。</p>
                    <p class='pop_desc_item_tit'>累计激活</p>
                    <p class='pop_desc_item_desc'>领取新人礼包后下载App并登录激活账号的新用户总数。</p>
                    <p class='pop_desc_item_tit'>累计奖励</p>
                    <p class='pop_desc_item_desc'>您成功邀请新用户激活App后，您获得的奖励总额。</p>
                    <p class='pop_desc_item_tit'>已激活</p>
                    <p class='pop_desc_item_desc'>领取新人礼包后，下载App并登录激活账号的新用户状态。</p>
                    <p class='pop_desc_item_tit'>未激活</p>
                    <p class='pop_desc_item_desc'>领取新人礼包后，未下载App或下载App但未登录激活账号的新用户状态。</p>
                    <p class='pop_desc_item_tit'>失效状态</p>
                    <p class='pop_desc_item_desc'>当月邀请注册用户未满奖励基数，下月自动失效。</p>
                    <p class='pop_desc_item_tit'>预估状态</p>
                    <p class='pop_desc_item_desc'>当月邀请注册用户未满奖励基数，奖励金额为预估金额值。</p>
                </div>
            </div>
        </md-popup>
        <md-toast :show.sync='errorShow' :content='tip'></md-toast>

        <!-- 奖励 -->
        <md-picker :show.sync='awardData.picker' :datas='time.type' :default='awardData.pickerDefault' @confirm='pickerConfirm'></md-picker>

        <md-datetime :show.sync='awardData.datetimeYear' type='year' @confirm='datetimeConfirm'
            :start='time.startYear' :end='time.endYear' :default='awardData.year'>
        </md-datetime>

        <md-datetime :show.sync='awardData.datetimeMonth' type='year-month' @confirm='datetimeConfirm'
            :start='`${time.startYear}-${time.startMonth}`' :end='`${time.endYear}-${time.endMonth}`' :default='`${awardData.year}-${awardData.month}`'>
        </md-datetime>

        <!-- 记录 -->
        <md-picker :show.sync='recordData.picker' :datas='time.type' :default='recordData.pickerDefault' @confirm='pickerConfirm'></md-picker>

        <md-datetime :show.sync='recordData.datetimeYear' type='year' @confirm='datetimeConfirm'
            :start='time.startYear' :end='time.endYear' :default='recordData.year'>
        </md-datetime>

        <md-datetime :show.sync='recordData.datetimeMonth' type='year-month' @confirm='datetimeConfirm'
            :start='`${time.startYear}-${time.startMonth}`' :end='`${time.endYear}-${time.endMonth}`' :default='`${recordData.year}-${recordData.month}`'>
        </md-datetime>
    </div>
</template>

<script lang='ts'>
    import {Component, Vue } from 'vue-property-decorator'
    import {mdToast, mdPopup, mdPicker, mdDatetime, mdHead} from '@/components'
    import {State} from 'vuex-class'

    import {isEmpty, priceTransitionYuanFen } from '@/utils/common'
    import {getHeadTop} from '@/utils/app'

    import {List} from 'vant'
    import 'vant/lib/list/style'
    Vue.use(List)

    interface remindParam {
        index: number,
        uuid: string
    }
    
    @Component({
        components: {
            mdToast,
            mdPopup,
            mdPicker, 
            mdDatetime,
            mdHead
        }
    })
    export default class inviteMy extends Vue {
        private top = getHeadTop()
        private toastShow:boolean =  false
        private popupShow: boolean = false
        private errorShow:boolean =  false
        private tip:string = ''

        private tabIndex:number = 0

        private recordTabIndex:number = 0

        private time = {
            type: ['累计', '年度', '月度'],
            startYear: 2021,
            endYear: (new Date()).getFullYear(),
            startMonth: 2,
            endMonth: Number((new Date()).getMonth())+1
        }

        private awardData:any = { 
            picker: false,
            datetimeYear: false,
            datetimeMonth: false,
            pickerDefault: '月度',
            year: (new Date()).getFullYear(),
            month: Number((new Date()).getMonth())+1,
            list: [],
            data: {},
            loading: false,
            finished: false,
            error: false,
            isHas: false,
            page: 1
        }

        private recordData = {
            picker: false,
            datetimeYear: false,
            datetimeMonth: false,
            pickerDefault: '月度',
            year: (new Date()).getFullYear(),
            month: Number((new Date()).getMonth())+1,
        }

        private totalData:any = {  //全部
            data: {},
            list: [],
            loading: false,
            finished: false,
            error: false,
            page: 1
        }
        private activeData:any = {  //已激活
            list: [],
            loading: false,
            finished: false,
            error: false,
            isHas: false,
            page: 1
        }
        private noActiveData:any = {  //未激活
            list: [],
            loading: false,
            finished: false,
            error: false,
            isHas: false,
            page: 1
        }

        private isEmpty = isEmpty
        private priceTransition = priceTransitionYuanFen
        private backMode:string = 'close'

        mounted() {
            if (this.$route.query.from != 'activity') { //不是活动页跳转
                this.backMode = 'close'
            } else {
                this.backMode = 'back'
            }
            this.initTime()
            this.initAward()
            this.initAll()
            this.initActived()
            this.initNoActived()
        }

        @State('skin') stateSkin: any

        /**
         * 初始化时间-拉新活动开始时间为2021-2，如果用户在拉新活动开始时间前有记录，设时间为2021-2，在拉新开始后，取其真正时间
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
         * 切换tab - 我的奖励/邀请记录
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
            //我的奖励-切换年度/月度
            if(this.tabIndex == 0) {
                this.awardData.pickerDefault = data
                if(this.awardData.pickerDefault == '月度') {
                    if(this.time.startYear == this.recordData.year && this.awardData.month<this.time.startMonth) {
                        this.awardData.month = this.time.startMonth
                    }
                }
            } else {
                //邀请记录-切换年度/月度
                this.recordData.pickerDefault = data
                if(this.recordData.pickerDefault == '月度') {
                    if(this.time.startYear == this.recordData.year && this.recordData.month<this.time.startMonth) {
                        this.recordData.month = this.time.startMonth
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
            //我的奖励
            if(this.tabIndex == 0) {
                if(this.awardData.pickerDefault == '年度') {
                    this.awardData.year = data.year
                } else {
                    this.awardData.year = data.year
                    this.awardData.month = data.month
                }
            } else {
                //邀请记录
                if(this.recordData.pickerDefault == '年度') {
                    this.recordData.year = data.year
                } else {
                    this.recordData.year = data.year
                    this.recordData.month = data.month
                }
            }
            this.onRefresh()
        }
        /**
         * 初始化我的奖励
         * @param 
         * @return
         */
        initAward() {
            let param = {
                page: this.awardData.page,
                year: 0,
                month: 0
            }
            if(this.awardData.pickerDefault == '年度') {
                param.year = this.awardData.year
            }
            if(this.awardData.pickerDefault == '月度') {
                param.year = this.awardData.year
                param.month = this.awardData.month
            } 
            ;(this as any).$axios.post(`${(this as any).$request.live}/pull/invite/my-reward`, param).then((res: any) => {
                if (res.code == 200) {
                    let data = res.data
                    if(this.awardData.page==1) {
                        this.awardData.data = data
                    }
                    this.awardData.list = (this.awardData.page==1)?data.list:this.awardData.list.concat(data.list)
                }
                this.awardData.isHas = true
                this.awardData.loading = false
                if(res.data.is_last_page==1) {
                    this.awardData.finished = true
                }
                this.awardData.page++
            })
        }
        /**
         * 初始化全部
         * @param 
         * @return
         */
        initAll() {
            let param = {
                page: this.totalData.page,
                type: 0,
                year: 0,
                month: 0
            }
            if(this.recordData.pickerDefault == '年度') {
                param.year = this.recordData.year
            }
            if(this.recordData.pickerDefault == '月度') {
                param.year = this.recordData.year
                param.month = this.recordData.month
            } 
            ;(this as any).$axios.post(`${(this as any).$request.live}/pull/invite/my-invite`, param).then((res: any) => {
                if (res.code == 200) {
                    let data = res.data
                    if(this.totalData.page==1) {
                        this.totalData.data = data
                    }
                    
                    this.totalData.list = (this.totalData.page==1)?data.list:this.totalData.list.concat(data.list)
                }
                this.totalData.isHas = true
                this.totalData.loading = false
                if(res.data.is_last_page==1) {
                    this.totalData.finished = true
                }
                this.totalData.page++
            })
        }
        /**
         * 初始化已激活
         * @param 
         * @return
         */
        initActived() {
            let param = {
                page: this.activeData.page,
                type: 1,
                year: 0,
                month: 0
            }
            if(this.recordData.pickerDefault == '年度') {
                param.year = this.recordData.year
            }
            if(this.recordData.pickerDefault == '月度') {
                param.year = this.recordData.year
                param.month = this.recordData.month
            } 
            (this as any).$axios.post(`${(this as any).$request.live}/pull/invite/my-invite`, param).then((res: any) => {
                if (res.code == 200) {
                    let data = res.data
                    this.activeData.list = (this.activeData.page==1)?data.list:this.activeData.list.concat(data.list)
                }
                this.activeData.isHas = true
                this.activeData.loading = false
                if(res.data.is_last_page==1) {
                    this.activeData.finished = true
                }
                this.activeData.page++
            })
        }
        /**
         * 初始化未激活
         * @param 
         * @return
         */
        initNoActived() {
            let param = {
                page: this.noActiveData.page,
                type: 2,
                year: 0,
                month: 0
            }
            if(this.recordData.pickerDefault == '年度') {
                param.year = this.recordData.year
            }
            if(this.recordData.pickerDefault == '月度') {
                param.year = this.recordData.year
                param.month = this.recordData.month
            } 
            (this as any).$axios.post(`${(this as any).$request.live}/pull/invite/my-invite`, param).then((res: any) => {
                if (res.code == 200) {
                    let data = res.data
                    this.noActiveData.list = (this.noActiveData.page==1)?data.list:this.noActiveData.list.concat(data.list)
                }
                this.noActiveData.isHas = true
                this.noActiveData.loading = false
                if(res.data.is_last_page==1) {
                    this.noActiveData.finished = true
                }
                this.noActiveData.page++
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
                        this.totalData.list[param.index].is_remind = 1
                        this.noActiveData.loading = false
                        this.noActiveData.finished = true
                        this.noActiveData.error = false
                        this.noActiveData.page = 1
                        this.initNoActived()
                    } else if(this.recordTabIndex == 2) {
                        this.noActiveData.list[param.index].is_remind = 1
                        this.totalData.loading = false
                        this.totalData.finished = true
                        this.totalData.error = false
                        this.totalData.page = 1
                        this.initAll()
                    }
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
            ;(this.$refs.record as any).scrollTo(0,0)
        }

        /**
         * 下拉刷新
         * @param 
         * @return
         */
        onRefresh() {
            this.awardData.loading = false
            this.awardData.finished = false
            this.awardData.error = false
            this.awardData.isHas = false
            this.awardData.page = 1

            this.totalData.loading = false
            this.totalData.finished = false
            this.totalData.error = false
            this.totalData.isHas = false
            this.totalData.page = 1

            this.activeData.loading = false
            this.activeData.finished = false
            this.activeData.error = false
            this.activeData.isHas = false
            this.activeData.page = 1

            this.noActiveData.loading = false
            this.noActiveData.finished = false
            this.noActiveData.error = false
            this.noActiveData.isHas = false
            this.noActiveData.page = 1

            this.initAward()
            this.initAll()
            this.initActived()
            this.initNoActived()
        }
    }
</script>

<style lang='scss' scoped>
    .header{
        background: url('../../../assets/img/pullNew/spreadMan/myIncome/head_bg.png') no-repeat 0;
        background-size: 100% 100%;
        /deep/.title {
            color: #fff;
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
    #my {
        padding-top: 2rem;
        height: 100%;
        background-color: #26C2C4;
    }
    .top {
        position: fixed;
        top: 0; left: 0;
        padding-top: 4.4rem;
        width: 100%; 
        background: url('../../../assets/img/pullNew/spreadMan/myIncome/bg.png') no-repeat 100%;
        background-size: 100% 100%;
        background-position: 0 0;
        z-index: 1;
        .top_tab {
            position: relative;
            margin-top: 1.1rem;
            display: flex;
            justify-content: center;
            z-index: 1;
            .top_tab_list {
                width: 16rem; height: 3.2rem;
                line-height: 3.2rem; text-align: center;
                font-size: 1.5rem; color: #fff;
                border-radius: 0.4rem 0 0 0.4rem;
                background-color: #23ADAF;
            }
            .top_tab_list:nth-of-type(2) {
                border-radius: 0 0.4rem 0.4rem 0;
            }
            .top_tab_list_act {
                color: #26C2C4;
                background-color: rgba(255,255,255,0.9);
            }
        }
        .tab_desc_list {
            position: relative;
            margin-top: 2rem;
            display: flex;
            .list_data {
                position: relative;
                width: 50%;
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
                    bottom: 1.6rem; right: 4.4rem;
                    width: 2.6rem; height: 1.4rem;
                }
            }
        }
        .reward {
            height: 5.1rem;
            >div:nth-of-type(1)::after {
                display: block;
                content: '';
                width: 1px; height: 4rem;
                background: url('../../../assets/img/pullNew/spreadMan/myIncome/middle.png') no-repeat 100%;
                background-size: 100%;
                background-position: 0 0;
                position: absolute;
                top: 0; bottom: 0; right: 0;
                margin: auto;
            }
        }
        .rewardTip {
            margin-top: 0.6rem;
            height: 3rem;
            text-align: center; line-height: 2rem;
            color: #FFD582; background-color: rgba(28,143,144,0.49);
            font-size: 1.1rem;
        }
        .rewardTip_un {
            background-color: transparent;
        }
        .record {
            height: 6.7rem;
            .list_data {
                width: 33%;
            }
        }
    }
    .top_con {
        position: relative;
        padding: 1.6rem 0 0 0; margin-top: -1rem;
        background-color: #fff;
        border-radius: 1rem 1rem 0 0 ;
        z-index: 1;
        .con_list {
            position: relative;
            .date {
                position: relative;
                padding-left: 1.1rem;
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
        }
        .my_profit {
            position: relative;
            .money {
                position: relative;
                padding-left: 1.1rem; margin-top: 0.8rem;
                height: 1.7rem;
                line-height: 1.7rem;
                font-size: 1.2rem; color: #999;
            }
        }
        .invite_record {
            .record_tab {
                position: relative;
                padding: 1.2rem 0 1.3rem 0;
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
        }
    }
    
    .con {
        position: relative;
        min-height: 100%; 
        background-color: #fff;
        z-index: 0;
        .list_box {
            position: relative;
            min-height: 100%;
            .list {
                position: relative;
                padding-left: 1.2rem;
                height: 6.8rem;
                .atr {
                    position: absolute;
                    top: 1.4rem; left: 1.2rem;
                    width: 3.4rem; height: 3.4rem;
                    border-radius: 50%;
                }
                .list_right {
                    position: relative;
                    padding: 1.4rem 0 0 0; margin-left: 4rem;
                    height: 100%;
                    border-bottom: 1px solid #F4F4F4;
                    p {
                        height: 1.8rem; width: 23.5rem;
                        line-height: 1.8rem; 
                        font-size: 1.3rem; color: #666;
                    }
                    .list_right_time {
                        margin-top: 0.4rem;
                        height: 1.7rem; 
                        line-height: 1.7rem;
                        font-size: 1.2rem; color: #999;
                    }
                }
                .list_right_last {
                    border-bottom: none;
                }
            }
        }
        .my_profit {
            position: relative;
            .list_box {
                .list {
                    .list_right {
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
                            top: 3.4rem; right: 1.2rem;
                            width: 3.4rem; height: 1.8rem;
                        }
                    }
                }
            }
        }
        .invite_record {
            .list_box {
                .list {
                    height: 8.6rem;
                    .logo {
                        position: absolute;
                        top: 4.3rem; left: 1.2rem;
                        width: 3.2rem; height: 1.6rem;
                    }
                    .list_right {
                        height: 8.6rem;
                        p:nth-of-type(2) {
                            margin-top: 0.2rem;
                        }
                        .list_right_time {
                            margin-top: 0.2rem;
                        }
                        .remind_btn {
                            position: absolute;
                            top: 2.9rem; right: 1.2rem;
                            width: 6.8rem; height: 2.8rem;
                        }
                    }
                }
            }
        }
    }

    .none {
        margin-top: 14rem; padding-bottom: 8rem;
        text-align: center;
        p {
            width: 15rem; height: 10.9rem;
            margin: auto;
            background: url('../../../assets/img/pullNew/spreadMan/myIncome/none.png') no-repeat 0;
            background-size: 100% 100%;
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

    .dark {
        background-color: #0D101C;
        .top::before,.header::before {
            display: block;
            content: '';
            width: 100%; height: 100%;
            background-color: rgba(0,0,0,0.4);
            position: absolute;
            top: 0; left: 0;
        }
        .top_con {
            background-color: #0D101C;
            .date_list {
                span {
                    color: #E3E3E3;
                }
            }
            .record_tab {
                p {
                    color: #E3E3E3;
                }
            }
        }
        .con {
            background-color: #0D101C;
            .list_box {
                .list {
                    .list_right {
                        border-color: #272A36;
                        p{
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
                background-image: url('../../../assets/img/pullNew/spreadMan/myIncome/none_dark.png');
            }
        }
        .pop_desc {
            background-color: #0D101C;
            .pop_desc_title {
                color: #E3E3E3;
            }
            .pop_desc_box {
                .pop_desc_item_tit {
                    color: #E3E3E3;
                }
                .pop_desc_item_desc {
                    color: #999;
                }
            }
        }
    }
    .dark::before{
        display: block;
        content: '';
        width: 100%; height: 100%;
        background-color: rgba(0,0,0,0.4);
        position: absolute;
        top: 0; left: 0;
    }
</style>