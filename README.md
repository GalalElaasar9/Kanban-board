# Kanban Task Board

A simple Kanban board built with React and TypeScript that allows users to add, edit, delete, and move tasks between columns using drag and drop. Tasks are persisted locally using Zustand with localStorage.

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

* **React** – UI library
* **TypeScript** – Static typing
* **Vite** – Fast development tool
* **Zustand** – Global state management
* **Zustand Persist Middleware** – State persistence using localStorage
* **@dnd-kit/core** – Drag-and-drop functionality
* **react-hot-toast** – Notifications
* **Tailwind CSS** – Styling

---

## Architectural Decision

**Decision:**
Using **Zustand with persist middleware** for state management and data persistence.

**Why:**
Zustand was chosen because it is lightweight and requires minimal boilerplate compared to Redux. The persist middleware was used to automatically store tasks in localStorage, ensuring that user data remains available after page refresh without requiring a backend.

## Features

- Add new tasks
- Edit existing tasks
- Delete tasks
- Drag and drop tasks between columns
- Persistent storage using localStorage
- Toast notifications for actions
