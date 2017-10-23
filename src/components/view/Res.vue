<template>
  <div class="res_page">
    <img class="bg_img" src="http://image-cdn.10000dw.com/1CCFAA2B278A2BB1D4F5B08BCE1E48B8.png" alt="">
    <div class="img_pane" v-if="showImg">
      <img class="avatar" ref="img" :src="image">
      <div class="jobpane">
        <p>{{nickName}}</p>
        <h4>适合的职业是</h4>
        <h3>"{{job}}"</h3>
      </div>
      <img class="jonimg" :src="jobImg">
      <img class="qrCodeImg" src="http://ow9z7qnv9.bkt.clouddn.com/%E4%BA%8C%E7%BB%B4%E7%A0%81%E8%AF%86%E5%88%AB.png">
    </div>
    
  </div>
</template>

<script>
export default {
  data: ()=> ({
    image: '',
    job: '',
    nickName: '',
    jobImg: '',
    showImg: true
  }),
  methods: {
    
  },
  created(){
    let info = JSON.parse(localStorage.getItem('infoData'))
    let job = JSON.parse(sessionStorage.getItem('job'))
    this.nickName = info.nickName
    this.image = info.avatar
    this.job = job.job
    this.jobImg = `${sessionStorage.getItem('imgUrl')}/${job.img}`

  },
  mounted(){
    // setTimeout(()=> {
    //   this.showImg = true
    // }, 20)
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
.img_pane {
  position: absolute;
  width: 84%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  left: 50%;
  min-height: 80%;
  background: #ddd;
}
.avatar {
  position: absolute;
  left: 20px;
  top: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.jobpane {
  position: absolute;
  top: 30px;
  left: 100px;
  font-family: "微软雅黑";
  font-weight: lighter;
  color: #999;
}
.jobpane h4 {
  margin: 10px 0;
}
.jobpane h3 {
  color: #666;
}
.jonimg {
  position: absolute;
  top: 115px;
  width: 84%;
  left: 50%;
  transform: translate(-50%);
}
.qrCodeImg {
  position: absolute;
  width: 65%;
  bottom: 18px;
  left: 50%;
  transform: translate(-50%);
}
</style>
