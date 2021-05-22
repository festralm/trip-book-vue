import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from "../views/SignIn";
import SignUp from "../views/SignUp";
import Admin from "../views/Admin";
import AdminUser from "../views/AdminUser";
import AuthLayout from "../layouts/AuthLayout";
import DefaultLayout from "../layouts/DefaultLayout";
import RentTransport from "@/views/RentTransport";
import ZeroStepLayout from "@/layouts/ZeroStepLayout";
import FirstStepLayout from "@/layouts/FirstStepLayout";
import SecondStepLayout from "@/layouts/SecondStepLayout";
import ThirdStepLayout from "@/layouts/ThirdStepLayout";
import ForthStepLayout from "@/layouts/ForthStepLayout";
import FifthStepLayout from "@/layouts/FifthStepLayout";
import FinalStepLayout from "@/layouts/FinalStepLayout";

Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  {
    path: '/',
    name: 'Default',
    component: DefaultLayout,
    meta: {
      reload: true,
    },
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
          reload: true,
        },
      },
      {
        path: '/',
        name: 'AuthLayout',
        component: AuthLayout,
        children: [
          {
            path: '/sign-in',
            name: 'SignIn',
            component: SignIn
          },
          {
            path: '/sign-up',
            name: 'SignUp',
            component: SignUp,
          },

        ]
      },
      {
        path: '/admin',
        name: 'Admin',
        component: Admin,
      },
      {
        path: '/admin/users/:id',
        name: 'AdminUser',
        component: AdminUser
      },
      {
        path: '/rent-transport',
        name: 'RentTransport',
        component: RentTransport,
        children: [
          {
            path: '/rent-transport',
            name: 'RentTransportZero',
            component: ZeroStepLayout,
          },
          {
            path: '/rent-transport',
            name: 'RentTransportOne',
            component: FirstStepLayout,
          },
          {
            path: '/rent-transport',
            name: 'RentTransportTwo',
            component: SecondStepLayout,
          },
          {
            path: '/rent-transport',
            name: 'RentTransportThree',
            component: ThirdStepLayout,
          },
          {
            path: '/rent-transport',
            name: 'RentTransportFour',
            component: ForthStepLayout,
          },
          {
            path: '/rent-transport',
            name: 'RentTransportFive',
            component: FifthStepLayout,
          },
          {
            path: '/rent-transport',
            name: 'RentTransportSix',
            component: FinalStepLayout,
          },
        ]
      },
    ]
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash,
        behavior: 'smooth'
      }
    }
  }
})

export default router

