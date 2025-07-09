import React, { useState } from "react";
import { getDatabase, ref, update } from "firebase/database";

import styles from "../EditingUpdateTask/EditingUpdateTask.module.css";
import { CompletedTask } from "../CompletedTask/CompletedTask";
import { RemoveTodo } from "../RemoveTodo/RemoveTodo";

export const EditingUpdateTask = ({ todo, setTodos, setSnackbar}) => {
  const [editing, setEditing] = useState(false);
  const [editeValue, setEditeValue] = useState(todo.title);

  const saveEdit = async () => {
    if (editeValue === todo.title) {
      setEditing(false);
      return;
    }
    try {
      const db = getDatabase();
      const todoRef = ref(db, `todos/${todo.id}`);

      const updateTodo = { ...todo, title: editeValue };

      await update(todoRef, { title: editeValue });

      setTodos((prevTodo) =>
        prevTodo.map((item) => (item.id === todo.id ? updateTodo : item))
      );

      setEditing(false);
    } catch (error) {
      console.error("Ошибка при редкатировании", error);
    }
  };

  const handleBlur = () => {
    saveEdit();
  };

  const handleEnterKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      saveEdit();
    }
  };

  const handleTextClick = () => {
    setEditing(true);
  };

  return (
    <li className={styles.todoItem}>
      {editing ? (
        <input
          className={styles.inputEdit}
          type="text"
          value={editeValue}
          onChange={({ target }) => setEditeValue(target.value)}
          onBlur={handleBlur}
          onKeyDown={handleEnterKeyDown}
        />
      ) : (
        <span
          className={`${styles.todoText} ${
            todo.completed ? styles.completed : ""
          }`}
          onClick={handleTextClick}
        >
          {todo.title}
        </span>
      )}
      <CompletedTask todo={todo} setTodos={setTodos} />
      <RemoveTodo todo={todo} setTodos={setTodos} setSnackbar={setSnackbar}/>
    </li>
  );
};
