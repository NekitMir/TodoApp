import styles from "../CompletedTask/CompletedTask.module.css";
import { useDispatch } from "react-redux";
import { updatedTodo } from "../../store/slices/todoSlice";

export const CompletedTask = ({ todo }) => {
  const dispatch = useDispatch()

  const handleToggleCompleted = async () => {
    try {
      await dispatch(updatedTodo({todoId: todo.id, todoData: {completed: !todo.completed}})).unwrap()
    } catch (error) {
      console.error("Ошибка при обновлении", error);
    }
  }

  return (
    <input
      className={styles.checkbox}
      type="checkbox"
      checked={todo.completed}
      onChange={handleToggleCompleted}
    />
  );
};
