// 01-synchronous-vs-asynchronous.js
// Demonstrates JavaScript's fundamental nature and the need for asynchronicity

console.log("🚀 Starting demonstration of synchronous vs asynchronous JavaScript\n");

// ============================================================================
// SYNCHRONOUS (BLOCKING) EXAMPLE
// ============================================================================

function blockingOperation() {
    console.log("🚫 Starting blocking operation...");
    
    // Simulate a long-running synchronous operation
    const start = Date.now();
    while (Date.now() - start < 3000) {
        // Busy waiting - blocks the main thread for 3 seconds
    }
    
    console.log("✅ Blocking operation complete!");
}

console.log("1️⃣ About to run blocking operation...");
blockingOperation();
console.log("2️⃣ This won't run until blocking operation completes\n");

// ============================================================================
// ASYNCHRONOUS (NON-BLOCKING) EXAMPLE
// ============================================================================

function nonBlockingOperation() {
    console.log("🔄 Starting non-blocking operation...");
    
    // Use setTimeout to make it asynchronous
    setTimeout(() => {
        console.log("✅ Non-blocking operation complete!");
    }, 3000);
}

console.log("3️⃣ About to run non-blocking operation...");
nonBlockingOperation();
console.log("4️⃣ This runs immediately while non-blocking operation is in progress\n");

// ============================================================================
// DEMONSTRATION OF THE PROBLEM
// ============================================================================

console.log("5️⃣ Demonstrating the problem with synchronous operations:");
console.log("   - If we had a real database query here, the entire app would freeze");
console.log("   - User couldn't click buttons, scroll, or interact with the page");
console.log("   - This is why we need asynchronous programming!\n");

// ============================================================================
// WEB APIs TO THE RESCUE
// ============================================================================

console.log("6️⃣ Web APIs provide asynchronous capabilities:");
console.log("   - setTimeout/setInterval (timers)");
console.log("   - fetch (network requests)");
console.log("   - DOM events (click, scroll, etc.)");
console.log("   - File API, Geolocation, etc.\n");

// Example of multiple async operations running concurrently
console.log("7️⃣ Multiple async operations running concurrently:");

setTimeout(() => console.log("⏰ Timer 1 (1 second)"), 1000);
setTimeout(() => console.log("⏰ Timer 2 (2 seconds)"), 2000);
setTimeout(() => console.log("⏰ Timer 3 (3 seconds)"), 3000);

console.log("8️⃣ All timers started simultaneously - they'll complete independently!\n");

// ============================================================================
// OUTPUT EXPLANATION
// ============================================================================

console.log("📊 Expected output order:");
console.log("   1️⃣ About to run blocking operation...");
console.log("   🚫 Starting blocking operation...");
console.log("   ✅ Blocking operation complete!");
console.log("   2️⃣ This won't run until blocking operation completes");
console.log("   3️⃣ About to run non-blocking operation...");
console.log("   🔄 Starting non-blocking operation...");
console.log("   4️⃣ This runs immediately while non-blocking operation is in progress");
console.log("   5️⃣ Demonstrating the problem...");
console.log("   6️⃣ Web APIs provide asynchronous capabilities...");
console.log("   7️⃣ Multiple async operations running concurrently:");
console.log("   8️⃣ All timers started simultaneously...");
console.log("   ⏰ Timer 1 (1 second)");
console.log("   ⏰ Timer 2 (2 seconds)");
console.log("   ✅ Non-blocking operation complete!");
console.log("   ⏰ Timer 3 (3 seconds)"); 