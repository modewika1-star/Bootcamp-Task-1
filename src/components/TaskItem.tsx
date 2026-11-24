import { useId, useState, type FormEvent, type KeyboardEvent } from 'react'
import type { Task, TaskPriority } from '../types/task'
import editIcon from '../assets/figma/edit.svg'
import trashIcon from '../assets/figma/trash.svg'
import editingIndicator from '../assets/figma/editing-indicator.svg'
import editPriorityArrow from '../assets/figma/edit-priority-arrow.svg'
import saveIcon from '../assets/figma/save.svg'
import completedCheck from '../assets/figma/completed-check.svg'

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (task: Task) => void
}

const priorityLabels: Record<TaskPriority, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
}

function TaskItem({ task, onToggle, onDelete, onUpdate }: TaskItemProps) {
  const titleId = useId()
  const descriptionId = useId()
  const [isEditing, setIsEditing] = useState(false)
  const [draftTitle, setDraftTitle] = useState(task.title)
  const [draftDescription, setDraftDescription] = useState(task.description)
  const [draftPriority, setDraftPriority] = useState<TaskPriority>(
    task.priority,
  )

  function startEditing() {
    setDraftTitle(task.title)
    setDraftDescription(task.description)
    setDraftPriority(task.priority)
    setIsEditing(true)
  }

  function cancelEditing() {
    setDraftTitle(task.title)
    setDraftDescription(task.description)
    setDraftPriority(task.priority)
    setIsEditing(false)
  }

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedTitle = draftTitle.trim()
    if (!trimmedTitle) return

    onUpdate({
      ...task,
      title: trimmedTitle,
      description: draftDescription.trim(),
      priority: draftPriority,
    })
    setIsEditing(false)
  }

  function handleEditorKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape') {
      event.preventDefault()
      cancelEditing()
    }
  }

  return (
    <li>
      <article
        className={`task-card${task.completed ? ' task-card--completed' : ''}`}
      >
        {isEditing ? (
          <form className="task-editor" onSubmit={handleSave}>
            <div className="task-editor__topline">
              <span className="task-editor__hint">
                <img src={editingIndicator} alt="" />
                Editing task
              </span>
              <span>Press Esc to cancel</span>
            </div>

            <label className="task-editor__label" htmlFor={titleId}>
              Task title
              <input
                className="task-editor__title"
                id={titleId}
                type="text"
                value={draftTitle}
                onChange={(event) => setDraftTitle(event.target.value)}
                maxLength={120}
                required
                onKeyDown={handleEditorKeyDown}
              />
            </label>

            <label className="task-editor__label" htmlFor={descriptionId}>
              Description
              <textarea
                className="task-editor__description"
                id={descriptionId}
                value={draftDescription}
                onChange={(event) => setDraftDescription(event.target.value)}
                maxLength={240}
                rows={2}
                onKeyDown={handleEditorKeyDown}
              />
            </label>

            <div className="task-editor__bottom">
              <label className="priority-field task-editor__priority">
                <span className="sr-only">Task priority</span>
                <select
                  className="priority-select"
                  value={draftPriority}
                  onChange={(event) =>
                    setDraftPriority(event.target.value as TaskPriority)
                  }
                  onKeyDown={handleEditorKeyDown}
                >
                  <option value="high">High priority</option>
                  <option value="medium">Medium priority</option>
                  <option value="low">Low priority</option>
                </select>
                <img
                  className="priority-field__arrow"
                  src={editPriorityArrow}
                  alt=""
                />
              </label>

              <div className="task-editor__buttons">
                <button
                  className="delete-button"
                  type="button"
                  aria-label={`Delete ${task.title}`}
                  onClick={() => onDelete(task.id)}
                  onKeyDown={handleEditorKeyDown}
                >
                  <img src={trashIcon} alt="" />
                  Delete
                </button>
                <button
                  className="cancel-button"
                  type="button"
                  onClick={cancelEditing}
                  onKeyDown={handleEditorKeyDown}
                >
                  Cancel
                </button>
                <button
                  className="save-button"
                  type="submit"
                  disabled={!draftTitle.trim()}
                  onKeyDown={handleEditorKeyDown}
                >
                  <img src={saveIcon} alt="" />
                  Save changes
                </button>
              </div>
            </div>
          </form>
        ) : (
          <>
            <button
              className="task-checkbox"
              type="button"
              aria-label={
                task.completed
                  ? `Mark ${task.title} as incomplete`
                  : `Mark ${task.title} as complete`
              }
              aria-pressed={task.completed}
              onClick={() => onToggle(task.id)}
            >
              {task.completed && <img src={completedCheck} alt="" />}
            </button>

            <div className="task-card__content">
              <div className="task-card__title-row">
                <h3 className="task-card__title">{task.title}</h3>
                <span
                  className={`priority-badge priority-badge--${task.priority}`}
                >
                  {priorityLabels[task.priority]}
                </span>
              </div>
              {task.description && (
                <p className="task-card__description">{task.description}</p>
              )}
            </div>

            <div className="task-actions">
              <button
                className="icon-button"
                type="button"
                aria-label={`Edit ${task.title}`}
                onClick={startEditing}
              >
                <img src={editIcon} alt="" />
              </button>
              <button
                className="icon-button icon-button--delete"
                type="button"
                aria-label={`Delete ${task.title}`}
                onClick={() => onDelete(task.id)}
              >
                <img src={trashIcon} alt="" />
              </button>
            </div>
          </>
        )}
      </article>
    </li>
  )
}

export default TaskItem
