import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const fetchTodos = async () => {
  try {
    const response = await axios.get(API_URL,{
      params :{
        _limit: 10
      }
    });
    const todos = response.data;

    return todos.map(todo => ({
      id: todo.id,
      todo: todo.title, 
      isCompleted: todo.completed,
      isEditing: false 
    }));
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};


export const createTodo = async (todo) => {
  try {
    const response = await axios.post(API_URL, todo);
    return response.data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

export const updateTodo = async (id, updatedTodo) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedTodo);
    return response.data;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};
