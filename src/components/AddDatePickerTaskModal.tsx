import React, {
  useState,
  Dispatch,
  MouseEvent,
  SetStateAction,
  ChangeEvent,
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
  Checkbox,
  Typography,
} from "@mui/material";

import { HexColorPicker } from "react-colorful";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePickerTaskFormData } from "../models/taskModels";

interface IProps {
  open: boolean;
  handleClose: Dispatch<SetStateAction<void>>;
  datePickerTaskFormData: DatePickerTaskFormData;
  setDatePickerTaskFormData: Dispatch<SetStateAction<DatePickerTaskFormData>>;
  onAddTask: (e: MouseEvent<HTMLButtonElement>) => void;
}

const AddDatePickerTaskModal = ({
  open,
  handleClose,
  datePickerTaskFormData,
  setDatePickerTaskFormData,
  onAddTask,
}: IProps) => {
  const [color, setColor] = useState("#b32aa9");
  const { description, start, end, allDay } = datePickerTaskFormData;

  const onClose = () => {
    handleClose();
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDatePickerTaskFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDatePickerTaskFormData((prevState) => ({
      ...prevState,
      allDay: event.target.checked,
    }));
  };

  const isDisabled = () => {
    const checkend = () => {
      if (!allDay && end === null) {
        return true;
      }
    };
    if (description === "" || start === null || checkend()) {
      return true;
    }
    return false;
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box mb={2} mt={3}>
              <DateTimePicker
                label="Start date"
                value={start}
                ampm={true}
                minutesStep={30}
                onAccept={(newValue) =>
                  setDatePickerTaskFormData((prevState) => ({
                    ...prevState,
                    start: new Date(newValue!),
                  }))
                }
                onChange={() => true}
                slots={{
                  textField: (textFieldProps) => (
                    <TextField {...textFieldProps} />
                  ),
                }}
              />
            </Box>

            <Box>
              <Typography variant="caption" color="text" component={"span"}>
                All day?
              </Typography>
              <Checkbox onChange={handleCheckboxChange} value={allDay} />
            </Box>

            <DateTimePicker
              label="End date"
              disabled={allDay}
              minDate={start}
              minutesStep={30}
              ampm={true}
              value={allDay ? null : end}
              onAccept={(newValue) =>
                setDatePickerTaskFormData((prevState) => ({
                  ...prevState,
                  end: new Date(newValue!),
                }))
              }
              onChange={() => true}
              slots={{
                textField: (textFieldProps) => (
                  <TextField {...textFieldProps} />
                ),
              }}
            />
          </LocalizationProvider>

          <Box
            mb={2}
            mt={5}
            sx={{ display: "flex", justifyContent: "space-around" }}
          >
            <HexColorPicker color={color} onChange={setColor} />
            <Box
              sx={{ height: 80, width: 80, borderRadius: 1 }}
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
        <Button disabled={isDisabled()} color="success" onClick={onAddTask}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDatePickerTaskModal;
