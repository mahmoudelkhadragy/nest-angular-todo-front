export interface Todo {
  id: number;
  title: string;
  description: string;
  status: TodoStatus;
  userId: number;
}

export enum TodoStatus {
  OPEN = 'OPEN',
  INPROGRESS = 'INPROGRESS',
  COMPLETED = 'COMPLETED',
}
