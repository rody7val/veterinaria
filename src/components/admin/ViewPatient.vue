<template>
  <q-scroll-area class="fit">
    <!--menu-->
    <q-toolbar class="q-px-xs">
      <div>
        <q-btn
          flat
          dense
          round
          color="accent"
          text-color="accent"
          icon="chevron_left"
          aria-label="Menu"
          @click="drawerRightGoBackHandler('cliente', $store.state.paciente.idCliente)"
        />
      </div>

      <div class="text-overline text-grey q-pl-sm">Ver Cliente</div>

      <q-space/>

      <div>
        <q-btn
          flat
          dense
          round
          color="accent"
          text-color="accent"
          icon="close"
          aria-label="Menu"
          @click="drawerRightHandler()"
        />
      </div>
    </q-toolbar>

    <!--view paciente-->
    <div class="text-overline text-grey q-pl-md">Paciente</div>
    <q-item class="q-pt-none">
      <q-item-section avatar >
        <div class="text-grey-8" style="font-size: 2.5rem">
          {{$store.state.paciente.dog === "Perro" ? "🐶" : "🐱"}}
        </div>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-subtitle1">
          {{$store.state.paciente.name}}
        </q-item-label>
        <q-item-label class="text-h6" caption>
          {{$store.state.paciente.dog}} - {{$store.state.paciente.feme}}
        </q-item-label>
      </q-item-section>
    </q-item>

    <div class="q-px-lg"  v-if="$store.state.paciente.birthday">
      <span class="text-grey-8">
        🎂 
      </span>
      <span class="text-grey-9 q-pl-sm">
        {{$store.state.paciente.birthday.split("/").reverse().join("/")}}
      </span>
    </div>
    
    <q-card-actions align="right">
      <q-btn
        flat
        dense
        round
        color="accent"
        text-color="accent"
        icon="edit"
        aria-label="Menu"
        @click="modalEdit()"
      />
      <q-btn
        flat
        dense
        round
        color="pink"
        text-color="pink"
        icon="delete"
        aria-label="Menu"
        @click="modalDelete()"
      />
    </q-card-actions>

    <!--list entradas-->
    <q-list>
      <div class="text-overline text-grey q-px-md">Entradas</div>
      <q-card-actions
        align="right"
        class="q-pl-none q-pt-none"
      >
        <q-btn
          icon="add_circle"
          label="NUEVA ENTRADA"
          color="accent"
          @click="modalNewEntry()"
        />
      </q-card-actions>

      <div v-if="Object.keys($store.state.entradas.data).length > 0">
        <Entradas v-if="entradasView.length > 0"
          :entradas="entradasView"
          :handleDone="handleDoneEntradas"
        />
        <div v-else class="q-mx-md">Sin resultados</div>
      </div>
      <div v-else class="text-center q-my-lg">
        <q-spinner
          color="primary"
          size="2em"
        />
        cargando...
      </div>
    </q-list>
  </q-scroll-area>
</template>

<script>
import { mapGetters } from 'vuex'
import EssentialLink from 'components/EssentialLink.vue'
import Entradas from 'components/admin/Entradas.vue'

export default {
  components: { Entradas },
  computed: {
    entradasView() {
      return Object.values(this.$store.state.entradas.data).filter(item => {
        return item.idPaciente === this.$store.state.paciente.id
      })
      .sort( ( a, b) => {
        return new Date(a.created_at.seconds*1000) - new Date(b.created_at.seconds*1000)
      }).reverse()
    }
  },
  methods:{
    modalNewEntry(){
      this.$store.commit('setModal', !this.$store.state.modal)
      this.$store.commit('setForm', 'newEntrada')
    },
    handleDoneEntradas(type, id) {
      // switch checkbox store entradas.done
      this.$store.commit('handleDone', {type, id})
    },
    modalEdit(){
      this.$store.commit('setModal', !this.$store.state.modal)
      this.$store.commit('setForm', 'editPaciente')
    },
    modalDelete(){
      this.$store.commit('setModal', !this.$store.state.modal)
      this.$store.commit('setForm', 'deletePaciente')
    },
  },

  props: {
    drawerRightHandler: {
      type: Function,
      required: true
    },
    drawerRightGoBackHandler: {
      type: Function,
      required: true
    }
  },
}
</script>

<style lang="css">
.q-scrollarea__content.absolute{
  width: 299px!important
}
</style>
