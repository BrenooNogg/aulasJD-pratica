<template>
  <div class="todo-item mt-4">
    <div class="flex flex-row items-center mt-2">      
      <div class="div text-center">
        <InputText type="text" :class="{'disabled': isButtonClicked, 'done': done}" v-model="task" :disabled="isButtonClicked" />
        <InputText type="text" :class="{'disabled': isButtonClicked, 'done': done}" v-model="description" :disabled="isButtonClicked" />
      </div>
      <div class="flex gap-4">
        <input type="checkbox" v-model="done" @change="doneTask" />
        <button @click="updateTask" class="button border p-2 rounded">{{ isButtonClicked ? 'Editar' : 'Concluir' }}</button>
        <button @click="deleteTask" class="button border p-2 rounded">Excluir</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import InputText from 'primevue/inputtext';

const props = defineProps<{
  task: string;
  done: boolean;
  description?: string;
}>();

const emit = defineEmits(["done", "update", "delete"]);
const done = ref(props.done);
const task = ref(props.task);
const description = ref(props.description);
const isButtonClicked = ref(true); 

const doneTask = () => {
  emit('done', {
    task: task,
    done: done,
    description: description
  });
};

const updateTask = () => {
  isButtonClicked.value = !isButtonClicked.value; 
  if (isButtonClicked.value) {
    emit('update'); 
  }
}

const deleteTask = () => {
  emit('delete');
};

</script>
<style scoped>
.todo-item {
  margin-bottom: 1rem;
}
.disabled {
  border: none;
  background-color: transparent;
  box-shadow: none;
}
.disabled:nth-child(2){
  width: 200px;
}
.done {
  color: red;
  text-decoration: line-through;
}


.div{
  width: 100%;
}
</style>
