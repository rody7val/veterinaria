<template>
  <div class="_clinic">
    <q-splitter
      class="_splitter"
      v-model="splitterModel"
    >
      <template v-slot:before>
        <q-tabs
          v-model="$store.state.tab"
          vertical
          class="text-teal bg-grey-3"
        >
          <q-tab
            name="clientes"
            icon="face"
            label="Clientes"
          >
          </q-tab>
          <q-tab
            name="pacientes"
            icon="pets"
            label="Pacientes"
          >
          </q-tab>
          <q-tab
            name="entradas"
            icon="assignment"
            label="Entradas"
          >
          </q-tab>
        </q-tabs>
      </template>

      <template v-slot:after>
        <div class="_search">
          <!--toggle-->
          <q-toggle
            v-model="$store.state.toggle"
            :icon="$store.state.toggle ? 'date_range' : 'T'"
            :label="$store.state.toggle ? 'Por fecha' : 'Por nombre'"
            color="accent"
            size="lg"
          />

          <!--search text-->
          <q-input
            v-if="!$store.state.toggle"
            v-model="$store.state.search"
            @input="onInput"
            class="q-mx-md"
            color="accent"
            label="Nombre"
            filled
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <!--search date-->
          <q-input
            v-else 
            :value="getDate"
            class="q-mx-md"
            color="accent"
            label="Fecha"
            filled
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer" color="accent">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date
                    color="accent"
                    v-model="$store.state.date"
                    :locale="$store.state.localeEsp"
                    mask="DD/MM/YYYY" 
                    range
                  >
                    <div class="row items-center justify-end">
                      <q-btn
                        v-close-popup
                        label="ok"
                        color="pink"
                        flat
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <!--list views-->
          <q-tab-panels
            class="bg-grey-2"
            v-model="$store.state.tab"
            animated
            swipeable
            vertical
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel name="clientes">
              <ClientesPage/>
            </q-tab-panel>

            <q-tab-panel name="pacientes">
              <PacientesPage/>
            </q-tab-panel>

            <q-tab-panel name="entradas">
              <EntradasPage/>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </template>

    </q-splitter>
  </div>
</template>

<script>
import ClientesPage from 'pages/admin/clinic/Clientes.vue'
import PacientesPage from 'pages/admin/clinic/Pacientes.vue'
import EntradasPage from 'pages/admin/clinic/Entradas.vue'

export default {
  components: {
    ClientesPage,
    PacientesPage,
    EntradasPage
  },
  computed: {
    getDate() {
      return this.$store.state.date && this.$store.state.date.from && this.$store.state.date.from.length > 0
        ? `${this.$store.state.date.from} - ${this.$store.state.date.to}`
        : "Selecciona un rango"
    }
  },
  methods: {
    handleDate() {},
    onInput(e) {
      this.$store.commit('setSearch', e)
    },
  },
  data () {
    return {
      tab: 'clientes',
      splitterModel: 20
    }
  }
}
</script>

<style type="text/css">
._search .q-input{
  max-width: 300px;
}
._clinic{
  position: absolute;
  height: calc(100% - 50px);
  width: 100%;
}
.tab,._splitter{
  height: 100%
}
.q-panel.scroll{
  overflow: hidden;
}
.q-tab--active{
  color: #9c27b0
}
</style>