<template>
  <div class="q-px-lg q-pt-sm bg-grey-3">
    <!--<div class="" id="graphdiv"></div>-->
    <div class="text-grey">
      <p>Panel de control</p>
    </div>

    <!--clinic-->
    <div 
      class="text-center q-mr-md"
      style="max-width: 300px; display: inline-block"
    >
      <q-carousel
        v-model="slideClinic"
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
        class="bg-accent text-white shadow-1 rounded-borders"
      >
        <!--Clientes-->
        <q-carousel-slide name="face" class="column no-wrap flex-center">
          <q-icon name="face" size="56px" />
          <div class="q-mt-md text-center text-body1">
            Clientes<br>
            <div class="text-subtitle1">
              {{getCountClientes}}
            </div><br>
            <q-btn
              dense
              @click="searchClinic('clientes')"
              class="q-mb-sm"
              color="grey-8"
              icon="search"
              size="md"
              label="Buscar"
            /><br>
            <!--<q-btn
              dense
              @click="crear('clientes', 'newCliente')"
              class="q-mb-sm"
              icon="person_add"
              color="primary"
              size="md"
              label="Crear"
            />-->
          </div>
        </q-carousel-slide>
        <!--Pacientes-->
        <q-carousel-slide name="pets" class="column no-wrap flex-center">
          <q-icon name="pets" size="56px" />
          <div class="q-mt-md text-center text-body1">
            Pacientes<br>
            <div class="text-subtitle1">
              {{getCountPacientes}}
            </div><br>
            <q-btn
              dense
              @click="searchClinic('pacientes')"
              class="q-mb-sm"
              color="grey-8"
              icon="search"
              size="md"
              label="Buscar"
            />
          </div>
        </q-carousel-slide>
        <!--Entradas-->
        <q-carousel-slide name="assignment" class="column no-wrap flex-center">
          <q-icon name="assignment" size="56px" />
          <div class="q-mt-md text-center text-body1">
            Entradas<br>
            <div class="text-subtitle1">
              {{getCountEntradas}}
            </div><br>
            <q-btn
              dense
              @click="searchClinic('entradas')"
              class="q-mb-sm"
              color="grey-8"
              icon="search"
              size="md"
              label="Buscar"
            />
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>

    <!--calendar-->
    <div 
      class="text-center q-mr-md"
      style="max-width: 300px; display: inline-block"
    >
      <q-carousel
        v-model="slideCalendar"
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
        class="bg-teal text-white shadow-1 rounded-borders"
      >
        <!--Eventos-->
        <q-carousel-slide name="event" class="column no-wrap flex-center">
          <q-icon name="event" size="56px" />
          <div class="q-mt-md text-center text-body1">
            Eventos pendientes<br>
            <div class="text-subtitle1">
              {{getCountEventos}}
            </div><br>
            <q-btn
              dense
              @click="$router.push('/calendar')"
              class="q-mb-sm"
              color="grey-8"
              icon="search"
              size="md"
              label="Buscar"
            /><br>
          </div>
        </q-carousel-slide>
        <!--Tareas-->
        <q-carousel-slide name="event_available" class="column no-wrap flex-center">
          <q-icon name="event_available" size="56px" />
          <div class="q-mt-md text-center text-subtitle1">
            Tareas pendientes<br>
            <div class="text-subtitleody1">
              {{getCountTareas}}
            </div><br>
            <q-btn
              dense
              @click="$router.push('/calendar')"
              class="q-mb-sm"
              color="grey-8"
              icon="search"
              size="md"
              label="Buscar"
            />
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </div>
</template>

<script>
//import dygraphs from 'dygraphs'
import { /*mapState, mapActions,*/ mapGetters } from 'vuex'
export default {
    /*new dygraphs("graphdiv",
      `Date,A,B
      2016/01/01,10,20
      2016/07/01,20,10
      2016/12/31,40,30
      `, {
        fillGraph: true,
        ylabel: 'Temp',
        xlabel: 'Date',
      }
    )*/
  data() {
    return {
      slideClinic: "face",
      slideCalendar: "event",
    }
  },
  computed: {
    ...mapGetters([
      'getCountClientes',
      'getCountPacientes',
      'getCountEntradas',
      'getCountEventos',
      'getCountTareas',
    ]),
  },

  methods: {
    crear(tab, type){
      //this.$router.push("/admin/clinic")
      this.$store.commit('setTab', tab)
      this.$store.commit('setModal', true)
      this.$store.commit('setForm', type)
    },
    searchClinic(tab){
      this.$router.push("/admin/clinic")
      this.$store.commit('setTab', tab)
    }
  }
}
</script>

<style type="text/css">
/*.dygraph-ylabel {
	padding-left: 30px;
	transform: rotate(270deg);
}*/
</style>
