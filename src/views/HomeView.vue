<script setup>
import { ref, watch, computed} from 'vue'
import { uid } from "uid";
import TodoCreater from '../components/TodoCreater.vue'
import TodoItem from '../components/TodoItem.vue';
import { Icon } from '@iconify/vue';

const todoList = ref([])

watch(
  todoList, 
  () => {
   setTodoListLocalStorage();
  },
  {
      deep: true,  //to look change inside the array
  }
)

const todoCompleted = computed(() => {                      //computed - automatically calculate
  return todoList.value.every((todo) => todo.isCompleted);  //check whether every todo is completed
});

const fetchTodoList = () => {
  const savedTodoList = JSON.parse(localStorage.getItem("todoList"))
  if(savedTodoList){
    todoList.value = savedTodoList;
  };
}

fetchTodoList();

const setTodoListLocalStorage = () => {
  localStorage.setItem("todoList", JSON.stringify(todoList.value))
}


const createTodo = (todo) => {
  todoList.value.push({
    id: uid(),
    todo,
    isCompleted: null,
    isEditing: null,
  })
  setTodoListLocalStorage();
}

const toggleTodoComplete = (todoPos) => {
  todoList.value[todoPos].isCompleted = !todoList.value[todoPos].isCompleted;
};

const toggleEditTodo = (todoPos) => {
  todoList.value[todoPos].isEditing = !todoList.value[todoPos].isEditing;
};

const updateTodo = (todoVal, todoPos) => {
  todoList.value[todoPos].todo = todoVal ;
}

const deleteTodo = (todo) => {
  todoList.value = todoList.value.filter(
    (todoFilter) => todoFilter.id !== todo.id)
}

</script>

<template>
  <main>
    <h1>Create Your Tasks</h1>
    <TodoCreater @create-todo="createTodo"/>
    <ul class="todo-list" v-if="todoList.length > 0">
     <TodoItem 
       v-for="(todo,index) in todoList" 
       :key="todo.id" 
       :todo="todo" 
       :index="index" 
       @toggle-complete="toggleTodoComplete"
       @edit-todo="toggleEditTodo"
       @update-todo="updateTodo"
       @delete-todo="deleteTodo"
      />     
    </ul>
    <p v-else class="todos-msg">
      <Icon icon="fluent-mdl2:sad-solid" />
      <span>You have no todo's to complete! Add one!</span>
    </p>
    <p v-if="todoCompleted && todoList.length > 0 " class="todos-msg">
      <Icon icon="noto-v1:party-popper" />
      <span>Congrats ! You have completed all your tasks!</span>
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
    margin-bottom: 3rem;
    text-align: center;
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
