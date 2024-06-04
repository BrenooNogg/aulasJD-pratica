import { createRouter, createWebHistory } from "vue-router";
import Pokedex from "@/pages/pokedex/Pokedex.vue";
import PokemonPage from "@/pages/pokedex/PokemonPage.vue";
import Party from "@/pages/pokedex/Party.vue";
import ToDoList from "@/pages/ToDoList.vue";
import Trainer from "@/pages/pokedex/Trainer.vue";


const routes = [
    {
        path: "/",
        name: "Pokedex",
        component: Pokedex,
    },
    {
        path: "/pokemon/:id/",
        name: "PokemonPage",
        component: PokemonPage,
    },
    {
        path: "/party", 
        name: 'Party',
        component: Party
    },
    {
        path: '/trainer',
        name: "Trainer",
        component: Trainer
    },
    {
        path: '/todolist',
        name: "ToDoList",
        component: ToDoList
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;