// 04-promises.js
// Demonstrates promises, states, chaining, and static methods

console.log("🤝 Starting demonstration of promises\n");

// ============================================================================
// WHAT IS A PROMISE?
// ============================================================================

console.log("1️⃣ What is a Promise?");

// Think of it like a roommate promising to get tacos
const tacoPromise = new Promise((resolve, reject) => {
    console.log("🌮 Roommate is going to get tacos...");
    
    // Simulate roommate going to get tacos
    setTimeout(() => {
        const gotTacos = Math.random() > 0.5; // 50% chance
        
        if (gotTacos) {
            resolve("🌮 Tacos acquired!");
        } else {
            reject("😞 No tacos available");
        }
    }, 2000);
});

// Using the promise
tacoPromise
    .then(result => {
        console.log("✅ Success:", result);
    })
    .catch(error => {
        console.log("❌ Error:", error);
    });

// ============================================================================
// PROMISE STATES
// ============================================================================

console.log("\n2️⃣ Promise States:");

// Promise has 3 states: Pending, Fulfilled, Rejected
const statePromise = new Promise((resolve, reject) => {
    console.log("⏳ Promise starts in 'pending' state");
    
    setTimeout(() => {
        const success = Math.random() > 0.5;
        
        if (success) {
            console.log("✅ Changing to 'fulfilled' state");
            resolve("Success!");
        } else {
            console.log("❌ Changing to 'rejected' state");
            reject("Error!");
        }
    }, 1000);
});

statePromise
    .then(result => {
        console.log("🎉 Promise fulfilled with:", result);
    })
    .catch(error => {
        console.log("💥 Promise rejected with:", error);
    });

// ============================================================================
// CREATING AND USING PROMISES
// ============================================================================

console.log("\n3️⃣ Creating and Using Promises:");

// Creating a promise
function createPromise(success = true) {
    return new Promise((resolve, reject) => {
        console.log("🔄 Creating promise...");
        
        setTimeout(() => {
            if (success) {
                resolve("🎉 Operation successful!");
            } else {
                reject("💥 Operation failed!");
            }
        }, 1000);
    });
}

// Using promises
const successPromise = createPromise(true);
const failurePromise = createPromise(false);

successPromise
    .then(result => {
        console.log("✅ Success promise:", result);
    })
    .catch(error => {
        console.log("❌ Success promise error:", error);
    });

failurePromise
    .then(result => {
        console.log("✅ Failure promise:", result);
    })
    .catch(error => {
        console.log("❌ Failure promise error:", error);
    });

// ============================================================================
// PROMISE CHAINING
// ============================================================================

console.log("\n4️⃣ Promise Chaining:");

// Simulated API functions that return promises
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

function fetchPostComments(postId) {
    return new Promise((resolve, reject) => {
        console.log(`💬 Fetching comments for post ${postId}...`);
        setTimeout(() => {
            resolve([
                { id: 1, text: "Great post!", postId: postId },
                { id: 2, text: "Thanks for sharing!", postId: postId }
            ]);
        }, 1000);
    });
}

// ✅ Clean promise chain (solves callback hell)
console.log("✅ Promise chain example:");
fetchUser(123)
    .then(user => {
        console.log("👤 User:", user);
        return fetchUserPosts(user.id);
    })
    .then(posts => {
        console.log("📝 Posts:", posts);
        return fetchPostComments(posts[0].id);
    })
    .then(comments => {
        console.log("💬 Comments:", comments);
        console.log("✅ All data fetched successfully!");
    })
    .catch(error => {
        console.log("❌ Error in chain:", error);
    });

// ============================================================================
// STATIC PROMISE METHODS
// ============================================================================

console.log("\n5️⃣ Static Promise Methods:");

// Promise.all() - Wait for all promises
const promises = [
    new Promise(resolve => setTimeout(() => resolve("User data"), 1000)),
    new Promise(resolve => setTimeout(() => resolve("Post data"), 1500)),
    new Promise(resolve => setTimeout(() => resolve("Comment data"), 2000))
];

Promise.all(promises)
    .then(results => {
        console.log("📊 Promise.all results:", results);
    })
    .catch(error => {
        console.log("❌ Promise.all error:", error);
    });

