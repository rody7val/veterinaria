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
      v-for="(item, index) in entradas"
      :key="index"
    >
      <q-item
        :class="{'done bg-purple-1': item.done}"
        @click="handleDone(item.id)"
        v-ripple
      >
        <q-item-section avatar >
          <q-checkbox color="accent" v-model="item.done"/>
        </q-item-section>

        <q-item-section avatar>
          <q-icon
            name="assignment"
            color="teal"
            size="3rem"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{getFormatDate(item.created_at.seconds*1000, "D MMMM/YYYY")}}</q-item-label>
          <q-item-label caption class="ellipsis" v-html="item.desc"> 
          </q-item-label>
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
  </div>
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
