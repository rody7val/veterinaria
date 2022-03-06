<template>
  <q-list>
    <q-card flat bordered
      v-for="(item, index) in clientes"
      :key="index"
    >
      <q-item
        @click="handleDone('clientes', item.id)"
        :class="{'done bg-purple-1': item.done}"
        clickable
        v-ripple
      >
        <q-item-section avatar v-if="item.done">
          <q-checkbox color="accent" v-model="item.done"/>
        </q-item-section>

        <q-item-section avatar>
          <q-icon
            name="account_circle"
            color="grey-8"
            size="3rem"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{item.name}}</q-item-label>
          <q-item-label caption>
            {{item.tel}}
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label caption>
            Creado
          </q-item-label>
          <q-item-label>{{getFormatDate(item.created_at.seconds * 1000, "D MMMM/YY")}}</q-item-label>
        </q-item-section>

        <q-item-section v-if="item.done" side>
          <q-btn
            flat
            round
            @click="viewClient(item)"
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
    viewClient(client) {
      this.$store.commit('setDrawerRight', true)
      this.$store.commit('setTypeView', 'cliente')
      this.$store.commit('setPaciente', null)
      this.$store.commit('setEntrada', null)
      this.$store.commit('setCliente', client)
    },
    getFormatDate(time, format) {
      return date.formatDate(time, format, this.$store.state.localeEsp)
    },
  },

  props: {
    clientes: {
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
