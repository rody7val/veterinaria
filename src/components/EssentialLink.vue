<template>
  <q-item
    clickable
    tag="a"
    :to="link"
    :exact="exact"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon color="grey-8" :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption v-if="caption">
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    exact: {
      type: Boolean,
      default: false
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="css">
.q-item.q-router-link--active {
  color: #9c27b0;
}
</style>