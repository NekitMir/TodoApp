import { getDatabase, ref, remove } from "firebase/database";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

export const RemoveTodo = ({ todo, setTodos, setSnackbar }) => {
  const [openDialog, setOpenDialg] = useState(false);

  const removeTodo = async () => {
    try {
      const db = getDatabase();
      const todoRef = ref(db, `todos/${todo.id}`);
      await remove(todoRef);
      setTodos((prevTodo) => prevTodo.filter((item) => item.id !== todo.id));

      setSnackbar({
        open: true,
        message: "✔Задача удалена",
        severity: "success",
      });
    } catch (error) {
      console.error("Ошибка при удалении задачи", error);
      setSnackbar({
        open: true,
        message: "Ошибка при удалении",
        severity: "error",
      });
    } finally {
      setOpenDialg(false);
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        color="error"
        size="small"
        onClick={() => setOpenDialg(true)}
      >
        ✕
      </Button>

      <Dialog open={openDialog} onClose={() => setOpenDialg(false)}>
        <DialogTitle>Удалить задачу?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены что хотите удалить: <b>{todo.title}?</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialg(false);
              setSnackbar({
                open: true,
                message: "Отмена удаления",
                severity: "warning",
              });
            }}
            color="primary"
          >
            Отмена
          </Button>
          <Button onClick={removeTodo} color="error" autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
