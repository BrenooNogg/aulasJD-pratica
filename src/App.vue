<template>
  <div>
    <header class="menu flex flex-wrap justify-center font-extrabold text-black text-lg">
      <RouterLink to="/" class="menu-link" active-class="active" exact>
        Pokedex
      </RouterLink>
      <RouterLink to="/Party" class="menu-link" active-class="active">
        Party
      </RouterLink>
      <RouterLink to="/Trainer" class="menu-link" active-class="active">
        Trainer
      </RouterLink>
      <RouterLink to="/todolist" class="menu-link" active-class="active">
        To do List
      </RouterLink>
    </header>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<style scoped>
.menu-link {
  display: block;
  padding: 0.5rem;
  position: relative;
  text-decoration: none;
  color: black;
}

.menu-link::after {
  content: "";
  position: absolute;
  background-color: #000;
  height: 2px;
  width: 0;
  left: 0;
  bottom: 0;
  transition: 0.3s;
}

.menu-link:hover::after {
  width: 100%;
}

.active::after {
  width: 100%;
}
</style>
