import { useMemo, useState } from 'react'
import './App.css'
import SearchBar, { type PriorityFilter } from './components/SearchBar'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { useTaskContext } from './context/useTaskContext'
import taskflowLogo from './assets/figma/taskflow-logo.svg'

function App() {
  const { tasks, toggleTask, deleteTask, updateTask } = useTaskContext()
  const [search, setSearch] = useState('')
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all')

  const completedCount = tasks.filter((task) => task.completed).length
  const urgentCount = tasks.filter(
    (task) => task.priority === 'high' && !task.completed,
  ).length
  const progress = tasks.length
    ? Math.round((completedCount / tasks.length) * 100)
    : 0

  const counts = useMemo(
    () => ({
      all: tasks.length,
      high: tasks.filter((task) => task.priority === 'high').length,
      medium: tasks.filter((task) => task.priority === 'medium').length,
      low: tasks.filter((task) => task.priority === 'low').length,
    }),
    [tasks],
  )

  const visibleTasks = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return tasks.filter((task) => {
      const matchesPriority =
        priorityFilter === 'all' || task.priority === priorityFilter
      const matchesSearch =
        !normalizedSearch ||
        task.title.toLowerCase().includes(normalizedSearch) ||
        task.description.toLowerCase().includes(normalizedSearch)

      return matchesPriority && matchesSearch
    })
  }, [priorityFilter, search, tasks])

  return (
    <div className="app min-h-screen">
      <header className="site-header">
        <div className="site-header__inner">
          <a className="brand" href="/" aria-label="TaskFlow home">
            <span className="brand__mark">
              <img src={taskflowLogo} alt="" />
            </span>
            <span>TaskFlow</span>
          </a>
          <p className="header-caption">Make room for what matters.</p>
        </div>
      </header>

      <main className="taskflow-shell mx-auto flex w-full max-w-[760px] flex-col gap-6 px-4 pb-10 pt-6">
        <section className="progress-card" aria-labelledby="progress-heading">
          <div className="progress-card__top">
            <div className="section-heading">
              <span className="section-heading__mark" aria-hidden="true">
                <span className="section-heading__bar" />
                <span className="section-heading__bar" />
                <span className="section-heading__bar" />
              </span>
              <h1 id="progress-heading">Progress overview</h1>
            </div>

            <div className="progress-stats">
              <span className="completed-stat">
                <strong>{completedCount}</strong>
                <span>of {tasks.length} completed</span>
              </span>
              <span className="urgent-stat">
                <span className="urgent-stat__dot" />
                {urgentCount} urgent {urgentCount === 1 ? 'task' : 'tasks'}
              </span>
            </div>
          </div>

          <div className="progress-card__bottom">
            <div className="progress-copy">
              <span>Overall progress</span>
              <strong>{progress}%</strong>
            </div>
            <div
              className="progress-track"
              role="progressbar"
              aria-label="Task completion"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <span className="progress-track__value" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </section>

        <TaskForm />

        <section className="task-section" aria-label="Task list">
          <SearchBar
            search={search}
            onSearchChange={setSearch}
            priorityFilter={priorityFilter}
            onPriorityFilterChange={setPriorityFilter}
            counts={counts}
          />

          <TaskList
            tasks={visibleTasks}
            search={search}
            priorityFilter={priorityFilter}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onUpdate={updateTask}
          />
        </section>
      </main>

      <footer className="app-footer">
        <span className="footer-brand">TaskFlow</span>
        <span>Small steps. Steady progress.</span>
      </footer>
    </div>
  )
}

export default App
