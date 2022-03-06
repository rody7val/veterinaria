<template>
  <q-list>
    <q-card flat bordered
      v-for="(item, index) in pacientes"
      :key="index"
    >
      <q-item
        @click="handleDone('pacientes', item.id)"
        :class="{'done bg-purple-1': item.done}"
        clickable
        v-ripple
      >
        <q-item-section avatar v-if="item.done">
          <q-checkbox color="accent" v-model="item.done"/>
        </q-item-section>

        <q-item-section avatar>
          <div class="text-grey-8" style="font-size: 3rem">
            {{item.dog === "Perro" ? "🐶" : "🐱"}}
          </div>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{item.name}}</q-item-label>
          <q-item-label caption class="ellipsis">
            {{item.dog}} - {{item.feme}}
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label caption>
            Cliente
          </q-item-label>
          <q-item-label>{{getClientName(item.idCliente)}}</q-item-label>
        </q-item-section>

        <q-item-section v-if="item.done" side>
          <q-btn
            flat
            round
            @click="viewPatient(item)"
            color="accent"
            icon="visibility" />
        </q-item-section>
      </q-item>

    </q-card>
  </q-list>
</template>

<script>
import { date } from 'quasar'
export default {
  methods: {
    viewPatient(patient) {
      this.$store.commit('setDrawerRight', true)
      this.$store.commit('setTypeView', 'paciente')
      this.$store.commit('setCliente', null)
      this.$store.commit('setEntrada', null)
      this.$store.commit('setPaciente', patient)
    },
    getFormatDate(time, format) {
      return date.formatDate(time, format, this.$store.state.localeEsp)
    },
    getClientName(id) {
      return this.$store.state.clientes.data[id].name
    },
  },

  props: {
    pacientes: {
      type: Array,
      required: true
    },
    handleDone: {
      type: Function,
      required: true
    },
  },
}
</script>
