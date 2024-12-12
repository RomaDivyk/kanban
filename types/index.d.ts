export interface TasksInterface {
  statuses: Status[];
  task: Task;
  allTasks: Task[];
  modal: boolean;
}

export interface Task {
  id: number | null;
  title: string;
  description: string;
  responsibleUser: User | null;
  performers: User[] | null;
  status: Status | null | number;
  priority: number | null;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
}

export interface Status {
  id: number;
  title: string;
}

export interface Priority {
  title: string;
}
