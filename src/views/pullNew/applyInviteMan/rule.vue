<template>
    <div id='main' :style='"padding-top:"+getTop()'>
        <md-head class='header' backIcon='backBlue' background='transparent' v-if='browserType=="app"'></md-head>
        <div id='content'>
            <p class='title'>申请流程</p>
            <p class='desc'>1.使用微信、浏览器、澜渟医生App扫描二维码，进入申请“拉新大使”的活动页面。</p>
            <p class='desc'>2.提交申请后完成实名认证即可成为“拉新大使”，在澜渟医生App邀请并激活新人即可获得现金奖励哦！</p>
            <p class='title'>如何获得奖励</p>
            <p class='desc'>1.申请成为“拉新大使”，加入招募者的队伍。</p>
            <p class='desc'>2.下载澜渟医生App，点击【我的-邀请注册拿奖励】。</p>
            <p class='desc'>3.选择澜渟App或澜渟医生App，生成二维码海报或复制新人活动链接分享给其他用户，微信分享成功率更高哦！</p>
            <p class='desc'>4.该用户使用微信、浏览器扫描二维码或点击链接进入活动页面，输入手机号领取新人礼包，按照提示下载App并登录激活账号。</p>
            <p class='desc'>5.该用户激活账号后，则新人状态为“已激活”，当月邀请激活用户大于等于10人即可获得奖励，奖励到账至【我的钱包】。</p>
            <p class='title'>活动时间</p>
            <p class='desc'>本次活动试运行时间为2021.10.01-2021.12.31。</p>
        </div>
    </div>
</template>

<script lang='ts'>
    import {Component, Vue} from 'vue-property-decorator'
    import {getBrowserType, convertPx} from '@/utils/common'
    import {getHeadTop} from '@/utils/app'
    import {mdHead } from '@/components'

    @Component({
        components: {
            mdHead
        }
    })

    export default class applyInviteManRule extends Vue {
        private browserType: string = getBrowserType()
        private headTop: number = getHeadTop()

        /*
            获取页面距顶部距离
            @param
            @return 距顶部距离
         */
        getTop() {
            if (this.browserType == 'app') {
                return this.headTop + convertPx(7.6) + 'px'
            } else {
                return this.headTop + convertPx(1.2) + 'px'
            }
        }
    }
</script>

<style lang='scss' scoped>
    #main {
        padding: 1.2rem 1.2rem 2.8rem 1.2rem;
        height: 100%;
        background: linear-gradient(to right, #E3F2FF, #A8C4FD);
        .header {
            /deep/.title {
                color: #1C3899 !important;
            }
        }
        >#content {
            padding: 0 1.2rem;
            height: 100%;
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
    }
</style>