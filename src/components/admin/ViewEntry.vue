<template>
  <q-scroll-area class="fit">
    <!--menu-->
    <q-toolbar class="q-px-xs">
      <div>
        <q-btn
          flat
          dense
          round
          color="accent"
          text-color="accent"
          icon="chevron_left"
          aria-label="Menu"
          @click="drawerRightGoBackHandler('paciente', $store.state.entrada.idPaciente)"
        />
      </div>
      <div class="text-overline text-grey q-pl-sm">Ver Paciente</div>
      <q-space/>
      <div>
        <q-btn
          flat
          dense
          round
          color="accent"
          text-color="accent"
          icon="close"
          aria-label="Menu"
          @click="drawerRightHandler()"
        />
      </div>
    </q-toolbar>

    <!--view entrada-->
    <div class="text-overline text-grey q-pl-md">Entrada</div>
    <q-item class="q-pt-none">
      <q-item-section avatar>
        <q-icon name="assignment" color="grey-8" size="3rem" />
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-subtitle1">
          {{getFormatDate($store.state.entrada.created_at.seconds*1000 , "D MMMM/YYYY")}}
        </q-item-label>
        <q-item-label caption>
          {{getFormatDate($store.state.entrada.created_at.seconds*1000 , "HH:mm[hs]")}}
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-card-actions align="right">
      <q-btn
        flat
        dense
        round
        color="accent"
        text-color="accent"
        icon="edit"
        aria-label="Menu"
        @click="modalEdit()"
      />
      <q-btn
        flat
        dense
        round
        color="pink"
        text-color="pink"
        icon="delete"
        aria-label="Menu"
        @click="modalDelete()"
      />
    </q-card-actions>

    <!--desc-->
    <div class="text-overline text-grey q-px-md">Descripción</div>
    <div class="q-mb-md">
      <q-card-section v-html="$store.state.entrada.desc" />
    </div>

    <!--images-->
    <q-list>
      <div class="text-overline text-grey q-px-md">Imágenes</div>
      <!--upload-->
      <UploadFile />
      <!--list files-->
      <div v-if="$store.state.entradas && $store.state.entradas.data ? Object.keys($store.state.entradas.data).length > 0 : []">
        <q-carousel
          v-if="$store.state.entrada && $store.state.entrada.files && $store.state.entrada.files.length >= 0"
          v-model="$store.state.slide"
          :fullscreen.sync="$store.state.fullscreen"
          transition-prev="slide-right"
          transition-next="slide-right"
          infinite
          swipeable
          animated
          control-color="white"
          navigation
          padding
          :arrows="$store.state.entrada && $store.state.entrada.files && $store.state.entrada.files.length === 1 ? false : true"
          height="300px"
          class="shadow-1 rounded-borders"
        >
          <q-carousel-slide
            v-for="(item, index) in $store.state.entrada.files"
            :key="index"
            :name="index"
            :img-src="item.img"
            infinity
          />
          <template v-slot:control>
            <q-carousel-control
              position="bottom-right"
              :offset="[18, 18]"
            >
              <q-btn
                push round dense color="white" text-color="accent"
                :icon="$store.state.fullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="$store.commit('setFullscreen', !$store.state.fullscreen)"
              />
            </q-carousel-control>
          </template>

        </q-carousel>
        <div v-else class="q-mx-md">Sin resultados</div>
      </div>
      <div v-else class="text-center q-my-lg">
        <q-spinner
          color="primary"
          size="2em"
        />
        cargando...
      </div>
    </q-list>
  </q-scroll-area>
</template>

<script>
import { date } from 'quasar'
import { mapGetters } from 'vuex'
import EssentialLink from 'components/EssentialLink.vue'
import Entradas from 'components/admin/Entradas.vue'
import UploadFile from 'components/forms/UploadFile.vue'

export default {
  components: { Entradas, UploadFile },
  mounted() {
    this.$store.commit("setSlide", this.$store.state.entrada && this.$store.state.entrada.files ? this.$store.state.entrada.files.length-1 : 0)
  },
  methods:{
    getFormatDate(time, format) {
      return date.formatDate(time, format, this.$store.state.localeEsp)
    },
    modalEdit(){
      this.$store.commit('setModal', !this.$store.state.modal)
      this.$store.commit('setForm', 'editEntrada')
    },
    modalDelete(){
      this.$store.commit('setModal', !this.$store.state.modal)
      this.$store.commit('setForm', 'deleteEntrada')
    },
    borrar(id){
      console.log(id)
    },
  },
  props: {
    drawerRightHandler: {
      type: Function,
      required: true
    },
    drawerRightGoBackHandler: {
      type: Function,
      required: true
    }
  },
}
</script>
