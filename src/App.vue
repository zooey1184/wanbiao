<template>
<div id="app">
  <transition :name='animate' :mode='mode'>
    <!-- <keep-alive> -->
      <router-view></router-view>
    <!-- </keep-alive> -->
  </transition>
</div>
</template>



<script>
export default {
  name: 'app',
  data: () => ({
    routerList: ["/"],
    animate: 'none',
    mode: 'in-out'
  }),
  watch: {
    $route: function(n, o) {
      if (_czc) {
        let location = window.location
        let content_url = location.pathname + location.hash
        let referer_url = '/'
        _czc.push(['_trackPageview', content_url, referer_url])
      }
      let rArr = this.routerList
      if (n.fullPath == "/") {
        this.routerList = ["/"]
        sessionStorage.setItem('routerList', JSON.stringify(['/']))
      }
      if (!!sessionStorage.getItem('routerList') && JSON.parse(sessionStorage.getItem('routerList')).length > 1) {
        rArr = JSON.parse(sessionStorage.getItem('routerList'))
      } else {
        sessionStorage.setItem('routerList', JSON.stringify(this.routerList))
      }
      // let rArr = this.routerList
      if (this.routerList.length == 0) {
        this.routerList.push(n.fullPath)
        sessionStorage.setItem('routerList', JSON.stringify(this.routerList))
      }
      let arr = []
      for (let a of rArr) {
        arr.push(a)
        if (a == n.fullPath) {
          // back
          this.animate = 'fade'
          this.mode = 'in-out'
          this.routerList = arr
          sessionStorage.setItem('routerList', JSON.stringify(arr))
          return
        } else {
          // go
          this.animate = 'fade'
          this.mode = 'in-out'
        }
      }
      this.routerList.push(n.fullPath)
      sessionStorage.setItem('routerList', JSON.stringify(this.routerList))
    }
  }
}
</script>



<style>
* {
  margin: 0;
  padding: 0;
  line-height: 1;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background: #f1f1f1;
}

/*下划线*/
.underline {
  position: relative;
}

.underline::after {
  position: absolute;
  content: "";
  bottom: 0;
  left: 0;
  height: 1px;
  background: #d5d5d5;
  width: 100%;
  transform: scaleY(0.5);
  transform-origin: 0 0;
}

/*前进*/
.go-enter-active,
.go-leave-active {
  transition: all 0.3s ease;
}
.go-enter,
.go-leave-to {
  transform: translateX(100%);
}

/*后退*/
.back-leave-active {
  transition: all 0.3s ease;
  z-index: 99
}
.back-enter {
  z-index: -1
}
.back-leave-to {
  transform: translateX(100%);
}

/*淡入淡出*/
.fade-enter-active {
  transition: all .2s ease;
}
.fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
/*bounce*/
.bounce-enter-active, .bounce-leave-active {
  transition: all 0.3s ease;
}
.bounce-enter, .bounce-leave-to {
  transform: scale(1.5);
  opacity: 0;
}
.filter {
  filter: blur(5px);
}
#cnzz_stat_icon_1265026873 {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
</style>
