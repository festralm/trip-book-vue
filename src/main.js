import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from "vuex";
import PortalVue from "portal-vue";
import {BootstrapVue, IconsPlugin} from "bootstrap-vue";
import VueRouter from "vue-router";
import 'bootstrap/dist/css/bootstrap.css'
import VCalendar from 'v-calendar';
import vuetify from 'vuetify' // path to vuetify export
import Calendar from 'v-calendar/lib/components/calendar.umd'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import VueModalTor from "vue-modaltor/dist/vue-modaltor.common";
import "vue-modaltor/dist/vue-modaltor.css";
import VueGeolocation from 'vue-browser-geolocation';
import * as VueGoogleMaps from 'vue2-google-maps';
import GmapCluster from 'vue2-google-maps/dist/components/cluster' // replace src with dist if you have Babel issues


Vue.use(VueRouter)
Vue.use(PortalVue)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuex)
Vue.use(VCalendar);
Vue.use(VueModalTor, {
  bgPanel: "#7957d5"  // add custome options
});
Vue.component('calendar', Calendar)
Vue.component('date-picker', DatePicker)
Vue.use(VueGeolocation)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyA0TS0PmrFkAAVD0QrbWPM8lRoO9JbxaEU',
    region: 'RU',
    language: 'ru',
  },
  // installComponents: false,
})
Vue.component('GmapCluster', GmapCluster)

const store = new Vuex.Store({
  state: {
    menuShow: false,
    menuDriver: false,
    menuNotDriver: false,
    token: localStorage.getItem('token'),
    authorised: localStorage.getItem('authorised'),
    isAdmin: localStorage.getItem('isAdmin'),
    users: [],
    fixed: true,
    transportForm: {
      'type': 1,
      'withDriver': true,
      'brand': 0,
      'model': 0,
      'name': '',
      'price': '',
      'forHour': 'null',
      'description': '',
      'start': null,
      'finish': null,
      'carPhotoUrls': [],
      'range': null,
      'lat': null,
      'lng': null
    },
    cars: [],
    addresses: [],
    carSearch: {
      start: null,
      finish: null,
      brand: 0,
      model: 0
    },
    chosenCar: null,
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
