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
import ZeroStep0 from "@/layouts/create_transport/ZeroStep0";
import Type1 from "@/layouts/create_transport/Type1";
import WithDriver2 from "@/layouts/create_transport/WithDriver2";
import Brand3 from "@/layouts/create_transport/Brand3";
import Model4 from "@/layouts/create_transport/Model4";
import Address5 from "@/layouts/create_transport/Address5";
import Final from "@/layouts/create_transport/Final";
import Car from "@/views/Car";

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
        path: '/transports/cars/:id',
        name: 'Car',
        component: Car
      },
      {
        path: '/rent-transport',
        name: 'RentTransport',
        component: RentTransport,
        children: [
          {
            path: '/rent-transport',
            name: 'RentTransportZero',
            component: ZeroStep0,
          },
          {
            path: '/rent-transport',
            name: 'RentTransportOne',
            component: Type1,
          },
          {
            path: '/rent-transport',
            name: 'RentTransportTwo',
            component: WithDriver2,
          },
          {
            path: '/rent-transport',
            name: 'RentTransportThree',
            component: Brand3,
          },
          {
            path: '/rent-transport',
            name: 'RentTransportFour',
            component: Model4,
          },
          {
            path: '/rent-transport',
            name: 'RentTransportFive',
            component: Address5,
          },
          {
            path: '/rent-transport',
            name: 'RentTransportSix',
            component: Final,
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

