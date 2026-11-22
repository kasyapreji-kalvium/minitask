# JavaScript — Hoisting: Kalvium Assessor Guide

> **Concept Competency:** JavaScript — Hoisting (`0.1 pts • Frontend`)  
> **Repository:** [GitFlow Demo (minitask)](https://github.com/kasyapreji-kalvium/minitask)  
> **Author:** Kasyap (`kasyapreji-kalvium`)

---

## 1. What is Hoisting in JavaScript?

**Hoisting** is JavaScript's default behavior of moving variable, function, and class declarations to the top of their enclosing scope (global or function scope) during the **Creation Phase** of the **Execution Context**, before any code is executed line-by-line.

Contrary to common misconception, the JavaScript engine does **not** physically rewrite or rearrange your source code. Instead:
1. During the **Memory Creation Phase**, the JavaScript engine scans the code and allocates memory slots for variable and function identifiers.
2. During the **Code Execution Phase**, values are assigned and functions are executed sequentially.

---

## 2. Hoisting Behaviors by Keyword

| Keyword / Construct | Hoisted? | Initial Value in Memory | Can Access Before Declaration? | Error if Accessed Early |
|---|---|---|---|---|
| **`var`** | Yes | `undefined` | Yes (returns `undefined`) | None |
| **`let`** | Yes | Uninitialized (In TDZ) | No | `ReferenceError: Cannot access '...' before initialization` |
| **`const`** | Yes | Uninitialized (In TDZ) | No | `ReferenceError: Cannot access '...' before initialization` |
| **Function Declaration** (`function fn() {}`) | Yes | Complete function definition | Yes (Executes normally) | None |
| **Function Expression** (`var fn = function() {}`) | Yes (as `var`) | `undefined` | No | `TypeError: fn is not a function` |
| **Arrow Function Expression** (`const fn = () => {}`) | Yes (as `const`) | Uninitialized (In TDZ) | No | `ReferenceError: Cannot access 'fn' before initialization` |
| **Class Declaration** (`class Person {}`) | Yes | Uninitialized (In TDZ) | No | `ReferenceError: Cannot access 'Person' before initialization` |

---

## 3. Deep Dive into the Mechanics

### 3.1 Function Declarations vs Function Expressions
- **Function Declaration:**
  ```javascript
  // Successfully executed BEFORE its lexical definition:
  greetUser("Kasyap"); // Output: "Hello, Kasyap!"

  function greetUser(name) {
    return `Hello, ${name}!`;
  }
  ```
  *Why:* The entire function body is stored in memory during Phase 1.

- **Function Expression:**
  ```javascript
  greetUserExpression("Kasyap"); // TypeError: greetUserExpression is not a function

  var greetUserExpression = function(name) {
    return `Hello, ${name}!`;
  };
  ```
  *Why:* `greetUserExpression` is declared with `var`, so its initial value is `undefined`. Calling `undefined("Kasyap")` throws a `TypeError`.

---

### 3.2 The Temporal Dead Zone (TDZ)
The **Temporal Dead Zone (TDZ)** is the period between entering the scope where a `let` or `const` variable is declared and the point where the declaration statement is evaluated.

```javascript
{
  // --- TDZ for 'studentName' starts here ---
  console.log(typeof studentName); // ReferenceError: Cannot access 'studentName' before initialization
  
  let studentName = "Kasyap"; // --- TDZ for 'studentName' ends here ---
  console.log(studentName); // Output: "Kasyap"
}
```

*Proof that `let` and `const` ARE hoisted:*
```javascript
let score = 50;
{
  // If 'score' were not hoisted, this would log 50 from the outer scope.
  // Instead, it throws ReferenceError because the inner 'score' is hoisted into block scope!
  console.log(score); // ReferenceError: Cannot access 'score' before initialization
  let score = 100;
}
```

---

## 4. Implementation in This Project

In `app.js` and `index.html`:
1. **Production Code Usage:** Functions like `initApp()`, `formatDate()`, and `getTaskStats()` are called at the top of the file *before* their function declarations appear in the script, demonstrating function declaration hoisting in production code.
2. **Interactive Concepts Inspector (UI):** A dedicated interactive testing card allows the assessor to click **"Run Hoisting Experiments"** and see live evaluations of:
   - `var` hoisting returning `undefined`.
   - Function declaration hoisting executing successfully.
   - `let`/`const` trapped in the Temporal Dead Zone safely captured with `try / catch`.
   - Function expressions failing with `TypeError`.

---

## 5. Kalvium Viva Questions & Answers

### Q1: What is Hoisting in JavaScript?
> **Answer:** Hoisting is JavaScript's mechanism where variable and function declarations are put into memory during the Creation Phase of the Execution Context, prior to the line-by-line execution of the code. This allows function declarations to be called before they appear in the source code.

### Q2: Why does `var` log `undefined` when accessed before declaration, but `let` throws a `ReferenceError`?
> **Answer:** Both `var` and `let` are hoisted during the memory creation phase. However, `var` is automatically initialized with the default value of `undefined`. In contrast, `let` (and `const`) remain **uninitialized** in the Temporal Dead Zone (TDZ). Any attempt to read or write an uninitialized variable throws a `ReferenceError`.

### Q3: What is the Temporal Dead Zone (TDZ)?
> **Answer:** The TDZ is the region of code from the beginning of a block scope until the point where the `let` or `const` declaration is evaluated. Inside the TDZ, the variable exists in memory but cannot be accessed.

### Q4: Can you call a function expression before its definition? Why or why not?
> **Answer:** No. If the function expression is assigned to a `var`, the variable is initialized to `undefined`, so calling it throws `TypeError: ... is not a function`. If assigned to `let` or `const`, it is in the TDZ and throws a `ReferenceError`.

### Q5: In what order does the JavaScript engine handle variable and function declarations with the same name?
> **Answer:** Function declarations take precedence over variable declarations during the memory creation phase. If a function declaration and a `var` share the same identifier, the function definition takes priority in memory during hoisting.
