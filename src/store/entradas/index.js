//import state from './state'
//import mutations from './mutations'
//import actions from './actions'

export default {
  firestorePath: 'entradas',
  firestoreRefType: 'collection', // or 'doc'
  moduleName: 'entradas',
  statePropName: 'data',
  namespaced: false,
  sync: {
    preventInitialDocInsertion: true,
  },
  //_
  //state,
  //getters,
  //mutations,
  //actions,
}