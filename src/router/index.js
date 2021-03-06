import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import mains from '@/pages/mains'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
      // component: () => import('@/pages/index')
    },
    {
      path: '/mains',
      name: 'mains',
      component: mains
      // component: () => import('@/pages/mains')
    }
  ]
})
