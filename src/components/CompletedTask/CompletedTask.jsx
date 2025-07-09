import { getDatabase, ref, update } from "firebase/database";
import styles from "../CompletedTask/CompletedTask.module.css";

export const CompletedTask = ({ todo, setTodos }) => {
  const toggleCompleted = async () => {
    try {
      const db = getDatabase();
      const todoRef = ref(db, `todos/${todo.id}`);
      const updateTodo = { ...todo, completed: !todo.completed };
      await update(todoRef, { completed: !todo.completed });

      setTodos((prev) =>
        prev.map((item) => (item.id === todo.id ? updateTodo : item))
      );
    } catch (error) {
      console.error("Ошибка при обновлении", error);
    }
  };

  return (
    <input
      className={styles.checkbox}
      type="checkbox"
      checked={todo.completed}
      onChange={toggleCompleted}
    />
  );
};
