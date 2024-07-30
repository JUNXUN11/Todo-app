<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { uid } from "uid";
import TodoCreater from '../components/TodoCreater.vue';
import TodoItem from '../components/TodoItem.vue';
import { Icon } from '@iconify/vue';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '@/services/todoService';

const todoList = ref([]);

const loadTodos = async () => {
  try {
    const todos = await fetchTodos();
    todoList.value = todos.map(todo => ({
      ...todo,      
    }));
  } catch (error) {
    console.error('Error loading todos:', error);
  }
};

const todoCompleted = computed(() => {
  return todoList.value.every(todo => todo.isCompleted);
});

const addTodo = async (todo) => {
  try {
    const newTodo = await createTodo({
      title: todo,
      completed: false,
      userId: 1
    });
    todoList.value.push({
      ...newTodo,
      isCompleted: newTodo.completed,
      isEditing: false
    });
  } catch (error) {
    console.error('Error adding todo:', error);
  }
};

const toggleTodoComplete = async (todoPos) => {
  const todo = todoList.value[todoPos];
  todo.isCompleted = !todo.isCompleted;
  try {
    await updateTodo(todo.id, { ...todo, completed: todo.isCompleted });
  } catch (error) {
    console.error('Error updating todo:', error);
  }
};

const toggleEditTodo = (todoPos) => {
  todoList.value[todoPos].isEditing = !todoList.value[todoPos].isEditing;
};

const updateTodoTitle = async (todoVal, todoPos) => {
  const todo = todoList.value[todoPos];
  todo.todo = todoVal;
  try {
    await updateTodo(todo.id, { ...todo, title: todoVal });
  } catch (error) {
    console.error('Error updating todo title:', error);
  }
};

const deleteTodoItem = async (todo) => {
  try {
    await deleteTodo(todo.id);
    todoList.value = todoList.value.filter(t => t.id !== todo.id);
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
};

onMounted(loadTodos);

</script>

<template>
  <main>
    <h1>Create Your Tasks</h1>
    <div class="input"><TodoCreater @create-todo="addTodo" /></div>
    <ul class="todo-list" v-if="todoList.length > 0">
      <TodoItem 
        v-for="(todo, index) in todoList" 
        :key="todo.id" 
        :todo="todo" 
        :index="index" 
        @toggle-complete="toggleTodoComplete"
        @edit-todo="toggleEditTodo"
        @update-todo="updateTodoTitle"
        @delete-todo="deleteTodoItem"
      />     
    </ul>
    <p v-else class="todos-msg">
      <Icon icon="fluent-mdl2:sad-solid" />
      <span>You have no todo's to complete! Add one!</span>
    </p>
    <p v-if="todoCompleted && todoList.length > 0" class="todos-msg">
      <Icon icon="noto-v1:party-popper" />
      <span>Congrats! You have completed all your tasks!</span>
    </p>
  </main>
</template>



<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 16px;

  h1 {
    margin-top: 2rem;
    text-align: center;
  }
  
  .input {
    margin-top: 24px;
  }
  
  .todo-list {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin-top: 24px;
    gap: 20px;
  }

  .todos-msg {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 24px;
  }
}
</style>
