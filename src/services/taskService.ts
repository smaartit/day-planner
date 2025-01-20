import axios from "axios";
import { ITaskDetails, DatePickerTaskFormData } from "../models/taskModels";

const API_URL =
  "https://y1ejvxdqb3.execute-api.us-east-1.amazonaws.com/api/task";

export const fetchTasks = async (userId: number): Promise<ITaskDetails[]> => {
  try {
    const response = await axios.get<ITaskDetails[]>(`${API_URL}/all`, {
      params: { userId },
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
  const response = await axios.post<ITaskDetails>(API_URL, task);
  return response.data;
};

export const updateTask = async (
  id: string,
  updatedTask: Partial<ITaskDetails>
): Promise<ITaskDetails> => {
  const response = await axios.put<ITaskDetails>(
    `${API_URL}/${id}`,
    updatedTask
  );
  return response.data;
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

export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
