<template>
    <div id='main'>
        <div class='title'>邀请说明</div>
        <div class='content'>
            <p class='subTitle'>累计推荐</p>
            <p class='desc'>通过您分享的二维码或活动链接成功领取新人礼包的新用户总数。</p>
            <p class='subTitle'>累计激活</p>
            <p class='desc'>过您分享的二维码或活动链接成功领取新人礼包后，下载App并登录激活账号的新用户总数。</p>
            <p class='subTitle'>已激活</p>
            <p class='desc'>领取新人礼包后，下载App并登录激活账号的新用户状态。</p>
            <p class='subTitle'>未激活</p>
            <p class='desc'>领取新人礼包后，未下载App或下载App但未登录激活账号的新用户状态。</p>
        </div>
    </div>
</template>

<script lang='ts'>
    export default {
        data() {
            return {

            }
        },
        methods: {
            
        }
    }
</script>

<style lang='scss' scoped>
    #main {
        padding-top: 1.3rem;
        height: 53.4rem;
        border-radius: 0.7rem 0.7rem 0 0;
        background-color: #fff;
        >.title {
            height: 2.2rem;
            text-align: center; line-height: 2.2rem;
            font-size: 1.6rem; font-weight: bold;
        }
        >.content {
            margin-top: 1.6rem; padding: 0 1.2rem 2.4rem 1.2rem;
            height: 48.3rem;
            overflow: auto;
            >.subTitle {
                margin-top: 2.4rem;
                font-size: 1.5rem; font-weight: bold;
            }
            >.subTitle:nth-child(1) {
                margin-top: 0;
            }
            >.desc {
                margin-top: 0.4rem;
                line-height: 2rem;
                font-size: 1.3rem;
                color: #666;
            }
        }
    }
</style>
