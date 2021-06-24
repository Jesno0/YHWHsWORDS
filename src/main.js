// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueSession from 'vue-session'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import Toast from './js/Toast'
// import Api from './js/Api'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueSession)
Vue.use(Toast)
// Vue.use(Api)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
