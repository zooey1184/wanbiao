<template>
<div class="middle-page">
  <div class="img_pane">
    <img src="http://image-cdn.10000dw.com/1CCFAA2B278A2BB1D4F5B08BCE1E48B8.png" alt="">

  </div>
</div>
</template>

<script>
import mixin from '@/js/mixin'
import wechat from '@/api/wechat'
import common from '@/js/common'

export default {
  mixins: [mixin],
  methods: {
    authFn() {
      let obj = {}
      let query = this.$route.query
      wechat.auth(obj).then(res => {
        if (res.data.code == 0) {
          let url = res.data.data
          sessionStorage.setItem('auth', 'true')
          window.location.href = url
        }
      })
    },
  },
  created() {
    this.authFn()
  }
}
</script>

<style scoped>
.middle-page {
  position: absolute;
  height: 100%;
  width: 100%;
  background: #171516
}
.img_pane img {
  position: absolute;
  width: 100%;
  height: 100%
}
</style>
