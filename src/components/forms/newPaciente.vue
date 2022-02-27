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
        <!--name-->
        <q-input
          color="accent"
          ref="name"
          v-model="pacient.name"
          filled
          label="* Nombre"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Escribe algo']"
        />
        <!--dog-->
        <q-select
          color="accent"
          v-model="pacient.dog"
          :options="['Perro', 'Gato']"
          label="* Perro o Gato?"
          ref="dog"
          filled
          required
          :rules="[ val => val && val.length > 0 || 'Seleccione algo' ]"
        />
        <!--feme-->
        <q-select
          color="accent"
          v-model="pacient.feme"
          :options="['Macho', 'Hembra']"
          label="* Macho o Hembra?"
          ref="feme"
          filled
          required
          :rules="[ val => val && val.length > 0 || 'Seleccione algo' ]"
        />
        <!--birthday-->
        <q-input
          color="accent"
          filled
          :value="pacient.birthday ? pacient.birthday.split('/').reverse().join('/') : null"
          label="Fecha de nacimiento"
        >
          <template v-slot:append>
            <q-icon color="accent" name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date
                  v-model="pacient.birthday"
                  :locale="$store.state.localeEsp"
                  color="accent"
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="ok" color="pink" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

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
      date: "",
      pacient: {
        name: null,
        dog: null,
        feme: null,
        done: false,
        birthday: null
      }
    }
  },

  methods:{
    onSubmit() {
      this.$refs.name.validate()
      this.$refs.dog.validate()
      this.$refs.feme.validate()

      if (this.$refs.name.hasError || this.$refs.dog.hasError || this.$refs.feme.hasError) {
        this.formHasError = true
      }
      else {
        //prepare date
        this.loading = true
        this.pacient.created = new Date()
        this.pacient.idCliente = this.$store.state.cliente.id
        this.pacient.birthday = this.pacient.birthday ? this.pacient.birthday : null
        //sync
        this.$store.dispatch('pacientes/set', this.pacient)
        .then(() => {
          this.loading = false
          this.$q.notify({//handle done
            icon: 'done',
            color: 'accent',
            message: 'Registrado'
          })
          //define modal
          this.$store.commit('setModal', false)
          this.onReset()
        })
        .catch(err => {//handle error
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
      this.pacient.name = null
      this.pacient.dog = null
      this.pacient.feme = null
      this.pacient.birthday = null

      this.$refs.name.resetValidation()
      this.$refs.dog.resetValidation()
      this.$refs.feme.resetValidation()
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