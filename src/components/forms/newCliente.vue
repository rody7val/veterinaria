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
      class="q-gutter-md"
     >
      <q-card-section style="min-width: 350px">
        <q-input
          color="accent"
          ref="name"
          v-model="client.name"
          filled
          label="* Nombre"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Escribe algo']"
        />
        <q-input
          color="accent"
          ref="tel"
          v-model="client.tel"
          filled
          label="* Teléfono"
          lazy-rules
          :rules="[ 
            val => val && val.length > 0 || 'Escribe algo',
            val => typeof Number.isInteger(Number(val)) && val > 0 || 'Escribe un número'
          ]"
        />
        <q-input
          color="accent"
          ref="dir"
          v-model="client.dir"
          filled
          label="Dirección"
        />

        <q-card-actions align="right">
          <q-btn
            class="q-mt-md q-ml-sm"
            label="CANCELAR"
            color="pink"
            v-close-popup
          />
          <q-btn
            :loading="loading"
            class="q-mt-md q-ml-sm"
            label="REGISTRAR"
            color="accent"
            type="submit"
          />
        </q-card-actions>
      </q-card-section>
    </form>
  </div>
</template>

<script>
export default {

  data() {
    return {
      loading: false,
      client: {
        name: null,
        tel: null,
        dir: null,
        done: false
      }
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
        this.client.created = new Date()
        //sync
        this.$store.dispatch('clientes/set', this.client)
        .then(() => {//handle done
          this.loading = false
          this.$q.notify({
            icon: 'done',
            color: 'accent',
            message: 'Registrado'
          })
          //handle error
          this.$store.commit('setModal', false)
          this.onReset()
        })
        .catch(err => {//define modal
          this.loading = false
          console.log(err)
          this.$q.notify({
            icon: 'close',
            color: 'pink',
            message: err.message
          })
        })
      }
    },

    onReset() {
      this.client.name = null
      this.client.tel = null
      this.client.dir = null

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