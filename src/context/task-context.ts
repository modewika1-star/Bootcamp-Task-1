import { createContext } from 'react'
import type { NewTask, Task } from '../types/task'

export interface TaskContextValue {
  tasks: Task[]
  addTask: (task: NewTask) => void
  updateTask: (task: Task) => void
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void
}

export const TaskContext = createContext<TaskContextValue | null>(null)
