export interface Entity {
  dueDate?: string;
  startDate?: string;
}

export interface Todo extends Entity {
  _id?: string;
  id?: string;
  title?: string;
  name?: string;
  description?: string;
  color?: string;
  dueDate?: string;
  startDate?: string;
  priority?: number;
  task?: Task;
  status?: "in progress" | "completed";
}
export interface Task extends Entity {
  _id?: string;
  id?: string;
  name?: string;
  title?: string;
  description?: string;
  color?: string;
  dueDate?: string;
  startDate?: string;
  priority?: number;
  project?: Project;
  todos?: Todo[];
  status?: "in progress" | "completed";
}
export interface Project extends Entity {
  _id?: string;
  id?: string;
  title?: string;
  name?: string;
  description?: string;
  color?: string;
  dueDate?: string;
  startDate?: string;
  priority?: number;
  tasks?: Task[];
  status?: "in progress" | "completed";
}
