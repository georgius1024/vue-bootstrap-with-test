import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

function load (component) {
  return require(`@/pages/${component}.vue`).default
}

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    if (store.getters.mustChangePassword) {
      store.commit('setError', 'Необходимо сменить пароль!')
      next('/reset-password')
    } else {
      next()
    }
    return
  }
  next('/login')
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: load('root'),
      beforeEnter: ifAuthenticated
    },
    {
      path: '/profile',
      name: 'profile',
      component: load('profile'),
      beforeEnter: ifAuthenticated
    },
    {
      path: '/logout',
      name: 'logout',
      component: load('logout'),
      beforeEnter: ifAuthenticated
    },
    {
      path: '/login',
      name: 'login',
      component: load('login'),
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/change-password',
      name: 'change-password',
      component: load('change-password'),
      beforeEnter: ifAuthenticated
    },
    {
      path: '/about',
      name: 'about',
      component: load('about'),
      beforeEnter: ifAuthenticated
    }
  ]
})
