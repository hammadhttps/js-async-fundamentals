// 06-event-loop.js
// Demonstrates the Event Loop, execution priority, and async behavior

console.log("🔄 Starting demonstration of the Event Loop\n");

// ============================================================================
// SYNCHRONOUS CODE EXECUTION
// ============================================================================

console.log("1️⃣ Synchronous code execution:");

console.log("🔄 Starting synchronous operations...");
console.log("📊 First operation");
console.log("📊 Second operation");
console.log("📊 Third operation");
console.log("✅ Synchronous operations complete\n");

// ============================================================================
// SETTIMEOUT EXECUTION (TASK QUEUE)
// ============================================================================

console.log("2️⃣ setTimeout execution (Task Queue):");

console.log("🔄 Setting up setTimeout...");
setTimeout(() => {
    console.log("⏰ setTimeout callback executed");
}, 0);

console.log("📊 This runs immediately after setTimeout");
console.log("📊 More synchronous code...");
console.log("✅ Synchronous code complete, setTimeout will run next\n");

// ============================================================================
// PROMISE EXECUTION (MICROTASK QUEUE)
// ============================================================================

console.log("3️⃣ Promise execution (Microtask Queue):");

console.log("🔄 Setting up Promise...");
Promise.resolve().then(() => {
    console.log("🤝 Promise callback executed");
});

console.log("📊 This runs immediately after Promise");
console.log("📊 More synchronous code...");
console.log("✅ Synchronous code complete, Promise will run next\n");

// ============================================================================
// EXECUTION PRIORITY DEMONSTRATION
// ============================================================================

console.log("4️⃣ Execution Priority (Microtask > Task Queue):");

console.log("🔄 Setting up both setTimeout and Promise...");

setTimeout(() => {
    console.log("⏰ setTimeout (Task Queue)");
}, 0);

Promise.resolve().then(() => {
    console.log("🤝 Promise (Microtask Queue)");
});

console.log("📊 Synchronous code");
console.log("✅ Synchronous code complete\n");

// ============================================================================
// COMPLEX EVENT LOOP EXAMPLE
// ============================================================================

console.log("5️⃣ Complex Event Loop example:");

console.log("🔄 Starting complex example...");

// Synchronous code
console.log("📊 Step 1: Synchronous");

// setTimeout (Task Queue)
setTimeout(() => {
    console.log("⏰ Step 2: setTimeout callback");
}, 0);

// Promise (Microtask Queue)
Promise.resolve().then(() => {
    console.log("🤝 Step 3: Promise callback");
});

// More synchronous code
console.log("📊 Step 4: More synchronous");

// Another Promise (Microtask Queue)
Promise.resolve().then(() => {
    console.log("🤝 Step 5: Another Promise callback");
});

// Another setTimeout (Task Queue)
setTimeout(() => {
    console.log("⏰ Step 6: Another setTimeout callback");
}, 0);

console.log("📊 Step 7: Final synchronous code");
console.log("✅ Synchronous code complete\n");

// ============================================================================
// SETTIMEOUT(0) DEMONSTRATION
// ============================================================================

console.log("6️⃣ setTimeout(0) demonstration:");

console.log("🔄 Starting long synchronous operation...");

// Simulate a long synchronous operation
const start = Date.now();
while (Date.now() - start < 1000) {
    // Busy waiting for 1 second
}

setTimeout(() => {
    console.log("⏰ setTimeout(0) callback - this runs after sync code");
}, 0);

console.log("✅ Long synchronous operation complete\n");

// ============================================================================
// NESTED PROMISES AND MICROTASKS
// ============================================================================

console.log("7️⃣ Nested promises and microtasks:");

console.log("🔄 Setting up nested promises...");

Promise.resolve().then(() => {
    console.log("🤝 First Promise callback");
    
    // Nested Promise (also goes to Microtask Queue)
    Promise.resolve().then(() => {
        console.log("🤝 Nested Promise callback");
    });
    
    console.log("📊 Code inside first Promise callback");
});

setTimeout(() => {
    console.log("⏰ setTimeout callback");
}, 0);

console.log("📊 Synchronous code");
console.log("✅ Synchronous code complete\n");

// ============================================================================
// REAL-WORLD EVENT LOOP EXAMPLE
// ============================================================================

console.log("8️⃣ Real-world Event Loop example:");

// Simulate API calls
function apiCall(endpoint) {
    return new Promise((resolve, reject) => {
        console.log(`📡 API call to ${endpoint} initiated`);
        
        // Simulate network delay
        setTimeout(() => {
            console.log(`✅ API call to ${endpoint} completed`);
            resolve(`Data from ${endpoint}`);
        }, Math.random() * 1000 + 500); // Random delay between 500-1500ms
    });
}

