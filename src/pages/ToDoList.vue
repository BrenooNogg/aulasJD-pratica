<template>
  <div class="">
      <h1 class="text-2xl font-bold">Lista de Tarefas</h1>
      <div class="">
        <input
        type="text"
        v-model="newTask"
        placeholder="Insira nova tarefa"
        :class="{ 'border-red-500': isButtonClicked && newTask.trim() === '' }"
        class="border p-2 rounded mt-2"
        />
        <p v-show="isButtonClicked && newTask .trim() == ''" class="text-red-500">Preencher campo tarefa</p>
      </div>
      <div class="">
        <input
          type="text"
          v-model="newDescription"
          placeholder="Insira descrição"
          :class="{ 'border-red-500': isButtonClicked && newDescription.trim() === '' }"
          class="border p-2 rounded mt-2"
        />
        <p v-show="isButtonClicked && newDescription.trim() == ''" class="text-red-500">Preencher campo descrição</p>
      </div>
      <ButtonComponent text="Adicionar" @click="addTask" class="button border p-2 rounded mt-2" />
      <ToDoItem
        v-for="(item, index) in array"
        :key="item.id"
        :task="item.nome"
        :done="item.done"
        :description="item.description"
        @update="doneTask(index, item)"
        @delete="deleteTask(index)"
      >
      </ToDoItem>
    </div>
  </template>
  <script setup lang="ts">
  import { ref, onMounted } from "vue";
  import ButtonComponent from '@/components/ButtonComponent.vue';
  import ToDoItem from "@/components/ToDoItem.vue";
  
  const newTask = ref<String>("");
  const newDescription = ref<String>("");

  const array = ref([
    {
      id: 1,
      nome: "Estudar Vue.js",
      done: false,
      description: "Estudar Vue.js é muito legal",
    },
    {
      id: 2,
      nome: "Trabalhar",
      done: true,
      description: "Trabalhar é muito legal",
    },
    {
      id: 3,
      nome: "Dormir",
      done: false,
      description: "Dormir é muito legal",
    },
    {
      id: 4,
      nome: "Comer",
      done: false,
      description: "Comer é muito legal",
    },
  ]);

  const isButtonClicked = ref(false);

  const addTask = () => {
    isButtonClicked.value = true; 
    if (newTask.value.trim() === '' || newDescription.value.trim() === '') { return };

    array.value.push({
      id: array.value.length + 1,
      nome: newTask.value as string,
      description: newDescription.value as string,
      done: false,
    });
    newDescription.value = '';
    newTask.value = '';
    isButtonClicked.value = false; 
  };
  
  const doneTask = (index: number, event: {done: boolean}) => {
      array.value[index].done = event.done;
  }

  const deleteTask = (index: number) => {
    array.value.splice(index, 1);
  };

  const addtaskOnMount = () => {
    array.value.push({
      id: array.value.length + 1,
      nome: "Assistir aula",
      description: "Estudar Vue.js é muito legal",
      done: false,
    })
  }
  
  onMounted(() => {
    addtaskOnMount();
  })
  </script>
  <style scoped>
  .empty-input {
    border-color: red; 
  }
  </style>
  