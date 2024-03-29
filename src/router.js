import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login'
import Guest from './views/Guestroomm/Guest'
import OpenGuestroom from './views/Guestroomm/OpenGuestroom'
import Historires from './views/history/Historires'
import HistoryInfo from './views/history/HistoryInfo'
import Sysinfo from './views/Sysinfo'

Vue.use(Router)

let route = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/guest', // 开退房管理
      name: 'guest',
      component: Guest
    },
    {
      path: '/openGuestroom/:gid', // 开房详情
      name: 'openGuestroom',
      component: OpenGuestroom
    },
    {
      path: '/history/:hid', // 开房详情
      name: 'history',
      component: HistoryInfo
    },
    {
      path: '/histories', // 历史记录
      name: 'histories',
      component: Historires
    },
    {
      path: '/sysinfo', // 历史记录
      name: 'sysinfo',
      component: Sysinfo
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

route.beforeEach((to, from, next) => {
  let dhRoles = sessionStorage.getItem('hotel_roles')
  let dhNames = sessionStorage.getItem('hotel_names')
  // 获取用户权限信息，为空即没登录，跳转至登录页
  if (dhRoles && dhNames) {
    route.app.$options.store.state.roles = dhRoles
    route.app.$options.store.state.names = dhNames
  }
  if (to.path === '/login') {
    console.log('未登录,跳转至至login')
    if (dhRoles && dhNames) {
      next('home')
    } else {
      next()
    }
  } else {
    // 获取store中数据roles
    let role = route.app.$options.store.state.roles
    let name = route.app.$options.store.state.names
    console.log()
    if (role === '' || name === '') {
      console.log('role或name为空')
      next('/login')
    } else {
      console.log('继续')
      next()
    }
  }
})
export default route
