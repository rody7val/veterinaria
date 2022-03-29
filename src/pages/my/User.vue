<template>
  <div>
    <q-card flat bordered class="bg-grey-2">
      <q-item>
        <q-item-section avatar>
          <q-avatar size="xl" class="shadow-3">
            <img :src="$store.state.auth.user.photoURL">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{$store.state.auth.user.displayName}}</q-item-label>
          <q-item-label caption>
            {{$store.state.auth.user.email}}
          </q-item-label>
        </q-item-section>
      </q-item>
      
      <q-item>
        <q-item-section>
          <q-item-label caption>Acceso</q-item-label>
          <q-item-label>
            {{$store.state.auth.user.providerData[0].providerId}}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-item-label caption>Correo verificado</q-item-label>
          <q-item-label>
            {{$store.state.auth.user.emailVerified ? "Si" : "No"}}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-item-label caption>Rol</q-item-label>
          <q-item-label>
            {{$store.state.auth.isAdmin ? "Administrador" : "Usuario"}}
          </q-item-label>
        </q-item-section>
      </q-item>
<!--
      <q-separator />
      <q-card-section horizontal>
        <q-card-section>
          Lorem ipsum dolor sit.
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </q-card-section>
      </q-card-section>
-->
    </q-card>
  </div>
</template>

<script>
  export default {
  }
</script>

