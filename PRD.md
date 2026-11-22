# Product Requirements Document (PRD)

## Project: GitFlow Demo – Personal Task Tracker

---

### 1. Overview & Objective
The **GitFlow Demo Personal Task Tracker** is a minimal, lightweight, single-page web application. The core objective is to serve as a clean, functional codebase exclusively used to demonstrate professional **Git Workflow** and version control principles for Kalvium evaluation.

---

### 2. Target Audience
- **Primary**: Kalvium Project Assessors reviewing Git workflow, branch management, and repository structure.
- **Secondary**: Students and beginner software engineers learning Git branching models, pull requests, and atomic commits.

---

### 3. Functional Requirements (FR)

| Req ID | Feature | Description | Acceptance Criteria |
|---|---|---|---|
| **FR-01** | Add Task | Users can type a task description and submit via the "Add Task" button or by pressing `Enter`. | Task is added to the active list and saved to persistent storage. Input field is cleared and focused. Empty submissions are blocked. |
| **FR-02** | Display Tasks | Tasks are rendered as a clean list showing their status. | If no tasks exist, an empty state message is shown. A counter shows total and completed task counts. |
| **FR-03** | Mark Completed | Users can toggle tasks between active and completed by clicking a circular check button. | Completed tasks render with strikethrough text and muted color styling. Status updates immediately in storage. |
| **FR-04** | Delete Task | Users can delete a task by clicking an accessible delete button (`×`). | Task is permanently removed from the DOM and storage. Stats counter decrements accordingly. |
| **FR-05** | Persistence | Tasks persist across page reloads. | Data is stored in browser `localStorage` as serialized JSON. |
| **FR-06** | Hoisting Inspector | Users/Assessors can execute a live hoisting suite to evaluate JavaScript memory creation phase. | Verifies function declaration hoisting, `var` hoisting (`undefined`), `let`/`const` Temporal Dead Zone, and logs results on-screen. |
| **FR-07** | `useEffect` Lifecycle & Cleanup | Users/Assessors can observe and toggle side effects with cleanup mechanics. | Demonstrates `document.title` dynamic synchronization, session timer with active `clearInterval` cleanup to prevent memory leaks, and interactive lifecycle step tracer. |

---

### 4. Non-Functional Requirements (NFR)
- **Zero External Dependencies**: Pure Vanilla HTML5, CSS3, and ES6 JavaScript. No external libraries, build tools, or CDNs required.
- **Portability**: Opens and runs locally by opening `index.html` directly in any modern web browser.
- **Responsiveness**: Card layout adapts cleanly to desktop and mobile viewport widths.
- **Simplicity**: Code remains under 300 total lines to keep the focus strictly on Git workflow rather than complex business logic.

---

### 5. Out of Scope
- Backend servers, databases, or API integrations.
- User authentication and multi-user tenancy.
- Due dates, task categories, or recurring tasks.
