<!-- 推广团长-主页 -->
<template>
    <div id='channel' ref='channel'>
        <img src='@/assets/img/recommend/channelMan/index/banner.png' class='top'>
        <img src='@/assets/img/sys/common/backbtn_white.png' @click='goBack' class='back_btn' :style='"top:"+top+"px"'>
        <p @click='goRule' class='rule_btn' :style='"top:"+top+"px"'>分享规则</p>
        <div class='content'>
            <div class='reward'>
                <div class='reward_item'>
                    <div class='reward_tit'>分享赏金</div>
                    <div class='reward_num'>
                        <span>¥</span>{{priceInteger(info.stat_info.max_sj_cash)}}<span class=''>/件</span>
                    </div>
                    <div class='reward_desc'>
                        <p>您成功分享商品</p>
                        <p>您可得赏金</p>
                    </div>
                </div>
                <div class='reward_item'>
                    <div class='reward_tit'>分享提成</div>
                    <div class='reward_num'>
                        <span>¥</span>{{priceInteger(info.stat_info.max_tc_cash)}}<span class=''>/件</span>
                    </div>
                    <div class='reward_desc'>
                        <p>团员成功分享商品，您可得提成 <span @click='goRecruit'>招募团员 ></span></p>
                    </div>
                </div>
            </div>

            <div class='profit'>
                <div class='profit_top'>
                    <div class='profit_top_tit'>我的分享收益</div>
                    <div class='profit_item'>
                        <div class='list'>
                            <p class='list_tit'>本月赏金</p>
                            <p class='list_num'>{{priceTransition(info.stat_info.month_sj_cash).integer}}<span>.{{priceTransition(info.stat_info.month_sj_cash).decimal}}</span></p>
                        </div>
                        <div class='list'>
                            <p class='list_tit'>本月提成</p>
                            <p class='list_num'>{{priceTransition(info.stat_info.month_tc_cash).integer}}<span>.{{priceTransition(info.stat_info.month_tc_cash).decimal}}</span></p>
                        </div>
                        <div class='list'>
                            <p class='list_tit'>累计收益</p>
                            <p class='list_num'>{{priceTransition(info.stat_info.total_income_cash).integer}}<span>.{{priceTransition(info.stat_info.total_income_cash).decimal}}</span></p>
                        </div>
                    </div>
                </div>
                <div class='profit_bot'>
                    <div class='btn_list' @click='goIncome()'>
                        <img src='@/assets/img/recommend/channelMan/index/p_1.png'>
                        <p>收益报表</p>
                    </div>
                    <div class='btn_list' @click='goMyAch()'>
                        <img src='@/assets/img/recommend/channelMan/index/p_2.png'>
                        <p>我的业绩</p>
                    </div>
                    <div class='btn_list' @click='goGroup()'>
                        <img src='@/assets/img/recommend/channelMan/index/p_3.png'>
                        <p>我的团队</p>
                    </div>
                    <div class='btn_list' @click='goMemberAch()'>
                        <img src='@/assets/img/recommend/channelMan/index/p_4.png'>
                        <p>团员业绩</p>
                    </div>
                </div>
            </div>

            <div class='activity' v-if='!isEmpty(info.event_info)'>
                <div :class='["act_type", {"act_pre":info.event_info.status=="1"}, {"act_loading":info.event_info.status=="2"}] '>
                    <div class='act_type_left'>
                        <p>{{info.event_info.status==1?"活动预告":"活动中"}}</p>
                        <p>{{info.event_info.name}}</p>
                    </div>
                    <div class='act_type_right'>
                        <p>{{info.event_info.status==1?"距离开始":"距离结束"}}</p>
                        <p><span>{{convertSeconds(info.event_info.left_time).h}}</span> : <span>{{convertSeconds(info.event_info.left_time).m}}</span> : <span>{{convertSeconds(info.event_info.left_time).s}}</span></p>
                    </div>
                </div>
                <div class='act_box'>
                    <p class='act_time'><span>活动时间：</span>{{info.event_info.start_date}} - {{info.event_info.end_date}}</p>
                    <p class='act_con'><span>活动内容：</span>{{info.event_info.content}}</p>
                </div>
            </div>

            <div class='goods' v-if='goods.isHas'>
                <div class='goods_tit'><span>//</span>分享商品<span>//</span></div>
                <van-list
                    v-model='goods.loading'
                    :finished='goods.finished'
                    finished-text=""
                    @load='initData'
                >
                    <div :class='["goods_list", {"goods_list_pre":item.is_event==1&info.event_info.status==1}]' v-for='(item,index) in goods.list' :key='index'>
                        <div class='goods_list_img'>
                            <img :src='item.product_image' >
                            <p class='goods_list_log' v-if='item.is_event==1'><span>活动价</span>¥{{priceInteger(item.product_event_cash)}}</p>
                        </div>
                        <div class='goods_list_box'>
                            <p class='goods_list_tit text_ellipsis'>{{item.product_name}}</p>
                            <p class='goods_list_gift' v-if='!isEmpty(item.product_zeng)'><img src='@/assets/img/recommend/goodsShare/gift.png'><span class='text_ellipsis'>{{item.product_zeng}}</span></p>
                            <div class='list_price'>
                                <p class='price_award'><span>赏金:</span>¥{{priceTransition(item.product_sj_cash).integer}}.{{priceTransition(item.product_sj_cash).decimal}}</p>
                                <p class='price_award'><span>提成:</span>¥{{priceTransition(item.product_tc_cash).integer}}.{{priceTransition(item.product_tc_cash).decimal}}</p>
                            </div>
                            <p class='list_price_rec' v-if='info.event_info.status=="2" && item.is_event==1'><span>活动价:</span>¥{{priceTransition(item.product_event_cash).integer}}.{{priceTransition(item.product_event_cash).decimal}}</p>
                            <p class='list_price_rec' v-else><span>分享价:</span>¥{{priceTransition(item.product_rec_cash).integer}}.{{priceTransition(item.product_rec_cash).decimal}}</p>
                            <p class='rec_btn' @click='goRecGoods(item.product_code,item.is_event,info.event_info.status=="2" && item.is_event==1?item.product_event_cash:item.product_rec_cash)'>立即分享</p>
                        </div>
                    </div>
                </van-list>
            </div>

            <div class='method' :style='tabIndex==1?"margin-bottom:10.4rem":""'>
                <div class='title_box'>
                    <div :class='["title_list", {"title_act":tabIndex==0}]' @click='changeTab(0)'>团员招募攻略</div>
                    <div :class='["title_list", {"title_act":tabIndex==1}]' @click='changeTab(1)'>商品分享攻略</div>
                </div>
                <div class='meth_con'>
                    <div class='meth_list' v-show='tabIndex==0'>
                        <p><span>1</span>分享申请推广大使活动链接或二维码给好友</p>
                        <p><span>2</span>好友点开链接或扫码进入活动页，申请成为推广大使</p>
                        <p><span>3</span>成为推广大使的团员成功分享商品，即可获得赏金提成至我的钱包</p>
                        <div class='recruit_btn bg_small' @click='goRecruit'>立即招募团员</div>
                    </div>
                    <div class='meth_list' v-show='tabIndex==1' >
                        <p><span>1</span>分享商品链接或商品码给客户</p>
                        <p><span>2</span>客户点开链接或扫码，在小程序中完成购买</p>
                        <p><span>3</span>客户确认收货7天后，赏金到账至我的钱包</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
    import {Component, Vue} from 'vue-property-decorator'
    import {isEmpty, priceTransitionYuanFen, priceInteger, convertSeconds} from '@/utils/common'
    import {closeWindow ,getHeadTop, goIncome, goMyAch, goGroup, goMemberAch} from '@/utils/app'

    import {List} from 'vant'
    import 'vant/lib/list/style'
    Vue.use(List)

    @Component({
        components: {
        }
    })
    export default class channelManIndex extends Vue {
        private top:any = getHeadTop()
        private tabIndex:number = 0
        private countInterval:any
        private info = {
            event_info: {
                status: 0
            },
            goods_info: {},
            stat_info: {}
        }
        private goods = {
            list: [],
            loading: false,
            isHas: false,
            finished: false,
            page: 1
        }

        private priceTransition = priceTransitionYuanFen
        private convertSeconds = convertSeconds
        private priceInteger = priceInteger
        private isEmpty = isEmpty
        private goIncome = goIncome
        private goMyAch = goMyAch
        private goGroup = goGroup
        private goMemberAch = goMemberAch

        private isHide:boolean = false

        activated() {
            this.initData()
            document.addEventListener("visibilitychange", () => { 
                if(document.hidden) {
                    this.isHide = true
                } else {
                    if(this.isHide) {
                        clearInterval(this.countInterval)
                        this.initData()
                        this.isHide = false
                    }
                }
            })
        }
        /**
         * 初始页面
         * @param 
         * @return
         */
        initData() {
           (this as any).$axios.post(`${(this as any).$request.rec}/rec/promotion-event/goods-list`, {
                page: this.goods.page
            }).then((res: any) => {
                if (res.code == 200) {
                    let data = res.data
                    if(this.goods.page==1) {
                        this.info = data
                    }
                    this.goods.list = (this.goods.page==1)?data.goods_info.list:this.goods.list.concat(data.goods_info.list)

                    if(!isEmpty(this.info.event_info)) {
                        this.initTimeCount()
                    }
                }
                this.goods.loading = false
                this.goods.isHas = true
                if(res.data.goods_info.is_last_page==1) {
                    this.goods.finished = true
                }
                this.goods.page++
            })
        }
        /**
            初始化倒计时
            @param
            @return
        */
        initTimeCount() {
            clearInterval(this.countInterval)
            const countSeconds = ()=> {
                if ((this as any).info.event_info.left_time == 0) {
                    clearInterval(this.countInterval)
                    return
                }
                (this as any).info.event_info.left_time--
                if ((this as any).info.event_info.left_time <= 0) {
                    clearInterval(this.countInterval)
                    setTimeout(()=> {
                        this.goods.page = 1
                        this.initData()
                    }, 1000)
                }
            }
            this.countInterval = setInterval(()=> {
                countSeconds()
            }, 1000)
            countSeconds()
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
            (this as any).$router.push(`./rule`)
        }
        /**
         * 跳转商品海报页
         * @param {string} code 商品code
         * @param {string} event_status 活动状态
         * @param {string} price 商品价格
         * @return 
         */
        goRecGoods(code:string,event_status:string,price: string) {
            this.$router.push(`./goodsShare?referral_code=${(this as any).info.referral_code}&goods_code=${code}&is_normal=${(this as any).info.event_info.status=="2" && event_status=="1"?0:1}&price=${price}`)
        }
        /**
         * 跳转招募团员
         * @param 
         * @return
         */
        goRecruit() {
            this.$router.push(`./recruit?referral_code=${(this as any).info.referral_code}`)
        }
    }
