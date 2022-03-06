import firebase from '../services/firebase'
import { date } from 'quasar'

export default async ({router, store}) => {
  //firebase.init(process.env.QENV.FIREBASE_CONFIG)
  // Tell the application what to do when the 
  // authentication state has changed
  firebase.auth().onAuthStateChanged((user) => {
    const today = new Date()
    const first = new Date(today.getFullYear(), today.getMonth(), 1)
    const last = new Date(today.getFullYear(), today.getMonth()+1, 0)
    const getFormatDate = (time, format) => {
      return date.formatDate(time, format, store.state.localeEsp)
    }
    const _date = {
      from: getFormatDate(first, 'DD/MM/YYYY'),
      to: getFormatDate(last, 'DD/MM/YYYY'),
    }
    // sync firestoreDB.clientes
    const name = ['name']
    const created_at = ['created_at']
    store.dispatch('clientes/openDBChannel', { clauses: {created_at} })
    store.dispatch('pacientes/openDBChannel', { clauses: {name} })
    store.dispatch('entradas/openDBChannel', { clauses: {created_at} })
    // set default date
    store.commit('setDate', _date)
    // set charts
    //Vue.use(VueDygraphs)
    //store.commit('auth/setAuthState', { user })
    //store.commit('auth/setAdmin', { isAdmin: user.admin })
    //store.state.user = user !== null
    //store.state.user.admin = user.admin || null
    //store.commit('auth/setAuthState', {
    //  isAuthenticated: user !== null,
    //  user: user
    //})
    //Vue.prototype.$user = user
    //firebase.handleOnAuthStateChanged(router, store, user)
  }, (error) => {
    console.error(error)
    // close sync
    store.dispatch('clientes/closeDBChannel', { clearModule: true })
  })

  //$q.$fb = fb
  //store.$fb = fb
}