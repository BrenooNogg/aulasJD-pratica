<template>
  <div class="todo-item mt-4">
    <div class="flex flex-row items-center mt-2">      
      <div class="div text-center">
        <label :class="{'active': done}">{{ task }}</label>
        <p :class="{'active': done}">{{ description }}</p>
      </div>
      <div class="flex gap-4">
        <input type="checkbox" v-model="done" @change="updateTask" />
        <!-- <button @click="deleteTask" class="button border p-2 rounded">Editar</button> -->
        <button @click="deleteTask" class="button border p-2 rounded">Excluir</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  task: string;
  done: boolean;
  description?: string;
}>();

const emit = defineEmits(["update", "delete"]);
const done = ref(props.done);

const updateTask = () => {
  emit('update', {
    task: props.task,
    done: done,
    description: props.description
  });
};

const deleteTask = () => {
  emit('delete'); // Emitir evento 'delete' sem passar nenhum argumento
};

</script>
<style scoped>
.todo-item {
  margin-bottom: 1rem;
}
.active {
  text-decoration: line-through;
}
.div{
  width: 100%;
}
</style>
