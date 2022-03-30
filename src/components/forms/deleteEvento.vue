<template>
  <q-card>
    <q-card-section class="row items-center">
      <q-avatar icon="delete" color="pink" text-color="white" />
      <span class="q-ml-sm">Deseas borrar el evento <b>{{$store.state.evento.title}}</b>?</span>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Cancel" color="pink" v-close-popup />
      <q-btn
        @click="borrar()"
        label="Aceptar"
        color="pink"
        :loading="loading"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  data() {
    return{
      loading: false
    }
  },

  methods:{
    borrar() {
      this.loading = true
      //sync
      this.$store.dispatch('eventos/delete', this.$store.state.evento.id)
      .then(() => {//handle done
        this.loading = false
        this.$store.commit('setModalEvents', false)
        this.$store.commit('setFormEvents', false)
        this.$store.commit('setEvento', null)
        this.$store.commit('setModal', false)
        this.$store.commit('setForm', false)
        this.$q.notify({
          icon: 'done',
          color: 'accent',
          message: 'Borrado'
        })
      })
      .catch(err => {//handle error
        this.loading = false
        this.$q.notify({
          icon: 'close',
          color: 'pink',
          message: err
        })
      })
    },
/*
    deletePatient() {
      this.loading = true
      this.$store.dispatch('entradas/delete', this.$store.state.entrada.id)
      .then(() => {
        this.loading = false
        this.$q.notify({
          icon: 'done',
          color: 'accent',
          message: 'Borrado'
        })
        this.$store.commit('setModal', false)
        this.$store.commit('setDrawerRight', false)
      })
      .catch(err => {
        this.loading = false
        this.$q.notify({
          icon: 'close',
          color: 'pink',
          message: err
        })
      })
      this.$store.commit('setForm', '')
      this.$store.commit('setFormEvents', '')
    },*/
  },

  props: {
    title: {
      type: String,
      required: true
    },
  },
}
</script>