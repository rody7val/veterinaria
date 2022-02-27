//import state from './state'
//import mutations from './mutations'
//import actions from './actions'

export default {
  firestorePath: 'pacientes',
  firestoreRefType: 'collection', // or 'doc'
  moduleName: 'pacientes',
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