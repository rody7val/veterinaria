<template>
  <div class="q-px-lg q-pt-sm bg-white">
    <div class="text-overline text-grey">
      <p>Login</p>
    </div>

    <p v-if="$route.query.redirect">Debes acceder al sistema para entrar</p>

    <q-spinner v-if="$store.state.auth.load"
      class="q-mb-md"
      color="grey-8"
      size="2em"
    />
    <q-btn
      v-else
      dense
      size="md"
      color="white"
      label="Acceder"
      icon="account_circle"
      class="text-grey-8 q-mb-md"
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
      this.$store.commit('auth/setLoad', true)
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then(result => {
        console.log('signIn!', result)
        this.$store.commit('auth/setLoad', false)
        //this.$router.replace('/list')
      }).catch(error => {
        alert(error)
        this.$store.commit('auth/setLoad', false)
      })
    },
	}
}
</script>