<template>
    <div id='main'>
        <p class='title'> 一、提现要求：</p>
        <p class='content'>1. 用户申请提现，必须进行实名认证，待平台审核通过后，方可提现。</p>
        <p class='content'>2. 提现比例为1:1，每次最低提现金额为50元，最高额度为1万元，每日仅限1次提现机会。</p>
        <p class='content'>3. 目前仅支持绑定支付宝或者微信进行提现，用户申请提现，可以绑定相应账号，对于已经绑定的账号，可以解除绑定，进行重新绑定。</p>
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
        padding: 2.4rem 1.2rem 0 1.2rem;
        >.title {
            margin-bottom: 1.6rem;
            text-indent: 2.8rem;
            font-size: 1.6rem; font-weight: bold;
        }
        >.content {
            margin-top: 0.8rem;
            line-height: 2.4rem;
            text-indent: 2.8rem;
        }
    }
</style>