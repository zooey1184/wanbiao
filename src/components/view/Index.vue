<template>
  <div class="index-page">
    <img class="bg_img" src="http://image-cdn.10000dw.com/1CCFAA2B278A2BB1D4F5B08BCE1E48B8.png" alt="">
    <div class="header_pane">
      <img class="avatar_img" :src="avatar" alt="">
      <img class="header_title" src="../../assets/header.png" alt="">
    </div>
    <div class="upload_pane">
      <img class="upload_title" src="../../assets/upload_title.png" alt="">
      <div class="upload_img_pane">
        <img v-if="showImg" src="uploadImg" alt="">
        <div class="upload_component">
          <img class="plus_img" v-if="showloading" src="../../assets/icon-plus-thin.png" alt="">
          <img class="plus_img" v-else src="../../assets/loading.gif" alt="">
          <input type="file" class="up_file" ref="upImg" @change="uploadFn">
        </div>
      </div>
    </div>

    <div class="btn_pane">
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
    avatar: 'http://img.hb.aicdn.com/a28bc83d413930a3f22404cb03f0b842a8e9601b11131-vTisgv_fw658',
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
            this.infoData = {
              avatar: response.data.data.avatar,
              nickName: response.data.data.nickname
            }
            let infoDataJson = JSON.stringify(this.infoData)
            this.avatar = response.data.data.avatar
            this.set_data({
              avatar: response.data.data.avatar,
              nickName: response.data.data.nickname
            })
            localStorage.setItem('token', token)
            localStorage.setItem('infoData', infoDataJson)
            await this.attentionFn()
            console.log('授权success')
          }else {
            // 授权失败
            console.log('授权失败')
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
            console.log(res.data)
            this.info = res.data.data
					}else {
						console.log('faile')
            Toast.info({
              message: "当前网络不佳",
              duration: 2000
            })
					}
				}).catch(()=> {
          Toast.info({
            message: "当前网络不佳",
            duration: 2000
          })
					this.showloading = true
				})
			}else {
				this.showloading = true
			}

		}
  },
  created(){
    active.baseUrl().then((res)=> {
      console.log(res.data)
      sessionStorage.setItem('imgUrl', res.data)
    })
    // this.isAuth()
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
  top: 50px;
  width: 100%;
  text-align: center;
}
.avatar_img {
  position: absolute;
  top: 4px;
  left: 50%;
  transform: translate(-50%);
  width: 90px;
  height: 90px;
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
  top: 90px;
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
/*btn*/
.btn_pane {
  position: absolute;
  width: 88%;
  left: 6%;
  bottom: 50px;
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
