<template>
    <div id='rule' class='bg' :style='"padding-top:"+top+"px"'>
        <md-head class='head' backIcon='backBlue' background='transparent'></md-head>
        <div class='content'>
            <div class='title'>流程与攻略</div>
            <div class='desc'>1.选择邀请澜渟App新人或澜渟医生App新人，生成对应App的二维码海报或复制对应的新人活动链接分享给想邀请的用户，微信分享成功率更高哦！</div>
            <div class='desc'>2.该用户使用微信、浏览器扫描二维码或点击链接进入活动页面，输入手机号领取新人礼包，按照提示下载App并登录激活账号。</div>
            <div class='desc'>3.该用户激活账号后，则新人状态为“已激活”。当您的团队每月成功邀请满激活{{invite_num}}人，您激活的每人奖励{{first_max_cash}}元，奖励自动到账至澜渟医生App【我的钱包】，可自行发起提现。</div>
            <div class='title tit'>团员怎么助我赚赏金？</div>
            <div class='desc'>您作为团长邀请团员加入团队，团员成为“拉新大使”。团员每成功激活一位新用户，团员获得拉新奖励。当您的团队每月成功邀请激活满{{invite_num}}人，您也可以获得拉新提成。</div>
            <div class='title tit'>注意事项</div>
            <div class='desc'>1.如邀请的用户只扫码填写手机号，并未及时下载注册App，需等此用户下载并注册App之后才算一个有效用户，且每月团队有效邀请注册用户大于等于{{invite_num}}才可获得奖励，奖励为{{first_max_cash}}元/人，奖励自动到账至澜渟医生APP【我的钱包】</div>
            <div class='desc'>2.同一手机号仅视为同一用户，不可重复激活。</div>
            <div class='desc'>3.如出现违规行为（如作弊领取、恶意套现等行为），澜渟医生App有权收回给予用户的奖励，必要时将追究其法律责任。</div>
            <div class='desc'>4. 活动期间若存在违反规则或其他非法行为，澜渟医生App有权采取不予发放奖励，且冻结原有已发放的奖励，以及不能兑换任何商品等处理方式。</div>
            <div class='desc'>5.如有疑问可咨询客服：18021392303（微信同号）。</div>
            <div class='title tit'>活动时间</div>
            <div class='desc'>本次活动试运行时间为2021.10.01-2021.12.31。</div>
        </div>
    </div>
</template>

<script lang='ts'>
    import { Vue , Component} from 'vue-property-decorator'
    import {getHeadTop} from '@/utils/app'
    import {mdHead } from '@/components'
    @Component({
        components: {
            mdHead,
        }
    })
    export default class spreadManRule extends Vue {
        private top = getHeadTop()
        private first_max_cash = 0
        private invite_num = 0

        mounted() {
            this.first_max_cash = (this as any).$route.query.first_max_cash
            this.invite_num = (this as any).$route.query.invite_num
        }

        /**
         * 返回
         * @param 
         * @return
         */
        goBack() {
            history.go(-1)
        }
    }
</script>

<style lang='scss' scoped>
    #rule {
        min-height: 100vh; width: 100vw;
        padding: 2rem 0 3rem 0;
    }
    .bg {
        background: linear-gradient(90deg, #E3F2FF 0%,#A8C4FD 100%);
        background: -moz-linear-gradient(90deg, #E3F2FF 0%,#A8C4FD 100%);
        background: -webkit-gradient(linear, 90deg, #E3F2FF 0%,#A8C4FD 100%);
        background: -webkit-linear-gradient(90deg, #E3F2FF 0%,#A8C4FD 100%);
        background: -o-linear-gradient(90deg, #E3F2FF 0%,#A8C4FD 100%);
        background: -ms-linear-gradient(90deg, #E3F2FF 0%,#A8C4FD 100%);
    }
    .head {
        background: url('../../../assets/img/pullNew/spreadMan/rule/bg.png') no-repeat 0 !important;
        background-size: 100% 100% !important;
        /deep/.title {
            color: #1C3899;
        }
    }

    .content {
        position: relative;
        margin: 5.6rem 1.2rem 1.2rem 1.2rem; padding: 2.4rem 1.2rem;
        background-color: #fff;
        border-radius: 1.2rem;
        .title {
            margin-bottom: 0.5rem;
            height: 2.1rem;
            line-height: 2.1rem;
            font-size: 1.5rem; font-weight: bold;
        }
        .desc {
            margin-bottom: 0.3rem;
            line-height: 2.3rem;
            font-size: 1.3rem; color: #333;
        }
        .tit {
            margin-top: 2.4rem;
        }
    }

</style>