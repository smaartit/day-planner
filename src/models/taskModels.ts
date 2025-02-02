export interface ITaskDetails {
  id: number;
  description: string;
  start?: Date | null;
  end?: Date | null;
  color?: string;
  allDay?: boolean;
  completed?: boolean;
}

export interface TaskFormData {
  description: string;
  color?: string;
  completed?: boolean;
}

export interface DatePickerTaskFormData {
  description: string;
  allDay: boolean;
  start?: Date;
  end?: Date;
  color?: string;
  completed?: boolean;
}
