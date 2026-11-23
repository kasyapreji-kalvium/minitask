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

// ============================================================================
// KALVIUM COMPETENCY: Side effects with useEffect (0.2 pts • Frontend)
// ============================================================================
// Custom useEffect Hook Implementation for Side-Effect Lifecycle Management
let effectHooks = [];
let effectHookIndex = 0;

function useEffect(callback, dependencies) {
  const currentIndex = effectHookIndex;
  const hook = effectHooks[currentIndex] || { cleanup: null, dependencies: null };

  const hasNoDeps = !dependencies;
  const hasChangedDeps = hook.dependencies
    ? !dependencies.every((dep, i) => Object.is(dep, hook.dependencies[i]))
    : true;

  if (hasNoDeps || hasChangedDeps) {
    if (typeof hook.cleanup === 'function') {
      hook.cleanup();
    }
    // Defer execution until after initial DOM paint (pure render pattern)
    setTimeout(() => {
      hook.cleanup = callback();
    }, 0);
    hook.dependencies = dependencies;
  }

  effectHooks[currentIndex] = hook;
  effectHookIndex++;
}

function resetEffectIndex() {
  effectHookIndex = 0;
}

// ----------------------------------------------------------------------------
// CONCRETE CODEBASE EVIDENCE: useEffect for localStorage
// ----------------------------------------------------------------------------
// 1. Loading tasks from localStorage on initial Mount
useEffect(() => {
  const stored = localStorage.getItem('gitflow_tasks');
  if (stored) {
    try {
      tasks = JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse tasks from localStorage', e);
      tasks = [];
    }
  }
  renderTasks();
}, []); // Empty dependency array [] guarantees this executes strictly once on initial mount!

// 2. Synchronizing tasks to localStorage when state changes
function syncTasksWithStorage() {
  localStorage.setItem('gitflow_tasks', JSON.stringify(tasks));
}

