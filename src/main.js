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
    menuShow: false,
    menuDriver: false,
    menuNotDriver: false,
    token: localStorage.getItem('token'),
    authorised: localStorage.getItem('authorised'),
    isAdmin: localStorage.getItem('isAdmin'),
    users: [],
    transportForm: {
      'type': 1,
      'withDriver': true,
      'brand': 0,
      'model': 0,
      'forHour': null,
      'name': '',
      'description': '',
      'start': null,
      'finish': null,
      'photos': [],
    },
    cars: [],
    addresses: [],
    car: []
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
