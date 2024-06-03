<template>
  <div v-if="pokemon" class="container">
    <Message v-for="msg in message" :key="msg.id" :severity="msg.severity" :closeable="false" class="flex justify-around" :closable="false">{{ msg.content }}</Message>
    <div>
      <div class="main flex gap-20 flex-wrap justify-between p-14 text-white"  :style="{backgroundColor: background}">
        
        <div :class="`section-picture flex flex-wrap gap-5`">
          <img :src="pokemon.img" :alt="pokemon.name" class="picture w-44 bg-white p-2">
          
          <div>
            <h2 class="name">{{ pokemon.name }}</h2>
            <button 
              v-if="partyStore.party.find(p => p.id === pokemon?.id)" 
              @click="partyStore.removePokemon(pokemon), partyStore.size() >= 6" 
              class="bg-red-500 text-white font-bold p-2 party rounded-lg"
            >
              Remover da Party
            </button>
            <button 
              v-else 
              @click="addPokemon(pokemon)"  
              class="bg-white text-black font-bold p-2 party rounded-lg"
            >
              Adicionar a Party
            </button>
          </div>

        </div>

        <div class="flex gap-5 p-2">
          <span class="cursor-pointer font-extrabold" @click="id > 1 && previous()" v-show="id > 1">&lt;{{ formatId(id - 1) }}</span>
          <span class="cursor-pointer font-extrabold size" @click="id <= 150 && next()">{{ formatId(id + 1) }}&gt;</span>      
        </div>

      </div>
    <div class="pl-10 pr-10">

      <div class="mt-5">
        <label>Tipos: </label>
        
        <span class="m-5">
          <span :class="`capitalize rounded-md pr-5 pl-5 pt-2 pb-2 text-white mr-5 w-[130px] h-[50px]`" v-for="(type, index) in pokemon.types" :key="index" :style="{backgroundColor:getColor(type)}">
            {{ type }}
          </span>      
        </span>
      </div>

      <div class="flex gap-5 mt-5 mb-5">
        <Label>Altura: 
          <span class="font-normal">
            {{ pokemon.height }}
          </span>
        </Label>
        <Label>Peso:
          <span class="font-normal">
            {{ pokemon.weight }}
          </span>  
        </Label>
      </div>
      
      <div v-if="pokemon.stats">
        <label>Estatísticas: </label>
        <div v-for="(stat, index) in pokemon.stats" :key="index" class="stat-bar">
          <div class="bar">
            <span class="absolute left-[150px] text-white">{{ stat.name }}: {{ stat.base_stat }}</span>
            <div class="bar" :class="{ 'over-100': stat.base_stat > 100 }">
              <div class="fill" :style="{ width: stat.base_stat + '%', backgroundColor: (stat.base_stat > 100 ? '#ff5722' : '#76a9fa') }">
              </div>
              <div v-if="stat.base_stat > 100" class="extra-fill" :style="{ width: (stat.base_stat - 100) + '%' }"></div>
            </div>
          </div>
          
        </div>
      </div>
      
    </div>  
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getPokemonById } from '@/service/pokemon.service';
import { PokeColors } from '@/type/Types.enum';
import { usePartyStore } from '@/store/PartyStore';
import Message from 'primevue/message';

const partyStore = usePartyStore();

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

const formatId = (id: number | null): string => {
  if (id === null || id <= 0 || id > 151) return '';
  return `#${id.toString().padStart(3, '0')}`;
};

const previous = () => {
  window.location.href = `/pokemon/${id - 1}`;
}
const next = () => {
  window.location.href = `/pokemon/${id + 1}`;
}

const getColor = (type: string): string => {
  return PokeColors[type.toLowerCase() as keyof typeof PokeColors] || '#FFFFFF';
};

const router = useRouter();
const pokemon = ref<Pokemon | null>(null);
const background = ref('');
const id = Number(router.currentRoute.value.params.id);

const getCurrentPokemon = async () => {
  try {
    const response = await getPokemonById(id);
    pokemon.value = response || null;
    background.value = getColor(response?.types[0] || '');
  } catch (error) {
    background.value = '';
    pokemon.value = null;
    console.error('Failed to fetch Pokémon data:', error);
  }
}
const message = ref([] as any[]);
const count = ref(0);
function addWarning() {
  message.value = [{ severity: 'warn', content: 'Party is full', id: count.value++}];
}

const addPokemon = (pokemon:Pokemon) =>{
  if(partyStore.size() < 6){
    partyStore.addPokemon(pokemon)
  }else{
    addWarning();
    setTimeout(() => {
      message.value = [];
    }, 2500);
  }
}

onMounted(() => {
  getCurrentPokemon();
});
</script>

<style scoped>

label{
  font-size: 1.5rem;
  line-height: 36px;
  font-weight: 700;
}
.name {
  font-family: 'Poppins', sans-serif;
  text-transform: capitalize;
  font-size: 4.625rem;
  line-height: 96px;
  font-weight: 700;
}
.party {
  box-shadow: 0px 4px 4px 0px #00000040;
}
.picture {
  box-shadow: 0px 18px 88px -4px #18274B24;
  box-shadow: 0px 8px 28px -6px #18274B1F;

}
.stat-bar {
  width: 400px;
  height: 18px;
  margin: 8px 0;
}
.bar {
  background-color: #9B9B9B;
  border-radius: 5px;
  overflow: hidden;
}
.fill {
  height: 20px;
  background-color: #76a9fa;
  text-align: center;
  padding: 12px; 
  line-height: 20px;
  color: white;
  border-radius: 5px;
}

@media screen and (max-width: 768px) {
  .name{
    font-size: 3.625rem;
  }
  .picture {
    width: 120px;
    padding: 0;
  }
  .section-picture {
    flex-direction: column;
  }
  .main {
    padding: 10px;
    align-items: center;
    flex-direction: column;
  }
  .stat-bar {
    width: 100%;
  }
}
</style>
