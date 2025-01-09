import { useState, MouseEvent } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
} from "@mui/material";

import { Calendar, type Event, dateFnsLocalizer } from "react-big-calendar";

import { format } from "date-fns";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import { enUS } from "date-fns/locale/en-US";

import "react-big-calendar/lib/css/react-big-calendar.css";

import TaskDetails from "./TaskDetails";
import AddTaskModal from "./AddTaskModal";
import TaskDetailsModal from "./TaskDetailsModal";
import AddDatePickerTaskModal from "./AddDatePickerTaskModal";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export interface ITaskDetails extends Event {
  _id: string;
  description: string;
  color?: string;
}

export interface TaskFormData {
  description: string;
  color?: string;
}

export interface DatePickerTaskFormData {
  description: string;
  taskId?: string;
  allDay: boolean;
  start?: Date;
  end?: Date;
  color?: string;
}

export const generateId = () =>
  (Math.floor(Math.random() * 10000) + 1).toString();

const initialTaskFormState: TaskFormData = {
  description: "",
  color: "#b64fc8",
};

const initialDatePickerTaskFormData: DatePickerTaskFormData = {
  description: "",
  taskId: undefined,
  allDay: false,
  start: undefined,
  end: undefined,
  color: "#b64fc8",
};

const TaskSchedular = () => {
  const [openSlot, setOpenSlot] = useState(false);
  const [openDatepickerModal, setOpenDatepickerModal] = useState(false);
  const [currentTask, setCurrentTask] = useState<Event | ITaskDetails | null>(
    null
  );

  const [taskDetailsModal, setTaskDetailsModal] = useState(false);

  const [tasks, setTasks] = useState<ITaskDetails[]>([]);

  const [taskFormData, setTaskFormData] =
    useState<TaskFormData>(initialTaskFormState);

  const [datePickerTaskFormData, setDatePickerTaskFormData] =
    useState<DatePickerTaskFormData>(initialDatePickerTaskFormData);

  const handleSelectSlot = (task: Event) => {
    setOpenSlot(true);
    setCurrentTask(task);
  };

  const handleSelectTask = (task: ITaskDetails) => {
    setCurrentTask(task);
    setTaskDetailsModal(true);
  };

  const handleClose = () => {
    setTaskFormData(initialTaskFormState);
    setOpenSlot(false);
  };

  const handleDatePickerClose = () => {
    setDatePickerTaskFormData(initialDatePickerTaskFormData);
    setOpenDatepickerModal(false);
  };

  const onAddTask = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const data: ITaskDetails = {
      ...taskFormData,
      _id: generateId(),
      start: currentTask?.start,
      end: currentTask?.end,
    };

    const newTasks = [...tasks, data];

    setTasks(newTasks);
    handleClose();
  };

  const onAddTaskFromDatePicker = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const addHours = (date: Date | undefined, hours: number) => {
      return date ? date.setHours(date.getHours() + hours) : undefined;
    };

    const setMinToZero = (date: any) => {
      date.setSeconds(0);

      return date;
    };

    const data: ITaskDetails = {
      ...datePickerTaskFormData,
      _id: generateId(),
      start: setMinToZero(datePickerTaskFormData.start),
      end: datePickerTaskFormData.allDay
        ? addHours(datePickerTaskFormData.start, 12)
        : setMinToZero(datePickerTaskFormData.end),
    };

    const newTasks = [...tasks, data];

    setTasks(newTasks);
    setDatePickerTaskFormData(initialDatePickerTaskFormData);
  };

  const onDeleteTask = () => {
    setTasks(() =>
      [...tasks].filter((e) => e._id !== (currentTask as ITaskDetails)._id!)
    );
    setTaskDetailsModal(false);
  };

  return (
    <Box
      mt={1}
      mb={1}
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Card>
          <CardHeader
            title="Calendar"
            subheader="Create Tasks and manage them easily"
          />
          <Divider />
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <ButtonGroup
                size="large"
                variant="contained"
                aria-label="outlined primary button group"
              >
                <Button
                  onClick={() => setOpenDatepickerModal(true)}
                  size="small"
                  variant="contained"
                >
                  Add Task
                </Button>
              </ButtonGroup>
            </Box>
            <Divider style={{ margin: 10 }} />
            <AddTaskModal
              open={openSlot}
              handleClose={handleClose}
              taskFormData={taskFormData}
              setTaskFormData={setTaskFormData}
              onAddTask={onAddTask}
            />
            <AddDatePickerTaskModal
              open={openDatepickerModal}
              handleClose={handleDatePickerClose}
              datePickerTaskFormData={datePickerTaskFormData}
              setDatePickerTaskFormData={setDatePickerTaskFormData}
              onAddTask={onAddTaskFromDatePicker}
            />
            <TaskDetailsModal
              open={taskDetailsModal}
              handleClose={() => setTaskDetailsModal(false)}
              onDeleteTask={onDeleteTask}
              currentTask={currentTask as ITaskDetails}
            />
            <Calendar
              localizer={localizer}
              events={tasks}
              onSelectEvent={handleSelectTask}
              onSelectSlot={handleSelectSlot}
              selectable
              startAccessor="start"
              components={{ event: TaskDetails }}
              endAccessor="end"
              defaultView="week"
              eventPropGetter={(ev) => {
                const hasColor = tasks.find((task) => task.color === ev.color);
                return {
                  style: {
                    backgroundColor: hasColor ? hasColor.color : "#b64fc8",
                    borderColor: hasColor ? hasColor.color : "#b64fc8",
                  },
                };
              }}
              style={{
                height: 900,
              }}
            />
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default TaskSchedular;
