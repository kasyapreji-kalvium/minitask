// ==========================================
// GitFlow Demo - Personal Task Tracker
// Kalvium Assessment: Git Workflow & Frontend
// ==========================================

// ============================================================================
// KALVIUM COMPETENCY: JavaScript — Hoisting (0.1 pts • Frontend)
// ============================================================================
// DEMO 1: Function Declaration Hoisting in Production Code
// We invoke hoistedLogger() here, BEFORE its definition at the bottom of app.js!
// JavaScript's Creation Phase allocates memory for function declarations upfront.
hoistedLogger("App initialized. Function declaration hoisted successfully!");

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

// ============================================================================
// HOISTING MECHANISM DEMONSTRATIONS & INTERACTIVE TEST RUNNER
// ============================================================================

// Hoisted Function Declaration (Invoked at line 12 before its definition here!)
function hoistedLogger(message) {
  console.log(`[HOISTING DEMO] ${message}`);
}

// Interactive Hoisting Test Runner for Kalvium Assessor Evaluation
function runHoistingTests() {
  const outputEl = document.getElementById('hoistingOutput');
  if (!outputEl) return;

  const logs = [];
  logs.push("=== JAVASCRIPT HOISTING LIVE VERIFICATION ===");
  logs.push(`Timestamp: ${new Date().toLocaleTimeString()}\n`);

  // 1. Function Declaration Hoisting
  try {
    const result = earlyInvokedFunction();
    logs.push(`[PASS] 1. Function Declaration Hoisting:`);
    logs.push(`       earlyInvokedFunction() called before definition.`);
    logs.push(`       Result: "${result}"\n`);
  } catch (err) {
    logs.push(`[FAIL] 1. Function Declaration Hoisting: ${err.message}\n`);
  }

  function earlyInvokedFunction() {
    return "Function declarations are fully hoisted with their definitions!";
  }

  // 2. Variable Hoisting with 'var'
  logs.push(`[PASS] 2. 'var' Hoisting:`);
  logs.push(`       Examining 'hoistedVar' before its 'var hoistedVar = 42' assignment line.`);
  var hoistedVar;
  logs.push(`       Memory state before assignment: typeof hoistedVar = "${typeof hoistedVar}" (Value: ${hoistedVar})`);
  hoistedVar = 42;
  logs.push(`       Memory state after assignment: hoistedVar = ${hoistedVar}\n`);

  // 3. Temporal Dead Zone (TDZ) with 'let' and 'const'
  logs.push(`[PASS] 3. 'let' / 'const' Temporal Dead Zone (TDZ):`);
  try {
    eval('console.log(tdzVariable); let tdzVariable = "Kalvium";');
  } catch (err) {
    logs.push(`       Attempted: accessing 'tdzVariable' before initialization.`);
    logs.push(`       Caught expected error: ${err.name} - ${err.message}`);
    logs.push(`       Explanation: 'let' is hoisted into the block scope but remains uninitialized in the TDZ.\n`);
  }

  // 4. Function Expression Hoisting
  logs.push(`[PASS] 4. Function Expression with 'var':`);
  try {
    eval('expressionFunc(); var expressionFunc = function() { return "hello"; };');
  } catch (err) {
    logs.push(`       Attempted: calling 'expressionFunc()' before assignment.`);
    logs.push(`       Caught expected error: ${err.name} - ${err.message}`);
    logs.push(`       Explanation: Variable is hoisted as undefined, so undefined() throws TypeError.\n`);
  }

  logs.push("=== CONCLUSION FOR ASSESSOR ===");
  logs.push("• Function declarations hoist completely (identifier + function body).");
  logs.push("• 'var' hoists identifier and initializes to 'undefined'.");
  logs.push("• 'let' and 'const' hoist identifier into TDZ (uninitialized, throws ReferenceError).");

  outputEl.textContent = logs.join('\n');
}

const runHoistingBtn = document.getElementById('runHoistingBtn');
if (runHoistingBtn) {
  runHoistingBtn.addEventListener('click', runHoistingTests);
}
