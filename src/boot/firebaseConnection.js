import firebase from '../services/firebase'
import { date } from 'quasar'

export default async ({router, store}) => {
  //firebase.init(process.env.QENV.FIREBASE_CONFIG)
  // Tell the application what to do when the 
  // authentication state has changed
  firebase.auth().onAuthStateChanged((user) => {
    const initialAuthState = firebase.isAuthenticated(store)
    const redirect = router.history.current.query ? router.history.current.query.redirect : null
    store.commit('auth/setLoad', false)

    if (redirect) {
      router.push({ path: redirect || "/" })
    }

    if (user) {
      // Save user in store
      store.commit('auth/setAuthState', {
        isAuthenticated: user !== null,
        isAdmin: store.state.auth.admins.some(admin => admin === user.email),
        user: user,
      })
      // calculate current month and year
      const today = new Date()
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
      const lastDay = new Date(today.getFullYear(), today.getMonth()+1, 0)
      const getFormatDate = (time, format) => {
        return date.formatDate(time, format, store.state.localeEsp)
      }
      const _date = {
        from: getFormatDate(firstDay, 'DD/MM/YYYY'),
        to: getFormatDate(lastDay, 'DD/MM/YYYY'),
      }
      // sync firestoreDB
      const name = ['name']
      const created_at = ['created_at']
      store.dispatch('clientes/openDBChannel', { clauses: {created_at} })
      store.dispatch('pacientes/openDBChannel', { clauses: {name} })
      store.dispatch('entradas/openDBChannel', { clauses: {created_at} })
      store.dispatch('eventos/openDBChannel', { clauses: {created_at} })
      // set default date
      store.commit('setDate', _date)
      // set charts
      //Vue.use(VueDygraphs)

      //public strict redirect
      const publicStrict = router.history.current.meta
        && router.history.current.meta.publicStrict
          ? router.history.current.meta.publicStrict
          : null
      if (publicStrict) {
        router.push({ path: "/" })
      }
    }
    //1st auth
    if (user && initialAuthState) {
      console.log("1st ", initialAuthState)
    }

    // If the user loses authentication route
    // them go to home
    if (!user && initialAuthState) {
      store.commit('auth/setAuthState', {
        isAuthenticated: false,
        user: false,
        isAdmin: false
      })
      router.push({ path: '/' })
    }
  }, (error) => {
    console.error(error)
    // close sync
    store.dispatch('clientes/closeDBChannel', { clearModule: true })
    store.dispatch('pacientes/closeDBChannel', { clearModule: true })
    store.dispatch('entradas/closeDBChannel', { clearModule: true })
  })
}