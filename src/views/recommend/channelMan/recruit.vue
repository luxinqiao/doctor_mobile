<!-- 推广团长-招募推广大使 -->
<template>
    <div id='main' :style='{"padding-top": pageTop+"px"}'>
        <md-head></md-head>
        <div id='poster'>
            <md-poster id='mdPoster' width='29' height='42' rate='2.5' :datas='poster.datas' @complete='onPosterComplete'
                       v-if='poster.create' v-show='poster.complete' ref='poster'>
            </md-poster>
        </div>
        <md-share id='share' :path='share.url' :img='share.img' :beforeShare='savePosterImg' v-show='poster.complete'></md-share>
        <md-custom id='mdCustom' :show='share.uploading'>
            <div class='loading'>
                <img class='img' :src='require("@/assets/img/sys/common/loading.png")'>
                <p class='desc'>请稍候...</p>
            </div>
        </md-custom>
    </div>
</template>

<script lang='ts'>
    import {Component, Vue} from 'vue-property-decorator'
    import {mdHead } from '@/components'
    import mdPoster from '@/views/sys/common/poster.vue'
    import mdShare from '@/views/sys/common/share.vue'
    import {mdCustom} from '@/components'
    import {getHeadHeight} from '@/utils/common'

    @Component({
        components: {
            mdHead, mdPoster, mdShare, mdCustom
        }
    })

    export default class channelManRecruit extends Vue {
        private pageTop: number = getHeadHeight()
        private share: any = {
            url: `${window.location.origin}/recommend/applyRecommendMan/index?referral_code=${(this as any).$route.query.referral_code}&type=LT08&r=343&s=15`,
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
            初始化数据
            @param
            @return
         */
        initData() {
            (this as any).$axios.post(`${(this as any).$request.rec}/rec/referral/info`, {
                referral_code: (this as any).$route.query.referral_code
            }).then((res: any) => {
                if (res.code == 200) {
                    const {avatar, name, max_income, max_remiss} = res.data
                    this.initPoster(avatar, name, parseInt(max_income)/100, parseInt(max_remiss)/100)
                }
            })
        }

        /**
            初始化海报
            @param avatar 头像
            @param name 昵称
            @param max_income 最大收益
            @param max_remiss 最大减免
            @return
         */
        initPoster(avatar: string, name: string, max_income: number, max_remiss: number) {
            //背景海报
            this.poster.datas.push({
                type: 'img',
                content: require("@/assets/img/recommend/channelMan/recruit/poster.png"),
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
                font: {size: 1.2, color: '#FEE8C3'}
            })
            //赚取金额
            this.poster.datas.push({
                type: 'text',
                content: '¥',
                pos: {x: 5.6, y: 18},
                font: {size: 1.2, color: '#774C00'}
            })
            this.poster.datas.push({
                type: 'text',
                content: max_income,
                pos: {x: 7, y: 18},
                font: {size: 2.2, color: '#774C00'}
            })
            //减免金额
            this.poster.datas.push({
                type: 'text',
                content: '¥',
                pos: {x: 18.8, y: 18},
                font: {size: 1.2, color: '#774C00'}
            })
            this.poster.datas.push({
                type: 'text',
                content: max_remiss,
                pos: {x: 20, y: 18},
                font: {size: 2.2, color: '#774C00'}
            })
            //二维码
            this.poster.datas.push({
                type: 'qrcode',
                content: this.share.url,
                pos: {x: 21, y: 29.2},
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
            监听-海报绘制完成
            @param
            @return
         */
        onPosterComplete() {
            this.poster.complete = true
        }
    }
</script>

<style lang='scss' scoped>
    #main {
        height: 100%;
        background-color: #fff;
    }
    #poster {
        position: relative;
        height: 100%;
        >#mdPoster {
            position: absolute;
            top: 0; bottom: 11.8rem; left: 0; right: 0;
            margin: auto;
            width: 29rem; height: 42rem;
        }
    }
    #share {
        position: fixed;
        bottom: 0;
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