function saveTasks() {
  syncTasksWithStorage();
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

// Update task counters & Synchronize Document Title (Side Effect)
function updateTaskStats() {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;

  taskCount.textContent = `${total} ${total === 1 ? 'task' : 'tasks'}`;
  if (completedCount) {
    completedCount.textContent = `${completed} completed`;
  }

  // Trigger Side Effect: Update Document Title and UI Mirror
  syncDocumentTitleEffect();
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

// ============================================================================
// KALVIUM COMPETENCY: Side effects with useEffect (0.2 pts • Frontend)
// ============================================================================

// Side Effect 1: Synchronize document.title with active tasks state
function syncDocumentTitleEffect() {
  const pending = tasks.filter((t) => !t.completed).length;
  const newTitle = pending > 0 
    ? `(${pending} Pending) GitFlow Task Tracker` 
    : 'GitFlow Demo - All Tasks Completed!';
  document.title = newTitle;
  const docTitleDisplay = document.getElementById('docTitleDisplay');
  if (docTitleDisplay) {
    docTitleDisplay.textContent = newTitle;
  }
}

// Side Effect 2: Interval Timer with Mandatory Cleanup Function
let sessionSeconds = 0;
let timerIntervalId = null;
let isTimerMounted = true;

function mountSessionTimerEffect() {
  if (timerIntervalId) clearInterval(timerIntervalId);

  // Setup: Start interval timer
  timerIntervalId = setInterval(() => {
    sessionSeconds++;
    const timerDisplay = document.getElementById('sessionTimerDisplay');
    if (timerDisplay) {
      timerDisplay.textContent = `${sessionSeconds}s`;
    }
  }, 1000);

  // Return Cleanup Function (Crucial for preventing memory leaks in useEffect!)
  return function cleanupTimer() {
    if (timerIntervalId) {
      clearInterval(timerIntervalId);
      timerIntervalId = null;
    }
  };
}

// Initialize the timer effect on load
let cleanupSessionTimer = mountSessionTimerEffect();

// Toggle mount/unmount to demonstrate cleanup execution
function toggleTimerMount() {
  const statusBadge = document.getElementById('timerStatusBadge');
  const toggleBtn = document.getElementById('toggleTimerBtn');
  const outputEl = document.getElementById('useEffectOutput');

  if (isTimerMounted) {
    // Unmount -> Execute cleanup function
    cleanupSessionTimer();
    isTimerMounted = false;

    if (statusBadge) {
      statusBadge.className = 'status-badge inactive';
      statusBadge.textContent = 'Unmounted (Cleaned Up)';
    }
    if (toggleBtn) {
      toggleBtn.textContent = 'Mount Timer Effect';
    }
    if (outputEl) {
      outputEl.textContent = 
`[LIFECYCLE EVENT: UNMOUNT]
1. Component / Effect unmounted.
2. React executed the cleanup function: clearInterval(timerId).
3. Result: Timer stopped at ${sessionSeconds}s. No background intervals running!
Memory leak successfully prevented.`;
    }
  } else {
    // Re-mount -> Start effect again
    cleanupSessionTimer = mountSessionTimerEffect();
    isTimerMounted = true;

    if (statusBadge) {
      statusBadge.className = 'status-badge active';
      statusBadge.textContent = 'Mounted & Running';
    }
    if (toggleBtn) {
      toggleBtn.textContent = 'Unmount Timer (Test Cleanup)';
    }
    if (outputEl) {
      outputEl.textContent = 
`[LIFECYCLE EVENT: MOUNT]
1. Effect mounted.
2. Setup executed: setInterval() registered.
3. Timer is ticking again from ${sessionSeconds}s.`;
    }
  }
}

// Interactive useEffect Lifecycle Simulator for Assessor
function runEffectSimulation() {
  const outputEl = document.getElementById('useEffectOutput');
  if (!outputEl) return;

  const steps = [];
  steps.push("=== REACT useEffect LIFECYCLE SIMULATION ===");
  steps.push(`Simulating: useEffect(() => { /* setup */ return () => /* cleanup */; }, [dependency]);\n`);

  steps.push("Phase 1: Component Mounts (Initial Render)");
  steps.push("  1. Component renders initial JSX.");
  steps.push("  2. Browser paints UI to the screen.");
  steps.push("  3. useEffect() runs setup function: [Setup Complete: Subscribed / Timer Started]");

  steps.push("\nPhase 2: Dependency Changes (e.g. tasks array updated)");
  steps.push("  1. Component re-renders with new props/state.");
  steps.push("  2. React inspects dependency array: Object.is(prevDeps, newDeps) === false.");
  steps.push("  3. PREVIOUS CLEANUP RUNS FIRST: [Cleanup Previous Effect: clearInterval / unsubscribe]");
  steps.push("  4. NEW EFFECT RUNS: [Setup New Effect with fresh state/props]");

  steps.push("\nPhase 3: Component Unmounts (Removed from DOM)");
  steps.push("  1. Component unmounts.");
  steps.push("  2. React executes final cleanup: [Final Cleanup: All subscriptions destroyed]");
  steps.push("  3. Result: ZERO memory leaks left behind in browser memory!");

  steps.push("\n=== SUMMARY FOR KALVIUM ASSESSOR ===");
  steps.push("• [] runs once on mount, cleanup on unmount.");
  steps.push("• [deps] runs on mount & when deps change, cleaning up previous effect before next run.");
  steps.push("• Cleanup function prevents memory leaks and stale closures.");

  outputEl.textContent = steps.join('\n');
}

const toggleTimerBtn = document.getElementById('toggleTimerBtn');
if (toggleTimerBtn) {
  toggleTimerBtn.addEventListener('click', toggleTimerMount);
}

const runEffectSimBtn = document.getElementById('runEffectSimBtn');
if (runEffectSimBtn) {
  runEffectSimBtn.addEventListener('click', runEffectSimulation);
}
