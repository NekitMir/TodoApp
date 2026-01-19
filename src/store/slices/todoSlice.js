import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { responses } from "../../apis/axiosApis/axiosApi";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await responses.getTodos();
  return response.data;
});

export const createTodo = createAsyncThunk(
  'todos/createTodo',
  async (todoData) => {
    const response = await responses.addTodo(todoData)
    return response.data
  }
)

export const removeTodo = createAsyncThunk(
  'todos/removeTodo',
  async (todoId, {rejectWithValue}) => {
    try {
      await responses.deleteTodo(todoId)
      return todoId
    } catch (error) {
      return rejectWithValue('Не удалось удалить задачу')
    }
  }
)

export const updatedTodo = createAsyncThunk(
  'todos/updatedTodo',
  async ({todoId, todoData}, {rejectWithValue}) => {
    try {
      const response = await responses.updateTodo(todoId, todoData)
      return response.data
    } catch (error) {
      return rejectWithValue('Не удалось редактировать задачу')
    }
  }
)

const initialState = {
  todos: [],
  searchValue: "",
  sortOrder: "none",
  loading: false,
  error: null
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
   setSearchValue: (state, action) => {
      state.searchValue = action.payload
   },

   setSortOrder: (state, action) => {
      state.sortOrder = action.payload
   }
  },
  extraReducers: (builder) => {
    builder
        // Fetch Todos
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload; 
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Ошибка загрузки задач';
        console.error("Ошибка при получении задач", action.error);
      })
        // Create Todo
      .addCase(createTodo.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.todos.push(action.payload)
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.loading = false
        state.error = action.error?.message || 'Ошибка создания задачи'
        console.error("Ошибка при создании задачи", action.error);
      })
        // Remove Todo
      .addCase(removeTodo.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.todos = state.todos.filter((todo) => todo.id !== action.payload)
      })
      .addCase(removeTodo.rejected, (state, action) => {
        state.loading = false
        state.error = action.error?.message || 'Ошибка удаления задачи'
      })
       // Update Todo
       .addCase(updatedTodo.pending, (state) => {
        state.loading = true
        state.error = null
       })
       .addCase(updatedTodo.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.todos = state.todos.map((todo) => todo.id === action.payload.id ? action.payload : todo)
       })
       .addCase(updatedTodo.rejected, (state, action) => {
        state.loading = false
        state.error = action.error?.message || 'Ошибка редактирования задачи'
       })
  },
});

export const {setSearchValue, setSortOrder} = todosSlice.actions
export default todosSlice.reducer;
