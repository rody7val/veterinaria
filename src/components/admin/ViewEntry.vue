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
          @click="drawerRightGoBackHandler('paciente', $store.state.entrada.idPaciente)"
        />
      </div>
      <div class="text-overline text-grey q-pl-sm">Ver Paciente</div>
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

    <!--view entrada-->
    <div class="text-overline text-grey q-pl-md">Entrada</div>
    <q-item class="q-pt-none">
      <q-item-section avatar>
        <q-icon name="assignment" color="teal" size="3rem" />
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-subtitle1">
          {{getFormatDate($store.state.entrada.created_at.seconds*1000 , "D MMMM/YYYY")}}
        </q-item-label>
        <q-item-label caption>
          {{getFormatDate($store.state.entrada.created_at.seconds*1000 , "HH:mm[hs]")}}
        </q-item-label>
      </q-item-section>
    </q-item>

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

    <!--desc-->
    <div class="text-overline text-grey q-px-md">Descripción</div>
    <div class="q-mb-md">
      <q-card-section v-html="$store.state.entrada.desc" />
    </div>

    </q-list>
  </q-scroll-area>
</template>

<script>
import { date } from 'quasar'
import { mapGetters } from 'vuex'
import EssentialLink from 'components/EssentialLink.vue'
import Entradas from 'components/admin/Entradas.vue'

export default {
  components: { Entradas },
  computed: {
    entradasView() {
      return Object.values(this.$store.state.entradas.data).filter(item => {
        return item.idPaciente === this.$store.state.paciente.id
      }).reverse()
    }
  },
  methods:{
    handleDoneEntradas(id) {
      // switch checkbox store entradas.done
      this.$store.commit('handleDoneEntradas', id)
    },
    getFormatDate(time, format) {
      return date.formatDate(time, format, this.$store.state.localeEsp)
    },
    modalEdit(){
      this.$store.commit('setModal', !this.$store.state.modal)
      this.$store.commit('setForm', 'editEntrada')
    },
    modalDelete(){
      this.$store.commit('setModal', !this.$store.state.modal)
      this.$store.commit('setForm', 'deleteEntrada')
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
