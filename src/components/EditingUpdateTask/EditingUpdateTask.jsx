import { useState } from "react";
import { useDispatch } from "react-redux";

import styles from "../EditingUpdateTask/EditingUpdateTask.module.css";
import { CompletedTask } from "../CompletedTask/CompletedTask";
import { RemoveTodo } from "../RemoveTodo/RemoveTodo";
import { updatedTodo } from "../../store/slices/todoSlice";

export const EditingUpdateTask = ({ todo, setSnackbar}) => {
  const [editing, setEditing] = useState(false);
  const [editeValue, setEditeValue] = useState(todo.title);
  const [isSaving, setIsSaving] = useState(false)
  const dispatch = useDispatch()

  const handleSaveTodo = async () => {
    if(isSaving ||editeValue === todo.title) return
    setIsSaving(true)
    try {
      await dispatch(updatedTodo({todoId: todo.id, todoData: {title:editeValue}})).unwrap()
      setSnackbar({
        open: true,
        message: "✔Задача обновлена",
        severity: "success",
      })
      setEditing(false)
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Ошибка при обновлении задачи',
        severity: 'error'
      })
    } 
    finally {
      setIsSaving(false)
    }
  }

  const handleBlur = () => {
    setTimeout(() => {
      if(!isSaving) {
        handleSaveTodo();
      }
    }, 200)
    
  };

  const handleEnterKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSaveTodo();
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
      <CompletedTask todo={todo}/>
      <RemoveTodo todo={todo} setSnackbar={setSnackbar}/>
    </li>
  );
};
