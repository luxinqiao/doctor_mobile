<!-- 注册医生 -->
<template>
    <div id='invite' :class='stateSkin' :style='"padding-top:"+top+"px"'>
        <md-head class='header' :backMode='backMode' :backImg='stateSkin=="dark"?require("@/assets/img/sys/common/backbtn_white.png"):require("@/assets/img/sys/common/backbtn_dark.png")'>
            <div class='record_btn' @click='goRecord'>邀请记录</div>
        </md-head>

        <div class='box'>
            <div class='top' v-if='normal' :style='"top:"+titleHeight+"px"'>
                <p>邀请医生奖励说明</p>
                <img src='@/assets/img/pullNew/invite/doc/index/down.png' :class='style' @click='seeDesc'>
                
            </div>
            <div class='top_desc' v-show='desc'>
                <div>每邀请1位医生注册并登录澜渟医生App账号，可获得3天VIP会员奖励。</div>
            </div>

            <div class='poster' :style='normal?"margin-top: 3.6rem;height:calc(100% - 3.6rem)":""'>
                <md-poster class='poster_img' id='mdPoster' width='29' height='43.2' :datas='poster.datas' @complete='onPosterComplete' ref='poster' rate='2.5' v-if='poster.create' v-show='poster.complete'></md-poster>
            </div>

            <md-share class='share' :path='shareParam.url' :img='shareParam.img' :beforeShare='savePosterImg' v-show='poster.complete' @share='share'></md-share>

            <md-custom id='mdCustom' :show='shareParam.uploading'>
                <div class='loading'>
                    <img class='img' :src='require("@/assets/img/sys/common/loading.png")'>
                    <p class='desc'>请稍候...</p>
                </div>
            </md-custom>

        </div>
    </div>
</template>

<script lang='ts'>
    import { Vue , Component} from 'vue-property-decorator'
    import {getHeadTop} from '@/utils/app'
    import mdPoster from '@/views/sys/common/poster.vue'
    import mdShare from '@/views/sys/common/share.vue'
    import {mdCustom, mdHead} from '@/components'
    import {State} from 'vuex-class'

    @Component({
        components: {
            mdPoster, 
            mdShare, 
            mdCustom,
            mdHead
        }
    })
    export default class inviteDocIndex extends Vue {
        private top = getHeadTop()
        private desc:boolean = false
        private normal:boolean = false
        private style:string = ''

        private titleHeight:number = Math.floor(document.body.clientWidth/375*44)+Number(getHeadTop())

        private shareParam: any = {
            url: `${window.location.origin}/pullNew/invite/doctor/sign?referral_code=${this.$route.query.referral_code}&type=LT14`,
            img: '',
            uploading: false
        }
        private poster: any = {
            create: false,
            complete: false,
            datas: []
        }
        private backMode:string = 'close'

        mounted() {
            if (this.$route.query.from != 'activity') { //不是活动页跳转
                if (this.$route.query.identity=='0') {
                    this.normal = true
                }
                this.backMode = 'close'
            } else {
                this.backMode = 'back'
            }
            this.initData()
        }

        @State('skin') stateSkin: any

        /**
         * 初始化
         * @param 
         * @return
         */
        initData() {
            ;(this as any).$axios.post(`${(this as any).$request.live}/pull/rec/info`, {}).then((res: any) => {
                if(res.code == 200) {
                    this.initPoster('我是 '+res.data.name)
                }
            })
        }
        
        /**
            初始化海报
            @param name 昵称
            @return
         */
        initPoster(name: string) {
            //背景海报
            this.poster.datas.push({
                type: 'img',
                content: require("@/assets/img/pullNew/invite/doc/index/poster_bg.png"),
                pos: {x: 0, y: 0},
                size: {w: 29, h: 43.2}
            })
            //昵称
            this.poster.datas.push({
                type: 'text',
                content: name,
                pos: {x: 2.4, y: 35.6},
                font: {size: 1.2, color: '#666'}
            })
            this.poster.datas.push({
                type: 'text',
                content: '在澜渟医生学习了30天',
                pos: {x: 2.4, y: 37.6},
                font: {size: 1.2, color: '#666'}
            })
            this.poster.datas.push({
                type: 'text',
                content: '识别二维码一起学习吧',
                pos: {x: 2.4, y: 39.6},
                font: {size: 1.2, color: '#666'}
            })
            //二维码
            this.poster.datas.push({
                type: 'qrcode',
                content: this.shareParam.url,
                pos: {x: 20.9, y: 34.3},
                size: {w: 6.2, h: 6.2}
            })
            //绘制海报
            this.poster.create = true
        }

        /**
            保存海报图片
            @param callback 回调
            @return
         */
        savePosterImg(callback: Function) {
            if (this.shareParam.img == '') {
                this.shareParam.uploading = true
                ;(this.$refs.poster as any).saveImg((resUrl: string) => {
                    this.shareParam.uploading = false
                    this.shareParam.img = resUrl
                    callback(resUrl)
                })
            } else {
                callback(this.shareParam.img)
            }
        }

        /**
         * 绘图结束
         * @param
         * @return
         */
        onPosterComplete() {
            this.poster.complete = true
        }
        /**
         * 说明
         * @param 
         * @return
         */
        seeDesc() {
            if(this.desc) {
                this.style = 'info_desc_hid'
            } else {
                this.style = 'info_desc'
            }
            this.desc = !this.desc
        }
        
        /**
         * 跳转邀请记录
         * @param 
         * @return
         */
        goRecord() {
            this.$router.push('./record')
        }

        /**
         * 分享埋点
         * @param {number} type //0-微信好友 1-朋友圈 2-保存图片 3-复制链接
         * @return
         */
        share(type:number) {
            ;(this as any).$axios.post(`${(this as any).$request.live}/v1/click`, {
                module: 'pull',
                event: type==0?'ltd_qr_code_wx_friend': (type==1?'ltd_qr_code_wx_circle': (type==2?'ltd_qr_code_save_img': 'ltd_qr_code_copy_url'))
            }).then((res: any) => {})
        }
    }
