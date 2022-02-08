<template>
  <div>
    <div class="text-h6 q-mb-md">Entradas</div>
    <Entradas :items="items" :onLoad="onLoad"/>
  </div>
</template>

<script>
import Entradas from 'components/admin/Entradas.vue'
const items = [ {}, {}, {}, {}, {}, {}, {} ]

export default {
  components: { Entradas },

  data () {
    return {
      items,
      onLoad (index, done) {
        setTimeout(() => {
          items.push({}, {}, {}, {}, {}, {}, {})
          done()
        }, 2000)
      }
    }
  }
}
</script>
