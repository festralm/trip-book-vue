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
import WithDriver2 from "@/layouts/create_transport/WithDriver2";
import Brand3 from "@/layouts/create_transport/Brand3";
import Model4 from "@/layouts/create_transport/Model4";
import Address5 from "@/layouts/create_transport/Address5";
import Final from "@/layouts/create_transport/Final";
import Car from "@/views/Car";
import Error from "../views/Error";
import Wishlist from "../layouts/Wishlist";
import MyTransport from "../layouts/MyTransport";
import Trips from "../layouts/Trips";
import MyProfile from "../layouts/MyProfile";
import UsersProfile from "../layouts/UsersProfile";
import AdminCar from "../views/AdminCar";
import AdminCars from "../views/AdminCars";
import CarSearch from "../views/CarSearch";
import Messages from "../views/Messages";
import Notifications from "../views/Notifications";

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
        path: '/admin/cars',
        name: 'AdminCars',
        component: AdminCars,
      },
      {
        path: '/admin/users/:id',
        name: 'AdminUser',
        component: AdminUser
      },
      {
        path: '/admin/cars/:id',
        name: 'AdminCar',
        component: AdminCar
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
      {
        path: '/error/default',
        name: 'Error',
        component: Error,
      },
      {
        path: '/wishlist',
        name: 'Wishlist',
        component: Wishlist,
      },
      {
        path: '/trips',
        name: 'Trips',
        component: Trips,
      },
      {
        path: '/my-transport',
        name: 'MyTransport',
        component: MyTransport,
      },
      {
        path: '/profile',
        name: 'MyProfile',
        component: MyProfile,
      },
      {
        path: '/users/:id',
        name: 'UsersProfile',
        component: UsersProfile,
      },
      {
        path: '/search',
        name: 'CarSearch',
        component: CarSearch,
      },
      {
        path: '/messages',
        name: 'Messages',
        component: Messages,
      },
      {
        path: '/messages/:id',
        name: 'Messages',
        component: Messages,
      },
      {
        path: '/notifications',
        name: 'Notifications',
        component: Notifications,
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

