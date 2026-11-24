# TaskFlow

[**Open the live app →**](https://bootcamp-task-1-tau.vercel.app/)

A responsive task manager built with React, TypeScript, Vite, and Tailwind CSS v4.

## Features

- Create tasks with a title, optional description, and priority.
- Edit task details inline or delete tasks.
- Mark tasks complete and track overall progress.
- Search by task title or description.
- Filter tasks by priority and view live task counts.
- Persist tasks in the browser with `localStorage`.
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
npm ci
npm run dev
```

## Quality checks

Run both checks before publishing:

```bash
npm run lint
npm run build
```

The production bundle is generated in `dist/`.

## Project structure

```text
src/
  assets/figma/  # SVG icons used by the interface
  components/    # Task form, search/filter bar, task list and task item
  context/       # Task state provider and context hook
  types/         # Shared TypeScript types
  App.tsx
  App.css
  index.css
  main.tsx
public/
  favicon.svg
```

Tasks are stored locally in the current browser under `taskflow.tasks.v1`. Clearing browser storage resets the app to its five starter tasks.
