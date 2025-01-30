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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { ITaskDetails } from "../models/taskModels";

interface IProps {
  open: boolean;
  handleClose: Dispatch<SetStateAction<void>>;
  onDeleteTask: (e: MouseEvent<HTMLButtonElement>) => void;
  onToggleCompleted: (taskId: number, completed: boolean) => void;
  currentTask: ITaskDetails | null;
}

const TaskDetailsModal = ({
  open,
  handleClose,
  onDeleteTask,
  onToggleCompleted,
  currentTask,
}: IProps) => {
  const onClose = () => {
    handleClose();
  };
  const handleCompletedChange = () => {
    if (currentTask) {
      onToggleCompleted(currentTask.id, !currentTask.completed);
    }
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Task Detail</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography
            component="span"
            variant="body1"
            sx={{
              fontSize: 14,
              marginTop: 3,
            }}
            color="text.secondary"
            gutterBottom
          >
            {currentTask?.description}
          </Typography>
        </DialogContentText>
        <Box mt={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={!!currentTask?.completed} // Default to false if undefined
                onChange={handleCompletedChange}
              />
            }
            label="Completed"
          />
        </Box>
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
