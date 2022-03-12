<template>
  <div>
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">{{title}}</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <form
      @submit.prevent="onSubmit"
      @reset.prevent="onReset"
      style="min-width: 330px"
     >
      <q-card-section>
        <q-input
          ref="name"
          label="* Nombre"
          color="accent"
          v-model="$store.state.clientes.data[$store.state.cliente.id].name"
          filled
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Escribe algo']"
        />
        <q-input
          ref="tel"
          label="* Teléfono"
          color="accent"
          v-model="$store.state.clientes.data[$store.state.cliente.id].tel"
          filled
          lazy-rules
          :rules="[ 
            val => val && val.length > 0 || 'Escribe algo',
            val => typeof Number.isInteger(Number(val)) && val > 0 || 'Escribe un número'
          ]"
        />
        <q-input
          color="accent"
          ref="dir"
          v-model="$store.state.clientes.data[$store.state.cliente.id].dir"
          filled
          label="Dirección"
        />

        <q-card-actions align="right">
          <q-btn
            class="q-ml-sm"
            label="CANCELAR"
            color="pink"
            @click="onReset()"
            v-close-popup
          />
          <q-btn
            class="q-ml-sm"
            label="GUARDAR"
            color="accent"
            type="submit"
            :loading="loading"
          />
        </q-card-actions>
      </q-card-section>
    </form>
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
    onSubmit() {
      this.$refs.name.validate()
      this.$refs.tel.validate()

      if (this.$refs.name.hasError || this.$refs.tel.hasError) {
        this.formHasError = true
      }
      else {
        //prepare date
        this.loading = true
        let client = this.$store.state.clientes.data[this.$store.state.cliente.id]
        delete client.done
        //sync
        this.$store.dispatch('clientes/set', client)
        .then(() => {//handle done
          this.loading = false
          this.$q.notify({
            icon: 'done',
            color: 'accent',
            message: 'Guardado'
          })
          //define modal
          this.onReset()
          this.$store.commit('setModal', false)
        })
        .catch(err => {//handle error
          this.loading = false
          this.$q.notify({
            icon: 'close',
            color: 'pink',
            message: err
          })
        })
      }
    },

    onReset() {
      //this.$store.state.clientes.data[this.$store.state.cliente.id].name = null
      //this.$store.state.clientes.data[this.$store.state.cliente.id].tel = null
      //this.$store.state.clientes.data[this.$store.state.cliente.id].dir = null

      this.$refs.name.resetValidation()
      this.$refs.tel.resetValidation()
    }
  },

  props: {
    title: {
      type: String,
      required: true
    },
  },
}
</script>