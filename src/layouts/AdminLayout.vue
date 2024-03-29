<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-3">
    <q-header elevated class="bg-grey-8">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="drawerHandler()"
        />

        <q-toolbar-title
          :style="{'text-transform': !handleSizeTitle?'uppercase':''}"
          :class="{'text-subtitle1': !handleSizeTitle}"
        >
          {{$store.state.title}} 
        </q-toolbar-title>

        <!--auth-->
        <div v-if="!$store.state.auth.isAuthenticated && $store.state.auth.load" class="text-center">
          <q-spinner
            color="white"
            size="2em"
          />
        </div>
        <div v-else>
          <q-btn
            v-if="$store.state.auth.isAuthenticated"
            :label="$store.state.auth.user.displayName.split(' ')[0]"
            :size="handleSizeBtn"
            icon="account_circle"
            dense
            flat
          >
            <q-menu
              v-model="menu"
              @click.prevent="menu = !menu"
            >
              <q-list style="min-width: 100px">
                <q-item active-class="bg-purple-1 text-accent" to="/my" clickable>
                  <q-item-section>Mis datos</q-item-section>
                </q-item>
                <q-separator />
                <q-item @click="signOut()" clickable>
                  <q-item-section>Salir</q-item-section>
                </q-item>
              </q-list>
            </q-menu>

            <transition
              appear
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
            >
              <q-icon
                color="white"
                :name="`arrow_${arrowHandler}`"
              />
              <!-- Wrapping only one DOM element, defined by QBtn -->
            </transition>
          </q-btn>
          <q-btn
            v-else
            dense
            size="md"
            color="white"
            class="text-grey-8"
            icon="account_circle"
            label="Acceder"
            @click="signIn()"
          />
        </div>
      </q-toolbar>
    </q-header>

    <!--menu-->
    <MenuAdmin 
      :drawerHandler="drawerHandler"
      :sistemLinks="sistemLinks"
      :authLinks="authLinks"
    />

    <!--drawerRight-->
    <q-drawer
      side="right"
      v-model="$store.state.drawerRight"
      bordered
      class="bg-red _list"
    >
      <ViewClient
        v-if="$store.state.typeView === 'cliente'"
        :drawerRightHandler="drawerRightHandler"
      />
      <ViewPatient
        v-if="$store.state.typeView === 'paciente'"
        :drawerRightHandler="drawerRightHandler"
        :drawerRightGoBackHandler="drawerRightGoBackHandler"
      />
      <ViewEntry
        v-if="$store.state.typeView === 'entrada'"
        :drawerRightHandler="drawerRightHandler"
        :drawerRightGoBackHandler="drawerRightGoBackHandler"
      />
    </q-drawer>

    <!--formularios-->
    <q-dialog v-model="$store.state.modal">
      <q-card>
        <!--clientes-->
        <newCliente
          v-if="$store.state.form === 'newCliente'"
          title="Nuevo Cliente"
        />
        <editCliente
          v-if="$store.state.form === 'editCliente'"
          title="Editar Cliente"
        />
        <deleteCliente
          v-if="$store.state.form === 'deleteCliente'"
          title="Eliminar Cliente"
        />

        <!--pacientes-->
        <newPaciente
          v-if="$store.state.form === 'newPaciente'"
          title="Nuevo Paciente"
        />
        <editPaciente
          v-if="$store.state.form === 'editPaciente'"
          title="Editar Paciente"
        />
        <deletePaciente
          v-if="$store.state.form === 'deletePaciente'"
          title="Eliminar Paciente"
        />

        <!--entradas-->
        <newEntrada
          v-if="$store.state.form === 'newEntrada'"
          title="Nueva Entrada"
        />
        <editEntrada
          v-if="$store.state.form === 'editEntrada'"
          title="Editar Entrada"
        />
        <deleteEntrada
          v-if="$store.state.form === 'deleteEntrada'"
          title="Eliminar Entrada"
        />

      </q-card>
    </q-dialog>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
