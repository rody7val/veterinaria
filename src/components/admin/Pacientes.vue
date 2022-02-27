<template>
  <div>
  <!--<q-infinite-scroll @load="onLoad">
    <template v-slot:loading>
      <div class="row justify-center q-my-md">
        <q-spinner color="teal" name="dots" size="40px" />
      </div>
    </template>
  </q-infinite-scroll>-->

    <q-card flat bordered
      v-for="(item, index) in pacientes"
      :key="index"
    >
      <q-item
        :class="`q-py-none ${item.done ? ' done bg-purple-1 ' : ''}`"
        @click="handleDone(item.id)"
        v-ripple
      >
        <q-item-section avatar >
          <q-checkbox color="accent" v-model="item.done"/>
        </q-item-section>

        <q-item-section avatar>
          <div class="text-teal" style="font-size: 3rem">
            {{item.dog === "Perro" ? "🐶" : "🐱"}}
          </div>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{item.name}}</q-item-label>
          <q-item-label caption class="ellipsis">
            {{item.dog}} - {{item.feme}}
          </q-item-label>
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
  </div>
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