</script>

<style lang='scss' scoped>
    #invite {
        width: 100%; height: 100vh;
        padding-top: 1px;
        background-color: #fff;
    }
    // .header{
    //     background: #fff;
    //     /deep/.title {
    //         color: #333 !important;
    //     }
    // }
    .record_btn {
        position: absolute;
        top: 0; bottom: 0; right: 0;
        height: 1.6rem;
        margin: auto;
        padding: 0 1.2rem;
        line-height: 1;
        font-size: 1.6rem; color: #333;
    }
    .box {
        position: relative;
        height: 100%; width: 100%;
        padding: 4.4rem 0 11.8rem 0;
    }
    .top {
        position: fixed;
        top: 4.4rem; left: 0;
        height: 3.6rem; width: 100%;
        background-color: #F4F4F4;
        z-index: 3;
        p {
            padding: 1.1rem 0 0 2rem;
            line-height: 1;
            font-size: 1.4rem; color: #666;
        }
        img {
            position: absolute;
            top: 0; right: 0; bottom: 0;
            margin: auto; padding: 2rem;
            width: 1.1rem; height: 0.7rem;
            box-sizing: content-box;
        }
    }
    .top_desc {
        position: fixed;
        width: 100%; height: 100%;
        background-color: rgba(0,0,0,0.65);
        z-index: 2;
        div {
            position: absolute;
            top: 3.4rem; left: 0;
            padding: 1.2rem 1.8rem;
            width: 100%; height: 6.6rem;
            line-height: 2.1rem;
            font-size: 1.3rem; color: #999;
            background-color: #fff;
        }
    }
    .poster {
        position: relative;
        height: 100%;
        padding: 1rem;
        overflow-y: scroll;
        display: flex;
        justify-content: center;
        .poster_img {
            display: block;
            margin: auto;
            width: 29rem; height: 43.2rem;
            border-radius: 1rem;
            box-shadow: 0px 0px 25px 0px rgba(107, 107, 107, 0.24);
        }
    }
    .share {
        position: fixed;
        bottom: 0; left: 0;
        width: 100%; height: 11.8rem;
        background-color: #F6F6F6;
    }

    .info_desc {
        animation: desc_animation 0.3s forwards linear;
    }
    @keyframes desc_animation{ 
        0% { 
            transform: rotate(0); 
        } 
        100% { 
            transform: rotate(180deg); 
        } 
    }

    .info_desc_hid {
        animation: desc_animation_hid 0.3s forwards linear;
    }
    @keyframes desc_animation_hid{ 
        0% { 
            transform: rotate(180deg); 
        } 
        100% { 
            transform: rotate(0); 
        } 
    }

    .dark#invite {
        background-color: #0D101C;
        .header{
            background: #0D101C;
            color: #E3E3E3;
            /deep/.title {
                color: #E3E3E3 !important;
            }
            .record_btn {
                color: #E3E3E3;
            }
        }
        .top {
            background-color: #212433;
            p {
                color: #999;
            }
        }
        .top_desc {
            div {
                background-color: #0D101C;
            }
        }
        .share {
            background-color: #151825;
            /deep/.text {
                color: #999;
            }
        }
    }

    #mdCustom {
        >.loading {
            position: absolute;
            top: 0; bottom: 0; left: 0; right: 0;
            margin: auto;
            width: 9rem; height: 10rem;
            border-radius: 0.8rem;
            background-color: rgba(0, 0, 0, 0.8);
            >.img {
                position: absolute;
                top: 1.8rem; left: 0; right: 0;
                margin: auto;
                width: 4rem; height: 4rem;
                animation: rotation 1.2s linear infinite;
            }
            >.desc {
                position: absolute;
                bottom: 1.2rem; left: 0; right: 0;
                margin: auto;
                height: 2rem;
                text-align: center; line-height: 2rem;
                font-size: 1.3rem;
                color: #ddd;
            }
            @keyframes rotation{
                from {
                    transform: rotate(0deg);
                }
                to {
                    transform: rotate(360deg);
                }
            }
        }
    }
</style>