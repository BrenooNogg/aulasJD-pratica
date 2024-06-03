import api from "./api.service";

interface Stat {
    name: string;
    base_stat: number;
}

interface Pokemon {
    id: number;
    name: string;
    img: string;
    height: number;
    weight: number;
    types: string[];
    stats: Stat[]
}

export const getPokemonByName = async (pokemonName: string) => {
    try {
        const response = await api.api(`pokemon/${pokemonName}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getPokemonById = async (pokemonId: number) => {
    try {
        const response = await api.api(`pokemon/${pokemonId}`);
        const pokemonData = response.data; 

        const pokemon: Pokemon = {
            id: pokemonData.id,
            name: pokemonData.name,
            img: pokemonData.sprites.other['official-artwork'].front_default,
            height: pokemonData.height, 
            weight: pokemonData.weight, 
            types: pokemonData.types.map((type: any) => type.type.name),
            stats: pokemonData.stats.map((stat: any) => ({ name: stat.stat.name, base_stat: stat.base_stat }))
        }

        return pokemon;
    } catch (error) {
        console.error(error);
    }
}

export const getAllPokemon = async (limit: number, offset: number) => {
    try {
        const response = await api.api(`pokemon?limit=${limit}&offset=${offset}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}