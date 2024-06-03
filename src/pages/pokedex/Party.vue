<template>
    <div class="container">
    <PartyCard v-for="(pokemon, index) in party" :pokemon="pokemon"  />
    </div>
</template>
  
<script setup lang="ts">
import PartyCard from '@/components/pokemon/PartyCard.vue';
import { onMounted } from 'vue';
import { usePartyStore } from '@/store/PartyStore';

const party = usePartyStore().party;
const store = localStorage.getItem('party');
onMounted(() => {
    console.log(store);
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

</style>
  