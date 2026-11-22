# GitFlow Demo – Kalvium Assessment Project

> **Evaluation Project for Kalvium Project Assessor: 3 Core Competencies**
> 1. 🌟 **Git Workflow** (`0.3 pts • Engineering Practices`)
> 2. ⚡ **JavaScript — Hoisting** (`0.1 pts • Frontend`)
> 3. 🔄 **Side effects with useEffect** (`0.2 pts • Frontend`)

---

## 1. Project Overview
**GitFlow Demo** is a lightweight, responsive personal task tracker built as a single-page web application. It is purpose-built for the Kalvium Assessor evaluation, demonstrating professional Git workflow, JavaScript language mechanics (Hoisting & Execution Context), and React lifecycle side-effect management (`useEffect` with cleanup).

---

## 2. Core Application Features
- ➕ **Add Task**: Enter task title and add to the active tracker via button or `Enter`.
- 📋 **Display Tasks**: View tasks dynamically with live pending/completed counters.
- 🔍 **Filter Tasks**: Toggle view between `All`, `Active`, and `Completed` items.
- ✔️ **Mark Tasks Completed**: Toggle tasks between pending and completed with strikethrough styling.
- 🗑️ **Delete Tasks**: Remove tasks with instant UI updates.
- 💾 **Persistent Storage**: Client-side `localStorage` data persistence across reloads.
- ⚡ **JavaScript Hoisting Inspector**: Live on-page test suite evaluating `var`, function declarations, and Temporal Dead Zone (TDZ).
- 🔄 **`useEffect` Lifecycle Visualizer**: Live interval timer demonstrating mount, state dependency updates, and memory leak cleanup on unmount.

---

## 3. Evaluated Kalvium Competencies

### 1. Git Workflow (0.3 pts • Engineering Practices)
- Developed using the **Feature Branch Workflow** with semantic commits (`feat:`, `style:`, `docs:`, `chore:`).
- Feature branches pushed to GitHub, Pull Requests created, reviewed, and merged into `main` with non-fast-forward (`--no-ff`) merge commits.
- Read full guide: [docs/GIT_WORKFLOW.md](docs/GIT_WORKFLOW.md)

### 2. JavaScript — Hoisting (0.1 pts • Frontend)
- Explains and demonstrates memory creation phase vs code execution phase.
- Function declarations hoisted with definition (callable before declaration line).
- `var` hoisted as `undefined`.
- `let` / `const` hoisted into the **Temporal Dead Zone (TDZ)** (throws `ReferenceError`).
- Function expressions hoisted as `undefined` (throws `TypeError` on early call).
- Read full guide & Viva Q&A: [docs/HOISTING.md](docs/HOISTING.md)

### 3. Side Effects with useEffect (0.2 pts • Frontend)
- Pure rendering vs side-effects (DOM mutations, localStorage sync, timers, subscriptions).
- The 3 dependency array modes: `useEffect(fn)`, `useEffect(fn, [])`, and `useEffect(fn, [deps])`.
- The **Cleanup Function** (`return () => clearInterval(...)`) preventing memory leaks and stale closures on unmount/re-render.
- Read full guide & Viva Q&A: [docs/USE_EFFECT.md](docs/USE_EFFECT.md)

---

## 4. Documentation Directory
- 📘 [Git Workflow Guide (docs/GIT_WORKFLOW.md)](docs/GIT_WORKFLOW.md)
- ⚡ [JavaScript Hoisting Guide (docs/HOISTING.md)](docs/HOISTING.md)
- 🔄 [Side Effects with useEffect Guide (docs/USE_EFFECT.md)](docs/USE_EFFECT.md)
- 📋 [Product Requirements Document (PRD.md)](PRD.md)
- 🏛️ [High-Level Design (HLD.md)](HLD.md)
- 📐 [Low-Level Design (LLD.md)](LLD.md)

---

## 5. Verification Commands
```bash
# View all local and remote branches
git branch -a

# View detailed commit history graph
git log --graph --oneline --all

# Check working tree status
git status
```

