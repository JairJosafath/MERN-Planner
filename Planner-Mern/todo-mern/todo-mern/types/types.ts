export interface Todo {
  _id?: string;
  id?: string;
  title?: string;
  description?: string;
  color?: string;
  dueDate?: string;
  startDate?: string;
  priority?: number;
  task?: Task;
  status?: "in progress" | "completed";
}
export interface Task {
  _id?: string;
  id?: string;
  name?: string;
  description?: string;
  color?: string;
  dueDate?: string;
  startDate?: string;
  priority?: number;
  project?: Project;
  todos?: Todo[];
  status?: "in progress" | "completed";
}
export interface Project {
  _id?: string;
  id?: string;
  name?: string;
  description?: string;
  color?: string;
  dueDate?: string;
  startDate?: string;
  priority?: number;
  tasks?: Task[];
  status?: "in progress" | "completed";
}
