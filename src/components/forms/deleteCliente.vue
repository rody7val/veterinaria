<template>
  <div>
    <q-card-section class="row items-center">
      <q-avatar icon="delete" color="pink" text-color="white" />
      <span class="q-ml-sm">Deseas borrar el cliente <b>{{$store.state.cliente.name}}</b>?</span>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Cancel" color="pink" v-close-popup />
      <q-btn
        @click="deleteClient()"
        label="Aceptar"
        color="pink"
        v-close-popup
        :loading="loading"
      />
    </q-card-actions>
  </div>
</template>

<script>
export default {
  data() {
    return{
      loading: false
    }
  },

  methods:{
    deleteClient() {
      this.loading = true
      this.$store.dispatch('clientes/delete', this.$store.state.cliente.id)
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
    },
  },

  props: {
    title: {
      type: String,
      required: true
    },
  },
}
</script>