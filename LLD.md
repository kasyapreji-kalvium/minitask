# Low-Level Design (LLD)

## Project: GitFlow Demo – Personal Task Tracker

---

### 1. Data Model Specification

Each task in the tracker is represented by a plain JavaScript object adhering to the following schema:

```typescript
interface Task {
  id: string;          // Unique identifier, e.g., "task_1700000000000"
  text: string;        // Non-empty sanitized string representing the task description
  completed: boolean;  // Task status: true if completed, false if active/pending
  createdAt: string;   // ISO 8601 formatted timestamp string
}
```

#### State Storage
- In-memory: `let tasks = [];`
- Persistent storage key: `'gitflow_tasks'` (serialized JSON string array).

---

### 2. Module & Function Specifications (`app.js`)

#### 2.1 `loadTasks(): void`
- **Purpose**: Reads `'gitflow_tasks'` from `window.localStorage`.
- **Logic**:
  - Parses JSON content inside a `try / catch` block.
  - If valid, populates the `tasks` array.
  - If null or malformed, resets `tasks` to `[]` and logs error to console.

#### 2.2 `saveTasks(): void`
- **Purpose**: Serializes `tasks` array to JSON and writes to `window.localStorage.setItem('gitflow_tasks', ...)`.

#### 2.3 `handleAddTask(e: Event): void`
- **Purpose**: Handles task form submission.
- **Parameters**: `e` - Form submit event (calls `e.preventDefault()`).
- **Logic**:
  1. Reads `taskInput.value.trim()`.
  2. If empty, halts execution.
  3. Constructs new `Task` object with `id = 'task_' + Date.now()`, `completed = false`, `createdAt = new Date().toISOString()`.
  4. Unshifts new task to the front of `tasks` array.
  5. Calls `saveTasks()` and `renderTasks()`.
  6. Resets `taskInput.value = ''` and focuses the input.

#### 2.4 `toggleTaskCompletion(taskId: string): void`
- **Purpose**: Inverts the completion status of a targeted task.
- **Parameters**: `taskId` - Unique ID of the task to toggle.
- **Logic**:
  1. Finds task by ID: `const task = tasks.find(t => t.id === taskId);`.
  2. If found, mutates `task.completed = !task.completed`.
  3. Calls `saveTasks()` and `renderTasks()`.

#### 2.5 `deleteTask(taskId: string): void`
- **Purpose**: Removes a task from the collection.
- **Parameters**: `taskId` - Unique ID of the task to delete.
- **Logic**:
  1. Filters array: `tasks = tasks.filter(t => t.id !== taskId);`.
  2. Calls `saveTasks()` and `renderTasks()`.

#### 2.6 `renderTasks(): void`
- **Purpose**: Synchronizes the current in-memory `tasks` state with the DOM.
- **Logic**:
  1. Empties `#taskList` via `taskList.innerHTML = ''`.
  2. If `tasks.length === 0`, displays `#emptyState`, else hides it.
  3. Loops over each task, creating `<li>` with class `.task-item` (and `.completed` if `task.completed === true`).
  4. Appends `.btn-toggle`, `.task-content`, and `.btn-delete` nodes with attached event listeners.
  5. Calls `updateTaskStats()`.

#### 2.7 `updateTaskStats(): void`
- **Purpose**: Updates task count labels.
- **Logic**:
  - Computes `total = tasks.length` and `completed = tasks.filter(t => t.completed).length`.
  - Sets text for `#taskCount` and `#completedCount`.

---

### 3. DOM Element Reference Table

| Selector | Element Type | Responsibility |
|---|---|---|
| `#taskForm` | `<form>` | Captures submit event on button click or Enter keypress |
| `#taskInput` | `<input type="text">` | User input field for entering task title |
| `#addTaskBtn` | `<button type="submit">` | Form submission trigger button |
| `#taskList` | `<ul>` | Container rendering list of task items |
| `#emptyState` | `<div>` | Informational banner visible when zero tasks exist |
| `#taskCount` | `<span>` | Displays total task count |
| `#completedCount` | `<span>` | Displays count of completed tasks |

---

### 4. Edge Cases & Exception Handling

| Scenario | Handled By | Behavior |
|---|---|---|
| Empty or whitespace-only input | `handleAddTask` | `text.trim()` check; returns early without creating task |
| Special characters / HTML injection in task title | `renderTasks` | Uses `textContent` rather than `innerHTML` to prevent XSS |
| Corrupt or non-JSON data in `localStorage` | `loadTasks` | `try / catch` wraps `JSON.parse`; safely defaults to `[]` |
| Fast sequential additions | `handleAddTask` | `Date.now()` generates unique timestamps |
