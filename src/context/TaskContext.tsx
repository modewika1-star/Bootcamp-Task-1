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

const starterTasks: Task[] = [
  {
    id: 'task-design-system',
    title: 'Design System Documentation & Token Sync',
    description:
      'Update Figma token variables to match Tailwind CSS v4 color specs for the upcoming release.',
    priority: 'high',
    completed: false,
    createdAt: '2026-11-18T09:00:00.000Z',
  },
  {
    id: 'task-auth-refresh',
    title: 'Refactor Authentication Hook & JWT Refresh',
    description:
      'Implement silent token rotation and secure httpOnly cookie storage strategy.',
    priority: 'high',
    completed: false,
    createdAt: '2026-11-18T10:30:00.000Z',
  },
  {
    id: 'task-sprint-retro',
    title: 'Weekly Sprint Retrospective & Demo',
    description:
      'Prepare milestone slide deck showcasing completed user stories and velocity metrics.',
    priority: 'medium',
    completed: false,
    createdAt: '2026-11-19T08:15:00.000Z',
  },
  {
    id: 'task-monorepo',
    title: 'Setup Next.js 15 Monorepo with Turborepo',
    description:
      'Configured shared UI library, Oxlint, Prettier, and TypeScript base config.',
    priority: 'low',
    completed: true,
    createdAt: '2026-11-16T11:00:00.000Z',
  },
  {
    id: 'task-user-research',
    title: 'Conduct User Research Interviews',
    description:
      'Recorded feedback from 4 cohort leads on assignment progression.',
    priority: 'medium',
    completed: true,
    createdAt: '2026-11-15T13:45:00.000Z',
  },
]

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

function getInitialTasks(): Task[] {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY)
    if (!savedTasks) return starterTasks

    const parsedTasks: unknown = JSON.parse(savedTasks)
    return Array.isArray(parsedTasks)
      ? parsedTasks.filter(isTask)
      : starterTasks
  } catch {
    return starterTasks
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
