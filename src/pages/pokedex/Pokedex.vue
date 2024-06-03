<template>
  <div>
    <div class="container">
      <RouterLink
      v-for="(pokemon, index) in pokemonsList"
      :key="index"
      :to="{ name: 'PokemonPage', params: { id: index + 1}}"
      class="router-link"
      >
        <PokemonCard
          :data="pokemon"
          :name="pokemon.name"
          :url="pokemon.url"
          :id="index + 1"
        />
      </RouterLink>
      
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { getPokemonByName, getAllPokemon } from '@/service/pokemon.service'
import PokemonCard from '@/components/pokemon/PokemonCard.vue';

const pokemon = ref("");
const pokemonData = ref({} as any);
const pokemonsList = ref([] as any[]);

const getTypedPokemon = async () => {
const response = await getPokemonByName(pokemon.value);
pokemonData.value = response;
}

const getPokemons = async () => {
const response = await getAllPokemon(9, 0); 
pokemonsList.value = response.results;
}

watch(pokemon, () => {
getTypedPokemon();
}); 

onMounted(() => {
getPokemons();
});
</script>
<style scoped>
.container {
display: flex;
justify-content: center;
align-items: center;  
flex-wrap: wrap;
margin: 20px auto;
}
.router-link{
  display: flex;
  margin: 10px auto;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>