import { useState } from "react";

import { getDatabase, ref, push } from "firebase/database";

import styles from "../AddInput/AddInput.module.css";
import { Button } from "../Button/Button";

export const AddInput = ({ todos, setTodos }) => {
  const [value, setValue] = useState("");

  const addTodo = async () => {
    if (!value.trim()) return;
    try {
      const db = getDatabase();
      const todosRef = ref(db, "todos");

      const newTodoRef = await push(todosRef, {
        title: value,
        completed: false,
      });

      const newTodo = {
        id: newTodoRef.key,
        title: value,
        completed: false,
      };

      setTodos([...todos, newTodo]);
      setValue("");
    } catch (error) {
      console.error("Ошибка при добавлении задачи", error);
    }
  };

  const addTodoEnter = (event) => {
    if (event.key === "Enter") {
      addTodo();
    }
  };

  return (
    <>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Введите задачу"
          value={value}
          onKeyDown={addTodoEnter}
          onChange={({ target }) => setValue(target.value)}
          className={styles.inputField}
        />
        <Button onClick={addTodo}>🞢</Button>
      </div>
    </>
  );
};
