import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/pages/Index'
import Bible from '@/components/pages/Bible'
import Tool from '@/components/pages/Tool'
import Mine from '@/components/pages/Mine'
import Profile from '@/components/pages/Profile'
import Statistics from '@/components/pages/Statistics'
import Software from '@/components/pages/Software'
import Reference from '@/components/pages/Reference'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      icon: "el-icon-s-home",
      component: Index
    },
    {
      path: '/bible',
      name: '圣经',
      icon: "el-icon-reading",
      component: Bible
    },
    {
      path: '/tool',
      name: '工具',
      icon: "el-icon-s-goods",
      component: Tool,
      children: [{
        path: '/tool/software',
        name: '工具软件',
        component: Software
      },{
        path: '/tool/reference',
        name: '参考资料',
        component: Reference
      }]
    },
    {
      path: '/mine',
      name: '我的',
      icon: "el-icon-user-solid",
      component: Mine,
      children: [{
        path: '/mine/profile',
        name: '个人信息',
        component: Profile
      },{
        path: '/mine/statistics',
        name: '打卡统计',
        component: Statistics
      }]
    }
  ]
})
