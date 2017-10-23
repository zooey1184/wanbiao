import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Middle from '@/components/view/Middle'
import Result from '@/components/view/Result'
import Res from '@/components/view/Res'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/middle',
      component: Middle,
    },
    {
      path: '/result',
      component: Result
    },
    {
      path: '/res',
      component: Res
    }
  ]
})
