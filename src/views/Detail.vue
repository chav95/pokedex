<template>
  <div class="card">
    <div id="carouselExample" class="carousel slide">
      <div class="carousel-inner mx-auto d-block" style="width: 18rem;">
        <div v-for="(img,idx) in imagesArr" :key="idx" :class="`carousel-item ${idx == 0 ? 'active' : ''}`">
          <img :src="img" class="d-block w-100" :alt="`image ${idx}`">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <div class="card-body">
      <h5 class="card-title"><strong><u>{{name}}</u></strong></h5>
      <p class="card-text">{{`Type: ${typesArr.join(', ')}`}}</p>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-sm">
          <ul class="list-group list-group-flush col-sm">
            <li class="list-group-item"><strong>Base Stats</strong></li>
            <li v-for="(item,idx) in statsArr" class="list-group-item">{{`${ucwords(item.name)}: ${item.base}`}}</li>
          </ul>
        </div>
        <div class="col-sm">
          <ul class="list-group list-group-flush col-sm">
            <li class="list-group-item"><strong>Abilities</strong></li>
            <li v-for="(item,idx) in abilitiesArr" class="list-group-item">{{ucwords(item)}}</li>
          </ul>
        </div>
        <div class="col-sm">
          <ul class="list-group list-group-flush col-sm">
            <li class="list-group-item">{{`Base Exp: ${baseExp}`}}</li>
            <li class="list-group-item">{{`Height: ${height}`}}</li>
            <li class="list-group-item">{{`Weight: ${weight}`}}m</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    props: {
      pokemonID: String,
    },
    data(){
      return{
        full: {},
        name: '',
        height: '',
        weight: '',
        baseExp: '',
        abilitiesArr: [],
        imagesArr: [],
        statsArr: [],
        typesArr: [],
      }
    },
    methods:{
      ucwords (str) {
        return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
          return $1.toUpperCase();
        })
      },
      async fetch(){
        let pokemonDetail = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.pokemonID}`)
          .then(res => res.data)
        this.full = pokemonDetail
        this.name = this.ucwords(pokemonDetail.name)
        this.baseExp = pokemonDetail.base_experience
        this.height = pokemonDetail.height
        this.weight = pokemonDetail.weight
        
        let images = pokemonDetail.sprites
        for(let img in images){
          if(img != 'other' && img != 'versions' && images[img] !== null){
            this.imagesArr.push(images[img])
          }
        }
        
        let stats = pokemonDetail.stats
        for(let x in stats){
          this.statsArr.push({'name':stats[x].stat.name,'base':stats[x].base_stat})
        }
        
        let types = pokemonDetail.types
        for(let x in types){
          this.typesArr.push(types[x].type.name)
        }

        let abilities = pokemonDetail.abilities
        for(let x in abilities){
          this.abilitiesArr.push(abilities[x].ability.name)
        }
      }
    },
    mounted(){
      this.fetch()
    },
  }
</script>

<style scoped>

</style>