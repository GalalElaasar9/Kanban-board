# Kanban Task Board

A simple Kanban board built with React and TypeScript that allows users to add, edit, delete, and move tasks between columns using drag and drop. Tasks are saved locally so they persist after refreshing the page.

---

## How to Run the Project

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open in your browser:

```
http://localhost:5173
```

---

## Libraries Used

* **React** – For building the user interface
* **TypeScript** – For type safety and better code maintainability
* **Vite** – For fast development and build tooling
* **Zustand** – For global state management
* **@dnd-kit/core** – For drag-and-drop functionality
* **react-hot-toast** – For showing notifications
* **Tailwind CSS** – For styling the UI

---

## Architectural Decision

**Decision:**
Using **Zustand** for global state management combined with **localStorage** for data persistence.

**Why:**
Zustand was chosen because it is lightweight, simple, and requires minimal boilerplate compared to Redux. It allows centralized task management while keeping components clean and maintainable.
localStorage was used to persist tasks locally so users do not lose their data when refreshing the page, without needing a backend.

## Features

- Add new tasks
- Edit existing tasks
- Delete tasks
- Drag and drop tasks between columns
- Persistent storage using localStorage
- Toast notifications for actions
