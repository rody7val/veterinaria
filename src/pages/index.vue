<template>
  <div class="text-center bg-white">
    <div v-if="$store.state.auth.isAuthenticated" class="q-pt-sm bg-grey-3">
      <div class="text-overline text-grey q-pb-sm">Sesión</div>
      <q-avatar size="90px" class="q-mb-xs shadow-3">
        <img :src="$store.state.auth.user.photoURL">
        <q-badge
          floating
          :color="$store.state.auth.isAdmin ? 'teal' : 'primary'"
          :label="$store.state.auth.isAdmin ? 'admin' : 'user'"
        />
      </q-avatar>
      <p>{{$store.state.auth.user.email}}<br>
        <small>by 
          <code class="text-accent">
            {{$store.state.auth.user.providerData[0].providerId}}
          </code>
        </small>
      </p>

    <div class="bg-grey-4 q-pb-lg">
      <div class="text-overline text-grey q-pb-sm">Enlaces rápidos</div>
      <q-btn v-if="$store.state.auth.isAdmin"
        class="q-mx-xs q-mb-sm"
        icon="dashboard"
        label="Dashboard"
        color="accent"
        @click="$router.push('/admin')"
      />
      <q-btn v-if="$store.state.auth.isAdmin"
        class="q-mx-xs q-mb-sm"
        icon="event_note"
        label="Calendario"
        color="accent"
        @click="$router.push('/calendar')"
      />
      <q-btn v-if="$store.state.auth.isAdmin"
        class="q-mx-xs q-mb-sm"
        icon="local_hospital"
        label="Clínica"
        color="accent"
        @click="$router.push('/admin/clinic')"
      />
      <q-btn
        class="q-mx-xs q-mb-sm"
        icon="person"
        label="Mis Datos"
        color="accent"
        @click="$router.push('/my')"
      />
    </div>
  </div>

    <div class="q-pt-sm q-pb-lg">
      <p class="text-overline text-grey">Veterinaria</p>

      <WebCard
        v-for="(item, index) in webcards"
        :key="index"
        v-bind="item"
      />
    </div>

    <div class="q-pt-sm q-pb-md bg-grey-3">
      <p class="text-overline text-grey">Contacto</p>
      <div class="text-body1">
        <p>📱 {{$store.state.CEL}}</p>
        <p>🏠 {{$store.state.DIR}}</p>
        <p>📍 {{$store.state.LOCATION}}</p>
      </div>
      <div class="q-mt-xl">
        <div class="text-caption">{{$store.state.title}}</div>
        <div class="text-caption">{{new Date().getFullYear()}}</div>
        <q-avatar size="xl" class="shadow-3 q-mt-xs">
          <img src="../assets/logo.jpg">
        </q-avatar>
      </div>
    </div>
      <!--
      <pre>{{JSON.stringify($store.state.auth.user, null, 2)}}</pre>
      -->
  </div>
</template>

<script>
import WebCard from 'components/WebCard.vue'
//import { date } from 'quasar'
const webcardsLinks = [
  {
    icon: 'pets',
    title: 'TIENDA DE MASCOTAS',
    desc: 'Alimentos, farmacia y accesorios',
    images: [
      'https://firebasestorage.googleapis.com/v0/b/historia-clinica-silvia.appspot.com/o/info%2Ffrente-1.jpg?alt=media&token=dc66d197-2bd5-4238-abd0-33684b37bd91',
      'https://firebasestorage.googleapis.com/v0/b/historia-clinica-silvia.appspot.com/o/info%2Ffrente-2.jpg?alt=media&token=0dc154b2-6ebf-4eff-aea2-7a0955d68ea4',
    ]
  },
  {
    icon: 'local_hospital',
    title: 'CLINICA',
    desc: 'Consultas, vacunación, tratamientos e internación de pequeños animales 🐶 🐱 ',
    chip: {sigla: 'M.V.', context: 'Silvia Cayssials'},
    images: [
      'https://firebasestorage.googleapis.com/v0/b/historia-clinica-cvp.appspot.com/o/img%2FCNPSJQlnHzEcLAhQpiDg%2F1623872615024.jpg?alt=media&token=8de514b1-6d02-4b24-b53c-109359013b36',
      'https://firebasestorage.googleapis.com/v0/b/historia-clinica-cvp.appspot.com/o/img%2FTmM6d3rBj7ILbdOTmyKk%2F1628633975487.jpg?alt=media&token=4f11ca97-4994-48e7-b828-33cc0884900b',
      'https://firebasestorage.googleapis.com/v0/b/historia-clinica-cvp.appspot.com/o/img%2FdaWiM56YW4cclAbTLRua%2F1647891597166.jpg?alt=media&token=aec785b9-4063-4b4e-81d1-fd175e46ee6f',
      'https://firebasestorage.googleapis.com/v0/b/historia-clinica-cvp.appspot.com/o/img%2FULTw2OBziXscyQvROgz8%2F1617998115016.jpg?alt=media&token=ab75a6af-2dcc-4492-89f5-fe544fe61c2f',
      'https://firebasestorage.googleapis.com/v0/b/historia-clinica-cvp.appspot.com/o/img%2F2AYSfTpwXlx0ECZ4Oooi%2F1624990671182.jpg?alt=media&token=2a35cd70-457f-41c2-8b00-84dabe59e5b3',
    ],
  },
  {
    icon: 'content_cut',
    title: 'PELUQUERIA',
    desc: 'Baño y cortes caninos',
    images: [
      "https://firebasestorage.googleapis.com/v0/b/historia-clinica-silvia.appspot.com/o/info%2Fimg-1.jpg?alt=media&token=f446c257-86b5-4b4c-abd0-730a9891a5c3",
      "https://firebasestorage.googleapis.com/v0/b/historia-clinica-silvia.appspot.com/o/info%2Fimg-2.jpg?alt=media&token=fcf5fc2a-d601-4851-81a9-7916d4055c75"
    ]
  },
  {
    icon: 'science',
    title: 'LABORATORIO',
    desc: 'Analisis de sangre y muestras biológicas',
  },
  {
    icon: 'biotech',
    title: 'Rayos-X',
    desc: 'Revelado digital de alta resolución 🩻',
  },
]

export default {
  data() {
    return {
      webcards: webcardsLinks
    }
  },

  components: {
    WebCard
  }
}
</script>