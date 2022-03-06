<template>
  <div>
    <form
      @submit.prevent="onSubmit"
      @reset.prevent="onReset"
     >
      <q-item>
        <!--new file-->
        <q-file
          v-model="file"
          color="accent"
          label="Subir archivo"
          style="width: 100%; max-width: 300px;"
          filled
          clearable
        >
          <template v-slot:after v-if="file">
            <q-btn
              @click.stop="onChangeImage"
              color="accent"
              round
              flat
              icon="cloud_upload" />
          </template>
        </q-file>
      </q-item>
      <!--progress-->
      <div class="q-mx-sm" style="width: 283px!important">
        <q-linear-progress
          v-if="file && $store.state.progress"
          :value="$store.state.progress"
        />
      </div>
    </form>
  </div>
</template>

<script>
import fb from "../../services/firebase.js"
export default {

  data() {
    return {
      file: null
    }
  },

  methods:{
    onChangeImage () {
    	this.$store.commit("setProgress", 0)
      let idEntrada = this.$store.state.entrada.id
      let name = this.file.name
      let size = this.file.size
      let type = this.file.type
      let fileName = `${Date.now()}${this.file.name.match(/\.\w*/ig)}`
      let ref = `img/${idEntrada}/${fileName}`
      let done = false
      let files = this.$store.state.entradas.data[idEntrada].files || []
      // subir imagen
      fb.storage(this.file, ref, this.$store.commit, (img) => {
        //guardar archivo en entradas[id].files
        files = files.concat({ name, size, type, idEntrada, fileName, ref, img, done })
        this.file = null
        this.$store.dispatch('entradas/patch', { id: idEntrada, files })
        this.$store.commit('setSlide', this.$store.state.entrada.files.length-1)
      })
    },

    onSubmit() {
    },

    onReset() {
    }
  },
}
</script>
