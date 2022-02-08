<template>
  <div class="_clinic">
    <q-splitter
      class="_splitter"
      v-model="splitterModel"
    >
      <template v-slot:before>
        <q-tabs
          v-model="tab"
          vertical
          class="text-teal bg-grey-3"
        >
          <q-tab name="clientes" icon="face" label="Clientes">
          </q-tab>
          <q-tab name="pacientes" icon="pets" label="Pacientes">
          </q-tab>
          <q-tab name="entradas" icon="assignment" label="Entradas">
          </q-tab>
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          class="bg-grey-2"
          v-model="tab"
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

  data () {
    return {
      tab: 'clientes',
      splitterModel: 20
    }
  }
}
</script>

<style type="text/css">
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
</style>