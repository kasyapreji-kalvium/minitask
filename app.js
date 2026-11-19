// ==========================================
// GitFlow Demo - Personal Task Tracker
// Feature: Task Filters (All, Active, Completed)
// ==========================================

// State
let tasks = [];
let currentFilter = 'all';

// DOM Elements
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const taskCount = document.getElementById('taskCount');
const completedCount = document.getElementById('completedCount');
const filterButtons = document.querySelectorAll('.filter-btn');

// Load stored tasks from localStorage
function loadTasks() {
  const stored = localStorage.getItem('gitflow_tasks');
  if (stored) {
    try {
      tasks = JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse tasks from localStorage', e);
      tasks = [];
    }
  }
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('gitflow_tasks', JSON.stringify(tasks));
}

// Render tasks list in DOM
function renderTasks() {
  taskList.innerHTML = '';

  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === 'active') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    return true;
  });

  if (filteredTasks.length === 0) {
    emptyState.style.display = 'block';
    emptyState.querySelector('p').textContent = 
      tasks.length === 0 ? 'No tasks yet. Add one above to get started!' : `No ${currentFilter} tasks.`;
  } else {
    emptyState.style.display = 'none';
  }

  filteredTasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' completed' : '');
    li.dataset.id = task.id;

    // Toggle completion checkbox button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'btn-toggle' + (task.completed ? ' is-completed' : '');
    toggleBtn.setAttribute('aria-label', task.completed ? 'Mark pending' : 'Mark completed');
    toggleBtn.innerHTML = task.completed ? '&#10003;' : '';
    toggleBtn.addEventListener('click', () => toggleTaskCompletion(task.id));

    // Task text container
    const contentDiv = document.createElement('div');
    contentDiv.className = 'task-content';

    const textSpan = document.createElement('span');
    textSpan.className = 'task-text';
    textSpan.textContent = task.text;

    contentDiv.appendChild(textSpan);

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-delete';
    deleteBtn.setAttribute('aria-label', 'Delete task');
    deleteBtn.innerHTML = '&times;';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteTask(task.id);
    });

    li.appendChild(toggleBtn);
    li.appendChild(contentDiv);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  updateTaskStats();
}

// Update task counters
function updateTaskStats() {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;

  taskCount.textContent = `${total} ${total === 1 ? 'task' : 'tasks'}`;
  if (completedCount) {
    completedCount.textContent = `${completed} completed`;
  }
}

// Add a new task
function handleAddTask(e) {
  if (e) e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;

  const newTask = {
    id: 'task_' + Date.now(),
    text: text,
    completed: false,
    createdAt: new Date().toISOString()
  };

  tasks.unshift(newTask);
  saveTasks();
  renderTasks();

  taskInput.value = '';
  taskInput.focus();
}

// Toggle completion status
function toggleTaskCompletion(taskId) {
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
  }
}

// Delete a task
function deleteTask(taskId) {
  tasks = tasks.filter((t) => t.id !== taskId);
  saveTasks();
  renderTasks();
}

// Event Listeners
taskForm.addEventListener('submit', handleAddTask);

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

// Initial application load
document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  renderTasks();
});
