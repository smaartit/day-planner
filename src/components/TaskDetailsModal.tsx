import { SetStateAction, MouseEvent, Dispatch } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { ITaskDetails } from "../models/taskModels";

interface IProps {
  open: boolean;
  handleClose: Dispatch<SetStateAction<void>>;
  onDeleteTask: (e: MouseEvent<HTMLButtonElement>) => void;
  currentTask: ITaskDetails | null;
}

const TaskDetailsModal = ({
  open,
  handleClose,
  onDeleteTask,
  currentTask,
}: IProps) => {
  const onClose = () => {
    handleClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Task Detail</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography
            component="span"
            variant="body1"
            sx={{ fontSize: 14, marginTop: 3 }}
            color="text.secondary"
            gutterBottom
          >
            {currentTask?.description}
          </Typography>
        </DialogContentText>
        <Box component="form"></Box>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button color="info" onClick={onDeleteTask}>
          Delete Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDetailsModal;
