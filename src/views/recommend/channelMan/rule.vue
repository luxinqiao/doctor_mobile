<!-- 推广团长-分享活动规则 -->
<template>
    <div id='main' :style='{"padding-top": pageTop+"px"}'>
        <md-head id='head' backIcon='backWhite' ></md-head>
        <div id='content'>
            <p class='title'>流程与攻略</p>
            <p class='desc'>
                1.选择要分享的商品分享给其他用户，点击微信、朋友圈或保存图片，发给其他用户，微信分享成功率更高哦！<br/>
                2.该用户使用微信、浏览器、澜渟APP扫描二维码，下单购买商品。<br/>
                3.该用户购买商品至收货后，则该笔订单为“已完成”，赏金到账至【我的钱包】。
            </p>
            <p class='title'>团员怎么助我赚赏金？</p>
            <p class='desc'>
                您作为团长邀请团员加入团队，团员成为“推广大使”，每分享成功一件商品后，团员获得分享赏金，您也可以获得分享提成。
            </p>
            <p class='title'>招募流程</p>
            <p class='desc'>
                1.分享至微信、朋友圈，或保存图片发送给好友，邀请他们加入你的团队，微信分享成功率更高哦！<br/>
                2.受邀人使用微信、浏览器、澜渟医生APP扫描二维码，受邀人即成为您团队的一员。
            </p>
            <p class='title'>注意事项</p>
            <p class='desc'>
                1.若分享的用户购买后发生退款行为，则该笔分享失效，不可获得赏金。<br/>
                2.若已收到某笔订单收益后，该笔订单的下单用户发生退款行为，则收回已发放的赏金。
            </p>
            <p class='title'>其他说明</p>
            <p class='desc'>
                1. “赏金”为澜渟医生APP提供的可兑换商品的虚拟币，而非法定货币。<br/>
                2.如出现违规行为（如作弊领取、恶意套现等行为），澜渟医生App有权收回给予用户的赏金，必要时将追究其法律责任。<br/>
                3. 活动期间若存在违反规则或其他非法行为，澜渟医生APP有权采取不予发放赏金奖励，且冻结原有已发放的赏金，以及不能兑换任何商品等处理方式。
            </p>
        </div>
    </div>
</template>

<script lang='ts'>
    import {Component, Vue} from 'vue-property-decorator'
    import {mdHead } from '@/components'
    import {getHeadHeight} from '@/utils/common'

    @Component({
        components: {
            mdHead
        }
    })

    export default class channelManRule extends Vue {
        private pageTop = getHeadHeight()
    }
</script>

<style lang='scss' scoped>
    #main {
        padding-bottom: 2.6rem;
        min-height: 100%;
        background: linear-gradient(90deg, #F97761 0%, #FB5046 100%);
    }
    #head {
        background: url(../../../assets/img/recommend/channelMan/rule/bg.png) no-repeat 0 0;
        background-size: 100% 100%;
        /deep/.title {
            color: #fff;
        }
    }
    #content {
        margin: 1.2rem auto 0 auto; padding: 0 1.2rem 2.4rem 1.2rem;
        width: 35.1rem;
        border-radius: 1.2rem;
        background-color: #fff;
        overflow: hidden;
        >.title {
            margin-top: 2.4rem;
            line-height: 2.1rem;
            font-size: 1.5rem; font-weight: bold;
        }
        >.desc {
            margin-top: 0.5rem;
            line-height: 2.3rem;
            font-size: 1.3rem;
            color: #666;
        }
    }
</style>
