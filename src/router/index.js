import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory
} from 'vue-router'
import routes from './routes'


import { useUserStore } from 'src/stores/user'

export default defineRouter(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history'
        ? createWebHistory
        : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })
Router.beforeEach((to, from, next) => {
  const store = useUserStore()
  const isLoggedIn = !!store.currentUser
  const isLoginPage = to.name === 'LoginPage'
  const cameFromLoginPage = from.name === 'LoginPage'

  // ❌ Not logged in and trying to access a protected page
  if (!isLoggedIn && to.meta.requiresAuth) {
    return next({ name: 'LoginPage' })
  }

  // ✅ Enforce: must come from login page to access dashboards
  if (
    isLoggedIn &&
    (to.name === 'AdminDashboard' || to.name === 'UserDashboard') &&
    !cameFromLoginPage
  ) {
    return next({ name: 'LoginPage' })
  }

  next()
})



  return Router
})
