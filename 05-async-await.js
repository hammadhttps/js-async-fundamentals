// 05-async-await.js
// Demonstrates async/await syntax, patterns, and error handling

console.log("⏳ Starting demonstration of async/await\n");

// ============================================================================
// THE ASYNC KEYWORD
// ============================================================================

console.log("1️⃣ The async keyword:");

// async functions always return promises
async function greet() {
    return "👋 Hello from async function!";
}

// Equivalent to:
function greetPromise() {
    return Promise.resolve("👋 Hello from promise function!");
}

// Using async functions
greet().then(message => {
    console.log("✅ Async function result:", message);
});

greetPromise().then(message => {
    console.log("✅ Promise function result:", message);
});

// ============================================================================
// THE AWAIT KEYWORD
// ============================================================================

console.log("\n2️⃣ The await keyword:");

// Simulated API functions
function fetchUser(userId) {
    return new Promise((resolve, reject) => {
        console.log(`👤 Fetching user ${userId}...`);
        setTimeout(() => {
            resolve({ id: userId, name: "Alice", email: "alice@example.com" });
        }, 1000);
    });
}

function fetchUserPosts(userId) {
    return new Promise((resolve, reject) => {
        console.log(`📝 Fetching posts for user ${userId}...`);
        setTimeout(() => {
            resolve([
                { id: 1, title: "First Post", userId: userId },
                { id: 2, title: "Second Post", userId: userId }
            ]);
        }, 1000);
    });
}

// Using await (looks synchronous!)
async function fetchUserData() {
    try {
        console.log("🔄 Starting to fetch user data...");
        
        const user = await fetchUser(123);
        console.log("👤 User loaded:", user);
        
        const posts = await fetchUserPosts(user.id);
        console.log("📝 Posts loaded:", posts);
        
        return { user, posts };
    } catch (error) {
        console.log("❌ Error:", error.message);
    }
}

// Call the async function
fetchUserData().then(result => {
    if (result) {
        console.log("✅ Final result:", result);
    }
});

// ============================================================================
// EXECUTION PATTERNS
// ============================================================================

console.log("\n3️⃣ Execution Patterns:");

// Simulated API functions with different delays
function apiCall(endpoint, delay = 1000) {
    return new Promise((resolve, reject) => {
        console.log(`📡 Calling ${endpoint}...`);
        setTimeout(() => {
            const success = Math.random() > 0.2; // 80% success rate
            if (success) {
                resolve({ endpoint, data: `Data from ${endpoint}` });
            } else {
                reject(new Error(`Failed to fetch ${endpoint}`));
            }
        }, delay);
    });
}

// Sequential Execution
async function sequentialExecution() {
    console.log("🔄 Sequential execution:");
    
    const start = Date.now();
    
    const result1 = await apiCall("/api/data1", 2000);
    console.log("✅ First request done");
    
    const result2 = await apiCall("/api/data2", 1000);
    console.log("✅ Second request done");
    
    const result3 = await apiCall("/api/data3", 1500);
    console.log("✅ Third request done");
    
    const totalTime = Date.now() - start;
    console.log(`⏱️ Total time: ${totalTime}ms (sequential)`);
    
    return [result1, result2, result3];
}

// Concurrent Execution
async function concurrentExecution() {
    console.log("🔄 Concurrent execution:");
    
    const start = Date.now();
    
    // Start all requests at the same time
    const promise1 = apiCall("/api/data1", 2000);
    const promise2 = apiCall("/api/data2", 1000);
    const promise3 = apiCall("/api/data3", 1500);
    
    // Wait for all to complete
    const [result1, result2, result3] = await Promise.all([promise1, promise2, promise3]);
    
    const totalTime = Date.now() - start;
    console.log(`⏱️ Total time: ${totalTime}ms (concurrent)`);
    
    return [result1, result2, result3];
}

// Start the execution pattern examples
setTimeout(() => {
    sequentialExecution();
}, 5000);

setTimeout(() => {
    concurrentExecution();
}, 10000);

// ============================================================================
// ERROR HANDLING
// ============================================================================

console.log("\n4️⃣ Error handling with async/await:");

// Function that might fail
function riskyOperation() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = Math.random() > 0.5;
            if (success) {
                resolve("🎉 Operation successful!");
            } else {
                reject(new Error("💥 Operation failed!"));
            }
        }, 1000);
    });
}

// Error handling with try/catch
async function handleErrors() {
    try {
        console.log("🔄 Attempting risky operation...");
        const result = await riskyOperation();
        console.log("✅ Success:", result);
    } catch (error) {
        console.log("❌ Error caught:", error.message);
    }
}

// Multiple error handling approaches
async function multipleErrorHandling() {
    // Approach 1: try/catch
    try {
        const result1 = await riskyOperation();
        console.log("✅ Try/catch success:", result1);
    } catch (error) {
        console.log("❌ Try/catch error:", error.message);
    }
    
    // Approach 2: .catch() on the promise
    const result2 = await riskyOperation().catch(error => {
        console.log("❌ .catch() error:", error.message);
        return "Fallback value";
    });
    console.log("✅ .catch() result:", result2);
}

