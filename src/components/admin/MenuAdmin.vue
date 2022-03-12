<template>
  <div>
    <q-drawer
      v-model="$store.state.drawer"
      bordered
      overlay
      content-class="text-grey-10"
    >
      <q-list>
        <q-item-label
          header class="text-grey-8 q-pa-sm"
        >
          <q-toolbar>
            <q-avatar size="md" class="shadow-3 q-mr-md">
              <img src="../../assets/logo-central-vet.jpg">
            </q-avatar>
            <div>
              CentralVet<br>
              <small class="text-grey-6">M.V. Guillermina Puente</small>
            </div>
            <q-space/>
            <q-btn
              flat
              dense
              round
              color="accent"
              text-color="accent"
              icon="chevron_left"
              aria-label="Menu"
              @click="drawerHandler()"
            />
          </q-toolbar>
        </q-item-label>
        <q-separator />

        <EssentialLink
          v-for="link in sistemLinks"
          :key="link.title"
          v-bind="link"
        />
        <EssentialLink v-if="$store.state.auth.isAuthenticated"
          v-for="link in adminLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>
  </div>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

export default {
  components: { EssentialLink },

  props: {
    sistemLinks: {
      type: Array,
      required: true
    },
    adminLinks: {
      type: Array,
      required: true
    },
    drawerHandler: {
      type: Function,
      required: true
    }
  },
}
</script>
