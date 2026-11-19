# GitFlow Demo – Kalvium Project

> **Demo Project for Kalvium Project Assessor: Professional Git Workflow Demonstration**

## 1. Project Overview
**GitFlow Demo** is a lightweight, responsive static web application (HTML, CSS, JavaScript) built as a simple personal task tracker. The sole purpose of this project is to demonstrate end-to-end industry-standard **Git & GitHub Workflows**, including branch management, semantic commit history, pull request creation, peer review patterns, and conflict resolution mechanisms.

## 2. Core Application Features
- ➕ **Add Task**: Enter task title and add to the active tracker.
- 📋 **Display Tasks**: View all active and completed tasks with dynamic counters.
- ✔️ **Mark Tasks Completed**: Toggle tasks between pending and completed state with strike-through styling.
- 🗑️ **Delete Tasks**: Remove tasks with instant UI updates.
- 💾 **Persistent Storage**: Client-side `localStorage` data persistence across page reloads.

## 3. Tech Stack
- **HTML5**: Semantic markup
- **CSS3**: Modern responsive styling with CSS custom properties and flexbox
- **Vanilla JavaScript (ES6+)**: Pure client-side DOM manipulation without frameworks

## 4. Git Workflow Summary
This repository was developed using the Feature Branch Workflow:
1. `main`: Production-ready, stable branch.
2. `feature/task-creation`: Feature branch for task input and listing.
3. `feature/task-completion-deletion`: Feature branch for toggling complete and deleting tasks.
4. `feature/task-tracker-ui`: Feature branch for responsive UI styles.
5. `docs/workflow-and-architecture`: Documentation branch containing `GIT_WORKFLOW.md`, `PRD.md`, `HLD.md`, and `LLD.md`.

## 5. Documentation Links
- [Git Workflow Guide (docs/GIT_WORKFLOW.md)](docs/GIT_WORKFLOW.md)
- [Product Requirements Document (PRD.md)](PRD.md)
- [High-Level Design (HLD.md)](HLD.md)
- [Low-Level Design (LLD.md)](LLD.md)

## 6. Verification Commands
To inspect the branches, history, and working tree:
```bash
# View all local branches
git branch -a

# View detailed commit graph
git log --graph --oneline --all

# Check working tree status
git status
```

