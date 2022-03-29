<template>
  <q-card
    style="max-width: 300px; display: inline-block"
    :class="`bg-${color} q-mb-md q-mx-sm`"
    :dark="dark"
    bordered
   >
    <q-card-section>
      <div class="text-h6">
        <q-icon v-if="icon" size="1.68rem" :name="icon" />
        {{title}}
      </div>

      <div v-if="chip.sigla">
        <q-chip>
          <q-avatar color="accent" text-color="white">{{chip.sigla}}</q-avatar>
          {{chip.context}}
        </q-chip>
      </div>
    </q-card-section>

    <q-separator dark inset />

    <q-card-section class="text-body1">
      {{desc}}
    </q-card-section>

    <q-carousel
      v-if="images.length > 0"
      v-model="slide"
      :arrows="images.length === 1 ? false : true"
      :fullscreen.sync="fullscreen"
      :autoplay="autoplay"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
      transition-prev="slide-right"
      transition-next="slide-left"
      control-color="white"
      height="300px"
      infinite
      swipeable
      animated
      navigation
    >
      <q-carousel-slide
        v-for="(img, index) in images"
        :key="index"
        :name="index"
        :img-src="img"
        infinity
      />

      <template v-slot:control>
        <q-carousel-control
          position="bottom-right"
          :offset="[18, 18]"
        >
          <q-btn
            push round dense color="white" text-color="accent"
            :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="fullscreen = !fullscreen"
          />
        </q-carousel-control>
      </template>
    </q-carousel>
<!---->
  </q-card>

</template>

<script>
export default {
  data(){
    return {
      slide: 0,
      fullscreen: false,
      autoplay: true,
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    chip: {
      type: Object,
      default: ()=>{return{}}
    },
    color: {
      type: String,
      default: "teal"
    },
    dark: {
      type: Boolean,
      default: true
    },
    icon: {
      type: String,
      default: ""
    },
    images: {
      type: Array,
      default: ()=>{return[]}
    }
  }
}
</script>

<style type="text/css"></style>