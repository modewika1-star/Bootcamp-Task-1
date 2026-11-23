import type { PriorityFilter } from '../types/task'
import searchIcon from '../assets/figma/search.svg'


interface SearchBarProps {
  search: string
  onSearchChange: (value: string) => void
  priorityFilter: PriorityFilter
  onPriorityFilterChange: (value: PriorityFilter) => void
  counts: Record<PriorityFilter, number>
}

const filters: { value: PriorityFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
]

function SearchBar({
  search,
  onSearchChange,
  priorityFilter,
  onPriorityFilterChange,
  counts,
}: SearchBarProps) {
  return (
    <div className="search-filter">
      <label className="search-field">
        <span className="sr-only">Search tasks</span>
        <img className="search-field__icon" src={searchIcon} alt="" />
        <input
          className="search-input"
          type="search"
          placeholder="Search your tasks..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <fieldset className="filter-tabs">
        <legend className="sr-only">Filter tasks by priority</legend>
        {filters.map((filter) => (
          <button
            className="filter-tab"
            key={filter.value}
            type="button"
            aria-pressed={priorityFilter === filter.value}
            onClick={() => onPriorityFilterChange(filter.value)}
          >
            {filter.label}
            <span className="filter-tab__count">{counts[filter.value]}</span>
          </button>
        ))}
      </fieldset>
    </div>
  )
}

export default SearchBar
