import { useState, type FormEvent } from 'react'
import { useTaskContext } from '../context/TaskContext'
import type { TaskPriority } from '../types/task'
import createTaskIcon from '../assets/figma/create-task.svg'
import priorityArrow from '../assets/figma/priority-arrow.svg'
import plusIcon from '../assets/figma/plus.svg'

function TaskForm() {
  const { addTask } = useTaskContext()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<TaskPriority>('medium')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedTitle = title.trim()
    if (!trimmedTitle) return

    addTask({
      title: trimmedTitle,
      description: description.trim(),
      priority,
    })

    setTitle('')
    setDescription('')
    setPriority('medium')
  }

  return (
    <section className="task-form-card" aria-labelledby="add-task-heading">
      <div className="task-form-card__heading">
        <span className="task-form-card__icon" aria-hidden="true">
          <img src={createTaskIcon} alt="" />
        </span>
        <h2 id="add-task-heading">Add a new task</h2>
      </div>

      <form className="task-form" onSubmit={handleSubmit}>
        <label className="task-title-field">
          <span className="sr-only">Task title</span>
          <input
            className="form-control task-title-input"
            type="text"
            name="title"
            placeholder="What needs to get done?"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={120}
            required
          />
        </label>

        <label className="priority-field">
          <span className="sr-only">Task priority</span>
          <select
            className="priority-select"
            value={priority}
            onChange={(event) => setPriority(event.target.value as TaskPriority)}
          >
            <option value="high">High priority</option>
            <option value="medium">Medium priority</option>
            <option value="low">Low priority</option>
          </select>
          <img className="priority-field__arrow" src={priorityArrow} alt="" />
        </label>

        <button className="add-task-button" type="submit" disabled={!title.trim()}>
          <img src={plusIcon} alt="" />
          Add task
        </button>

        <label className="description-field">
          <span className="sr-only">Task description (optional)</span>
          <input
            className="form-control description-input"
            type="text"
            name="description"
            placeholder="Add a description (optional)"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            maxLength={240}
          />
        </label>
      </form>
    </section>
  )
}

export default TaskForm
