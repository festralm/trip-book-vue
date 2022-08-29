import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from "vuex";
import PortalVue from "portal-vue";
import {BootstrapVue, IconsPlugin} from "bootstrap-vue";
import VueRouter from "vue-router";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(VueRouter)
Vue.use(PortalVue)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('token'),
    authorised: localStorage.getItem('authorised'),
    user: localStorage.getItem('user'),
    users: []
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
