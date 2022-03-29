<template>
  <div>
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">{{title}}</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <form
      @submit.prevent="onSubmit"
      style="min-width: 298px"
     >
      <q-card-section>
        <!--desc-->
        <div class="text-overline">Descripción</div>
        <q-editor
          v-model="$store.state.entradas.data[$store.state.entrada.id].desc"
          style="max-width: 300px!important"
          :class="{'border-err': err}"
          content-class="bg-grey-4"
          ref="editor"
          :toolbar="[
            ['bold', 'italic', 'strike', 'underline']
          ]"
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
    onSubmit() {
      let entry = this.$store.state.entradas.data[this.$store.state.entrada.id]
      delete entry.done

      if (entry.desc == false) {
        this.formHasError = true
        this.err = true
      }
      else {
        this.err = false
        this.loading = true
        //sync
        this.$store.dispatch('entradas/patch', entry)
        .then(() => {//handle done
          this.loading = false
          this.$q.notify({
            icon: 'done',
            color: 'accent',
            message: 'Guardado'
          })
          //define modal
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
  },

  props: {
    title: {
      type: String,
      required: true
    },
  },
}
</script>