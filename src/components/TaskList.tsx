import TaskItem from './TaskItem'
import type { PriorityFilter } from '../types/task'
import type { Task } from '../types/task'

interface TaskListProps {
  tasks: Task[]
  search: string
  priorityFilter: PriorityFilter
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (task: Task) => void
}

function TaskList({
  tasks,
  search,
  priorityFilter,
  onToggle,
  onDelete,
  onUpdate,
}: TaskListProps) {
  if (tasks.length === 0) {
    const hasFilters = Boolean(search.trim()) || priorityFilter !== 'all'

    return (
      <div className="empty-state" role="status">
        <span className="empty-state__symbol" aria-hidden="true">✓</span>
        <h3>{hasFilters ? 'No matching tasks' : 'Your list is clear'}</h3>
        <p>
          {hasFilters
            ? 'Try another search or choose a different priority.'
            : 'Add your first task above and make a little progress.'}
        </p>
      </div>
    )
  }

  return (
    <ul className="task-list" aria-label="Tasks">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  )
}

export default TaskList
