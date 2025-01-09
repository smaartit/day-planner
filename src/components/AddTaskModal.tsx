import {
  useState,
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
} from "react";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Box,
} from "@mui/material";

import { HexColorPicker } from "react-colorful";
import { TaskFormData } from "./TaskSchedular";

interface IProps {
  open: boolean;
  handleClose: Dispatch<SetStateAction<void>>;
  taskFormData: TaskFormData;
  setTaskFormData: Dispatch<SetStateAction<TaskFormData>>;
  onAddTask: (e: MouseEvent<HTMLButtonElement>) => void;
}

const AddTaskModal = ({
  open,
  handleClose,
  taskFormData,
  setTaskFormData,
  onAddTask,
}: IProps) => {
  const [color, setColor] = useState("#b32aa9");
  const { description } = taskFormData;

  useEffect(() => {
    setTaskFormData((prevState) => ({
      ...prevState,
      color: color,
    }));
  }, [color]);

  const onClose = () => handleClose();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
      color: color,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add task</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a task, please fill in the information below.
        </DialogContentText>
        <Box component="form" sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            name="description"
            value={description}
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            onChange={onChange}
          />

          <Box
            mb={2}
            mt={5}
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignContent: "flex-start",
            }}
          >
            <HexColorPicker color={color} onChange={setColor} />
            <Box
              sx={{ display: "flex", height: 80, width: 80, borderRadius: 1 }}
              className="value"
              style={{ backgroundColor: color }}
            ></Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button
          disabled={description === ""}
          color="success"
          onClick={onAddTask}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskModal;
