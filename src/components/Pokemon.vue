<template>
  <div class="card">
    <img :src="imgUrl" alt="pokemon front default" class="card-img-top">
    <div class="card-body">
      <h5 class="card-title text-dark">{{this.ucwords(pokemon.name)}}</h5>
      <p class="card-text" v-bind:style="{'color':typeClass}">{{this.ucwords(type)}}</p>
      <router-link :to="`/detail/${pokemonID}`" class="btn btn-primary">More Detail</router-link>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    props:{
      pokemon: Object,
    },
    watch: {
      pokemon: (newval, oldval)=>{
        console.log(`oldval: ${JSON.stringify(oldval, null, 2)}`)
        console.log(`newval: ${JSON.stringify(newval, null, 2)}`)
      }
    },
    data(){
      return{
        pokemonDetail: {},
        imgUrl: '',
        type: '',
        typeClass: '',
        pokemonID: 0,
      }
    },
    methods:{
      ucwords (str) {
        return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
          return $1.toUpperCase();
        })
      },
      async fetch(){ //console.log(this.pokemon.url)
        let pokemonDetail = await axios.get(this.pokemon.url)
        this.pokemonDetail = pokemonDetail.data
        this.imgUrl = pokemonDetail.data.sprites.front_default
        this.type = pokemonDetail.data.types[0].type.name
        this.pokemonID = pokemonDetail.data.id
        
        switch(this.type){
          case ('grass' || 'poison' || 'bug'):
            this.typeClass = 'green'
            break
          case ('fire' || 'dragon'):
            this.typeClass = 'red'
            break
          case ('water' || 'ice'):
            this.typeClass = 'blue'
            break
          case ('electric' || 'psychic'):
            this.typeClass = 'yellow'
            break
          case ('normal' || 'ghost'):
            this.typeClass = 'grey'
            break
          case ('ground' || 'rock'):
            this.typeClass = 'brown'
            break
          case ('dark' || 'shadow' || 'unknown'):
            this.typeClass = 'purple'
            break
          default:
            this.typeClass = 'black'
        }
      },
    },
    mounted(){
      this.fetch()
    },
  }
</script>

<style scoped>
  .card{
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    margin: 2px;
    max-width: 200px;
    cursor: pointer;
  }
  .card:hover{
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  .container{
    padding: 2px 16px;
  }
</style>