<template>
  <q-card>
    <q-card-section class="row items-center q-pb-none">
      <div v-if="title" class="text-h6">{{title}}</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    {{this.$store.state.evento}}
    <!--
    <form
      @submit.prevent="onSubmit"
      @reset.prevent="onReset"
      style="min-width: 300px"
     >
      <q-card-section>
        <q-input
          color="accent"
          ref="name"
          v-model="$store.state.pacientes.data[$store.state.paciente.id].name"
          filled
          label="* Nombre"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Escribe algo']"
        />
        <q-select
          color="accent" 
          v-model="$store.state.pacientes.data[$store.state.paciente.id].dog"
          :options="['Perro', 'Gato']"
          label="* Perro o Gato?"
          ref="dog"
          filled
          required
          :rules="[ val => val && val.length > 0 || 'Seleccione algo' ]"
        />
        <q-select
          color="accent" 
          v-model="$store.state.pacientes.data[$store.state.paciente.id].feme"
          :options="['Macho', 'Hembra']"
          label="* Macho o Hembra?"
          ref="feme"
          filled
          required
          :rules="[ val => val && val.length > 0 || 'Seleccione algo' ]"
        />
        <q-input
          color="accent"
          label="Fecha de nacimiento"
          filled
          :value="
            $store.state.pacientes.data[$store.state.paciente.id].birthday
              ? $store.state.pacientes.data[$store.state.paciente.id].birthday
                .split('/').reverse().join('/')
              : null
          "
        >
          <template v-slot:append>
            <q-icon color="accent" name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date
                  v-model="$store.state.pacientes.data[$store.state.paciente.id].birthday"
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
  -->
  </q-card>
</template>

<script>
export default {
  data() {
    return{
      loading: false
    }
  },
/*
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
        let patient = this.$store.state.pacientes.data[this.$store.state.paciente.id]
        delete patient.done
        //sync
        this.$store.dispatch('pacientes/set', patient)
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
      //this.$store.state.pacientes.data[this.$store.state.cliente.id].name = null
      //this.$store.state.pacientes.data[this.$store.state.cliente.id].tel = null
      //this.$store.state.pacientes.data[this.$store.state.cliente.id].dir = null

      this.$refs.name.resetValidation()
      this.$refs.dog.resetValidation()
      this.$refs.feme.resetValidation()
    }
  },
*/
  props: {
    title: {
      type: String,
      default: false
    },
  },
}
</script>