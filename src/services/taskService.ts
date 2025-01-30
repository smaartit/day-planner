import axios from "axios";
import { ITaskDetails, DatePickerTaskFormData } from "../models/taskModels";

const API_URL =
  "https://y1ejvxdqb3.execute-api.us-east-1.amazonaws.com/api/task";

const token = localStorage.getItem("token"); // Ret

export const fetchTasks = async (): Promise<ITaskDetails[]> => {
  try {
    const response = await axios.get<ITaskDetails[]>(`${API_URL}/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Transform data to calendar event format
    return response.data.map((task) => ({
      ...task,
      title: task.description,
      start: task.start ? new Date(task.start) : null,
      end: task.end ? new Date(task.end) : null,
    }));
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks");
  }
};

export const createTask = async (task: ITaskDetails): Promise<ITaskDetails> => {
  const response = await axios.post<ITaskDetails>(API_URL, task, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateTask = async (
  id: string,
  updatedTask: Partial<ITaskDetails>
): Promise<ITaskDetails> => {
  const response = await axios.put<ITaskDetails>(
    `${API_URL}/${id}`,
    updatedTask,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const completeTask = async (id: number, completed: boolean) => {
  try {
    const response = await axios.put(
      `${API_URL}/${id}/complete`,
      { completed },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error completing tasks:", error);
  }
};

export const updateDatePickerTask = async (
  id: string,
  updatedTask: Partial<DatePickerTaskFormData>
): Promise<DatePickerTaskFormData> => {
  const response = await axios.put<DatePickerTaskFormData>(
    `${API_URL}/${id}`,
    updatedTask
  );
  return response.data;
};

export const onDeleteTask = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return id;
    } else {
      console.error("Failed to delete task");
    }
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};
