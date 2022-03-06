<template>
  <q-scroll-area class="fit">
    <!--menu-->
    <q-toolbar>      
      <div class="text-overline text-grey q-ml-xs">Cliente</div>

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

    <!--view cliente-->
    <q-item class="q-pt-none">
      <q-item-section avatar>
        <q-icon name="account_circle" color="grey-8" size="3rem" />
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-subtitle1">
          {{$store.state.cliente.name}}
        </q-item-label>
        <q-item-label class="text-h6" caption>
          {{$store.state.cliente.tel}}
        </q-item-label>
      </q-item-section>
    </q-item>
    
    <div class="q-px-lg" v-if="$store.state.cliente.dir">
      <span class="text-grey-8">
        🏠 
      </span>
      <span class="text-grey-9 q-pl-sm">
        {{$store.state.cliente.dir}}
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

    <!--list pacientes-->
    <q-list>
      <div class="text-overline text-grey q-px-md">Pacientes</div>
      <q-card-actions
        align="right"
        class="q-pl-none q-pt-none"
      >
        <q-btn
          icon="add_circle"
          label="NUEVO PACIENTE"
          color="accent"
          @click="modalNewPatient()"
        />
      </q-card-actions>

      <Pacientes v-if="pacientesView.length > 0"
        :pacientes="pacientesView"
        :handleDone="handleDonePacientes"
      />
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
import Pacientes from 'components/admin/Pacientes.vue'

export default {
  components: { Pacientes },
  computed: {
    pacientesView() {
      return Object.values(this.$store.state.pacientes.data).filter(item => {
        return item.idCliente === this.$store.state.cliente.id
      })
      .sort( ( a, b) => {
        return new Date(a.created_at.seconds*1000) - new Date(b.created_at.seconds*1000)
      }).reverse()
    }
  },
  methods:{
    modalNewPatient(){
      this.$store.commit('setModal', !this.$store.state.modal)
      this.$store.commit('setForm', 'newPaciente')
    },
    handleDonePacientes(type, id) {
      // switch checkbox store pacientes.done
      this.$store.commit('handleDone', {type, id})
    },
    modalEdit(){
      this.$store.commit('setModal', !this.$store.state.modal)
      this.$store.commit('setForm', 'editCliente')
    },
    modalDelete(){
      this.$store.commit('setModal', !this.$store.state.modal)
      this.$store.commit('setForm', 'deleteCliente')
    },
  },

  props: {
    drawerRightHandler: {
      type: Function,
      required: true
    }
  },
}
</script>
