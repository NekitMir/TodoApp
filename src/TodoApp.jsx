import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import { fetchTodos, setSearchValue, setSortOrder } from "./store/slices/todoSlice";

import styles from "./TodoApp_Css/TodoApp.module.css";

import { AddInput } from "./components/AddInput/AddInput";
import { EditingUpdateTask } from "./components/EditingUpdateTask/EditingUpdateTask";
import { SearchInput } from "./components/SearchInput/SearchInput";
import { SortedTasks } from "./components/SortedTasks/SortedTasks";
import { selectFilteredTodos } from "./store/slices/todoSelectors";
import { useDebounce } from "./hooks/useDebonce";

export function TodoApp() {
  const todos = useSelector((state) => state.todos.todos)
  const dispatch = useDispatch()
  const searchValue = useSelector((state) => state.todos.searchValue) 
  const debounceSearchValue = useDebounce(searchValue, 300);
  const sortOrder = useSelector((state) => state.todos.sortOrder)

  const filteredTasks = useSelector(useMemo(() => 
    selectFilteredTodos(debounceSearchValue), [debounceSearchValue]))
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });  // Выносим в сторе, как initialState
  
  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  return (
    <>
      <AddInput />
      <SearchInput searchValue={searchValue} setSearchValue={(value) => dispatch(setSearchValue(value))} />
      <SortedTasks sortOrder={sortOrder} setSortOrder={(value) => dispatch(setSortOrder(value))} />
      {todos.length === 0 ? (
        <span className={styles.noTasks}>Задачи не найдены</span>
      ) : (
        <ul className={styles.todoList}>
          {filteredTasks.map((todo) => (
            <EditingUpdateTask
              key={todo.id}
              todo={todo}
              setSnackbar={setSnackbar}
            />
          ))}
        </ul>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
