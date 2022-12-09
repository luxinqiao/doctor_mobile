<template>
    <div class='mdShare'>
        <div class='share-item' @click='share(0)'>
            <img class='icon' :src='require("@/assets/img/sys/common/share/wechat.png")'>
            <span class='text'>微信好友</span>
        </div>
        <div class='share-item' @click='share(1)'>
            <img class='icon' :src='require("@/assets/img/sys/common/share/friend.png")'>
            <span class='text'>朋友圈</span>
        </div>
        <div class='share-item' @click='share(2)'>
            <img class='icon' :src='require("@/assets/img/sys/common/share/save.png")'>
            <span class='text'>保存图片</span>
        </div>
        <div class='share-item' @click='share(3)'>
            <img class='icon' :src='require("@/assets/img/sys/common/share/copy.png")'>
            <span class='text'>复制链接</span>
        </div>
    </div>
</template>

<script lang='ts'>
import {Vue, Component, Prop, Emit} from 'vue-property-decorator'
import {appFun} from '@/utils/app'
import {isEmpty} from '@/utils/common'

interface iShare {
    type: number,
    path: string,
    img: string,
    title?: string,
    originalId?: string,
    xcxPath?: string
}

@Component
export default class mdShare extends Vue {
    @Prop({
        default: ''
    })
    path!: string

    @Prop({
        default: ''
    })
    img!: string

    @Prop({
        default: ''
    })
    title!: string

    @Prop({
        default: ''
    })
    originalId!: string

    @Prop({
        default: ''
    })
    xcxPath!: string

    @Prop({
        default: (callback: Function) => {
            callback()
        }
    })
    beforeShare!: Function

    @Emit('share')
    share(type: number) { //0-微信好友 1-朋友圈 2-保存图片 3-复制链接
        this.beforeShare((imgUrl: string) => {
            let shareData: iShare = {
                type: type,
                path: this.path,
                title: this.title,  //必传，即使为空（android推荐模块会取，不传会报错）
                img: imgUrl
            }
            if (!isEmpty(this.originalId)) {
                shareData.originalId = this.originalId
                shareData.xcxPath = this.xcxPath
            }
            appFun(()=> {
                (window as any).jsInterface.share(JSON.stringify(shareData))
            }, ()=> {
                (window as any).webkit.messageHandlers.share.postMessage(shareData)
            })
        })
    }
}
</script>

<style lang='scss' scoped>
    .mdShare {
        padding-top: 2rem;
        height: 11.8rem;
        >.share-item {
            position: relative;
            float: left;
            margin-left: 3.2rem;
            width: 5.4rem; height: 7.8rem;
            >.icon {
                position: absolute;
                top: 0; left: 0; right: 0;
                margin: auto;
                width: 5.4rem; height: 5.4rem;
            }
            >.text {
                position: absolute;
                bottom: 0; left: 0; right: 0;
                text-align: center; line-height: 1.6rem;
                font-size: 1.1rem;
                color: #666;
            }
        }
    }
</style>