</script>

<style lang='scss' scoped>
    #channel {
        position: relative;
        min-height: 100vh; width: 100vw;
        background-color: #FFF3DE;
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
        background: rgba(255, 255, 255, 0.3);
        border-radius: 1.3rem 0px 0px 1.3rem;
    }
    .content {
        position: relative;
        padding: 0 1.2rem 4.6rem 1.2rem; 
        .reward {
            position: relative;
            margin-top: -10rem;
            display: flex;
            .reward_item {
                position: relative;
                padding-top: 1.2rem;
                width: 19rem; height: 18.1rem;
                background: url('../../../assets/img/recommend/channelMan/index/card.png') no-repeat 100%;
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
                        background: url('../../../assets/img/recommend/channelMan/index/height.png') no-repeat 100%;
                        background-size: 100%;
                        background-position: 0 0;
                        position: absolute;
                        top: -2.2rem; right: -1rem;
                    }
                }
                .reward_desc {
                    position: absolute;
                    bottom: 3.8rem; left: 0; right: 0;
                    margin: auto; 
                    height: 3.6rem; width: 13.6rem;
                    text-align: center;
                    p {
                        height: 1.8rem;
                        line-height: 1.8rem;
                        font-size: 1.2rem; color: #fff;
                        span {
                            font-size: 1.2rem; color: #FFDFA9;
                        }
                    }
                }
            }
            >div:nth-child(2) {
                .reward_desc {
                    p {
                        text-align: left;
                    }
                }
            }
        }
        .profit {
            position: relative;
            margin-top: -0.4rem;
            width: 100%; 
            background-color: #fff;
            border-radius: 0.8rem;
            .profit_top {
                position: relative;
                width: 100%; height: 11.4rem;
                background: url('../../../assets/img/recommend/channelMan/index/bg.png') no-repeat 100%;
                background-size: 100% 100%;
                background-position: 0 0;
                box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.04);
                .profit_top_tit {
                    position: relative;
                    margin:  0 auto 1.6rem auto;
                    width: 15.3rem; height: 3.2rem;
                    line-height: 3.2rem; text-align: center;
                    font-size: 1.6rem; font-weight: bold;
                    background: #F4F4F4;
                    border-radius: 0px 0px 1.2rem 1.2rem;
                }
                .profit_item {
                    position: relative;
                    padding: 0 1rem;
                    display: flex;
                    .list {
                        position: relative;
                        width: 33%;
                        text-align: center;
                        .list_num {
                            margin-top: 0.5rem;
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
                            font-size: 1.2rem; color: #999999;
                        }
                    }
                }
            }
            .profit_bot {
                position: relative;
                height: 8.5rem;
                display: flex;
                align-items: center;
                >.btn_list {
                    width: 25%;
                    text-align: center;
                    >img {
                        display: block;
                        margin: auto;
                        width: 2rem; height: 2rem;
                    }
                    >p {
                        margin-top: 0.8rem;
                        height: 1.6rem; 
                        line-height: 1.6rem;
                        font-size: 1.1rem;
                    }
                }
            }
        }
        .activity {
            position: relative;
            margin-top: 2rem;
            background-color: #fff;
            border-radius: 0.8rem;
            .act_type {
                position: relative;
                width: 100%; height: 3.7rem;
                border-radius: 0.8rem 0.8rem 0 0;
                .act_type_left {
                    position: relative;
                    height: 100%;
                    margin-left: 1.2rem;
                    display: flex; align-items: center;
                    >p:nth-child(1) {
                        margin-right: 0.6rem; padding: 0 0.4rem;
                        height: 2rem;
                        line-height: 2rem; text-align: center;
                        font-size: 1.1rem; color: #fff;
                        background-color: rgba(0,0,0,0.1);
                        border-radius: 3px;
                    }
                    >p:nth-child(2) {
                        width: 14rem;
                        font-size: 1.3rem; color: #fff; 
                    }
                }
                .act_type_right {
                    position: absolute;
                    top: 0; bottom: 0; right: 1.4rem;
                    margin: auto;
                    display: flex; align-items: center;
                    >p:nth-child(1) {
                        margin-right: 0.9rem;
                        font-size: 1.1rem; color: #fff;
                    }
                    >p:nth-child(2) {
                        font-size: 1rem; color: #fff;
                        >span {
                            width: 1.6rem; height: 1.6rem;
                            display: inline-flex; align-items: center; justify-content: center;
                            font-size: 1rem;
                            border-radius: 0.2rem;
                            background-color: rgba(255,255,255,0.75);
                        }
                    }
                }
            }
            .act_box {
                position: relative;
                padding: 0.8rem 1.2rem;
                p {
                    line-height: 1.6rem;
                    font-size: 1.1rem; color: #666;
                    >span {
                        font-size: 1.1rem;
                    }
                }
                >p:nth-child(2) {
                    margin-top: 0.6rem;
                }
            }
            .act_pre {
                background: linear-gradient(90deg, #7AE582 0%, #6EC575 100%);
                .act_type_right {
                    >p:nth-child(2) {
                        >span {
                            color: #70C977;
                        }
                    }
                }
            }
            .act_loading {
                background: linear-gradient(90deg, #FEA858 0%, #FC682B 100%);
                .act_type_right {
                    >p:nth-child(2) {
                        >span {
                            color: #FC6A2C;
                        }
                    }
                }
            }
        }
        .goods {
            position: relative;
            margin-top: 2rem; padding: 1.6rem 1rem 1.4rem 1.4rem;
            background-color: #fff;
            border-radius: 0.8rem;
            .goods_tit {
                height: 2.2rem;
                line-height: 2.2rem;
                text-align: center;
                font-size: 1.6rem; letter-spacing: 2px; font-weight: bold;
                span {
                    margin: 0 2rem;
                    font-size: 1.6rem; color: #FED1C5; letter-spacing: 2px;
                }
            }
            .goods_list {
                position: relative;
                margin-top: 2rem;
                .goods_list_img {
                    position: relative;
                    width: 12.6rem; height: 12.8rem;
                    background: linear-gradient(180deg, rgba(255, 153, 123, .5) 0%, rgba(255, 99, 86, .5) 100%);
                    border-radius: 0.9rem;
                    overflow: hidden;
                    img {
                        position: absolute;
                        top: 0; bottom: 0; left: 0; right: 0;
                        margin: auto;
                        width: 12.2rem; height: 12.4rem;
                        border-radius: 0.9rem;
                        background-color: #fff;
                    }
                    .goods_list_log {
                        position: absolute;
                        bottom: 0; left: 0;
                        width: 10.3rem; height: 2.7rem;
                        text-align: center; line-height: 2.7rem;
                        font-size: 1.2rem; color: #71480B;
                        border-radius: 0px 1.6rem 0px 0.9rem;
                        background: linear-gradient(270deg, #EECEA0 0%, #F7E8D3 100%);
                        >span {
                            margin-right: 0.4rem;
                            font-size: 0.8rem; color: #71480B;
                        }
                    }
                }
                .goods_list_box {
                    position: absolute;
                    top: 0; left: 13.6rem;
                    padding: 0.4rem 0 0 0;
                    width: 19rem; height: 100%;
                    >.goods_list_tit {
                        margin-bottom: 0.6rem;
                        height: 1.7rem;
                        line-height: 1.7rem;
                        font-size: 1.2rem; font-weight: bold;
                    }
                    >.goods_list_gift {
                        line-height: 1.4rem;
                        display: flex; align-items: center;
                        >img {
                            display: inline-block;
                            width: 2.2rem; height: 1.2rem;
                            margin-right: 0.2rem;
                        }
                        >span {
                            display: inline-block;
                            max-width: 16.4rem; height: 1.4rem;
                            font-size: 1rem; color: #999;
                        }
                    }
                    >.list_price {
                        margin-top: 0.5rem;
                        display: flex;
                        align-items: center;
                        p {
                            font-size: 1.2rem; color: #FB5046;
                            span {
                                font-size: 1.1rem; color: #666;
                            }
                        }
                        >p:nth-child(1) {
                            margin-right: 1rem;
                        }
                    }
                    >.list_price_rec {
                        margin-top: 0.5rem;
                        font-size: 1.2rem; color: #FF9469;
                        span {
                            font-size: 1.1rem; color: #666;
                        }
                    }
                    >.rec_btn {
                        position: absolute;
                        bottom: 0; right: 0;
                        width: 8.8rem; height: 2.8rem;
                        line-height: 2.8rem; text-align: center;
                        border-radius: 1.4rem;
                        background: linear-gradient(90deg, #FFD376 0%, #FC682B 100%);
                        font-size: 1.2rem; color: #fff;
                    }
                }
            }
            .goods_list_pre {
                .goods_list_img {
                    background: linear-gradient(180deg, rgba(111, 198, 118, .5) 0%, rgba(121, 228, 130, .5) 100%);
                }
                .goods_list_box {
                    .rec_btn {
                        background: linear-gradient(90deg, #7AE582 0%, #6EC575 100%);
                    }
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
                    font-size: 1.6rem; color: #D1952F;
                    border-top-right-radius: 1rem;
                    border-top-left-radius: 1rem;
                    background-color: #FFDFA9;
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
                            font-size: 1.6rem; color: #F2AC9A;
                            background-color: rgba(253, 221, 218, 0.5);
                        }
                    }
                    .recruit_btn {
                        margin: 2.8rem auto 0 auto;
                        width: 27.1rem; height: 3.6rem;
                        line-height: 3.6rem; text-align: center;
                        font-size: 1.6rem; color: #fff;
                        background: linear-gradient(90deg, #FF9A7C 0%, #FF564C 100%);
                        background: -moz-linear-gradient(90deg, #FF9A7C 0%, #FF564C 100%);
                        background: -webkit-gradient(linear, 90deg, #FF9A7C 0%, #FF564C 100%);
                        background: -webkit-linear-gradient(90deg, #FF9A7C 0%, #FF564C 100%);
                        background: -o-linear-gradient(90deg, #FF9A7C 0%, #FF564C 100%);
                        background: -ms-linear-gradient(90deg, #FF9A7C 0%, #FF564C 100%);
                        border-radius: 22px;
                    }
                }
            }
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
</style>
