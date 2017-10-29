<template>
  <div class="res_page">
    <img class="bg_img" src="http://image-cdn.10000dw.com/1CCFAA2B278A2BB1D4F5B08BCE1E48B8.png" alt="">
    <img class="close_icon" @click="goWeb" src="../../assets/ios-close-outline.png">
    <canvas id="canvas" ref="canvas" width="600" height="1000" style="width:300px;height:500px;"></canvas>
    <img ref="output_img" v-show="showImg" src="http://image-cdn.10000dw.com/1CCFAA2B278A2BB1D4F5B08BCE1E48B8.png" class="output_img" alt="">
  </div>
</template>

<script>
import Toast from 'v-toast'

export default {
  data: ()=> ({
    image: '',
    job: '',
    nickName: '',
    jobImg: '',
    showImg: false
  }),
  methods: {
    canvasFn(){
      let ctx = this.$refs.canvas.getContext("2d");
      ctx.beginPath();
      // 背景
      ctx.fillStyle="#ddd";
      // ctx.fillRect(0,0,300,500);
      ctx.fillRect(0,0,600,1000);
      // 昵称
      ctx.fillStyle="#585361";
      ctx.font="28px Arial";
      // ctx.fillText(this.nickName,80,30);
      ctx.fillText(this.nickName,160,60);
      // 适合职业
      ctx.fillStyle="#585361";
      ctx.font="36px 微软雅黑";
      // ctx.fillText("适合的职业是",80,60);
      ctx.fillText("适合的职业是",160,120);
      // 匹配职业
      ctx.fillStyle="#47425e";
      ctx.font="40px 微软雅黑";
      // ctx.fillText(`“${this.job}”`,70,100);
      ctx.fillText(`“${this.job}”`,140,200);
      // 职业
      let jobImg = new Image()
      jobImg.setAttribute('crossOrigin', 'anonymous')
      jobImg.src = this.jobImg
      // ctx.drawImage(jobImg, 10, 120, 280, 180);
      ctx.drawImage(jobImg, 20, 240, 560, 360);
      // 二维码
      let qrCode = new Image()
      qrCode.setAttribute('crossOrigin', 'anonymous')
      qrCode.src = "http://ow9z7qnv9.bkt.clouddn.com/qrcode_wb.png"
      // ctx.drawImage(qrCode, 40, 330, 220, 150);
      ctx.drawImage(qrCode, 80, 660, 440, 300);
      // 头像
      let headerImg = new Image()
      headerImg.crossOrigin = 'Anonymous'
      headerImg.src = this.image
      // ctx.drawImage(headerImg, 10, 18, 50, 50);
      ctx.drawImage(headerImg, 20, 36, 100, 100);
      ctx.fill();
      return new Promise((resolve, reject)=> {
        resolve(ctx)
      })
    },
    drawFn(){
      let c = this.$refs.canvas
      let outPath = this.$refs.output_img
      if(!sessionStorage.getItem('loading')){
        sessionStorage.setItem('loading', 'true')
        Toast.loading({
          message: "图片生成中",
          duration: 2000
        })
      }
      outPath.onload = ()=> {
        // setTimeout(()=> {
        //
        // }, 20)
        this.canvasFn()

        outPath.crossOrigin = 'Anonymous'
        let path = ''
        path = c.toDataURL("image/png");
        outPath.src = path
        setTimeout(()=> {
          path = c.toDataURL("image/png");
          outPath.src = path
          this.showImg = true
          // if(!!path){
          //   c = null
          // }
          if(!sessionStorage.getItem('ios')){
            sessionStorage.setItem('ios', 'y')
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
              window.location.reload()
            }
          }else {
            return
          }
          return
        }, 2500)
      }
    },
    goWeb(){
      window.location.href = 'http://wbiao.cn/'
    }
  },
  created(){
    let session = sessionStorage.getItem('imgUrl') || 'http://oxqznezzf.bkt.clouddn.com'
    this.showImg = true
    let info ={}
    let job = {}
    if(!localStorage.getItem('infoData')){
      info = {
        nickName: '我',
        avatar: 'http://oxqznezzf.bkt.clouddn.com/440D4D72B59389ABEA35841B29CE92FA.png'
      }
    }else {
      info = JSON.parse(localStorage.getItem('infoData'))
    }
    if(!sessionStorage.getItem('job')){
      job = {
        job: '逗笑师',
        img: '360EBE057A7B5351DAB500619DC273E6.png'
      }
    }else{
      job = JSON.parse(sessionStorage.getItem('job'))
    }
    this.nickName = info.nickName
    this.image = info.avatar
    this.job = job.job
    this.jobImg = `${session}/${job.img}`
  },
  mounted(){
    this.drawFn()
  },
  destroyed(){
    sessionStorage.removeItem('ios')
    sessionStorage.removeItem('loading')
  }
}
</script>

<style scoped>
.bg_img {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  left: 0;
}
#canvas {
  /*z-index: -1;*/
  opacity: 0;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*width: 300px;
  height: 500px;*/
}
.output_img {
  /*z-index: -1;*/
  position: absolute;
  width: 84%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  /*transform: scale(2);*/
}
.close_icon {
  position: absolute;
  right: 11%;
  top: 7%;
  width: 30px;
  z-index: 2;
  margin: 15px;
}
</style>
