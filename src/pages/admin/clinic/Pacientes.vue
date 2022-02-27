<template>
  <div>
    <div v-if="!$store.state.toggle">
      <Pacientes 
        :pacientes="!$store.state.search ? pacientes : getPacientesByName"
        :handleDone="handleDone"
      />
    </div>

    <div v-if="$store.state.toggle">
      <Pacientes
        :pacientes="$store.state.date && !$store.state.date.from ? pacientes : getPacientesByDate"
        :handleDone="handleDone"
      />
    </div>

    <q-btn
      color="teal"
      class="q-mt-md q-mr-sm"
      icon="arrow_drop_down"
      label="Más resultados"
      @click="loadBlock"
    />
    <q-btn
      color="pink"
      class="q-mt-md q-mr-sm"
      icon="refresh"
      label="Reset"
      @click="resetBlock"
    />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Pacientes from 'components/admin/Pacientes.vue'

export default {
  components: { Pacientes },
  mounted(){
    this.resetBlock()
  },
  computed: {
    ...mapGetters(['pacientes', 'getPacientesByName', 'getPacientesByDate']),
  },
  methods: {
    async loadBlock() {
      await this.$store.commit('pushPagination', {type: 'pacientes', qty: 3})
    },
    async resetBlock() {
      await this.$store.commit('resetPagination')
      await this.$store.commit('resetSearch')
      await this.$store.commit('resetDate')
    },
    handleDone(id) {
      // switch checkbox store pacientes.done
      this.$store.commit('handleDone', id)
    }
  },
}
</script>
