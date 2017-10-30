import wechat from '@/api/wechat'
import {mapGetters, mapActions} from 'vuex'

export default {
  data: ()=> ({
    attention: 0
  }),
  methods: {
    ...mapActions([
      'set_attention',
      'set_share',
    ]),
    // 获取签名
    getSign(){
      let data = {url: location.href.split('#')[0]}
      console.log('%c 提示：url', 'color: #d43f33')
      return wechat.sign(data)
    },
    // 是否微信登陆
    isWeiXin() {
      let weixinDevice = true
      let ua = window.navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i)=='micromessenger'){
        weixinDevice = true
      }else {
        weixinDevice = false
      }
      return weixinDevice
    },
    // 授权
    auth(){
      //let obj = {type: type}
      let query = this.$route.query
      if(!!sessionStorage.getItem('auth') && sessionStorage.getItem('auth')=='true'){
        console.log('执行了auth的callback')
        this.callback({code: query.code, state: query.state})
        return
      }else {
        if(!!query.code){
          console.log('执行了code的callback')
          this.callback({code: query.code, state: query.state})
        }else {
          wechat.auth(obj).then(res=> {
            if(res.data.code==0){
              let url = res.data.data
              sessionStorage.setItem('auth', 'true')
              window.location.href = url
            }
          })
        }
      }
    },
    callback(obj={}){
      return wechat.callback(obj).then(response=> {
        if(response.data.code==0){
          // 授权成功
          console.log(response.data)
          this.attentionFn()
          console.log('授权success')
        }else {
          // 授权失败
          console.log('授权失败')
        }
      })
    },
    // 分享
    wxshare(title, desc, link, imgUrl, callback) {
      let self = this
      wx.ready(function() {
        wx.onMenuShareTimeline({
          title: title,   // 分享标题
          desc: desc,     // 分享描述
          link: link,     // 分享链接
          imgUrl: imgUrl, // 分享图标
          success: function() {
            callback();
            console.log(link)
            self.set_share(false)
          },
          cancel: function() {
          	self.set_share(false)
          }
        });
        wx.onMenuShareAppMessage({
          title: title,
          desc: desc,
          link: link,
          imgUrl: imgUrl,
          success: function() {
            callback();
            console.log(link)
            self.set_share(false)
          },
          cancel: function() {self.set_share(false)}
        });
      });
    },
    // 调用分享
    wxShare(title='一个很准的职业测试', desc='你的手表暴露了一切，试试你适合什么职业', link="http://game.wbiao.com.cn/#/", imgUrl='http://ow9z7qnv9.bkt.clouddn.com/watch.png') {
      this.getSign().then(responce=> {
        if (responce.data.code == 0) {
          console.log('%c 提示：code', 'color: #d43f33')
          let data = responce.data.data
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wxe0318015e3c2c73e', // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名，见附录1
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          this.wxshare( title, desc, link, 'http://ow9z7qnv9.bkt.clouddn.com/watch.png', function() {
              console.log("分享成功");
            }
          );
        } else {
          alert(responce.data.userMessage);
        }
      })
    },
    attentionFn(){
      wechat.careWeb().then(care=> {
        if(care.data.code==0){
          if(care.data.data==1){
            this.attention = 1
            sessionStorage.setItem('attention', 1)
            this.set_attention(1)
          }else {
            this.attention = 0
            sessionStorage.setItem('attention', 0)
            this.set_attention(0)
          }
        }
      })
    }
  }
}
