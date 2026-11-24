import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { NewTask, Task } from '../types/task'
import { TaskContext } from './task-context'

const STORAGE_KEY = 'taskflow.tasks.v1'

// Remove only the tasks that shipped as demo content in earlier versions.
const SAMPLE_TASK_IDS = new Set([
  'task-design-system',
  'task-auth-refresh',
  'task-sprint-retro',
  'task-monorepo',
  'task-user-research',
])

function isTask(value: unknown): value is Task {
  if (!value || typeof value !== 'object') return false

  const task = value as Record<string, unknown>

  return (
    typeof task.id === 'string' &&
    typeof task.title === 'string' &&
    typeof task.description === 'string' &&
    (task.priority === 'high' ||
      task.priority === 'medium' ||
      task.priority === 'low') &&
    typeof task.completed === 'boolean' &&
    typeof task.createdAt === 'string'
  )
}

function isSavedUserTask(value: unknown): value is Task {
  return isTask(value) && !SAMPLE_TASK_IDS.has(value.id)
}

function getInitialTasks(): Task[] {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY)
    if (!savedTasks) return []

    const parsedTasks: unknown = JSON.parse(savedTasks)
    return Array.isArray(parsedTasks) ? parsedTasks.filter(isSavedUserTask) : []
  } catch {
    return []
  }
}

function createTaskId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

interface TaskProviderProps {
  children: ReactNode
}

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>(getInitialTasks)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch {
      // The app remains usable when browser storage is unavailable or full.
    }
  }, [tasks])

  const addTask = useCallback((newTask: NewTask) => {
    const task: Task = {
      ...newTask,
      id: createTaskId(),
      completed: false,
      createdAt: new Date().toISOString(),
    }

    setTasks((currentTasks) => [task, ...currentTasks])
  }, [])

  const updateTask = useCallback((updatedTask: Task) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    )
  }, [])

  const toggleTask = useCallback((id: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }, [])

  const deleteTask = useCallback((id: string) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id))
  }, [])

  const value = useMemo(
    () => ({ tasks, addTask, updateTask, toggleTask, deleteTask }),
    [tasks, addTask, updateTask, toggleTask, deleteTask],
  )

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}
