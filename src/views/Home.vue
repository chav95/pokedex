<template>
  <div class="home">
    <Suspense>
      <template #default>
        <AllPokemon msg="Welcome to Pokedex"/>
      </template>
      <template #fallback>
        <Loading/>
      </template>
    </Suspense>
  </div>
</template>

<script>
// @ is an alias to /src
import AllPokemon from '../components/AllPokemon.vue'
import Loading from '../components/Loading.vue'

export default {
  name: 'Home',
  components: {
    AllPokemon,
    Loading
  }
}
</script>