// Start error handling examples
setTimeout(() => {
    handleErrors();
}, 15000);

setTimeout(() => {
    multipleErrorHandling();
}, 17000);

// ============================================================================
// REAL-WORLD EXAMPLE
// ============================================================================

console.log("\n5️⃣ Real-world example - User profile loading:");

async function loadUserProfile(userId) {
    try {
        console.log(`🔄 Loading profile for user ${userId}...`);
        
        // Start all requests concurrently
        const [user, posts, followers] = await Promise.all([
            fetchUser(userId),
            fetchUserPosts(userId),
            fetchFollowers(userId)
        ]);
        
        console.log("✅ All profile data loaded!");
        
        return {
            user,
            posts,
            followers
        };
    } catch (error) {
        console.error("❌ Failed to load profile:", error.message);
        throw error;
    }
}

// Helper function for followers
function fetchFollowers(userId) {
    return new Promise((resolve, reject) => {
        console.log(`👥 Fetching followers for user ${userId}...`);
        setTimeout(() => {
            resolve([
                { id: 101, name: "Bob" },
                { id: 102, name: "Charlie" },
                { id: 103, name: "Diana" }
            ]);
        }, 1200);
    });
}

// Using the profile loader
setTimeout(() => {
    loadUserProfile(123)
        .then(profile => {
            console.log("📊 Complete profile:", profile);
        })
        .catch(error => {
            console.log("❌ Profile loading failed:", error.message);
        });
}, 20000);

// ============================================================================
// ADVANCED PATTERNS
// ============================================================================

console.log("\n6️⃣ Advanced patterns:");

// Parallel execution with error handling
async function parallelWithErrorHandling() {
    console.log("🔄 Parallel execution with error handling:");
    
    const promises = [
        apiCall("/api/users").catch(e => ({ error: e.message })),
        apiCall("/api/posts").catch(e => ({ error: e.message })),
        apiCall("/api/comments").catch(e => ({ error: e.message }))
    ];
    
    const results = await Promise.all(promises);
    
    results.forEach((result, index) => {
        if (result.error) {
            console.log(`❌ API ${index + 1} failed:`, result.error);
        } else {
            console.log(`✅ API ${index + 1} succeeded:`, result.data);
        }
    });
}

// Sequential with early exit
async function sequentialWithEarlyExit() {
    console.log("🔄 Sequential with early exit:");
    
    try {
        const user = await apiCall("/api/user");
        console.log("✅ User loaded");
        
        if (!user.data) {
            throw new Error("No user data");
        }
        
        const posts = await apiCall("/api/posts");
        console.log("✅ Posts loaded");
        
        const comments = await apiCall("/api/comments");
        console.log("✅ Comments loaded");
        
        console.log("🎉 All data loaded successfully!");
    } catch (error) {
        console.log("❌ Early exit due to error:", error.message);
    }
}

// Start advanced patterns
setTimeout(() => {
    parallelWithErrorHandling();
}, 25000);

setTimeout(() => {
    sequentialWithEarlyExit();
}, 30000);

// ============================================================================
// ASYNC/AWAIT VS PROMISES
// ============================================================================

console.log("\n7️⃣ Async/await vs Promises comparison:");

// Promise chain approach
function promiseChain() {
    return fetchUser(123)
        .then(user => {
            console.log("👤 User (promise):", user);
            return fetchUserPosts(user.id);
        })
        .then(posts => {
            console.log("📝 Posts (promise):", posts);
            return fetchPostComments(posts[0].id);
        })
        .then(comments => {
            console.log("💬 Comments (promise):", comments);
        })
        .catch(error => {
            console.log("❌ Promise chain error:", error.message);
        });
}

// Async/await approach
async function asyncAwaitApproach() {
    try {
        const user = await fetchUser(123);
        console.log("👤 User (async):", user);
        
        const posts = await fetchUserPosts(user.id);
        console.log("📝 Posts (async):", posts);
        
        const comments = await fetchPostComments(posts[0].id);
        console.log("💬 Comments (async):", comments);
    } catch (error) {
        console.log("❌ Async/await error:", error.message);
    }
}

// Start comparison
setTimeout(() => {
    console.log("🔄 Promise chain approach:");
    promiseChain();
}, 35000);

setTimeout(() => {
    console.log("🔄 Async/await approach:");
    asyncAwaitApproach();
}, 40000);

console.log("\n📊 Expected behavior:");
console.log("- Async functions always return promises");
console.log("- Await pauses execution until promise settles");
console.log("- Sequential execution waits for each operation");
console.log("- Concurrent execution runs operations in parallel");
console.log("- Try/catch provides clean error handling");
console.log("- Async/await makes code look synchronous"); 