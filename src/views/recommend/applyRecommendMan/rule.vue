<!-- 申请推广大使-活动规则（入口：微信/app） -->
<template>
    <div id='main' :style='getPageStyle()'>
        <md-head class='head' v-if='browserType=="app"'></md-head>
        <md-head class='header' backIcon='backBlue' background='transparent' v-if='browserType=="app"'></md-head>
        <div id='content'>
            <p class='title'>申请流程</p>
            <p class='desc'>
                1.使用微信、浏览器、澜渟医生APP扫描二维码，申请加入“推广大使”赚赏金。<br/>
                2.提交申请后即可成为“推广大使”，赶快去澜渟医生APP赚赏金吧！
            </p>
            <p class='title'>如何赚赏金</p>
            <p class='desc'>
                1.申请加入赚赏金，成为“推广大使”。<br/>
                2.下载澜渟医生APP，点击【我的-分享商品赚赏金】。<br/>
                3.选择要分享的商品分享给其他用户，点击微信、朋友圈或保存图片，发给其他用户，微信分享成功率更高哦！<br/>
                4.该用户使用微信、浏览器、澜渟APP扫描二维码，下单购买商品。<br/>
                5.该用户购买商品至收货后，则该笔订单为“已完成”，赏金到账至【我的钱包】。
            </p>
        </div>
    </div>
</template>

<script lang='ts'>
    import {Component, Vue} from 'vue-property-decorator'
    import {mdHead } from '@/components'
    import {getPageTop} from '@/utils/app'
    import {getBrowserType} from '@/utils/common'

    @Component({
        components: {
            mdHead
        }
    })

    export default class recommendManRule extends Vue {
        private browserType: string = getBrowserType()
        
        /*
            获取页面样式
            @param
            @return {Object} 页面样式
        */
        getPageStyle() {
            if (this.browserType == 'app') {
                return {'padding-top': getPageTop() + 'px'}
            }
            return {overflow: "hidden"}
        }
    }
</script>

<style lang='scss' scoped>
    #main {
        padding-bottom: 2rem;
        height: 100%;
        background: linear-gradient(90deg, #F97761 0%, #FB5046 100%);
    }
    .head {
        background: linear-gradient(90deg, #F97761 0%, #FB5046 100%);
    }
    #content {
        margin: 1.2rem auto 0 auto; padding: 0 1.2rem 2.4rem 1.2rem;
        width: 35.1rem; height: calc(100% - 1.2rem);
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
