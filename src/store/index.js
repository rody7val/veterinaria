import Vue from 'vue'
import Vuex from 'vuex'
import VuexEasyFirestore from 'vuex-easy-firestore'
import fb from '../services/firebase'

import auth from './auth'
import clientes from './clientes'
import pacientes from './pacientes'
import entradas from './entradas'
import eventos from './eventos'

Vue.use(Vuex)

// do the magic 🧙🏻‍♂️
const easyFirestore = VuexEasyFirestore(
  [clientes, pacientes, entradas, eventos],
  {logging: true, FirebaseDependency: fb.firebase}
)

//console.log(JSON.stringify(process.env.QENV.FIREBASE_CONFIG))
fb.init(process.env.QENV.FIREBASE_CONFIG)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    plugins: [ easyFirestore ],

    modules: { auth },

    state: {
      title: 'CentralVet',
      drawer: false,
      drawerRight: false,
      modal: false,
      modalEvents: false,
      fullscreen: false,
      
      form: false,
      idEdit: '',
      edit: false,

      tab: '',
      cliente: null,
      paciente: null,
      entrada: null,
      evento: null,

      typeView: '',
      toggle: false,
      toggleDisabled: false,
      search: '',
      date: { from: '', to: '' },
      pagination: 3,
      progress: 0,
      slide: "",

      user: null,

      localeEsp: {
        /* starting with Sunday */
        days: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
        daysShort: 'Dom_Lun_Mar_Mié_Jue_Vie_Sáb'.split('_'),
        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
        monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_'),
        firstDayOfWeek: 1, // 0-6, 0 - Sunday, 1 Monday, ...
        format24h: true,
        pluralDay: 'dias'
      }
    },

    mutations: {
      //view
      setTypeView(state, type) {
        state.typeView = type
      },
      setCliente(state, cliente) {
        state.cliente = cliente
      },
      setPaciente(state, paciente) {
        state.paciente = paciente
      },
      setEntrada(state, entrada) {
        state.entrada = entrada
      },
      setEvento(state, evento) {
        state.evento = evento
      },
      //toggle
      toggleSearch(state, toggle) {
        state.toggle = toggle
      },
      toggleDisabled(state, toggle) {
        state.toggleDisabled = toggle
      },
      //search
      setSearch(state, search) {
        state.search = search
      },
      //date
      setDate(state, date) {
        state.date = date
      },
      //tab
      setTab(state, tab) {
        state.tab = tab
      },
      //title
      setTitle(state, title) {
        state.title = title
      },
      //drawer
      setDrawer(state, drawer) {
        state.drawer = drawer
      },
      setDrawerRight(state, drawer) {
        state.drawerRight = drawer
      },
      //modal
      setModal(state, modal) {
        state.modal = modal
      },
      //modalEvents
      setModalEvents(state, modal) {
        state.modalEvents = modal
      },
      //fullscreen
      setFullscreen(state, fullscreen) {
        state.fullscreen = fullscreen
      },
      //id Edit
      setIdEdit(state, id) {
        state.idEdit = id
      },
      //is edit
      setEdit(state, edit) {
        state.edit = edit
      },
      //handle done
      handleDone(state, {type, id}) {
        state[type].data[id].done = !state[type].data[id].done
      },
      //lists
      resetPagination(state) {
        state.pagination = 3
      },
      pushPagination(state, {type, qty}) {
        if(state.pagination + qty > Object.keys(state[type].data).length){
          state.pagination = Object.keys(state[type].data).length
        }
        state.pagination = state.pagination + qty
      },
      //form
      setForm(state, form) {
        state.form = form
      },
      //forms
      resetSearch(state) {
        state.search = ""
      },
      resetDate(state, date) {
        state.date = date
      },
      setProgress(state, progress) {
        state.progress = progress
      },
      //dash
      setSlide(state, slide) {
        state.slide = slide
      },
    },

    getters: {
      //clientes
      clientes: state => {//order by name
        return Object.values(state.clientes.data)
        .sort( ( a, b) => {
          return new Date(a.created_at.seconds*1000) - new Date(b.created_at.seconds*1000)
        })
        .slice(0)
        .slice(-state.pagination).reverse()
      },
      getClientesByName: (state) => {//search by name
        return Object.values(state.clientes.data)
        .filter(item => {
          if (item.name) {
            return item.name.toLowerCase().includes(state.search.toLowerCase())
          }
        })
        .sort( ( a, b) => {
          return new Date(a.created_at.seconds*1000) - new Date(b.created_at.seconds*1000)
        })
        .slice(0)
        .slice(-state.pagination).reverse()
      },
      getClientesByRangeDate: (state) => {//order by created_at
        return Object.values(state.clientes.data)
        .filter((item, index) => {
          if (state.date && state.date.from) {
            let date = new Date(item.created_at.seconds*1000)
            let from = new Date(state.date.from.split("/").reverse().join("/"))
            let to = new Date(state.date.to.split("/").reverse().join("/"))
            return date >= from && date <= to
          }
        })
        .sort( ( a, b) => {
          return new Date(a.created_at.seconds*1000) - new Date(b.created_at.seconds*1000)
        })
        .slice(0)
        .slice(-state.pagination).reverse()
      },

      //pacientes
      pacientes: state => {
        return Object.values(state.pacientes.data)
        .slice(0)
        .slice(-state.pagination).reverse()
      },
      getPacientesByName: (state) => {
        return Object.values(state.pacientes.data).filter(item => {
          if (item.name) {
            return item.name.toLowerCase().includes(state.search.toLowerCase())
          }
        })
        .slice(0)
        .slice(-state.pagination).reverse()
      },
      getPacientesByRangeDate: (state) => {//order by created_at
        return Object.values(state.pacientes.data)
        .filter((item, index) => {
          if (state.date && state.date.from) {
            let date = new Date(item.created_at.seconds*1000)
            let from = new Date(state.date.from.split("/").reverse().join("/"))
            let to = new Date(state.date.to.split("/").reverse().join("/"))
            return date >= from && date <= to
          }
        })
        .sort( ( a, b) => {
          return new Date(a.created_at.seconds*1000) - new Date(b.created_at.seconds*1000)
        })
        .slice(0)
        .slice(-state.pagination).reverse()
      },

      //entradas
      entradas: state => {
        return Object.values(state.entradas.data)
        .slice(0)
        .slice(-state.pagination).reverse()
      },
      getEntradasByName: (state) => {
        return Object.values(state.entradas.data).filter(item => {
          if (item.name) {
            return item.name.toLowerCase().includes(state.search.toLowerCase())
          }
        })
        .slice(0)
        .slice(-state.pagination).reverse()
      },
      getEntradasByRangeDate: (state) => {//order by created_at
        return Object.values(state.entradas.data)
        .filter((item, index) => {
          if (state.date && state.date.from) {
            let date = new Date(item.created_at.seconds*1000)
            let from = new Date(state.date.from.split("/").reverse().join("/"))
            let to = new Date(state.date.to.split("/").reverse().join("/"))
            return date >= from && date <= to
          }
        })
        .sort( ( a, b) => {
          return new Date(a.created_at.seconds*1000) - new Date(b.created_at.seconds*1000)
        })
        .slice(0)
        .slice(-state.pagination).reverse()
      },

      //eventos
      eventos: state => {
        return Object.values(state.eventos.data).length
      },
      getEventosByRangeDate: state => {//order by date
        return Object.values(state.eventos.data)
        .filter((item, index) => {
          if (state.date && state.date.from) {
            let date = new Date(item.start)
            let from = new Date(state.date.from.split("/").reverse().join("/"))
            let to = new Date(state.date.to.split("/").reverse().join("/"))
            return date >= from && date <= to
          }
        })
      },
      getEventosByRangeDateOnlyPending: state => {//order by date
        return Object.values(state.eventos.data)
        .filter((item, index) => {
          let date = new Date(item.start)
          let now = new Date()
          return item.task && date > now
        })
      },
      //counts
      getCountClientes: state => {
        return Object.keys(state.clientes.data).length
      },
      getCountPacientes: state => {
        return Object.keys(state.pacientes.data).length
      },
      getCountEntradas: state => {
        return Object.keys(state.entradas.data).length
      },
      getCountEventos: state => {
        return Object.values(state.eventos.data).filter((item, index) => {
          let date = new Date(item.start)
          let now = new Date()
          return !item.task && date > now
        }).length
      },
      getCountTareas: state => {
        return Object.values(state.eventos.data).filter((item, index) => {
          let date = new Date(item.start)
          let now = new Date()
          return item.task && date > now
        }).length
      },
    }

    // enable strict mode (adds overhead!)
    // for dev mode only
    //strict: process.env.DEBUGGING
  })

  return Store
}
