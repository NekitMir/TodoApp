import { api } from "./axiosBaseUrl";

export const responses = {
  getTodos: async () => {
    return await api.get("/todos");
  },
  addTodo: async (todoData) => {
    return await api.post('/todos', todoData)
  },
  deleteTodo: async (todoId) => {
    return await api.delete(`/todos/${todoId}`)
  },
  updateTodo: async (todoId, todoData) => {
    return await api.patch(`/todos/${todoId}`, todoData)
  }
};