// Event handler simulation
function handleClick() {
    console.log("🖱️ Button clicked!");
    
    // Start API calls
    apiCall("/api/users").then(data => {
        console.log("👤 Users loaded:", data);
    });
    
    apiCall("/api/posts").then(data => {
        console.log("📝 Posts loaded:", data);
    });
    
    console.log("📊 Click handler complete");
}

// Simulate user interaction
setTimeout(() => {
    console.log("🔄 Simulating user click...");
    handleClick();
}, 2000);

// ============================================================================
// EVENT LOOP BLOCKING EXAMPLE
// ============================================================================

console.log("9️⃣ Event Loop blocking example:");

console.log("🔄 Starting blocking operation...");

// This will block the event loop
setTimeout(() => {
    console.log("⏰ This setTimeout will be delayed");
}, 0);

// Blocking operation
const blockStart = Date.now();
while (Date.now() - blockStart < 2000) {
    // Busy waiting for 2 seconds - blocks everything!
}

console.log("✅ Blocking operation complete");
console.log("⏰ setTimeout will now execute\n");

// ============================================================================
// ASYNC/AWAIT AND THE EVENT LOOP
// ============================================================================

console.log("10️⃣ Async/await and the Event Loop:");

async function asyncExample() {
    console.log("🔄 Async function started");
    
    // This creates a microtask
    await Promise.resolve();
    console.log("🤝 After await");
    
    // This also creates a microtask
    await Promise.resolve();
    console.log("🤝 After second await");
}

// Call async function
asyncExample();

setTimeout(() => {
    console.log("⏰ setTimeout in async example");
}, 0);

console.log("📊 Synchronous code after async call");
console.log("✅ Synchronous code complete\n");

// ============================================================================
// EVENT LOOP VISUALIZATION
// ============================================================================

console.log("11️⃣ Event Loop visualization:");

console.log("🔄 Event Loop phases:");
console.log("   1. Execute synchronous code (Call Stack)");
console.log("   2. Check Microtask Queue (Promises, async/await)");
console.log("   3. Check Task Queue (setTimeout, setInterval, events)");
console.log("   4. Repeat forever\n");

// Demonstrate the phases
console.log("📊 Phase 1: Synchronous code");

setTimeout(() => {
    console.log("⏰ Phase 3: Task Queue (setTimeout)");
}, 0);

Promise.resolve().then(() => {
    console.log("🤝 Phase 2: Microtask Queue (Promise)");
});

console.log("📊 More synchronous code");
console.log("✅ Phase 1 complete\n");

// ============================================================================
// PERFORMANCE IMPLICATIONS
// ============================================================================

console.log("12️⃣ Performance implications:");

console.log("🔄 Testing different async patterns...");

// Fast microtask
Promise.resolve().then(() => {
    console.log("⚡ Fast microtask completed");
});

// Slow microtask
Promise.resolve().then(() => {
    console.log("🐌 Slow microtask starting...");
    const start = Date.now();
    while (Date.now() - start < 100) {
        // Busy wait for 100ms
    }
    console.log("🐌 Slow microtask completed");
});

// Fast task
setTimeout(() => {
    console.log("⏰ Fast task completed");
}, 0);

// Slow task
setTimeout(() => {
    console.log("🐌 Slow task starting...");
    const start = Date.now();
    while (Date.now() - start < 100) {
        // Busy wait for 100ms
    }
    console.log("🐌 Slow task completed");
}, 0);

console.log("📊 Synchronous code");
console.log("✅ Synchronous code complete\n");

console.log("📊 Expected execution order:");
console.log("   1. Synchronous code");
console.log("   2. Fast microtask");
console.log("   3. Slow microtask (blocks other microtasks)");
console.log("   4. Fast task");
console.log("   5. Slow task (blocks other tasks)");
console.log("   Note: Microtasks block tasks, but not other microtasks");
console.log("   Note: Tasks don't block microtasks");

// ============================================================================
// BEST PRACTICES
// ============================================================================

console.log("\n13️⃣ Event Loop best practices:");

console.log("✅ Do:");
console.log("   - Use microtasks for high-priority operations");
console.log("   - Use tasks for lower-priority operations");
console.log("   - Avoid blocking the main thread");
console.log("   - Use Web Workers for CPU-intensive tasks");
console.log("   - Break up long operations");

console.log("\n❌ Don't:");
console.log("   - Block the event loop with long synchronous operations");
console.log("   - Use setTimeout(0) for microtasks");
console.log("   - Create infinite loops in the main thread");
console.log("   - Ignore the execution priority");

console.log("\n📊 Key takeaways:");
console.log("   - Microtask Queue has priority over Task Queue");
console.log("   - Synchronous code always runs first");
console.log("   - The Event Loop is single-threaded");
console.log("   - Blocking operations freeze the entire application");
console.log("   - Understanding the Event Loop is crucial for performance"); 