// Promise.race() - Wait for first promise
const racePromises = [
    new Promise(resolve => setTimeout(() => resolve("Fast"), 1000)),
    new Promise(resolve => setTimeout(() => resolve("Slow"), 3000))
];

Promise.race(racePromises)
    .then(result => {
        console.log("🏁 Promise.race winner:", result);
    });

// Promise.allSettled() - Wait for all, regardless of success/failure
const mixedPromises = [
    Promise.resolve("Success 1"),
    Promise.reject("Error 1"),
    Promise.resolve("Success 2"),
    Promise.reject("Error 2")
];

Promise.allSettled(mixedPromises)
    .then(results => {
        console.log("📋 Promise.allSettled results:");
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(`  ✅ Promise ${index} succeeded:`, result.value);
            } else {
                console.log(`  ❌ Promise ${index} failed:`, result.reason);
            }
        });
    });

// ============================================================================
// ERROR HANDLING
// ============================================================================

console.log("\n6️⃣ Error Handling:");

// Promise with error
const errorPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(new Error("Something went wrong"));
    }, 1000);
});

// Using .catch() for error handling
errorPromise
    .then(result => {
        console.log("✅ This won't run");
    })
    .catch(error => {
        console.log("❌ Caught error:", error.message);
    });

// Error in .then() callback
new Promise(resolve => resolve("Success"))
    .then(result => {
        console.log("✅ Got result:", result);
        throw new Error("Error in .then()");
    })
    .catch(error => {
        console.log("❌ Caught error from .then():", error.message);
    });

// ============================================================================
// REAL-WORLD EXAMPLE
// ============================================================================

console.log("\n7️⃣ Real-world example - API calls:");

// Simulated API functions
function apiCall(endpoint, delay = 1000) {
    return new Promise((resolve, reject) => {
        console.log(`📡 Calling API: ${endpoint}`);
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

// Sequential API calls
async function sequentialCalls() {
    try {
        console.log("🔄 Sequential API calls:");
        const user = await apiCall("/api/user", 1000);
        console.log("✅ User loaded");
        
        const posts = await apiCall("/api/posts", 1500);
        console.log("✅ Posts loaded");
        
        const comments = await apiCall("/api/comments", 2000);
        console.log("✅ Comments loaded");
        
        console.log("🎉 All sequential calls completed!");
    } catch (error) {
        console.log("❌ Sequential calls error:", error.message);
    }
}

// Concurrent API calls
async function concurrentCalls() {
    try {
        console.log("🔄 Concurrent API calls:");
        const [user, posts, comments] = await Promise.all([
            apiCall("/api/user", 1000),
            apiCall("/api/posts", 1500),
            apiCall("/api/comments", 2000)
        ]);
        
        console.log("🎉 All concurrent calls completed!");
        console.log("📊 Results:", { user, posts, comments });
    } catch (error) {
        console.log("❌ Concurrent calls error:", error.message);
    }
}

// Start the examples
setTimeout(() => {
    sequentialCalls();
}, 8000);

setTimeout(() => {
    concurrentCalls();
}, 12000);

// ============================================================================
// PROMISE UTILITIES
// ============================================================================

console.log("\n8️⃣ Promise utilities:");

// Promise.resolve() - Create resolved promise
Promise.resolve("Immediate success")
    .then(result => console.log("✅ Resolved:", result));

// Promise.reject() - Create rejected promise
Promise.reject(new Error("Immediate failure"))
    .catch(error => console.log("❌ Rejected:", error.message));

// Converting callback-based API to promise
function callbackToPromise(callbackFunction) {
    return new Promise((resolve, reject) => {
        callbackFunction((error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

// Example usage
const callbackAPI = (callback) => {
    setTimeout(() => {
        const success = Math.random() > 0.5;
        if (success) {
            callback(null, "Callback success");
        } else {
            callback(new Error("Callback error"), null);
        }
    }, 1000);
};

callbackToPromise(callbackAPI)
    .then(result => console.log("✅ Converted callback:", result))
    .catch(error => console.log("❌ Converted callback error:", error.message));

console.log("\n📊 Expected behavior:");
console.log("- Promises start in 'pending' state");
console.log("- They transition to 'fulfilled' or 'rejected'");
console.log("- Promise.all waits for all promises");
console.log("- Promise.race returns the first to complete");
console.log("- Promise.allSettled waits for all regardless of outcome");
console.log("- Chaining makes async code more readable"); 