export type TaskPriority = 'high' | 'medium' | 'low'
export type PriorityFilter = 'all' | TaskPriority

export interface Task {
  id: string
  title: string
  description: string
  priority: TaskPriority
  completed: boolean
  createdAt: string
}

export type NewTask = Pick<Task, 'title' | 'description' | 'priority'>
