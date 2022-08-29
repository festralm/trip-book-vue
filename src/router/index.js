import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from "../views/SignIn";
import SignUp from "../views/SignUp";
import Admin from "../views/Admin";
import AdminUser from "../views/AdminUser";
import AuthLayout from "../layouts/AuthLayout";
import DefaultLayout from "../layouts/DefaultLayout";

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
    ]
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

