# High-Level Design (HLD)

## Project: GitFlow Demo – Personal Task Tracker

---

### 1. Architectural Overview
The **GitFlow Demo Personal Task Tracker** follows a client-side Single Page Application (SPA) architecture operating entirely inside the browser runtime. It has zero external dependencies and requires no backend server.

```
+------------------------------------------------------------------+
|                           User Browser                           |
|                                                                  |
|  +------------------------------------------------------------+  |
|  |                 Presentation Layer (HTML / CSS)            |  |
|  |     - index.html (Semantic UI Structure)                   |  |
|  |     - style.css (Design System & Responsive Styles)        |  |
|  +------------------------------+-----------------------------+  |
|                                 | DOM Events / Render            |
|  +------------------------------v-----------------------------+  |
|  |              Application Logic Layer (app.js)              |  |
|  |     - Event Handlers (Submit, Toggle, Delete)              |  |
|  |     - In-Memory State (`tasks` Array)                      |  |
|  |     - DOM Renderer Engine                                  |  |
|  +------------------------------+-----------------------------+  |
|                                 | Read / Write JSON              |
|  +------------------------------v-----------------------------+  |
|  |             Browser Storage Layer (localStorage)           |  |
|  |     - Key: "gitflow_tasks"                                 |  |
|  +------------------------------------------------------------+  |
+------------------------------------------------------------------+
```

---

### 2. Component Breakdown

#### 2.1 Presentation Layer (`index.html` + `style.css`)
- **Semantic Structure**: Provides form inputs, task count badges, dynamic task list container (`<ul>`), and empty state placeholders.
- **Styling Architecture**: Uses CSS custom properties (variables) for consistent colors, typography, border-radii, and elevation shadows. Fully responsive layout optimized for mobile and desktop screens.

#### 2.2 Application Logic Layer (`app.js`)
- **State Management**: Maintains an in-memory array of task objects representing the single source of truth for the session.
- **Lifecycle Events**:
  - `DOMContentLoaded`: Initializes the app, parses saved data from browser storage, and triggers the initial DOM render.
  - User Actions: Triggers pure state mutation functions (`addTask`, `toggleTaskCompletion`, `deleteTask`) followed by synchronous DOM re-rendering and storage persistence.

#### 2.3 Storage Layer (`localStorage`)
- Persists state as a JSON string under key `'gitflow_tasks'`. Provides zero-latency, offline-first persistence without needing backend database calls.

#### 2.4 Hoisting Verification Module (`docs/HOISTING.md` + `app.js`)
- Explains and verifies the JavaScript engine's two-phase lifecycle (Memory Creation Phase vs Execution Phase).
- Validates function declaration hoisting, `var` hoisting initialization (`undefined`), and `let`/`const` Temporal Dead Zone (TDZ).

#### 2.5 Side Effects & Cleanup Engine (`docs/USE_EFFECT.md` + `app.js`)
- Demonstrates React's `useEffect` pattern for managing side-effects after DOM paint.
- Features `document.title` synchronization on state updates, `localStorage` synchronization, and session timer cleanup via `clearInterval` to avoid memory leaks.

---

### 3. Git Release & Branching Architecture
This project's software delivery follows the **Feature Branch Workflow**:

```
[main] ─────────────────────●───────────────────────●───────────────────────●───────────────────────● (Stable)
       \                   / \                     / \                     / \                     /
        ●─────────────────●   \                   /   \                   /   \                   /
   [feature/task-creation]     ●─────────────────●     \                 /     \                 /
                        [feature/task-completion-del]   ●───────────────●       \               /
                                                   [feature/task-tracker-ui]     ●─────────────●
                                                                           [docs/workflow-and-arch]
```

- **`main` Branch**: Contains only production-ready, peer-reviewed, merged code. Direct commits are restricted.
- **Feature Branches**: Every task or documentation group lives in an isolated branch branched off `main` and merged via three-way Pull Request merges (`--no-ff`).
