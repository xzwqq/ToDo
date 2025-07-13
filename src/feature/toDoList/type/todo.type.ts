export interface Todo {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in progress' | 'done';
  date: string | Date | undefined;
  createdAt: string
}