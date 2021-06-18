import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/pages/Index'
import Bible from '@/components/pages/Bible'
import Tool from '@/components/pages/Tool'
import Mine from '@/components/pages/Mine'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/bible',
      name: 'Bible',
      component: Bible
    },
    {
      path: '/tool',
      name: 'Tool',
      component: Tool
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    }
  ]
})
