<template>
  <div class="container container-fluid">
    <pokemons v-for="(item,idx) in tempPokemons" :key="idx" :pokemon="item"></pokemons>
  </div>
  <div class="d-none load-more"></div>
</template>

<script>
  import usePokemons from '../modules/pokemons'
  import {defineAsyncComponent} from 'vue'
  import Loading from '../components/Loading.vue'

  const pokemons = defineAsyncComponent({
    loader: ()=> import('../components/Pokemon.vue'),
    loadingComponent: Loading,
    delay: 200,
    suspensible: false
  })
  export default{
    components:{
      pokemons
    },
    async setup(){
      const {tempPokemons, error, load} = usePokemons()
      await load()

      return {tempPokemons, error}
    }
  }
</script>

<style scoped>
  .container{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-top: 30px;
  }
</style>