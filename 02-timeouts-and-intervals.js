// 02-timeouts-and-intervals.js
// Demonstrates setTimeout, setInterval, and best practices

console.log("⏰ Starting demonstration of timeouts and intervals\n");

// ============================================================================
// SETTIMEOUT EXAMPLES
// ============================================================================

console.log("1️⃣ Basic setTimeout example:");
setTimeout(() => {
    console.log("🎯 This runs after 2 seconds");
}, 2000);

console.log("2️⃣ setTimeout with parameters:");
setTimeout((name, age) => {
    console.log(`👋 Hello ${name}, you are ${age} years old`);
}, 1000, "Alice", 25);

console.log("3️⃣ Canceling a timeout:");
const timeoutId = setTimeout(() => {
    console.log("❌ This won't run - timeout was canceled");
}, 5000);

// Cancel the timeout after 1 second
setTimeout(() => {
    clearTimeout(timeoutId);
    console.log("⏹️ Timeout canceled");
}, 1000);

// ============================================================================
// SETINTERVAL EXAMPLES
// ============================================================================

console.log("\n4️⃣ Basic setInterval example:");
let counter = 0;
const intervalId = setInterval(() => {
    counter++;
    console.log(`🔄 Interval count: ${counter}`);
    
    if (counter >= 5) {
        clearInterval(intervalId);
        console.log("⏹️ Interval stopped after 5 iterations");
    }
}, 1000);

// ============================================================================
// IMPORTANT NOTES AND BEST PRACTICES
// ============================================================================

console.log("\n5️⃣ Important notes about timers:");

// ❌ Minimum delay, not guaranteed
setTimeout(() => {
    console.log("⚠️ This might take longer than 1 second if call stack is busy");
}, 1000);

// ✅ Recursive setTimeout (preferred over setInterval)
function recursiveTimeout() {
    console.log("🔄 Recursive timeout running...");
    setTimeout(recursiveTimeout, 1000); // Guarantees 1s between executions
}

// Start recursive timeout
setTimeout(() => {
    console.log("🔄 Starting recursive timeout (will run 3 times):");
    let count = 0;
    function limitedRecursive() {
        count++;
        console.log(`🔄 Recursive execution ${count}`);
        if (count < 3) {
            setTimeout(limitedRecursive, 1000);
        }
    }
    limitedRecursive();
}, 6000);

// ============================================================================
// SETTIMEOUT(0) DEMONSTRATION
// ============================================================================

console.log("\n6️⃣ setTimeout(0) demonstration:");
console.log("🔄 Starting synchronous operation...");

// Simulate a long synchronous operation
const start = Date.now();
while (Date.now() - start < 1000) {
    // Busy waiting for 1 second
}

setTimeout(() => {
    console.log("⏰ setTimeout(0) callback - this runs after sync code");
}, 0);

console.log("✅ Synchronous operation complete");

// ============================================================================
// PERFORMANCE COMPARISON
// ============================================================================

console.log("\n7️⃣ Performance comparison:");

// ❌ setInterval can overlap if execution takes longer than interval
let intervalCount = 0;
const problematicInterval = setInterval(() => {
    intervalCount++;
    console.log(`❌ Interval ${intervalCount} - might overlap if slow`);
    
    // Simulate slow execution
    const start = Date.now();
    while (Date.now() - start < 500) {
        // Busy waiting for 500ms
    }
    
    if (intervalCount >= 3) {
        clearInterval(problematicInterval);
        console.log("⏹️ Problematic interval stopped");
    }
}, 1000);

// ✅ Recursive setTimeout guarantees timing
setTimeout(() => {
    console.log("✅ Starting recursive setTimeout (guarantees timing):");
    let recursiveCount = 0;
    
    function guaranteedTiming() {
        recursiveCount++;
        console.log(`✅ Recursive ${recursiveCount} - guaranteed 1s between`);
        
        // Simulate slow execution
        const start = Date.now();
        while (Date.now() - start < 500) {
            // Busy waiting for 500ms
        }
        
        if (recursiveCount < 3) {
            setTimeout(guaranteedTiming, 1000);
        }
    }
    
    guaranteedTiming();
}, 5000);

// ============================================================================
// REAL-WORLD EXAMPLE
// ============================================================================

console.log("\n8️⃣ Real-world example - polling for data:");

function pollForData() {
    console.log("📡 Polling for new data...");
    
    // Simulate API call
    setTimeout(() => {
        const hasNewData = Math.random() > 0.7; // 30% chance of new data
        
        if (hasNewData) {
            console.log("📊 New data received!");
            // Stop polling when we get data
        } else {
            console.log("⏳ No new data, polling again in 2 seconds...");
            setTimeout(pollForData, 2000);
        }
    }, 1000);
}

// Start polling after 8 seconds
setTimeout(() => {
    console.log("🔄 Starting data polling example:");
    pollForData();
}, 8000);

console.log("\n📊 Expected behavior:");
console.log("- Timers will execute in order of their delays");
console.log("- Recursive setTimeout provides better timing guarantees");
console.log("- setInterval can overlap if execution is slow");
console.log("- setTimeout(0) defers execution until after current sync code"); 