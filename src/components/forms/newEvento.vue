<template>
  <q-card>
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">{{Title}}</div>
      <q-space />
      <q-btn icon="close" flat round dense @click.prevent="onReset()" />
    </q-card-section>

    <form
      @submit.prevent="onSubmit"
      @reset.prevent="onReset()"
      style="min-width: 298px"
     >
      <!-- title -->
      <q-card-section class="q-pt-sm q-pb-none">
        <q-input
          ref="title"
          filled
          color="accent"
          class="text-placeholder1 text-h6 text-weight-bolder text-grey-6"
          placeholder="Título"
          size="lg"
          v-model="$store.state.evento.title"
          :rules="[ val => val && val.length > 0 || 'Escribe algo']"
        />
      </q-card-section>

      <!-- task -->
      <q-card-section class="q-py-sm">
        <q-btn-toggle
          ref="task"
          v-model="$store.state.evento.task"
          unelevated
          text-color="grey-9"
          toggle-color="purple-1"
          toggle-text-color="purple"
          :options="[
            {label: 'Turno', value: false},
            {label: 'Tarea', value: true},
          ]"
        />
        <!--err-->
        <div class="q-pt-sm q-pl-md text-negative" v-if="errTask === true">
          <div class="text-caption text-bold">Seleccione algo</div>
        </div>
      </q-card-section>

      <!-- allDay -->
      <q-card-section class="q-py-sm">
        <q-checkbox
          ref="allDay"
          color="accent"
          @input="changeAllDay"
          v-model="$store.state.evento.allDay"
          label="Todo el día"
        />
        <!--err-->
        <div class="q-pt-sm q-pl-md text-negative" v-if="errAllDay === true">
          <div class="text-caption text-bold">Selecciona algo</div>
        </div>
      </q-card-section>

      <!-- desc -->
      <q-card-section class="q-py-sm">
        <q-editor
          v-model="$store.state.evento.desc"
          style="max-width: 300px!important"
          ref="desc"
          placeholder="Descripción"
          min-height="5rem"
          min-heightevent.="2rem"
          content-class="bg-grey-3"
          toolbar-text-color="text-grey-8"
          toolbar-toggle-color="accent"
          toolbar-bg="grey-3"
          :toolbar="[
            ['bold', 'italic', 'strike', 'underline']
          ]"
        />
      </q-card-section>

      <!-- buttons -->
      <q-card-actions align="right">
        <q-btn
          @click.prevent="onReset()"
          color="grey-9"
          label="DESCARTAR"
          flat
        />
        <q-btn
          v-if="$store.state.edit"
          @click.prevent="viewDelete()"
          color="pink"
          label="Borrar"
          flat
        />
        <q-btn
          @click.prevent="onSubmit"
          :loading="loading"
          color="accent"
          label="GUARDAR"
          flat
        />
      </q-card-actions>
    </form>
    <!--
  -->
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      errTask: false,
      errAllDay: false,
    }
  },

  methods: {
    changeAllDay () {
      if (this.$store.state.evento.allDay) {
        this.$store.state.evento.startStr = this.$store.state.evento.startStr.replace(/T.*$/, '')
        this.$store.state.evento.endStr = null
        return false
      }
      let timeStart = "T" + this.$store.state.evento.timeStart + ":00" + "-03:00"
      let timeEnd = "T" + this.$store.state.evento.timeEnd + ":00" + "-03:00"
      this.$store.state.evento.startStr = this.$store.state.evento.date.split("-").reverse().join("-") + timeStart
      this.$store.state.evento.endStr = this.$store.state.evento.date.split("-").reverse().join("-") + timeEnd
    },

    onSubmit() {
      this.$refs.title.validate()
      this.errTask = false
      this.errAllDay = false
      this.formHasError = false
      //this.$refs.task.validate()
      //this.$refs.allDay.validate()
      //this.$refs.desc.validate()

      if (this.$refs.title.hasError) {
        this.formHasError = true
      }
      if (typeof this.$store.state.evento.task !== "boolean") {
        this.errTask = true
      }
      if (typeof this.$store.state.evento.allDay !== "boolean") {
        this.errAllDay = true
      }
      if (!this.formHasError && !this.errTask && !this.errAllDay) {
        this.loading = true
        //sync
        console.log(this.$store.state.evento)
        this.$store.dispatch('eventos/set', this.$store.state.evento)
        .then(() => {//handle done
          this.loading = false
          this.$q.notify({
            icon: 'done',
            color: 'accent',
            message: 'Guardado'
          })
          //define modal
          this.onReset()
          //this.$store.commit('setModal', false)
        })
        .catch(err => {//handle error
          this.loading = false
          this.onReset()
          this.$q.notify({
            icon: 'close',
            color: 'pink',
            message: err
          })
        })
      }
    },

    onReset() {
      if (this.$store.state.edit)
        this.$store.commit('setEdit', false)
      else
        this.fullCalendar.getApi().getEventById(this.$store.state.evento.id).remove()
      this.$store.commit('setModalEvents', false)
      this.$store.commit('setFormEvents', false)
      this.$store.commit('setEvento', null)
      this.$refs.title.resetValidation()
    },
    
    viewDelete() {
      this.$store.commit('setModal', true)
      this.$store.commit('setForm', 'deleteEvento')
    },
  },

  props: {
    fullCalendar: {
      type: Object,
      required: true
    },
    Title: {
      type: String,
      required: true
    },
  },
}
</script>