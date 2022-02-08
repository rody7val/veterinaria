<template>
  <div>
    <div class="text-h6 q-mb-md">Pacientes</div>
    <Pacientes :items="items" :onLoad="onLoad" />
  </div>
</template>

<script>
import Pacientes from 'components/admin/Pacientes.vue'
const items = [ {}, {}, {}, {}, {}, {}, {} ]

export default {
  components: { Pacientes },

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

