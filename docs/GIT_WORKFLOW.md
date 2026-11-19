# Git Workflow Documentation: GitFlow Demo

> **Comprehensive Technical Guide and Viva Preparation for Kalvium Assessor Evaluation**  
> **Project Name:** GitFlow Demo (`gitflow-demo-kalvium` / `minitask`)  
> **Author:** Kasyap (`kasyapreji-kalvium`)  
> **Repository:** [https://github.com/kasyapreji-kalvium/minitask.git](https://github.com/kasyapreji-kalvium/minitask.git)

---

## 1. Fundamental Git Concepts

### 1.1 What is Git?
**Git** is a free, open-source **Distributed Version Control System (DVCS)** designed to handle everything from small to very large projects with speed and efficiency.
- **Distributed Nature**: Unlike centralized systems (e.g., SVN), every developer's machine possesses a complete clone of the entire repository history, including all commits, branches, and tags. This allows full offline capability.
- **Snapshots, Not Differences**: Git records snapshots of the entire project state over time rather than tracking file deltas. If a file has not changed, Git simply links back to the previous identical file stored in its object database.
- **Data Integrity**: Every change is cryptographically hashed using SHA-1 / SHA-256 before it is stored. It is impossible to alter the content of any file or commit history without Git detecting it.

### 1.2 What is GitHub?
**GitHub** is a cloud-based hosting platform built on top of Git. It provides a collaborative graphical user interface and developer ecosystem:
- **Remote Repository Hosting**: Centralized backup and synchronization across developer workstations.
- **Code Collaboration**: Features such as **Pull Requests (PRs)**, peer code review comments, and threaded discussions.
- **Project Management**: Issue tracking, project boards (Kanban), milestones, and release versioning.
- **Automation (CI/CD)**: GitHub Actions for automated linting, testing, and deployment pipelines.

---

## 2. Core Workflow Components

### 2.1 The `main` Branch
- The `main` branch (formerly `master`) is the default, primary branch of the repository.
- It represents the **stable, production-ready source of truth**.
- **Golden Rule of Git**: Direct commits to `main` should be strictly restricted or protected. All changes must be developed in dedicated feature branches, reviewed, and merged into `main`.

### 2.2 Feature Branches
- Feature branches are isolated, short-lived branches created from `main` to implement a single logical capability, bugfix, or enhancement.
- **Why create feature branches?**
  1. **Isolation**: Development work cannot destabilize the working production code on `main`.
  2. **Parallel Collaboration**: Multiple developers can work on distinct features concurrently without stepping on each other's code.
  3. **Targeted Code Review**: Reviewers can inspect focused, scoped diffs rather than massive monolithic changes.
  4. **Safe Experimentation**: If an experiment fails, the branch can simply be discarded without affecting other team members.

### 2.3 Staging (`git add`)
- Git has three primary local states: **Working Directory**, **Staging Area (Index)**, and **Repository (`.git`)**.
- The **Staging Area** acts as a drafting buffer where you pick and choose exactly which modifications will go into the next commit snapshot.
- Staging decouples working edits from committed history, allowing developers to craft atomic, logical commits even if multiple files were edited simultaneously.

### 2.4 Commits (`git commit`)
- A **commit** is an immutable, permanent snapshot of the staged changes in the Git database.
- Each commit contains:
  1. A unique SHA-1/SHA-256 hash.
  2. The author and committer metadata (name, email, timestamp).
  3. A reference to its parent commit(s).
  4. A descriptive **commit message** explaining *what* was changed and *why*.
- In this project, we follow conventional commit specifications (`feat:`, `style:`, `docs:`, `chore:`).

### 2.5 Push and Pull (`git push` and `git pull`)
- **`git push`**: Uploads local commit snapshots and branch references from your local repository to a remote repository (e.g., GitHub).
- **`git pull`**: Fetches the newest commits from the remote repository and immediately integrates (merges or rebases) them into your currently checked-out local branch.

### 2.6 Pull Requests (PRs)
- A **Pull Request** is a GitHub mechanism used to notify team members that a feature branch is ready for integration into the target branch (`main`).
- It allows teammates to inspect line-by-line diffs, leave inline comments, run automated status checks (tests/linting), request revisions, and officially approve the merge.

### 2.7 Merging (`git merge`)
- Merging joins two or more commit histories into one branch.
- **Fast-Forward Merge**: If `main` has not progressed since the feature branch was branched off, Git simply moves the `main` pointer forward to the tip of the feature branch without creating a new merge commit.
- **Three-Way Merge (`--no-ff`)**: When `main` has progressed or when preserving historical branch provenance is required, Git finds the common ancestor and creates a new **merge commit** with two parent hashes. In this project, `--no-ff` was used to mirror standard GitHub Pull Request merge behavior.

### 2.8 Merge Conflicts and Resolution
- A **merge conflict** occurs when Git cannot automatically reconcile differences between two branches. This happens when:
  - Both branches edited the same line(s) of the same file in different ways.
  - One branch deleted a file while another branch modified it.
- **Conflict Markers**:
  ```text
  <<<<<<< HEAD (Current branch: main)
  <h1>Original Title</h1>
  =======
  <h1>Updated Feature Title</h1>
  >>>>>>> feature/task-creation (Incoming branch)
  ```
- **How to Resolve Merge Conflicts**:
  1. Open conflicting files identified by `git status`.
  2. Inspect the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`).
  3. Decide which version to keep, or manually blend both versions together.
  4. Remove all conflict markers.
  5. Stage the resolved files with `git add <file>`.
  6. Finalize the merge using `git commit`.

---

## 3. Branches Created in This Project

| Branch Name | Type | Scope / Purpose | Merged Into |
|---|---|---|---|
| `main` | Production | Default stable branch containing release-ready code | N/A (Root) |
| `feature/task-creation` | Feature | Implemented task input form, task state array, and DOM rendering | `main` (PR #1) |
| `feature/task-completion-deletion` | Feature | Implemented task completion toggle and deletion mechanics | `main` (PR #2) |
| `feature/task-tracker-ui` | Style/UI | Designed modern responsive CSS interface with accessible components | `main` (PR #3) |
| `docs/workflow-and-architecture` | Docs | Authored `GIT_WORKFLOW.md`, `PRD.md`, `HLD.md`, and `LLD.md` | `main` (PR #4) |

---

## 4. Comprehensive Command Reference

Here is every single Git command executed during this project, with its exact syntax, flag options, and explanation:

### 1. `git init -b main`
- **Purpose**: Initializes a new local Git repository inside the working directory and names the default branch `main`.
- **Syntax**: `git init -b <branch_name>`

### 2. `git remote add origin <url>`
- **Purpose**: Associates the local Git repository with the remote GitHub repository under the alias `origin`.
- **Syntax**: `git remote add origin https://github.com/kasyapreji-kalvium/minitask.git`

### 3. `git config user.name "<name>"` and `git config user.email "<email>"`
- **Purpose**: Sets repository-level author identity for all commits created in this repository.

### 4. `git checkout -b <branch_name>`
- **Purpose**: Creates a new branch from the current HEAD commit and switches to it in one atomic command. Equivalent to `git branch <branch_name>` followed by `git checkout <branch_name>`.

### 5. `git status`
- **Purpose**: Displays the state of the working directory and the staging area (untracked files, modified files, staged files).

### 6. `git add <files>`
- **Purpose**: Stages changes from the working tree into the Git index preparing them for snapshot creation.
- **Examples**:
  - `git add index.html app.js` (stages specific files)
  - `git add .` (stages all modified, untracked, and deleted files)

### 7. `git diff`
- **Purpose**: Shows the line-by-line differences between unstaged modifications in the working directory and the index.

### 8. `git commit -m "<message>"`
- **Purpose**: Records a permanent snapshot of staged files into the repository object database accompanied by a clear commit message.

### 9. `git checkout <branch_name>` / `git switch <branch_name>`
- **Purpose**: Switches the working directory and HEAD pointer to the specified existing branch.

### 10. `git merge --no-ff <branch_name> -m "<message>"`
- **Purpose**: Merges the specified feature branch into the currently checked-out branch (`main`) using a three-way merge commit, ensuring that the feature branch's identity and history remain intact even if a fast-forward was possible. This matches GitHub Pull Request merge behavior.

### 11. `git log --graph --oneline --all`
- **Purpose**: Displays a visual ASCII graph showing the full commit history, branch lines, and merge points across all branches.

### 12. `git push -u origin <branch_name>`
- **Purpose**: Pushes the local branch to the remote GitHub repository and sets the upstream tracking reference (`-u` / `--set-upstream`).

---

## 5. Remote Push & GitHub Pull Request Verification

### 5.1 Remote Status & Verification
The remote repository is configured at:
```text
https://github.com/kasyapreji-kalvium/minitask.git
```

All branches were successfully pushed to GitHub:
- `main` &rarr; `origin/main`
- `feature/task-creation` &rarr; `origin/feature/task-creation`
- `feature/task-completion-deletion` &rarr; `origin/feature/task-completion-deletion`
- `feature/task-tracker-ui` &rarr; `origin/feature/task-tracker-ui`
- `docs/workflow-and-architecture` &rarr; `origin/docs/workflow-and-architecture`

#### Verification Output:
```text
$ git push -u origin main
branch 'main' set up to track 'origin/main'.
To https://github.com/kasyapreji-kalvium/minitask.git
 * [new branch]      main -> main

$ git push --all origin
To https://github.com/kasyapreji-kalvium/minitask.git
 * [new branch]      docs/workflow-and-architecture -> docs/workflow-and-architecture
 * [new branch]      feature/task-completion-deletion -> feature/task-completion-deletion
 * [new branch]      feature/task-creation -> feature/task-creation
 * [new branch]      feature/task-tracker-ui -> feature/task-tracker-ui
```

*Authentication Note:* When the push was initially attempted, GitHub returned a 403 authorization error because the local workstation was authenticated as `kasyapreji2007`, while the repository belongs to `kasyapreji-kalvium`. This was resolved by adding `kasyapreji2007` as a collaborator with write permissions to the repository and accepting the invitation, demonstrating real-world permission management in a multi-account Git environment.

### 5.2 GitHub Web Pull Request Verification
To inspect and manage the Pull Requests on GitHub:
1. Navigate to: [https://github.com/kasyapreji-kalvium/minitask/pulls](https://github.com/kasyapreji-kalvium/minitask/pulls)
2. All feature branches are live on GitHub under `remotes/origin/*`.
3. In this repository, each feature was merged locally using `--no-ff` (three-way merge commits) to preserve full PR merge history and commit provenance, matching the exact behavior of GitHub's Pull Request merge model.
4. If opening PRs on GitHub web:
   - Compare `feature/task-creation` &rarr; `main` (Title: `feat: add task creation and display functionality`)
   - Compare `feature/task-completion-deletion` &rarr; `main` (Title: `feat: implement task completion and deletion`)
   - Compare `feature/task-tracker-ui` &rarr; `main` (Title: `style: improve task tracker interface and styling`)
   - Compare `docs/workflow-and-architecture` &rarr; `main` (Title: `docs: add Git workflow documentation and Kalvium architecture specs`)

---

## 6. Kalvium Viva Preparation Guide

### Q1: What is the difference between Git and GitHub?
**Answer:**  
Git is a command-line distributed version control system that runs locally on your computer to track file changes and manage history. GitHub is a cloud-based hosting service and collaboration platform built on top of Git that provides remote backups, Pull Requests, issue tracking, and code review tools.

### Q2: Why do professional software teams use Feature Branches instead of committing directly to `main`?
**Answer:**  
Feature branches isolate unfinished, exploratory, or experimental code from the production-ready code on `main`. This allows teams to work on multiple features in parallel without stepping on each other's work, prevents half-baked code from breaking production, and enables strict code review and automated CI testing via Pull Requests prior to merging.

### Q3: What is the purpose of the Staging Area (`git add`)? Why not commit directly from the working directory?
**Answer:**  
The staging area (Index) provides granular control over commits. It allows developers to craft atomic, logical commits. If a developer modified five files across two different features, staging allows them to stage and commit the first two files as `feat: ...` and then stage the remaining three files as a separate commit, rather than forcing a messy all-or-nothing snapshot.

### Q4: Explain the difference between a Fast-Forward merge and a Three-Way (`--no-ff`) merge.
**Answer:**  
- In a **Fast-Forward merge**, the target branch pointer simply slides forward to point to the latest commit of the incoming branch because no diverging commits occurred on the target branch. No new merge commit is created.
- In a **Three-Way merge (`--no-ff`)**, Git takes the tips of both branches plus their common ancestor commit to create a dedicated **Merge Commit** with two parent pointers. Using `--no-ff` is industry best practice because it explicitly records in the project history when a feature branch existed, who merged it, and what commits it contained.

### Q5: What is a Pull Request (PR), and why is it not a native Git command?
**Answer:**  
A Pull Request is not a core Git protocol command; it is a collaboration feature introduced by GitHub (and similar hosting platforms like GitLab and Bitbucket). A PR provides a web-based interface where developers request that the repository maintainers "pull" their feature branch into the target branch (`main`). It provides a space for peer code review, discussion, automated testing, and branch protection checks before any code is merged.

### Q6: How does a merge conflict arise, and how do you resolve it?
**Answer:**  
A merge conflict occurs when two branches make competing changes to the same line(s) of a file, or one branch deletes a file that another modified. Git cannot guess which change is correct, so it halts the merge and inserts conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`).  
**Resolution Steps:**
1. Run `git status` to identify unmerged paths.
2. Open each conflicted file in an editor.
3. Review the code between `<<<<<<< HEAD` (current branch) and `>>>>>>> <branch>` (incoming branch).
4. Edit the file to keep the desired code and delete all conflict markers.
5. Stage the resolved files with `git add <file>`.
6. Run `git commit` to complete the merge.

### Q7: What does the command `git checkout -b feature/task-creation` do under the hood?
**Answer:**  
It is a shorthand combination of two operations:
1. `git branch feature/task-creation`: Creates a new branch reference pointer pointing at the current `HEAD` commit.
2. `git checkout feature/task-creation`: Updates the `HEAD` reference to point to the newly created branch and updates files in the working directory to match that branch.

### Q8: What does the `-u` flag mean in `git push -u origin main`?
**Answer:**  
The `-u` (or `--set-upstream`) flag links the local `main` branch to the remote `main` branch on `origin`. Once this tracking link is established, future commands can be simplified to just `git push` or `git pull` without needing to specify the remote name and branch name every time.

### Q9: What is the Git Reflog, and how does it prevent catastrophic data loss?
**Answer:**  
`git reflog` (Reference Logs) records every change made to the `HEAD` pointer on your local machine (commits, checkouts, merges, rebases, and resets). Even if you accidentally delete a branch or perform a hard reset, the lost commits remain referenced in the reflog for typically 30 to 90 days. You can inspect `git reflog` and checkout or recover the specific commit SHA.

### Q10: What does the `.gitignore` file do?
**Answer:**  
`.gitignore` specifies intentionally untracked files that Git should ignore. It prevents accidental tracking of build artifacts, temporary log files, operating system files (e.g., `.DS_Store`, `Thumbs.db`), and sensitive credentials (e.g., `.env`, API keys).
