<template>
  <div class="res_page">
    <img class="bg_img" src="http://image-cdn.10000dw.com/1CCFAA2B278A2BB1D4F5B08BCE1E48B8.png" alt="">
    <canvas id="canvas" ref="canvas" width="300" height="500"></canvas>
    <img ref="output_img" class="output_img" src="http://img.hb.aicdn.com/d71f68da23c50c8d9682543caa055c6ea0ed62528c2c0-p02EeU_fw658" alt="">
  </div>
</template>

<script>
export default {
  methods: {
    drawFn(){
      let ctx = this.$refs.canvas.getContext("2d");
      ctx.beginPath();
      // 背景
      ctx.fillStyle="#ddd";
      ctx.fillRect(0,0,300,500);
      // 昵称
      ctx.fillStyle="#999";
      ctx.font="14px Arial";
      ctx.fillText("zooey",80,30);
      // 适合职业
      ctx.fillStyle="#666";
      ctx.font="18px 微软雅黑";
      ctx.fillText("适合的职业是",80,60);
      // 匹配职业
      ctx.fillStyle="#666";
      ctx.font="24px 微软雅黑";
      ctx.fillText("“护花使者”",60,100);
      // 职业
      let jobImg = new Image()
      jobImg.src = "http://oo6gk8wuu.bkt.clouddn.com/food3.png"
      ctx.drawImage(jobImg, 10, 120, 280, 180);
      // 二维码
      let qrCode = new Image()
      qrCode.src = "http://ow9z7qnv9.bkt.clouddn.com/%E4%BA%8C%E7%BB%B4%E7%A0%81%E8%AF%86%E5%88%AB.png"
      ctx.drawImage(qrCode, 40, 330, 220, 150);
      // 头像
      let image = new Image()
      image.src = "http://oo6gk8wuu.bkt.clouddn.com/food2.png"
      ctx.save(); // 保存当前ctx的状态
      ctx.arc(40, 40, 30, 0, Math.PI*2, true); //画出圆
      ctx.clip(); //裁剪上面的圆形
      image.onload = function() { //检测所有图像信息载入页面里
        ctx.drawImage(image, 10, 10, 70, 70);
      };
      // ctx.save();
      // ctx.restore()
      ctx.save();
      ctx.fill();
    }
  },
  mounted(){
    this.drawFn()
    this.$refs.output_img.src = this.$refs.canvas.toDataURL("image/png");
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
  /*z-index: -1*/
}
#canvas {
  /*z-index: 10;*/
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.output_img {
  position: absolute;
  width: 70%;
  top: 30%;
}
</style>
