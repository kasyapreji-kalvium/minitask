// ==========================================
// GitFlow Demo - Personal Task Tracker
// Feature: Task Creation & Display
// ==========================================

// State
let tasks = [];

// DOM Elements
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const taskCount = document.getElementById('taskCount');

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

  if (tasks.length === 0) {
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
  }

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' completed' : '');
    li.dataset.id = task.id;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'task-content';

    const textSpan = document.createElement('span');
    textSpan.className = 'task-text';
    textSpan.textContent = task.text;

    contentDiv.appendChild(textSpan);
    li.appendChild(contentDiv);
    taskList.appendChild(li);
  });

  updateTaskStats();
}

// Update task counters
function updateTaskStats() {
  const total = tasks.length;
  taskCount.textContent = `${total} ${total === 1 ? 'task' : 'tasks'}`;
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

// Event Listeners
taskForm.addEventListener('submit', handleAddTask);

// Initial application load
document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  renderTasks();
});
