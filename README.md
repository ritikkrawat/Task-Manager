# Task Manager

A full-stack task management application built with React and Node.js + Express. Users can create, view, edit, delete, and filter personal tasks with support for drag-and-drop reordering, search, and persistent storage. Built as part of the Studio Graphene Full Stack Developer Assessment (Exercise 1: Personal Task Manager).

---

## Live Demo

- **Frontend:** https://sgtaskmanager.vercel.app
- **Backend:** https://sgtaskmanagerbackend.onrender.com

---

## Tech Stack

### Frontend
- **React (Create React App)** — Component-based UI with hooks
- **Axios** — Clean promise-based HTTP requests
- **@hello-pangea/dnd** — Maintained fork of react-beautiful-dnd for drag and drop
- **Plain CSS** — Simple, no overhead, easy to read

### Backend
- **Node.js + Express** — Lightweight, fast REST API
- **uuid v8** — Generate unique task IDs (v8 for CommonJS compatibility)
- **cors** — Allow cross-origin requests from frontend
- **dotenv** — Local environment variable management
- **fs (built-in)** — JSON file persistence across server restarts

---

## How to Run Locally

### Prerequisites
- Node.js installed

### 1. Clone the repo
```bash
git clone https://github.com/ritikkrawat/Task-Manager.git
cd Task-Manager
```

### 2. Run the backend
```bash
cd server
npm install
npm start
```
Server runs on http://localhost:5000

### 3. Run the frontend (open a new terminal)
```bash
cd client
npm install
npm start
```
App runs on http://localhost:3000

---

## API Documentation

Base URL (local): `http://localhost:5000`  
Base URL (production): `https://sgtaskmanagerbackend.onrender.com`

### GET /api/tasks
Fetch all tasks.

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "Buy groceries",
    "description": "Milk and eggs",
    "dueDate": "2025-06-10",
    "completed": false,
    "createdAt": "2025-06-01T10:00:00.000Z"
  }
]
```

---

### POST /api/tasks
Create a new task.

**Request Body:**
```json
{
  "title": "Buy groceries",
  "description": "Milk and eggs",
  "dueDate": "2025-06-10"
}
```

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "title": "Buy groceries",
  "description": "Milk and eggs",
  "dueDate": "2025-06-10",
  "completed": false,
  "createdAt": "2025-06-01T10:00:00.000Z"
}
```

---

### PUT /api/tasks/:id
Update a task's title, description, or due date.

**Request Body:**
```json
{
  "title": "Buy groceries and fruits",
  "description": "Milk, eggs, apples",
  "dueDate": "2025-06-11"
}
```

**Response:** `200 OK` — updated task object.

---

### PATCH /api/tasks/:id/toggle
Toggle a task's completed status.

**Response:** `200 OK` — updated task object.

---

### PATCH /api/tasks/reorder
Save new task order after drag and drop.

**Request Body:**
```json
{
  "orderedIds": ["uuid1", "uuid2", "uuid3"]
}
```

**Response:** `200 OK` — reordered tasks array.

---

### DELETE /api/tasks/:id
Delete a task.

**Response:**
```json
{
  "message": "Task deleted"
}
```

---

## Project Structure
Task-Manager/
├── client/                         # React frontend (Create React App)
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx        # Add new task form
│   │   │   ├── TaskList.jsx        # Drag and drop task list
│   │   │   ├── TaskItem.jsx        # Individual task with edit and delete
│   │   │   └── FilterBar.jsx       # Filter and search bar
│   │   ├── App.jsx                 # Root component, state and API calls
│   │   ├── index.js                # React entry point
│   │   └── index.css               # Global styles
│   ├── .env                        # Local environment variables
│   ├── .env.production             # Production environment variables
│   └── package.json
│
├── server/                         # Node.js + Express backend
│   ├── api/
│   │   └── index.js                # Vercel serverless entry point
│   ├── data/
│   │   └── store.js                # JSON file read/write helpers
│   ├── routes/
│   │   └── tasks.js                # All task REST endpoints
│   ├── app.js                      # Express app setup and CORS
│   ├── index.js                    # Local server entry point
│   ├── vercel.json                 # Vercel deployment config
│   └── package.json
│
└── README.md

---

## What Works

- Add a task with title (required), description (optional), and due date (required)
- View all tasks sorted by creation date newest first
- Mark tasks as complete or incomplete
- Edit a task's title, description, and due date
- Delete a task with a confirmation prompt
- Filter tasks by All, Active, and Completed
- Search tasks by title
- Visually distinguish overdue tasks with a red left border
- Show active and completed task counts
- Empty state UI when no tasks match
- Drag and drop to reorder tasks
- Tasks persist across server restarts via JSON file

---

## Next Steps

- **Authentication** — JWT-based auth so multiple users can have their own task lists
- **PostgreSQL or MongoDB** — replace JSON file storage with a proper database for scalability
- **Due date notifications** — email or browser push notifications for upcoming due dates
- **Task priorities** — add a priority field (low, medium, high) with visual indicators
- **Unit tests** — Jest tests for backend routes and React Testing Library tests for components