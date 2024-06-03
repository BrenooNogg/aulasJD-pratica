<template>
    <div class="pokecard">
        <div class="image">
            <img :src="pokemon?.img">
        </div>
        <div class="base-info">
            <h2>{{pokemon?.id }}. {{ pokemon?.name }}</h2>
            <p v-if="pokemon">
                <span v-for="(type, index) in pokemon.types" :key="index">
                    {{ type }}
                    <span v-if="index < pokemon.types.length - 1"> / </span>
                </span>
            </p>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref  } from 'vue';
import { getPokemonById } from '@/service/pokemon.service';

interface Pokemon {
    id: number;
    name: string;
    img: string;
    height: number; 
    types: string[];
}

const props = defineProps<{
    id: number;
}>();

const pokemon = ref<Pokemon | null>(null);

onMounted(async () => {
    try {
        const response = await getPokemonById(props.id);
        if (response) {
            pokemon.value = response;
        } else {
            console.error('Pokémon não encontrado');
        }
    } catch (error) {
        console.error('Erro ao buscar o Pokémon:', error);
    }
});
</script>
<style scoped>
.pokecard {
    display: flex;
    align-items: center;    
    flex-wrap: wrap;
    text-align: center;
    border-radius: 20px; 
    box-shadow: 0px 8px 22px -6px #18274B1F;
    width: 400px;
    height: 150px;
    transition: all 0.3s ease;
}  

.pokecard:hover{
    background-color: #333333; 
    color: #fff;
}

.base-info {
    font-weight: 700;
}
img {
    width: 90px;
    margin: 40px ;
}
h2{
    font-size: 24px;
    text-transform: capitalize;
}

p {
    font-size: .9rem;
}
span {
    text-transform: capitalize;
    font-weight: 700;
}
</style>