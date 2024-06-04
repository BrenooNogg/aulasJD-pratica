<template>
    <div class="flex">
        <div v-if="user" class="main m-10 bg-slate-900">
            <img :src="user.avatar_url" :alt="user.name">
            <h2>Name: {{ user.name }}</h2> 
            <p>Username: {{ user.login }}</p>
            <p class="text-sm">Bio: {{ user.bio }}</p>
            <p>Company: {{ user.company }}</p> 
            <div class="flex gap-2 mb-7">
                <span>Following: {{ user.following }}</span>
                <span>Followers: {{ user.followers }}</span>
            </div>
            <p>Location: {{ user.location }}</p>
        </div>
        <p v-else>Loading...</p>
        <div class="flex gap-5 justify-center items-center flex-col p-4 m-10 bg-slate-900 text-white ">
            <h2>About Me</h2>
            <p class="text-lg font-normal text-center mb-4 max-w-prose">I'm a Software Developer studying programming for about two years. I'm passionate about technology and always eager to learn and explore new things.</p>
            <p>
                My Party: 
                <span class="font-normal" v-if="pokemon.size() <= 1">{{ pokemon.size() }} Pokemon</span>
                <span class="font-normal" v-else>{{ pokemon.size() }} Pokemons</span>
            </p>
            <p class="bg-white p-2 rounded-sm w-auto">
                <RouterLink to="/party" class="text-blue-500">View Party</RouterLink>
            </p>
        </div>
    </div>

</template>

<script setup lang="ts">
import { getUser, getUserRepos } from '@/service/github.service';
import { onMounted, ref } from 'vue';
import { usePartyStore } from '@/store/PartyStore';

interface User {
    name: string;
    login: string;
    avatar_url: string;
    bio: string;
    company: string;
    location: string;
    followers: number;
    following: number;
}
const user = ref<User | null>(null);
const pokemon = usePartyStore();;
const get = async () => {
    const response = await getUser('BrenooNogg');
    user.value = response;
    console.log(response);
}
const project = ref(null)   
const repo = async () => {
    const response = await getUserRepos(user.value?.name || '');
    console.log(response)
}
onMounted(() => {
    get();
    repo();
});
</script>
<style scoped>
.main{
    line-height: 2rem;
    width: 500px;
    padding: 20px 40px;
    display: flex;
    text-align: left;
    flex-direction: row;
    flex-wrap: wrap;
    color: white;
}
img{
    margin: 0 auto;
    border-radius: 50%;
    height: auto;
    width: 260px;
} 
h2{
    font-size: 18px;
    /* line-height: 1.25rem; */
}
</style>
