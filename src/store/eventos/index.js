//import state from './state'
//import mutations from './mutations'
//import actions from './actions'

export default {
  firestorePath: 'eventos',
  firestoreRefType: 'collection', // or 'doc'
  moduleName: 'eventos',
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