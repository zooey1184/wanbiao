<template>
  <div class="index-page">
    <img class="bg_img" src="http://image-cdn.10000dw.com/1CCFAA2B278A2BB1D4F5B08BCE1E48B8.png" alt="">
    <div class="header_pane">
      <img class="avatar_img" :src="avatar" alt="">
      <img class="header_title" src="../../assets/header.png" alt="">
    </div>
    <div class="upload_pane">
      <img class="upload_title" v-if="!showImg" src="../../assets/upload_title.png" alt="">
      <img class="upload_title" v-else src="../../assets/upload_watch.png" alt="">
      <div class="upload_img_pane">
        <img class="upload_showImg" v-if="showImg" :src="uploadImg" alt="">
        <div v-else class="upload_component">
          <img class="plus_img" v-if="showloading" src="../../assets/icon-plus-thin.png" alt="">
          <img class="plus_img" v-else src="../../assets/loading.gif" alt="">
          <input type="file" class="up_file" ref="upImg" @change="uploadFn">
        </div>
      </div>
    </div>

    <div class="btn_pane" @click="testNowFn">
      <img class="btn_img" src="../../assets/btn.png" alt="">
      <p>开始测试</p>
    </div>
  </div>
</template>

<script>
import mixin from '@/js/mixin'
import wechat from '@/api/wechat'
import active from '@/api/active'
import Toast from 'v-toast'
import {mapActions, mapGetters} from 'vuex'

export default {
  data: ()=> ({
    avatar: '',
    uploadImg: '',
    showImg: false,
    showloading: true,
    infoData: {},
    infoImg: {}
  }),
  mixins: [mixin],
  methods: {
    ...mapActions([
      'set_data',
    ]),
    isAuth(){
      if(!!sessionStorage.getItem('auth') && sessionStorage.getItem('auth')!=''){
        let query = this.$route.query
        wechat.callback({code: query.code, state: query.state}).then(async response=> {
          if(response.data.code==0){
            // 授权成功
            console.log(response.data)
            let token = response.data.data.token
            let session = sessionStorage.getItem('imgUrl') || 'http://oxqznezzf.bkt.clouddn.com'
            this.infoData = {
              avatar: `${session}/${response.data.data.avatar}`,
              nickName: response.data.data.nickname
            }
            let infoDataJson = JSON.stringify(this.infoData)
            this.avatar = `${session}/${response.data.data.avatar}`,
            this.set_data({
              avatar: `${session}/${response.data.data.avatar}`,
              nickName: response.data.data.nickname
            })
            localStorage.setItem('token', token)
            localStorage.setItem('infoData', infoDataJson)
            await this.attentionFn()
            console.log('授权success')
          }else {
            // 授权失败
            console.log('授权失败')
            if(!!localStorage.getItem('infoData')){
              this.avatar = JSON.parse(localStorage.getItem('infoData')).avatar
            }
          }
        })
        return
      }else {
        this.$router.push('middle')
      }
    },
    uploadFn(){
			this.showloading = false
			if(this.$refs.upImg.files.length>0){
				let file = this.$refs.upImg.files[0]
				let a = {
					file: file
				}
				active.insertImg(a).then(res=> {
					if(res.data.code==0){
						this.showloading = true
            this.showImg = true
            console.log(res.data)
            this.info = res.data.data
            this.uploadImg = `${sessionStorage.getItem('imgUrl')}/${res.data.data.uploadPath}`
            let jobObj = {
              job: res.data.data.name,
              img: res.data.data.path
            }
            sessionStorage.setItem('job', JSON.stringify(jobObj))
					}else {
            this.showImg = false
            Toast.info({
              message: "当前网络不佳",
              duration: 2000
            })
					}
				}).catch(()=> {
          window.location.href = 'https://www.wbiao.cn'
          Toast.info({
            message: "当前网络不佳",
            duration: 2000
          })
					this.showloading = true
				})
			}else {
				this.showloading = true
        window.location.href = 'https://www.wbiao.cn'
			}
		},
    testNowFn(){
      if(this.showImg){
        this.$router.push('/result')
      }else {
        Toast.info({
          message: "请上传您的图片",
          duration: 2000
        })
      }
    }
  },
  created(){
    active.baseUrl().then((res)=> {
      console.log(res.data)
      sessionStorage.setItem('imgUrl', res.data.data)
    }).then(()=> {
    	this.isAuth()
    	if(!!localStorage.getItem('infoData')){
	      this.avatar = JSON.parse(localStorage.getItem('infoData')).avatar
	    }
    })
    
    
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
/*头像*/
.header_pane {
  position: relative;
  top: 30px;
  width: 100%;
  text-align: center;
}
.avatar_img {
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translate(-50%);
  width: 84px;
  height: 84px;
  border-radius: 50%;
}
.header_title {
  width: 90%;
}
/*上传*/
.upload_pane {
  position: relative;
  width: 300px;
  left: 50%;
  transform: translate(-50%);
  height: 260px;
  background: #ddd;
  top: 70px;
  border-radius: 5px;
}
.upload_title {
  position: absolute;
  top: -19px;
  left: 50%;
  transform: translate(-50%);
  width: 70%;
}
.upload_img_pane {
  position: absolute;
  width: 260px;
  height: 220px;
  border: 2px dashed #000;
  border-radius: 5px;
  left: 20px;
  top: 20px;
}
.upload_showImg {
  width: 100%;
  border-radius: 5px;
  height: 100%;
}
.upload_component {
  width: 160px;
  height: 120px;
  border: 2px solid #444;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
}
.plus_img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.upload_component input {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
}
@media screen and (max-width: 320px) {
  .upload_pane {
    width: 280px;
    height: 260px;
    top: 35px;
  }
  .upload_img_pane {
    width: 240px;
  }
  .avatar_img {
    width: 74px;
    height: 74px;
    top: 5px;
  }
  .header_pane {
    top: 5px;
  }
}
@media screen and (min-width: 400px) {
  .upload_pane {
    width: 280px;
    height: 260px;
    top: 95px;
  }
  .upload_img_pane {
    width: 240px;
  }
  .avatar_img {
    width: 93px;
    height: 93px;
    top: 7px;
  }
  .header_pane {
    top: 50px;
  }
}
/*btn*/
.btn_pane {
  position: absolute;
  width: 88%;
  left: 6%;
  bottom: 20px;
}
.btn_pane img {
  width: 100%;
}
.btn_pane p {
  position: absolute;
  top: 44%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 0;
  color: #fff;
  font-size: 16px;
  font-family: "微软雅黑";
  font-weight: lighter;
  letter-spacing: 4px;
}
</style>
