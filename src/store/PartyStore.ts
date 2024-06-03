import { defineStore } from "pinia"; 
import { ref } from "vue";

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

export const usePartyStore = defineStore('party', () => {
    const party = ref(JSON.parse(localStorage.getItem('party') || '[]') as Pokemon[]);

    const addPokemon = (pokemon: Pokemon) => {
        if(party.value.length < 6){
            party.value.push(pokemon)
            party.value.sort((a, b) => a.id - b.id);
            localStorage.setItem('party', JSON.stringify(party.value)); 
        }else{
            console.log('Party is full');
            return; 
        }
        
    }
    const removePokemon = (pokemon: Pokemon) => {
        const index = party.value.findIndex(p => p.id === pokemon.id);
        if (index !== -1) {
            party.value.splice(index, 1);
            localStorage.setItem('party', JSON.stringify(party.value));
        }
    }
    

    const size = () => party.value.length;
    return { party, addPokemon, removePokemon,  size}
});