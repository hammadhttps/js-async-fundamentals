// 03-callbacks.js
// Demonstrates callbacks, callback hell, and solutions

console.log("📞 Starting demonstration of callbacks\n");

// ============================================================================
// SYNCHRONOUS CALLBACKS
// ============================================================================

console.log("1️⃣ Synchronous callbacks (immediate execution):");

const numbers = [1, 2, 3, 4, 5];

// Array methods use synchronous callbacks
const doubled = numbers.map(num => num * 2);
console.log("📊 Doubled numbers:", doubled);

const filtered = numbers.filter(num => num > 3);
console.log("🔍 Filtered numbers (>3):", filtered);

const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log("➕ Sum of numbers:", sum);

// Custom function with synchronous callback
function processArray(arr, callback) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        result.push(callback(arr[i], i, arr));
    }
    return result;
}

const processed = processArray(numbers, (num, index) => {
    return `Item ${index}: ${num}`;
});
console.log("🔄 Custom processed:", processed);

// ============================================================================
// ASYNCHRONOUS CALLBACKS
// ============================================================================

console.log("\n2️⃣ Asynchronous callbacks (delayed execution):");

// setTimeout callback
setTimeout(() => {
    console.log("⏰ This runs after 1 second");
}, 1000);

// Simulated API call with callback
function fetchUserData(userId, callback) {
    console.log(`📡 Fetching data for user ${userId}...`);
    
    // Simulate network delay
    setTimeout(() => {
        const userData = {
            id: userId,
            name: "John Doe",
            email: "john@example.com"
        };
        
        // Simulate success/failure
        const success = Math.random() > 0.3; // 70% success rate
        
        if (success) {
            callback(null, userData);
        } else {
            callback(new Error("Failed to fetch user data"), null);
        }
    }, 2000);
}

// Using the async callback
fetchUserData(123, (error, data) => {
    if (error) {
        console.log("❌ Error:", error.message);
    } else {
        console.log("✅ User data:", data);
    }
});

// ============================================================================
// CALLBACK HELL EXAMPLE
// ============================================================================

console.log("\n3️⃣ Callback Hell demonstration:");

// Simulated API functions
function fetchUser(userId, callback) {
    setTimeout(() => {
        console.log(`👤 Fetching user ${userId}...`);
        callback(null, { id: userId, name: "Alice", email: "alice@example.com" });
    }, 1000);
}

function fetchUserPosts(userId, callback) {
    setTimeout(() => {
        console.log(`📝 Fetching posts for user ${userId}...`);
        callback(null, [
            { id: 1, title: "First Post", userId: userId },
            { id: 2, title: "Second Post", userId: userId }
        ]);
    }, 1000);
}

function fetchPostComments(postId, callback) {
    setTimeout(() => {
        console.log(`💬 Fetching comments for post ${postId}...`);
        callback(null, [
            { id: 1, text: "Great post!", postId: postId },
            { id: 2, text: "Thanks for sharing!", postId: postId }
        ]);
    }, 1000);
}

function fetchCommentAuthor(commentId, callback) {
    setTimeout(() => {
        console.log(`👤 Fetching author for comment ${commentId}...`);
        callback(null, { id: 101, name: "Bob", email: "bob@example.com" });
    }, 1000);
}

// ❌ CALLBACK HELL - Hard to read and maintain
console.log("❌ Callback Hell example:");
fetchUser(123, (userError, user) => {
    if (userError) {
        console.log("❌ User error:", userError.message);
        return;
    }
    
    console.log("👤 User:", user);
    
    fetchUserPosts(user.id, (postsError, posts) => {
        if (postsError) {
            console.log("❌ Posts error:", postsError.message);
            return;
        }
        
        console.log("📝 Posts:", posts);
        
        fetchPostComments(posts[0].id, (commentsError, comments) => {
            if (commentsError) {
                console.log("❌ Comments error:", commentsError.message);
                return;
            }
            
            console.log("💬 Comments:", comments);
            
            fetchCommentAuthor(comments[0].id, (authorError, author) => {
                if (authorError) {
                    console.log("❌ Author error:", authorError.message);
                    return;
                }
                
                console.log("👤 Comment author:", author);
                console.log("✅ All data fetched successfully!");
            });
        });
    });
});

