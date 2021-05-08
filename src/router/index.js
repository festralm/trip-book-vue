import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from "../views/SignIn";
import SignUp from "../views/SignUp";
import AdminUsers from "../views/AdminUsers";
import Admin from "../views/Admin";
import AdminUser from "../views/AdminUser";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
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
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
  },
  {
    path: '/admin/users',
    name: 'Users',
    component: AdminUsers,
  },

  {
    path: '/admin/users/1',
    name: 'User',
    component: AdminUser

  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
