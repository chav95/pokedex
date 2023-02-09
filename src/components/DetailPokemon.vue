<template>
  <div>{{`Pokemon with ID: ${pokemonID}`}}</div>
</template>

<script>
  import axios from 'axios'
  export default {
    props: {
      pokemonID: String,
    },
    data(){
      return{
        stats: {},
        types: {},
        abilitiesUrl: {},
        abilities: {},
        iamges: {},
      }
    },
    methods:{
      async fetch(){
        let pokemonDetail = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.pokemonID}`)
          .then(res => res.data)
        console.log(pokemonDetail)
        this.stats = pokemonDetail.stats
        this.types = pokemonDetail.types
        this.abilitiesUrl = pokemonDetail.abilities
        this.iamges = pokemonDetail.sprites
      }
    },
    mounted(){
      this.fetch()
    },
  }
</script>

<style scoped>

</style>