# Side Effects with useEffect: Kalvium Assessor Guide

> **Concept Competency:** Side effects with useEffect (`0.2 pts • Frontend`)  
> **Repository:** [GitFlow Demo (minitask)](https://github.com/kasyapreji-kalvium/minitask)  
> **Author:** Kasyap (`kasyapreji-kalvium`)

---

## 1. What are Side Effects in React?

A React component's primary job is to be a **pure function** that computes JSX based on its inputs (`props` and `state`). Rendering must remain pure and free of side effects.

A **Side Effect** is any operation that affects something outside the scope of the currently executing component function, such as:
1. Mutating the browser DOM directly (e.g., updating `document.title`).
2. Communicating with external storage (e.g., reading/writing `localStorage`).
3. Setting up intervals or timers (e.g., `setInterval`, `setTimeout`).
4. Subscribing to external event sources (e.g., `window.addEventListener`).
5. Fetching data over HTTP/REST APIs.

---

## 2. The `useEffect` Hook

React provides the `useEffect` hook to run side effects **after** the component renders and the DOM has been painted.

### Hook Signature:
```javascript
useEffect(() => {
  // 1. Setup / Side Effect code
  
  return () => {
    // 2. Cleanup code (Optional, runs before re-running effect & on unmount)
  };
}, [dependency1, dependency2]); // 3. Dependency Array
```

---

## 3. The 3 Dependency Array Modes

| Syntax | Execution Timing | Use Case |
|---|---|---|
| **`useEffect(fn)`**<br>*(No dependency array)* | Runs after **every** render (initial mount + every update). | General logging, synchronizing un-memoized third-party libraries. Caution: high risk of performance degradation. |
| **`useEffect(fn, [])`**<br>*(Empty array)* | Runs **once** after the initial render (Mount). Cleanup runs once on Unmount. | Initial data fetching, setting up global listeners, establishing WebSocket connections. |
| **`useEffect(fn, [depA, depB])`**<br>*(Dependencies specified)* | Runs on mount and whenever **`depA` or `depB` change** (Object.is comparison). | Auto-saving to `localStorage` when state changes, updating `document.title` on counter change. |

---

## 4. The Cleanup Function (`return () => {}`)

### Why is Cleanup Critical?
If a component starts an asynchronous operation, event listener, or interval timer, that operation continues running in background memory even after the component is removed from the DOM. This results in **memory leaks**, **stale closures**, and potential performance crashes.

### When does React execute the Cleanup function?
1. **Before re-running the effect** when dependencies change (cleaning up the previous execution before starting the new one).
2. **When the component unmounts** (is removed from the DOM).

```javascript
// Example: Interval Timer with Cleanup
useEffect(() => {
  const timerId = setInterval(() => {
    setSeconds((prev) => prev + 1);
  }, 1000);

  // Mandatory Cleanup: Prevents memory leaks if component unmounts
  return () => {
    clearInterval(timerId);
  };
}, []);
```

---

## 5. Implementation in This Project

In `index.html` and `app.js`:
1. **Live React Task Tracker & Effects Component:**
   - **Effect 1 (Storage Persistence):** Automatically synchronizes `tasks` state to `localStorage` on `[tasks]` change.
   - **Effect 2 (DOM Title Sync):** Synchronizes `document.title` with active pending task counts on `[tasks]` change.
   - **Effect 3 (Timer with Cleanup):** A session timer running via `setInterval`, with an explicit `clearInterval` cleanup return. An interactive toggle button lets the assessor unmount the component and observe that the cleanup function terminates the timer.
   - **Effect 4 (Keyboard Listener with Cleanup):** Attaches `keydown` to the window on mount and cleans it up via `removeEventListener` on unmount.
2. **Interactive `useEffect` Lifecycle Visualizer:**
   - Allows the assessor to trigger mock Mount, State Update, and Unmount cycles, visibly logging each step (`Render` &rarr; `Effect Run` &rarr; `Cleanup Run`) in real-time.

---

## 6. Kalvium Viva Questions & Answers

### Q1: What is a side effect in React, and why can't we put side effects directly in the component body?
> **Answer:** A side effect is any operation that modifies or interacts with something outside the component (e.g., DOM mutations, API calls, timers, storage). Placing side effects directly inside the component body violates React's pure rendering model, causes side effects to run unexpectedly during concurrent renders, and can easily trigger infinite re-render loops.

### Q2: What are the differences between passing no dependency array, an empty array `[]`, and an array with variables `[deps]`?
> **Answer:**
> - **No array:** The effect executes after *every single render*.
> - **Empty array `[]`:** The effect executes *only once* after the initial mount, and its cleanup runs on unmount.
> - **With `[deps]`:** The effect executes on mount and only when one or more of the specified dependencies change values between renders.

### Q3: When does the cleanup function returned from `useEffect` execute?
> **Answer:** React executes the cleanup function at two distinct moments:
> 1. Right before the effect is re-run with new dependency values.
> 2. When the component unmounts from the DOM.

### Q4: What happens if you forget to clean up a `setInterval` or event listener inside `useEffect`?
> **Answer:** It causes a **memory leak**. The interval or event listener remains alive in browser memory, holding references to old component state and closures. If the component re-mounts or re-renders multiple times, duplicate intervals accumulate, consuming CPU and causing unexpected bugs.

### Q5: What causes an infinite re-render loop with `useEffect`, and how do you prevent it?
> **Answer:** An infinite loop occurs when an effect updates a state variable that is also listed in its own dependency array without a guard condition:
> `useEffect(() => { setCount(c => c + 1); }, [count]);`
> When `count` changes, the effect runs, calls `setCount`, triggering a new render, which causes the effect to run again indefinitely. It is prevented by properly designing dependency arrays or using functional state updaters without listing the state in the dependencies.
