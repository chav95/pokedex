import { reactive, toRefs} from 'vue'

const state = reactive({
  pokemons: null,
  tempPokemons: null,
  isLoaded: false,
  isLoading: false,
  error: null,
  vault: null,
})

export default function usePokemon(){
  const load = async ()=>{
    if(!state.isLoaded){
      try{
        const pokemonsResponse = await fetch(
          // "https://pokeapi.co/api/v2/pokedex/1"
          "https://pokeapi.co/api/v2/pokemon"
        )
        state.pokemons = await pokemonsResponse.json()

        // state.tempPokemons = state.pokemons.pokemon_entries
        state.tempPokemons = state.pokemons.results
        state.vault.count = state.pokemons.count
        state.vault.next = state.pokemons.next
        state.vault.previous = state.pokemons.previous
      }catch(error){
        state.error = error
      }
    }
  }

  return {...toRefs(state), load}
}