<template>
    <div class="party-card" :key="pokemon.id"> 
      <div class="image">
        <RouterLink :to="{ name: 'PokemonPage', params: { id: pokemon.id }}">
          <img :src="pokemon.img" :alt="pokemon.name">
        </RouterLink>
      </div>
      <div class="base-info">
        <h2>{{ pokemon.id }}. {{ pokemon.name }}</h2>
        <p v-if="pokemon">
          <span v-for="(type, index) in pokemon.types" :key="index">
            {{ type }}
            <span v-if="index < pokemon.types.length - 1"> / </span>
          </span>
        </p>
      </div>
      <button @click="removePokemon" class="cancel-button">x</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { usePartyStore } from '@/store/PartyStore';
  import { defineProps } from 'vue';
  import { RouterLink } from 'vue-router';
  
  interface Stat {
    base_stat: number;
    name: string;
  }
  
  interface Pokemon {
    id: number;
    name: string;
    img: string;
    height: number;
    weight: number;
    types: string[];
    stats: Stat[];
  }
  const props = defineProps<{
    pokemon: Pokemon;
  }>();
  const party = usePartyStore().party;
  function removePokemon() {
    usePartyStore().removePokemon( props.pokemon );
  }
  </script>
  
  <style scoped>
  .party-card {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    text-align: center;
    border-radius: 20px;
    box-shadow: 0px 8px 22px -6px #18274B1F;
    width: 400px;
    height: 150px;
    transition: all 0.3s ease;
    margin: 10px;
  }
  
  .party-card:hover {
    background-color: #333333;
    color: #fff;
  }
  
  .image img {
    width: 90px;
    margin: 20px;
  }
  
  .base-info {
    font-weight: 700;
  }
  
  h2 {
    font-size: 24px;
    text-transform: capitalize;
  }
  
  p {
    font-size: 0.9rem;
  }
  
  span {
    text-transform: capitalize;
    font-weight: 700;
  }
  
  button {
    margin-left: auto;
  }
  .cancel-button {
    position: relative;
    right: 0;
    bottom: 50%;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    color: white;
    opacity: 0;
    background-color: red;
  }
  .party-card:hover .cancel-button {
    opacity: 1;
  }
  
  </style>
  