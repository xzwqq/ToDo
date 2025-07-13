export interface Todo {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in progress' | 'done';
  endDate: string | Date | undefined;
  startDate: string
  updatedAt?: string
}