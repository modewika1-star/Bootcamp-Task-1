<!-- TaskFlow | Project README -->

<div align="center">

# TaskFlow | Personal Task Manager

[![Live Demo](https://img.shields.io/badge/Live_Demo-Open_Project-2563EB?style=for-the-badge&logo=vercel&logoColor=white)](https://taskflow85.vercel.app/)

### Stay focused. Prioritize what matters. Make progress visible.

A clean task manager for capturing work, setting priorities, and tracking your progress without unnecessary complexity.

<br />


[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=20232A)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

<br />

**[View source code](https://github.com/modewika1-star/Bootcamp-Task-1)**

</div>

---

## 🎯 About TaskFlow

TaskFlow is a responsive task-management application built to make everyday planning feel clear and manageable. Create tasks, add context, choose a priority, and keep an eye on your progress from one focused dashboard.

The workspace starts empty, so you can build your own task list instead of having to clear demo content first.

## 🚀 Features

| Feature | Description |
| --- | --- |
| ➕ **Create tasks** | Add a task with a title, optional description, and priority. |
| ✏️ **Edit tasks** | Update task details as plans change. |
| 🗑️ **Delete tasks** | Remove tasks you no longer need. |
| ✅ **Completion tracking** | Mark tasks complete and see your overall progress. |
| 🔎 **Live search** | Search task titles and descriptions. |
| 🎚️ **Priority filters** | Filter by high, medium, or low priority. |
| 📊 **Progress overview** | See completed tasks, urgent tasks, and completion percentage. |
| 💾 **Local persistence** | Keep your tasks in the current browser with localStorage. |
| 📱 **Responsive interface** | Work comfortably across desktop and mobile layouts. |

## 🧭 How to use

1. Open [TaskFlow](https://taskflow85.vercel.app/).
2. Add a task and provide a title.
3. Add an optional description and choose its priority.
4. Search or filter the list when it grows.
5. Mark tasks complete and follow your progress.

## 🛠️ Built with

| Technology | Purpose |
| --- | --- |
| **React 19** | Builds the interactive task-management interface. |
| **TypeScript** | Defines task models and keeps application logic type-safe. |
| **Vite 8** | Runs the development server and creates production builds. |
| **Tailwind CSS 4** | Provides utility-first styling through the Vite integration. |
| **Oxlint** | Performs fast code-quality checks. |
| **Browser localStorage** | Persists tasks between visits on the same browser. |

## ⚙️ Run locally

### Prerequisites

- Node.js **20.19+** or **22.12+**
- npm

### Installation

~~~bash
# Clone the repository
git clone https://github.com/modewika1-star/Bootcamp-Task-1.git

# Enter the project
cd Bootcamp-Task-1

# Install dependencies
npm ci

# Start the development server
npm run dev
~~~

Open the local URL printed by Vite.

## 🧪 Checks & production build

~~~bash
# Run lint checks
npm run lint

# Create a production build
npm run build

# Preview the production build locally
npm run preview
~~~

The production files are generated in the <code>dist/</code> directory.

## 🗂️ Project structure

~~~text
src/
├── assets/figma/  # SVG assets used by the interface
├── components/    # Task form, search bar, task list, and task item
├── context/       # Shared task state and context provider
├── types/         # TypeScript task and priority definitions
├── App.tsx        # Main dashboard and derived task views
├── App.css        # Application styles
├── index.css      # Global styles
└── main.tsx       # Application entry point

public/
└── favicon.svg
~~~

## 💾 Storage behavior

Tasks are stored in the current browser under the localStorage key <code>taskflow.tasks.v1</code>. This means:

- Your tasks remain available when you reopen the app in the same browser.
- Data is not synchronized between devices or browsers.
- Clearing this browser's site data removes the saved task list.
- The application does not require an account or a backend service.

## 📌 Project information

| | |
| --- | --- |
| **Project** | TaskFlow |
| **Repository** | [modewika1-star/Bootcamp-Task-1](https://github.com/modewika1-star/Bootcamp-Task-1) |
| **Live application** | [taskflow85.vercel.app](https://taskflow85.vercel.app/) |
| **Category** | Frontend task manager |

---

<div align="center">

Made with ❤️ by **[7ijazi](https://7ijazi.vercel.app/)**

<sub>Small steps. Steady progress.</sub>

</div>
