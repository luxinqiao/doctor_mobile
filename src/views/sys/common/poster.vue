<template>
    <div id='mdPoster'>
        <canvas id='cancas' ref='canvas' :style='getCanvasStyle()'></canvas>
        <vue-qr :text='qrcodeUrl' :margin='0' v-show='false' ref='qrcode'></vue-qr>
    </div>
</template>

<script lang='ts'>
import {Vue, Component, Prop, Emit} from 'vue-property-decorator'
import {convertPx, dateFormat} from '@/utils/common'
import OSS from 'ali-oss'
import vueQr from 'vue-qr'

interface iRect {
    type: string,
    pos: {
        x: number,
        y: number
    },
    size: {
        w: number,
        h: number
    }
}
interface iText {
    type: string,
    content: string,
    pos: {
        x: number,
        y: number
    },
    font: {
        size: number,
        bold?: boolean,
        letterSpace?: number,
        color: string
    }
}
interface iImg {
    type: string,
    content: string,
    pos: {
        x: number,
        y: number
    },
    size: {
        w: number,
        h: number
    },
    callback?: Function
}
interface iCircleImg {
    type: string,
    content: string,
    pos: {
        x: number,
        y: number
    },
    size: {
        w: number,
        h: number,
        r: number
    },
    borderColor: string,
    callback?: Function
}

@Component({
    components: {
        vueQr
    }
})
export default class mdPoster extends Vue {
    @Prop({
        default: 0
    })
    width!: number

    @Prop({
        default: 0
    })
    height!: number

    @Prop({
        default: 0
    })
    datas!: iText[] | iImg[] | iCircleImg[]

    @Prop({
        default: 1
    })
    rate!: number

    private qrcodeUrl: string = ''
    private ctx: any
    
    mounted() {
        this.initCanvas()
        this.drawBackground()
        this.draw(0)
    }

    /*
        初始化画布
        @param
        @return
     */
    initCanvas() {
        const canvas: any = this.$refs.canvas
        canvas.width = convertPx(this.width) * this.rate
        canvas.height = convertPx(this.height) * this.rate
        this.ctx = canvas.getContext('2d')
    }
    /*
        绘制
        @param i 当前序号
        @return
     */
    draw(i: number) {
        const data: iText | iImg | iCircleImg = this.datas[i]
        if (data.type == 'text') {
            this.drawText(data as iText)
            this.drawNext(i)
        } else if (data.type == 'img') {
            (data as iImg).callback = ()=> {
                this.drawNext(i)
            }
            this.drawImg(data as iImg)
        } else if (data.type == 'circleImg') {
            (data as iCircleImg).callback = ()=> {
                this.drawNext(i)
            }
            this.drawCircleImg(data as iCircleImg)
        } else if (data.type == 'qrcode') {
            (data as iImg).callback = ()=> {
                this.drawNext(i)
            }
            this.drawQrcode(data as iImg)
        }
    }

    /*
        绘下一个
        @param i 当前序号
        @return
     */
    drawNext(i: number) {
        if (i < this.datas.length - 1) {
            this.draw(++i)
        } else if (i == this.datas.length - 1) {
            this.$emit('complete')
        }
    }

