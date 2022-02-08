//import state from './state'
//import mutations from './mutations'
//import actions from './actions'

export default {
  firestorePath: 'clientes',
  firestoreRefType: 'collection', // or 'doc'
  moduleName: 'clientes',
  statePropName: 'data',
  namespaced: true,
  sync: {
    preventInitialDocInsertion: true,
  },
  //_
  //state,
  //getters,
  //mutations,
  //actions,
}