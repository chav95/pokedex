<template>
    <div class="card"> 
      <router-link to="/detail/1" class="container">
        <!-- <h4>{{pokemon.pokemon_species.name}}</h4> -->
        <img :src="imgUrl" alt="pokemon front default">
        <h4>{{this.ucwords(pokemon.name)}}</h4>
        <h5 v-bind:style="{'color':typeClass}">{{this.ucwords(type)}}</h5>
      </router-link>
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