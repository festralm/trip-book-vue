import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from './router'
import PortalVue from 'portal-vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(PortalVue)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuex)
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || ' ',
    authorised: false
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
