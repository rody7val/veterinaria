<template>
  <q-list>
    <q-card flat bordered
      v-for="(item, index) in entradas"
      :key="index"
    >
      <q-item
        @click="handleDone('entradas', item.id)"
        :class="{'done bg-purple-1': item.done}"
        clickable
        v-ripple
      >
        <q-item-section avatar v-if="item.done">
          <q-checkbox color="accent" v-model="item.done"/>
        </q-item-section>

        <q-item-section avatar>
          <q-icon
            name="assignment"
            color="grey-8"
            size="3rem"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label class="ellipsis" v-html="item.desc"> 
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
            @click="viewEntry(item)"
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
    viewEntry(entry) {
      this.$store.commit('setDrawerRight', true)
      this.$store.commit('setTypeView', 'entrada')
      this.$store.commit('setCliente', null)
      this.$store.commit('setPaciente', null)
      this.$store.commit('setEntrada', entry)
    },
    getFormatDate(time, format) {
      return date.formatDate(time, format, this.$store.state.localeEsp)
    },
  },

  props: {
    entradas: {
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
