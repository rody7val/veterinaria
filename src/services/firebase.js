import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'

const init = async (config) => {
  firebase.initializeApp(config)
  return new Promise((resolve, reject) => {
    firebase.firestore().enablePersistence()
      .then(resolve)
      .catch(err => {
        if (err.code === 'failed-precondition') {
          reject(err)
          // Multiple tabs open, persistence can only be
          // enabled in one tab at a a time.
        } else if (err.code === 'unimplemented') {
          reject(err)
          // The current browser does not support all of
          // the features required to enable persistence
        }
      })
  })
}

const storage = async (file, ref, commit, cb) => {
  return new Promise((resolve, reject) => {
    let uploadTask = firebase.storage().ref().child(ref).put(file)
    uploadTask.on(
      "state_changed", snapshot => {
        var progress = Number(
          Number(
            snapshot.bytesTransferred / snapshot.totalBytes
          ).toFixed(2)
        )
        console.log('Upload is ' + progress + '% done', typeof progress)
        commit("setProgress", progress)
      }, error => {
        reject(error)
      },() => {
        uploadTask.snapshot.ref
        .getDownloadURL()
        .then((downloadURL) => {
          console.log("Uploaded a blob or file!")
          console.log("got downloadURL: ", downloadURL)
          cb(downloadURL)
          resolve(downloadURL)
        })
      }
    )
  })
}

const auth = () => {
  return firebase.auth()
}

const getAuth = () => {
  return firebase.auth
}

const isAuthenticated = (store) => {
  return store.state.auth.isAuthenticated
}

//const handleOnAuthStateChanged = async (router, store, user) => {
//  const initialAuthState = isAuthenticated(store)
//  // Save to the store
//  store.commit('auth/setAuthState', {
//    isAuthenticated: user !== null,
//    user: user
//  })
//  //router.redirect({ path: '/dash' })
//
//  //if (user && initialAuthState) {
//  //  console.log("go to dash")
//  //}
//
//  // If the user loses authentication route
//  // them to the login page
//  if (!user && initialAuthState) {
//    store.commit('auth/setAuthState', {
//      isAuthenticated: false,
//      user: false
//    })
//    router.push({ path: '/' })
//  }
//}

//const ensureAuthIsInitialized = async (store) => {
//    console.log(store)
//  if (store.state.auth.isReady) return true
//  // Create the observer only once on init
//  return new Promise((resolve, reject) => {
//    // Use a promise to make sure that the router will eventually show the route after the auth is initialized.
//    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
//      resolve()
//      unsubscribe()
//    }, () => {
//      reject(new Error('Looks like there is a problem with the firebase service. Please try again later'))
//    })
//  })
//}

export default {
  firebase,
  storage,
  init,
  auth,
  isAuthenticated,
  //getAuth,
  //handleOnAuthStateChanged,
  //ensureAuthIsInitialized
}