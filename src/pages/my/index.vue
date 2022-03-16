<template>
  <div class="_my">
    <q-splitter
      :vertical="handleTabOrientationGtSm"
      :horizontal="!handleTabOrientationGtSm"
      :value="15"
      class="_splitter"
    >
      <!--tabs /admin/clinic-->
      <template v-slot:before>
        <q-tabs
          v-model="$store.state.tab"
          :vertical="handleTabOrientationGtSm"
          :horizontal="!handleTabOrientationGtSm"
          style="height: auto!important"
          class="text-grey-8 bg-grey-3"
        >
          <q-tab
            name="user"
            icon="account_circle"
            label="Usuario"
          >
          </q-tab>
          <q-tab
            name="config"
            icon="tune"
            label="Config."
          >
          </q-tab>
        </q-tabs>
      </template>

      <!--tabs data views-->
      <template v-slot:after>
        <q-scroll-area style="height: 100%; max-width: 100%;">

          <div class="_search">
          	
          </div>

        	<div class="_data">
            <!--list views-->
            <q-tab-panels
              class="bg-grey-2"
              v-model="$store.state.tab"
              animated
              vertical
              @touchstart.stop @mousedown.stop
              :transition-prev="`slide-${handleTabOrientationGtSm ? 'up' : 'left'}`"
              :transition-next="`slide-${handleTabOrientationGtSm ? 'down': 'right'}`"
            >

              <q-tab-panel class="q-pa-none" name="user">
                <UserPage/>
              </q-tab-panel>

              <q-tab-panel class="q-pa-none" name="config">
                <ConfigPage/>
              </q-tab-panel>
            </q-tab-panels>
          </div>

        </q-scroll-area>
      </template>
    </q-splitter>
  </div>
</template>

<script>
import UserPage from 'pages/my/User.vue'
import ConfigPage from 'pages/my/Config.vue'

export default {
  components: {
    UserPage,
    ConfigPage
  },

  mounted() {
    this.$store.state.tab = "user"
  },

  computed: {
    handleTabOrientationGtSm () {
      return this.$q.screen.gt.xs
        ? true
        : false
    }
  },

  data () {
    return {
      tab: 'user',
    }
  }
}
</script>

<style type="text/css">
.q-splitter__before{
  height: auto!important;
}
._my{
  position: absolute;
  height: calc(100% - 53px);
  overflow-y: hidden!important;
  width: 100%;
}
._search .q-input{
  max-width: 300px;
}
._data .q-card{
  border-radius: 0px;
}
.tab,._splitter{
  height: 100%
}
.heightAdjust{
  height: auto!important
}
.q-panel.scroll{
  overflow: hidden;
}
.q-tab--active{
  color: #9c27b0
}
</style>