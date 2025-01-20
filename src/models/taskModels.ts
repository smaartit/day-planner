export interface ITaskDetails {
  id: number;
  userId: number;
  description: string;
  start?: Date | null;
  end?: Date | null;
  color?: string;
  allDay?: boolean;
}

export interface TaskFormData {
  description: string;
  color?: string;
}

export interface DatePickerTaskFormData {
  description: string;
  allDay: boolean;
  start?: Date;
  end?: Date;
  color?: string;
}
