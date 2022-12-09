<template>
    <div id='invite' :class='stateSkin' :style='"padding-top:"+top+"px"'>
        <md-head class='head' :backIcon='stateSkin=="dark"?require("@/assets/img/sys/common/backbtn_white.png"):require("@/assets/img/sys/common/backbtn_dark.png")'></md-head>
        <div class='poster'>
            <md-poster class='poster_img' id='mdPoster' width='29' height='42' :datas='poster.datas' @complete='onPosterComplete' ref='poster' rate='2.5' v-if='poster.create' v-show='poster.complete'></md-poster>
        </div>
        <md-custom id='mdCustom' :show='share.uploading'>
            <div class='loading'>
                <img class='img' :src='require("@/assets/img/sys/common/loading.png")'>
                <p class='desc'>请稍候...</p>
            </div>
        </md-custom>
        <md-share class='share' :path='share.url' :img='share.img' :beforeShare='savePosterImg' v-show='poster.complete'></md-share>
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
    export default class spreadManInviteNew extends Vue {
        private top = getHeadTop()
        private share: any = {
            url: `${window.location.origin}/pullNew/applyInviteMan/index?referral_code=${this.$route.query.referral_code}&type=LT16`,
            img: '',
            uploading: false
        }
        private poster: any = {
            create: false,
            complete: false,
            datas: []
        }

        mounted() {
            this.initData()
        }
        /**
         * 初始化
         * @param 
         * @return
         */
        initData() {
            ;(this as any).$axios.post(`${(this as any).$request.live}/pull/rec/info`, {}).then((res: any) => {
                if(res.code == 200) {
                    const {avatar, name, first_max_cash} = res.data
                    this.initPoster(avatar, name, parseInt(first_max_cash)/100)
                }
            })
        }

        /**
            初始化海报
            @param avatar 头像
            @param name 昵称
            @param first_max_cash 收益
            @return
         */
        initPoster(avatar: string, name: string, first_max_cash: number) {
            //背景海报
            this.poster.datas.push({
                type: 'img',
                content: require("@/assets/img/pullNew/spreadMan/inviteNew/poster.png"),
                pos: {x: 0, y: 0},
                size: {w: 29, h: 42}
            })
            //头像
            this.poster.datas.push({
                type: 'circleImg',
                content: avatar,
                pos: {x: 2.1, y: 2.1},
                size: {w: 4.6, h: 4.6, r: 2.3},
                borderColor: '#fff'
            })
            //昵称
            this.poster.datas.push({
                type: 'text',
                content: name,
                pos: {x: 7.6, y: 3.6},
                font: {size: 1.2, color: '#143899'}
            })
            //减免金额
            this.poster.datas.push({
                type: 'text',
                content: first_max_cash,
                pos: {x: 13.8, y: 18},
                font: {size: 2.4, color: '#774C00'}
            })
            //二维码
            this.poster.datas.push({
                type: 'qrcode',
                content: this.share.url,
                pos: {x: 21, y: 29.5},
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
            if (this.share.img == '') {
                this.share.uploading = true
                ;(this.$refs.poster as any).saveImg((resUrl: string) => {
                    this.share.uploading = false
                    this.share.img = resUrl
                    callback(resUrl)
                })
            } else {
                callback(this.share.img)
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

        @State('skin') stateSkin: any
        
    }
</script>

<style lang='scss' scoped>
    #invite {
        padding: 1px 0 11.8rem 0;
        width: 100%; height: 100vh;
        background-color: #fff;
    }
    .share {
        position: fixed;
        bottom: 0; left: 0;
        width: 100%; height: 11.8rem;
        background-color: #F6F6F6;
    }
    .poster {
        position: relative;
        margin-top: 4.4rem;
        height: calc(100% - 4.4rem);
        >.poster_img {
            position: absolute;
            top: 0; bottom: 0; left: 0; right: 0;
            margin: auto;
            width: 29rem; height: 42rem;
            border-radius: 1rem;
            box-shadow: 0px 0px 25px 0px rgba(107, 107, 107, 0.24);
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