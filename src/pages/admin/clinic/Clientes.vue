<template>
  <div>
    <q-card-actions
      align="right"
      class="q-pl-none q-pt-none"
      v-if="clientes.length > 0"
    >
      <q-btn
        icon="person_add"
        label="NUEVO CLIENTE"
        color="accent"
        @click="modalNewClient()"
      />
    </q-card-actions>

    <div v-if="clientes.length > 0">
      <div v-if="!$store.state.toggle">
        <Clientes v-if="getClientesByName.length > 0"
          :clientes="!$store.state.search ? clientes : getClientesByName"
          :handleDone="handleDone"
        />
        <div v-else>Sin resultados</div>
      </div>

      <div v-if="$store.state.toggle">
        <Clientes v-if="getClientesByRangeDate.length > 0"
          :clientes="$store.state.date && $store.state.date.from && $store.state.date.from.length > 0 ? getClientesByRangeDate : clientes"
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
  import Clientes from 'components/admin/Clientes.vue'

  export default {
    components: { Clientes },
    mounted(){
      this.resetBlock()
    },
    computed: {
      ...mapGetters(['clientes', 'getClientesByName', 'getClientesByRangeDate']),
    },
    methods: {
      modalNewClient(){
        this.$store.commit('setModal', !this.$store.state.modal)
        this.$store.commit('setForm', 'newCliente')
      },
      loadBlock() {
        this.$store.commit('pushPagination', {type: 'clientes', qty: 3})
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

