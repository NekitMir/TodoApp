import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { removeTodo } from "../../store/slices/todoSlice";

export const RemoveTodo = ({ todo, setTodos, setSnackbar }) => {
  const [openDialog, setOpenDialg] = useState(false);
  const dispatch = useDispatch()


  const removedTodo = async () => {
    try {
      await  dispatch(removeTodo(todo.id)).unwrap()
      setSnackbar({
        open: true,
        message: "✔Задача удалена",
        severity: "success",
      });
      setOpenDialg(false)
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Ошибка при удалении",
        severity: "error",
      });
    }
    finally {
      setOpenDialg(false)
    }
  }

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
          <Button onClick={removedTodo} color="error" autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
