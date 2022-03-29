import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from '../services/firebase.js'
import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function ({ store }/*ssrContext*/) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,
    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  //handler router
  Router.beforeEach((to, from, next) => {
    if (!firebase.auth().currentUser) {
      //auth strict
      if ( to.matched.some(record => record.meta.requiresAuth) ){
        return next({
          path: '/auth',
          query: { redirect: to.fullPath }
        })
      }
      //admin strict
      if (to.matched.some(record => record.meta.adminStrict) ) {
        return next({
          path: '/auth',
          query: { redirect: to.fullPath }
        })
      }
      //public strict
      if (to.matched.some(record => record.meta.publicStrict)) {
        return next()
      }
    }

    //auth strict
    if ( to.matched.some(record => record.meta.requiresAuth && store.state.auth.isAuthenticated) ){
      return next()
    }
    //admin strict
    if (to.matched.some(record => record.meta.adminStrict && store.state.auth.isAdmin) ) {
      return next()
    }
    //public strict
    if (to.matched.some(record => record.meta.publicStrict)) {
      return next({ path: '/' })
    }

    next()
  })

  return Router
}
