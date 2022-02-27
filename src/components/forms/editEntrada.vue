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
          <!--:definitions="{
            upload: {
              tip: 'Subir imagen',
              icon: 'photo',
              handler: uploadIt
            }
          }"-->
        <q-editor
          ref="editor"
          v-model="$store.state.entradas.data[$store.state.entrada.id].desc"
          :toolbar="[
            ['bold', 'italic', 'strike', 'underline'],
            //['upload']
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
      loading: false,
      err: false
    }
  },
  methods:{
    /*uploadIt () {
      const edit = this.$refs.editor
      edit.caret.restore()
      edit.runCmd('insertHTML', `<img src="https://cataas.com/cat/gif"/>`)
      edit.focus()
      this.$q.notify({
        message: 'Server unavailable. Check connectivity.',
        color: 'pink',
        textColor: 'white',
        icon: 'warning'
      })
    },*/
    onSubmit() {
      const desc = this.$store.state.entradas.data[this.$store.state.entrada.id].desc
      console.log(desc, typeof desc)
      if (desc == false) {
        this.formHasError = true
        this.err = true
      }
      else {
        this.err = false
        //prepare date
        this.loading = true
        const entry = this.$store.state.entradas.data[this.$store.state.entrada.id]
        delete entry.done
        //sync
        this.$store.dispatch('pacientes/set', entry)
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

      //this.$refs.name.resetValidation()
      //this.$refs.dog.resetValidation()
      //this.$refs.feme.resetValidation()
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