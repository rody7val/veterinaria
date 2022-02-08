<template>
  <div>
    <div class="text-h6 q-mb-md">Clientes</div>
    <Clientes :items="items" :onLoad="onLoad"/>
  </div>
</template>

<script>
import Clientes from 'components/admin/Clientes.vue'
const items = [ {}, {}, {}, {}, {}, {}, {} ]

export default {
  components: { Clientes },

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
