<!-- 分享商品海报 -->
<template>
    <div id='main' :style='{"padding-top": pageTop+"px"}'>
        <md-head></md-head>
        <div id='poster'>
            <md-poster id='mdPoster' width='29' height='43' rate='2.5' :datas='poster.datas' @complete='onPosterComplete'
                       v-if='poster.create' v-show='poster.complete' ref='poster'>
            </md-poster>
        </div>
        <md-share id='share' :path='share.url' :img='share.img' :originalId='share.originalId' :title='share.title' :xcxPath='share.xcxPath' :beforeShare='savePosterImg' v-show='poster.complete'></md-share>
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

    export default class goodsShareIndex extends Vue {
        private pageTop: number = getHeadHeight()
        private share: any = {
            url: `${(this as any).$request.mall}/mall/reDetail?goods_code=${(this as any).$route.query.goods_code}&referral_code=${(this as any).$route.query.referral_code}&type=LT01&r=343&s=15`,
            img: '',
            title: '',
            originalId: (this as any).$request.originalId,
            xcxPath: `pages/main/mall/recDetail/recDetail?goods_code=${(this as any).$route.query.goods_code}&referral_code=${(this as any).$route.query.referral_code}&type=LT01&r=343&s=15`,
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
            (this as any).$axios.post(`${(this as any).$request.rec}/v2/goods/detail`, {
                goods_code: (this as any).$route.query.goods_code
            }).then((res: any) => {
                if (res.code == 200) {
                    if(res.data.gift.content.length>23) {
                        res.data.gift.content = res.data.gift.content.slice(0,22)+'...'
                    }
                    const {mainimgs, name, gift, services} = res.data
                    this.share.title = res.data.name
                    this.initPoster(mainimgs, name, gift, services)
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
        initPoster(mainimgs: any, name: string, gift: any, services: any) {
            //活动图
            this.poster.datas.push({
                type: 'img',
                content: mainimgs[0],
                pos: {x: 0, y: 0},
                size: {w: 29, h: 29}
            })
            //是否显示日常分享价
            if((this as any).$route.query.is_normal==1) {
                //价格
                this.poster.datas.push({
                    type: 'img',
                    content: require('@/assets/img/recommend/goodsShare/price.png'),
                    pos: {x: 0, y: 25.2},
                    size: {w: 13.4, h: 3.8}
                })
                this.poster.datas.push({
                    type: 'text',
                    content: '分享价',
                    pos: {x: 2, y: 27.7},
                    font: {size: 1.2, color: '#71480B', bold:'bold'}
                })
                this.poster.datas.push({
                    type: 'text',
                    content: '¥',
                    pos: {x: 6, y: 27.9},
                    font: {size: 1.2, color: '#71480B', bold:'bold'}
                })
                this.poster.datas.push({
                    type: 'text',
                    content: parseInt((this as any).$route.query.price)/100,
                    pos: {x: 7.1, y: 27.9},
                    font: {size: 1.8, color: '#774C00', bold:'bold'}
                })
            }
            //商品名称
            this.poster.datas.push({
                type: 'text',
                content: name,
                pos: {x: 1.5, y: 31.6},
                font: {size: 1.4, color: '#574121'}                
            })
            //赠品
            let top: number = 33.7
            if (gift.status == 1) {
                this.poster.datas.push({
                    type: 'img',
                    content: require('@/assets/img/recommend/goodsShare/gift.png'),
                    pos: {x: 1.5, y: top-1},
                    size: {w: 2.2, h: 1.2}
                })
                this.poster.datas.push({
                    type: 'text',
                    content: gift.content,
                    pos: {x: 3.9, y: top},
                    font: {size: 1, color: '#999'}
                })
                top += 2
            }
            //服务
            for (let i=0; i<services.length; i++) {
                this.poster.datas.push({
                    type: 'img',
                    content: require('@/assets/img/recommend/goodsShare/service-item.png'),
                    pos: {x: 1.4, y: top - 1},
                    size: {w: 1.1, h: 1.2}
                })
                this.poster.datas.push({
                    type: 'text',
                    content: services[i].name,
                    pos: {x: 3.1, y: top},
                    font: {size: 1.1, color: '#333'}
                })
                top += 2
            }
            //二维码
            this.poster.datas.push({
                type: 'qrcode',
                content: this.share.url,
                pos: {x: 21, y: 34.4},
                size: {w: 6.2, h: 6.2}
            })
            this.poster.datas.push({
                type: 'text',
                content: '扫码购买',
                pos: {x: 22, y: 42},
                font: {size: 0.9, bold: true, letterSpace: 0.2, color: '#333'}
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
            width: 29rem; height: 43rem;
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