    /*
        绘背景白色（带圆角）
        @param
        @return
     */
    drawBackground() {
        const radius = 1
        this.ctx.save()
        this.ctx.beginPath()
        this.ctx.moveTo(convertPx(radius)*this.rate, 0)
        this.ctx.lineTo(convertPx(this.width-radius)*this.rate, 0) //创建顶部水平线
        this.ctx.arc(convertPx(this.width-radius)*this.rate, convertPx(radius)*this.rate, convertPx(radius)*this.rate, Math.PI*1.5, Math.PI*2) //右上角圆角
        this.ctx.lineTo(convertPx(this.width)*this.rate, convertPx(this.height-radius)*this.rate) //创建右侧垂直线
        this.ctx.arc(convertPx(this.width-radius)*this.rate, convertPx(this.height-radius)*this.rate, convertPx(radius)*this.rate, 0, Math.PI*0.5) //右下角圆角
        this.ctx.lineTo(convertPx(radius)*this.rate, convertPx(this.height)*this.rate) //创建底部水平线
        this.ctx.arc(convertPx(radius)*this.rate, convertPx(this.height-radius)*this.rate, convertPx(radius)*this.rate, Math.PI*0.5, Math.PI*1) //右下角圆角
        this.ctx.lineTo(0, convertPx(radius)*this.rate) //创建左侧垂直线
        this.ctx.arc(convertPx(radius)*this.rate, convertPx(radius)*this.rate, convertPx(radius)*this.rate, Math.PI*1, Math.PI*1.5) //左上角圆角
        this.ctx.closePath()
        this.ctx.clip()
        this.ctx.fillStyle = '#fff'
        this.ctx.fillRect(0, 0, (this.$refs.canvas as any).width, (this.$refs.canvas as any).height)
        this.ctx.restore()
    }
    /*
        绘文字
        @param param 文字参数
        @return
     */
    drawText(param: iText) {
        this.ctx.font = 'normal ' + (param.font.bold ? 'bold' : 'normal') +' normal ' + convertPx(param.font.size)*this.rate + 'px Arial'
        this.ctx.fillStyle = param.font.color
        if (param.font.letterSpace) {
            for (let i=0; i<param.content.length; i++) {
                this.ctx.fillText(param.content.substr(i, 1), convertPx(param.pos.x+(param.font.size+param.font.letterSpace)*i)*this.rate, convertPx(param.pos.y)*this.rate)
            }
        } else {
            this.ctx.fillText(param.content, convertPx(param.pos.x)*this.rate, convertPx(param.pos.y)*this.rate)
        }
    }
    /*
        绘图片
        @param param 图片参数
        @return
     */
    drawImg(param: iImg) {
        const img: HTMLImageElement = new Image()
        img.setAttribute('crossOrigin', 'anonymous')
        img.src = param.content.match(/base64/) ? param.content : param.content + '?cache'
        img.onload = ()=> {
            this.ctx.drawImage(img, convertPx(param.pos.x)*this.rate, convertPx(param.pos.y)*this.rate, convertPx(param.size.w)*this.rate, convertPx(param.size.h)*this.rate)
            typeof(param.callback) == 'function' ? param.callback() : ''
        }
    }
    /*
        绘圆形图片
        @param param 圆形图片参数
        @return
     */
    drawCircleImg(param: iCircleImg) {
        //二维码裁剪成圆图
        this.ctx.save() //保存裁剪前的环境
        this.ctx.beginPath()
        this.ctx.arc(convertPx(param.pos.x+param.size.r)*this.rate, convertPx(param.pos.y+param.size.r)*this.rate, convertPx(param.size.r)*this.rate, 0, Math.PI * 2, false)
        this.ctx.clip()
        this.drawImg({
            type: 'img',
            content: param.content,
            pos: param.pos,
            size: param.size,
            callback: () => {
                //圆形边框
                this.ctx.arc(convertPx(param.pos.x+param.size.r)*this.rate, convertPx(param.pos.y+param.size.r)*this.rate, convertPx(param.size.r)*this.rate, 0, Math.PI * 2, false)
                this.ctx.lineWidth = 2*this.rate
                this.ctx.strokeStyle = param.borderColor
                this.ctx.stroke()
                this.ctx.closePath()
                this.ctx.restore() //恢复裁剪前的环境
                typeof(param.callback) == 'function' ? param.callback() : ''
            }
        })
    }
    /*
        绘二维码
        @param param 图片参数
        @return
     */
    drawQrcode(param: iImg) {
        this.qrcodeUrl = param.content
        const img: HTMLImageElement = new Image()
        img.setAttribute('crossOrigin', 'anonymous')
        setTimeout(()=>{
            img.src = (this.$refs.qrcode as any).$el.src.match(/base64/) ? (this.$refs.qrcode as any).$el.src : (this.$refs.qrcode as any).$el.src + '?cache'
            img.onload = ()=> {
                this.ctx.drawImage(img, convertPx(param.pos.x)*this.rate, convertPx(param.pos.y)*this.rate, convertPx(param.size.w)*this.rate, convertPx(param.size.h)*this.rate)
                typeof(param.callback) == 'function' ? param.callback() : ''
            }
        }, 1)
    }

    /*
        保存图片（对外开放）
        @param callback 回调函数
        @return
     */
    saveImg(callback: Function) {
        (this.$refs.canvas as any).toBlob((blob: any) => {
            (this as any).$axios.post((this as any).$request.sts, {}).then((res: any) => {
                const client = new OSS({
                    accessKeyId: res.AccessKeyId,
                    accessKeySecret: res.AccessKeySecret,
                    stsToken: res.SecurityToken,
                    bucket: 'rightinhome',
                    region: 'oss-cn-hangzhou'
                })
                async function put() {
                    try {
                        const fileName = 'inviteNew_mobile/'+dateFormat(new Date(), 'YYYY/MM/DD')+'/'+new Date().getTime()+'.png'
                        const result = await client.put(fileName, blob)
                        callback(result.url)
                    } catch (e) {
                        
                    }
                }
                put()
            })
        })
    }

    /*
        获取canvas样式
        @param
        @return canvas样式
     */
    getCanvasStyle() {
        const scale: number = 1 / this.rate
        const percent: number = -(this.rate - 1) * 50
        return `transform: scale(${scale}, ${scale}) translate(${percent}%, ${percent}%)`
    }
}
</script>

<style lang='scss' scoped>
    #mdPoster {
        border-radius: 1rem;
        box-shadow: 0 0 2.5rem 0 rgba(107, 107, 107, 0.24);
        overflow: hidden;
    }
</style>
