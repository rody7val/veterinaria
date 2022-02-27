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
        <!--desc-->
        <div class="text-overline">Descripción</div>
        <q-editor
          v-model="entry.desc"
          :definitions="{
            upload: {
              tip: 'Upload to cloud',
              icon: 'cloud_upload',
              label: 'photo',
              handler: uploadIt
            }
          }"
          :toolbar="[
            ['bold', 'italic', 'strike', 'underline'],
            ['upload', 'save']
          ]"
          content-class="bg-grey-4"
          :class="{'border-err': err}"
        />
        <!--err-->
        <div class="q-pt-sm text-negative" v-if="err">
          <div class="text-caption">Escribe algo</div>
        </div>
        <!--actions-->
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
      err: false,
      loading: false,
      date: "",
      entry: {
        desc: "",
        done: false,
      }
    }
  },

  methods: {
    uploadIt () {
      this.$q.notify({
        message: 'Server unavailable. Check connectivity.',
        color: 'pink',
        textColor: 'white',
        icon: 'warning'
      })
    },
    onSubmit() {
      if (this.entry.desc == false) {
        this.formHasError = true
        this.err = true
      }
      else {
        this.err = false
        //prepare date
        this.loading = true
        this.entry.created = new Date()
        this.entry.idCliente = this.$store.state.paciente.idCliente
        this.entry.idPaciente = this.$store.state.paciente.id
        //sync
        this.$store.dispatch('entradas/set', this.entry)
        .then(() => {
          this.loading = false
          this.$q.notify({//handle done
            icon: 'done',
            color: 'accent',
            message: 'Registrada'
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
      this.entry.desc = null
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

<style type="text/css">
.border-err{
  border-bottom: 3px solid red; 
}
</style>