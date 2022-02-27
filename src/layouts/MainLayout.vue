<template>
    <q-layout
      class="shadow-2 rounded-borders"
      view="lHh lpr lFf"
      container
      style="
        height: 100%;
        position: absolute;
      "
    >
      <q-header elevated class="q-pa-xs bg-accent">
        <q-toolbar>
          <q-avatar class="shadow-3">
            <img src="../assets/logo-central-vet.jpg">
          </q-avatar>

          <q-toolbar-title class="text-shadow-3">
            Central Vet
          </q-toolbar-title>

          <q-btn
            dense
            size="md"
            color="white"
            text-color="accent"
            icon="account_circle"
            label="Acceder"
            to="/admin"/>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page>
          <Home/>
        </q-page>
      </q-page-container>
    </q-layout>
</template>

<script>
import Home from 'pages/Index.vue'

export default {
  components: { Home },
}
</script>
