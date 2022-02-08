<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-accent">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="drawer = !drawer"
        />

        <q-toolbar-title>
          Central Vet
        </q-toolbar-title>
        
        <q-btn flat round dense icon="account_circle" to="/admin">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable>
                <q-item-section>Mi perfil</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Configuración</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable>
                <q-item-section>Salir</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      bordered
      content-class="bg-grey-4"
    >
      <q-list>
        <q-item-label
          header class="text-grey-10"
        >
          Administración
        </q-item-label>

        <EssentialLink
          v-for="link in adminLinks"
          :key="link.title"
          v-bind="link"
        />

        <q-separator />

        <EssentialLink
          v-for="link in sistemLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksSistemList = [
  {
    title: 'Web',
    icon: 'home',
    link: '/',
    exact: true
  },
  {
    title: 'Quit',
    icon: 'close',
    link: '/quit',
    exact: true
  }
];

const linksAdminList = [
  {
    title: 'Panel de Control',
    icon: 'dashboard',
    link: '/admin',
    exact: true
  },
  {
    title: 'Historia Clínica',
    icon: 'local_hospital',
    link: '/admin/clinic',
    exact: true
  },
];

export default {
  components: { EssentialLink },

  data () {
    return {
      drawer: false,
      sistemLinks: linksSistemList,
      adminLinks: linksAdminList,
    }
  }
}
</script>

<style lang="css">
body{
  background-color: #e0e0e0
}
</style>