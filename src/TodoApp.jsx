import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { Snackbar, Alert } from "@mui/material";

import styles from "./TodoApp_Css/TodoApp.module.css";

import { db } from "./firebase";
import { AddInput } from "./components/AddInput/AddInput";
import { EditingUpdateTask } from "./components/EditingUpdateTask/EditingUpdateTask";
import { SearchInput } from "./components/SearchInput/SearchInput";
import { SortedTasks } from "./components/SortedTasks/SortedTasks";
import { useDebounce } from "./hooks/useDebonce";

export function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const debounceSearch = useDebounce(searchValue, 300);
  const [sortOrder, setSortOrder] = useState("none");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const todosRef = ref(db, "todos");

    const unsubscribe = onValue(todosRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const todosArray = Object.entries(data).map(([id, todo]) => ({
          id,
          ...todo,
        }));
        setTodos(todosArray);
      } else {
        setTodos([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const filteredTasks = todos
    .filter((todo) =>
      todo.title.toLowerCase().includes(debounceSearch.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "none") return 0;

      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();

      return sortOrder === "asc"
        ? titleA.localeCompare(titleB)
        : titleB.localeCompare(titleA);
    });

  return (
    <>
      <AddInput todos={todos} setTodos={setTodos} />
      <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} />
      <SortedTasks sortOrder={sortOrder} setSortOrder={setSortOrder} />
      {todos.length === 0 ? (
        <span className={styles.noTasks}>Задачи не найдены</span>
      ) : (
        <ul className={styles.todoList}>
          {filteredTasks.map((todo) => (
            <EditingUpdateTask
              todo={todo}
              setTodos={setTodos}
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
