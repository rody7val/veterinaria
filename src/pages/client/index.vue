<template>
  <div class="q-px-lg q-pt-sm bg-grey-3">
    <!--<div class="" id="graphdiv"></div>-->
    <div class="text-overline text-grey">
      <p>Mis mascotas</p>
    </div>
    
    <div 
      class="text-overline text-center q-mr-md"
      style="max-width: 300px; display: inline-block"
    >
      <q-carousel
        v-model="slide"
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
        <q-carousel-slide name="pets" class="column no-wrap flex-center">
          <q-icon name="pets" size="56px" />
          <div class="q-mt-md text-center">
            <code>Mis mascotas</code><br>
            <div class="text-subtitle1">
              En desarrollo...
            </div><br>
            <q-btn
              dense
              @click="()=>{}"
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
export default {
  data() {
    return {
      slide: "pets"
    }
  },

  computed: {
  },

  methods: {
  }
}
</script>

<style type="text/css">
/*.dygraph-ylabel {
	padding-left: 30px;
	transform: rotate(270deg);
}*/
</style>
