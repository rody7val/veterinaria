<template>
  <div class="q-px-lg q-pt-sm bg-white">
    <div class="text-overline text-grey">
      <p>Login</p>
    </div>
      <p>{{ this.$route.query.redirect ? `Debes acceder al sistema para entrar` : null}}</p>
      <q-btn
        dense
        size="md"
        color="white"
        class="text-grey-8 q-mb-md"
        icon="account_circle"
        label="Acceder"
        @click="signIn()"
      />
  </div>
</template>

<script>
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

export default {
	methods: {
    //auth handler
    signIn () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then(result => {
        console.log('signIn!', result)
      }).catch(error => {
        alert(error)
      })
    }
	}
}
</script>