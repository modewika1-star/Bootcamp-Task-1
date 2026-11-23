# TaskFlow

A responsive task manager built with React, TypeScript, Vite, and Tailwind CSS v4.

## Features

- Create tasks with a title, optional description, and priority.
- Edit task details inline or delete tasks.
- Mark tasks complete and track overall progress.
- Search by task title or description.
- Filter tasks by priority and view live task counts.
- Persist tasks in the browser with localStorage.
- Responsive layout with keyboard-friendly controls and accessible labels.

## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Oxlint

## Getting started

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run lint
npm run build
```

## Project structure

```text
src/
  assets/figma/       # Exported visual assets from the Figma design
  components/         # Task form, search/filter bar, task list and task item
  context/            # Task state provider and context hook
  types/              # Shared TypeScript types
  App.tsx
  App.css
  index.css
  main.tsx
```

Tasks are stored locally in the current browser under `taskflow.tasks.v1`. Clearing browser storage resets the app to its five starter tasks.
