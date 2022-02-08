import Vue from 'vue'
import Vuex from 'vuex'
import VuexEasyFirestore from 'vuex-easy-firestore'
import fb from '../services/firebase'

import clientes from './clientes'

Vue.use(Vuex)

// do the magic 🧙🏻‍♂️
const easyFirestore = VuexEasyFirestore(
  [clientes],
  {logging: true, FirebaseDependency: fb.firebase}
)

//console.log(JSON.stringify(process.env.QENV.FIREBASE_CONFIG))
fb.init(process.env.QENV.FIREBASE_CONFIG)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    plugins: [ easyFirestore ],

    //modules: { clientes },

    state: {
      paginationBlock: 7,
    },

    mutations: {
      handleDoneClientes(state, id) {
        state.clientes.data[id].done = !state.clientes.data[id].done
      },
      pushPaginationBlock(state, qty) {
        if(state.paginationBlock + qty > Object.keys(state.clientes.data).length){
          state.paginationBlock = Object.keys(state.clientes.data).length
        }
        state.paginationBlock = state.paginationBlock + qty
      }
    },

    getters: {
      clientes: state => {
        //ultimos 7
        return Object.values(state.clientes.data).slice(0).slice(-state.paginationBlock).reverse()
      },
      getClientesByName: (state) => (search) => {
        return Object.values(state.clientes.data).filter(item => {
          return item.name.toLowerCase().includes(search.toLowerCase())
        })
      },
    }
    // enable strict mode (adds overhead!)
    // for dev mode only
    //strict: process.env.DEBUGGING
  })

  return Store
}
