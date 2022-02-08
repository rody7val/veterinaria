<template>
  <q-infinite-scroll @load="onLoad">
    <template v-slot:loading>
      <div class="row justify-center q-my-md">
        <q-spinner color="teal" name="dots" size="40px" />
      </div>
    </template>
    <div
      v-for="(item, index) in items"
      :key="index"
      class="q-card q-py-sm q-my-md"
    >
      <q-badge class="shadow-1 bg-teal" >
        {{ index }}
      </q-badge>
      <pre>
        {{JSON.stringify(item, null, 2)}}
      </pre>
    </div>
  </q-infinite-scroll>
</template>

<script>

export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    onLoad: {
      type: Function,
      required: true
    },
  }
}
</script>