//import EssentialLink from 'components/EssentialLink.vue'
import MenuAdmin from 'components/admin/MenuAdmin'
//views colections
import ViewClient from 'components/admin/ViewClient'
import ViewPatient from 'components/admin/ViewPatient'
import ViewEntry from 'components/admin/ViewEntry'
//forms cliente
import newCliente from 'components/forms/newCliente'
import editCliente from 'components/forms/editCliente'
import deleteCliente from 'components/forms/deleteCliente'
//forms paciente
import newPaciente from 'components/forms/newPaciente'
import editPaciente from 'components/forms/editPaciente'
import deletePaciente from 'components/forms/deletePaciente'
//forms entradas
import newEntrada from 'components/forms/newEntrada'
import editEntrada from 'components/forms/editEntrada'
import deleteEntrada from 'components/forms/deleteEntrada'

const linksSistemList = [
  {
    title: 'Veterinaria',
    caption: 'Página web',
    icon: 'home',
    link: '/',
    exact: true
  }
]

const linksAuthList = [
  {
    title: 'Panel de control',
    caption: 'Dashboard',
    icon: 'dashboard',
    link: '/client',
    exact: true,
    onlyClient: true
  },
  {
    title: 'Panel de control',
    caption: 'Dashboard',
    icon: 'dashboard',
    link: '/admin',
    exact: true,
    admin: true
  },
  {
    title: 'Calendario',
    caption: 'Agenda',
    icon: 'event_note',
    link: '/calendar',
    exact: true,
    admin: true
  },
  {
    title: 'Clínica',
    caption: 'Historia clínica',
    icon: 'local_hospital',
    link: '/admin/clinic',
    exact: true,
    admin: true
  },
  {
    title: 'Libreta electrónica',
    caption: 'Historia clínica',
    icon: 'pets',
    link: '/client/:idCliente',
    exact: true,
    onlyClient: true,
    disabled: true
  }
]

export default {
  components: {
    MenuAdmin,
    ViewClient,
    ViewPatient,
    ViewEntry,
    newCliente,
    editCliente,
    deleteCliente,
    newPaciente,
    editPaciente,
    deletePaciente,
    newEntrada,
    editEntrada,
    deleteEntrada,
  },

  methods: {
    //layout handler
    drawerRightHandler() {
      this.$store.commit('setDrawerRight', !this.$store.state.drawerRight)
      this.$store.commit('setTypeView', '')
      this.$store.commit('setCliente', null)
    },
    drawerRightGoBackHandler(type, id) {
      if (type === 'cliente') {
        this.$store.commit('setDrawerRight', true)
        this.$store.commit('setEntrada', null)
        this.$store.commit('setPaciente', null)
        this.$store.commit('setCliente', this.$store.state.clientes.data[id])
        this.$store.commit('setTypeView', 'cliente')
      }
      else if (type === 'paciente') {
        this.$store.commit('setDrawerRight', true)
        this.$store.commit('setCliente', null)
        this.$store.commit('setEntrada', null)
        this.$store.commit('setPaciente', this.$store.state.pacientes.data[id])
        this.$store.commit('setTypeView', 'paciente')
      }
    },
    drawerHandler() {
      this.$store.commit('setDrawer', !this.$store.state.drawer)
    },

    //auth handler
    signIn () {
      this.$store.commit('auth/setLoad', true)
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then(result => {
        console.log('signIn!', result)
        this.$store.commit('auth/setLoad', false)
        //this.$router.replace('/list')
      }).catch(error => {
        console.log(error)
        this.$store.commit('auth/setLoad', false)
      })
    },
    signOut () {
      firebase.auth().signOut().then(result => {
        console.log('signOut!', result)
        // close sync
        this.$store.dispatch('clientes/closeDBChannel', { clearModule: true })
        this.$store.dispatch('pacientes/closeDBChannel', { clearModule: true })
        this.$store.dispatch('entradas/closeDBChannel', { clearModule: true })
        //this.$router.replace('/')
      }).catch(error => {
        console.log(error)
      })
    }
  },

  computed: {
    arrowHandler() {
      return this.menu ? 'drop_up' :'drop_down'
    },

    handleSizeBtn () {
      return this.$q.screen.gt.xs
        ? "md"
        : "sm"
    },
    handleSizeTitle () {
      return this.$q.screen.gt.xs
        ? true
        : false
    }
  },

  data () {
    return {
      count: 0,
      menu: false,
      sistemLinks: linksSistemList,
      authLinks: linksAuthList,
    }
  }
}
</script>

<style lang="css">
body{
}
.ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>