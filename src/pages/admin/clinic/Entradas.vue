<template>
  <div>
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

    <div v-if="entradas.length >= 0">
      <div v-if="!$store.state.toggle">
        <Entradas v-if="getEntradasByName.length > 0"
          :entradas="!$store.state.search ? entradas : getEntradasByName"
          :handleDone="handleDone"
        />
        <div v-else>Sin resultados</div>
      </div>

      <div v-if="$store.state.toggle">
        <Entradas v-if="getEntradasByRangeDate.length > 0"
          :entradas="$store.state.date && $store.state.date.from && $store.state.date.from.length > 0 ? getEntradasByRangeDate : entradas"
          :handleDone="handleDone"
        />
        <div v-else>Sin resultados</div>
      </div>

      <q-card-actions align="right" class="q-pl-none">
        <q-btn
          color="teal"
          icon="arrow_drop_down"
          label="Más resultados"
          @click="loadBlock"
        />
        <q-btn
          color="pink"
          icon="refresh"
          label="Reset"
          @click="resetBlock"
        />
      </q-card-actions>
    </div>

    <div v-else class="text-center q-my-lg">
      <q-spinner
        color="accent"
        size="2em"
      />
      cargando...
    </div>
  </div>
</template>

<script>
  import { date } from 'quasar'
  import { mapGetters } from 'vuex'
  import Entradas from 'components/admin/Entradas.vue'

  export default {
    components: { Entradas },
    mounted(){
      this.resetBlock()
      this.$store.commit("toggleSearch", true)
      this.$store.commit("toggleDisabled", true)
    },
    computed: {
      ...mapGetters(['entradas', 'getEntradasByName', 'getEntradasByRangeDate']),
    },
    methods: {
      modalNewEntry(){
        this.$store.commit('setModal', !this.$store.state.modal)
        this.$store.commit('setForm', 'newEntrada')
      },
      loadBlock() {
        this.$store.commit('pushPagination', {type: 'entradas', qty: 3})
      },
      resetBlock() {
        const today = new Date()
        const first = new Date(today.getFullYear(), today.getMonth(), 1)
        const last = new Date(today.getFullYear(), today.getMonth()+1, 0)
        const getFormatDate = (time, format) => {
          return date.formatDate(time, format, this.$store.state.localeEsp)
        }
        const _date = {
          from: getFormatDate(first, 'DD/MM/YYYY'),
          to: getFormatDate(last, 'DD/MM/YYYY'),
        }
        this.$store.commit('resetPagination')
        this.$store.commit('resetSearch')
        this.$store.commit('resetDate')
        this.$store.commit('setDate', _date)
      },
      handleDone(type, id) {
        // switch checkbox store pacientes.done
        this.$store.commit('handleDone', {type, id})
      },
    },
  }
</script>