// ============================================================================
// SOLUTIONS TO CALLBACK HELL
// ============================================================================

console.log("\n4️⃣ Solutions to Callback Hell:");

// ✅ Solution 1: Named functions (better readability)
function handleUser(userError, user) {
    if (userError) {
        console.log("❌ User error:", userError.message);
        return;
    }
    console.log("👤 User:", user);
    fetchUserPosts(user.id, handlePosts);
}

function handlePosts(postsError, posts) {
    if (postsError) {
        console.log("❌ Posts error:", postsError.message);
        return;
    }
    console.log("📝 Posts:", posts);
    fetchPostComments(posts[0].id, handleComments);
}

function handleComments(commentsError, comments) {
    if (commentsError) {
        console.log("❌ Comments error:", commentsError.message);
        return;
    }
    console.log("💬 Comments:", comments);
    fetchCommentAuthor(comments[0].id, handleAuthor);
}

function handleAuthor(authorError, author) {
    if (authorError) {
        console.log("❌ Author error:", authorError.message);
        return;
    }
    console.log("👤 Comment author:", author);
    console.log("✅ All data fetched successfully (named functions)!");
}

// Start the named function chain
setTimeout(() => {
    console.log("✅ Named functions example:");
    fetchUser(456, handleUser);
}, 8000);

// ============================================================================
// ERROR HANDLING PATTERNS
// ============================================================================

console.log("\n5️⃣ Error handling patterns:");

// Node.js style: error-first callbacks
function nodeStyleCallback(error, data) {
    if (error) {
        console.log("❌ Error:", error.message);
        return;
    }
    console.log("✅ Data:", data);
}

// Simulate Node.js style API
function nodeStyleAPI(callback) {
    setTimeout(() => {
        const success = Math.random() > 0.5;
        if (success) {
            callback(null, "Success data");
        } else {
            callback(new Error("Something went wrong"), null);
        }
    }, 1000);
}

setTimeout(() => {
    console.log("🔄 Testing Node.js style callback:");
    nodeStyleAPI(nodeStyleCallback);
}, 12000);

// ============================================================================
// REAL-WORLD EXAMPLE
// ============================================================================

console.log("\n6️⃣ Real-world example - file processing:");

// Simulated file processing with callbacks
function readFile(filename, callback) {
    console.log(`📖 Reading file: ${filename}`);
    setTimeout(() => {
        callback(null, `Content of ${filename}`);
    }, 1000);
}

function processContent(content, callback) {
    console.log("🔄 Processing content...");
    setTimeout(() => {
        const processed = content.toUpperCase();
        callback(null, processed);
    }, 500);
}

function saveFile(filename, content, callback) {
    console.log(`💾 Saving to file: ${filename}`);
    setTimeout(() => {
        callback(null, `Saved ${content.length} characters to ${filename}`);
    }, 800);
}

// Chain the operations
readFile("input.txt", (readError, content) => {
    if (readError) {
        console.log("❌ Read error:", readError.message);
        return;
    }
    
    processContent(content, (processError, processed) => {
        if (processError) {
            console.log("❌ Process error:", processError.message);
            return;
        }
        
        saveFile("output.txt", processed, (saveError, result) => {
            if (saveError) {
                console.log("❌ Save error:", saveError.message);
                return;
            }
            
            console.log("✅ File processing complete:", result);
        });
    });
});

console.log("\n📊 Expected behavior:");
console.log("- Synchronous callbacks execute immediately");
console.log("- Asynchronous callbacks execute after delays");
console.log("- Callback hell shows nested, hard-to-read code");
console.log("- Named functions improve readability");
console.log("- Error-first pattern is common in Node.js"); 