import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '../store'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  // base: '/app',
  linkActiveClass: 'active',
  routes: routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.getters.isLogin) {
      next()
    } else {
      if (store.getters.password && localStorage.getItem('passwordxx')) {
        next({
          path: '/login',
          query: {redirect: to.fullPath}
        })
      } else {
        next({
          path: '/mobileLogin',
          query: {redirect: to.fullPath}
        })
      }
    }
  } else {
    if (to.name === 'Community') {
      next(false)
    } else {
      next()
    }
  }
})

export default router
