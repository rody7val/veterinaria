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

    <!--files-->
    <q-list>
      <div class="text-overline text-grey q-px-md">Archivos</div>
      <!--upload-->
      <UploadFile />
      <!--list files
      v-if="entradasView.length > 0"
      -->
      <q-carousel
        v-model="$store.state.slide"
        transition-prev="slide-right"
        transition-next="slide-right"
        infinite
        swipeable
        animated
        control-color="white"
        navigation
        padding
        arrows
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
            <!--
            <div class="text-center q-mt-md q-mr-md">
              <q-btn
                dense
                @click="borrar(item.id)"
                class="q-mb-sm"
                color="transparent"
                icon="delete"
                size="md"
                label="Borrar"
              /><br>
              <q-btn
                dense
                @click="ampliar()"
                class="q-mb-sm"
                color="transparent"
                icon="photo"
                size="md"
                label="Ampliar"
              /><br>
            </div>
          </q-carousel-slide>-->
      </q-carousel>
      <!--
        class="column no-wrap flex-center"
      -->
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
    this.$store.commit("setSlide", this.$store.state.entrada.files.length-1)
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
