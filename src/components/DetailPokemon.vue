<template>
  <div>{{`Pokemon with ID: ${pokemonID}`}}</div>
</template>

<script>
export default {
  props: {
    pokemonID: Number,
  },
}
</script>

<style scoped>

</style>