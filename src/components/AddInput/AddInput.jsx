import { useState } from "react";
import { useDispatch } from "react-redux";

import { createTodo } from "../../store/slices/todoSlice";

import styles from "../AddInput/AddInput.module.css";
import { Button } from "../Button/Button";

export const AddInput = () => {
  const [value, setValue] = useState("");

  const dispatch = useDispatch()

  const addTodo = async () => {
    if(!value.trim()) return

    const newTodo = {
      title: value,
      completed: false
    }

    dispatch(createTodo(newTodo))
    setValue('')
  }

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
