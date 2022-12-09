<!--
    文件描述：发票
    创建人：赵志银
    创建时间：2021.12.01
 -->
<template>
    <div id='main' ref='main'>
        <div class='inv_box' @click='isShowPreview=true'>
            <img :src='url' id='inv'>
            <div class='watch_btn_box'>
                <div class='watch_btn' @click.stop='downloadImage'>点击下载pdf</div>
            </div>
        </div>
        <div class='msg'>更多盆底学习、进修考证信息，请下载澜渟医生查看</div>
        <div class='next_box'>
            <img src='@/assets/img/xcx/meeting/invoice/next.png'>
            <img src='@/assets/img/xcx/meeting/invoice/next.png'>
        </div>
        <div class='btn' @click='downloadApp'>前往澜渟医生App查看</div>

        <van-image-preview
            v-model='isShowPreview'
            :images='[url]'
            @close='isShowPreview=false'
        >
        </van-image-preview>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {ImagePreview} from 'vant'
    import 'vant/lib/image-preview/style'
    Vue.use(ImagePreview)

    import {getParameter} from '@/utils/common'

    @Component
    export default class meetingInvoice extends Vue{
        private url = ''
        private isShowPreview =false
        mounted() {
            this.url = decodeURIComponent(getParameter('img'))
        }
        /**
         * 跳转下载页面
         * @param 
         * @return
        */
        downloadApp() {
            this.$router.push('/apps/wrightindoc')
        }

        /**
         * 下载图片
         * @param 
         * @return
        */
        downloadImage() {
            var a = document.createElement('a')
            const event = new MouseEvent('click')
            a.setAttribute('download', (new Date()).getTime().toString())
            a.href = this.url.replace('.jpg','.pdf')
            a.dispatchEvent(event)
        }
    }
</script>

<style lang='scss' scoped>
    #main {
        position: relative;
        background-color: #fff;
        .inv_box {
            position: relative;
            width: 100%; height: auto;
            img {
                display: block;
                height: 24.2rem; width: 100%;
            }
            .watch_btn_box {
                position: absolute;
                bottom: 0; left: 0;
                width: 100%; height: 5.9rem;
                background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(5, 5, 5, 0.64) 100%);
                .watch_btn {
                    position: absolute;
                    top: 0.7rem; left: 0; right: 0;
                    margin: auto;
                    width: 11rem; height: 2.8rem;
                    line-height: 2.8rem; text-align: center;
                    border-radius: 1.4rem;
                    background-color: rgba(51, 51, 51, 0.9);
                    font-size: 1.2rem; color: #fff;
                }
            }
        }
        .msg {
            margin-top: 5.4rem;
            text-align: center; line-height: 2rem;
            font-size: 1.4rem; color: #666;
        }
        .next_box {
            margin-top: 1.6rem;
            img {
                display: block;
                margin: 0 auto;
                width: 1rem; height: .7rem;
            }
        }
        .btn {
            margin: 1.6rem;
            width: 34.3rem; height: 4.4rem;
            line-height: 4.4rem; text-align: center;
            font-size: 1.6rem; color: #fff;
            background-color: #26C2C4; border-radius: 2.5rem;
        
        }

        >>>.van-image-preview__image {
            background-color: rgba(255,255,255,1) !important;
        }
    }

</style>