// Firebase configuration - Make sure you have initialized Firebase with firebaseConfig in firebase.js

// Google Sign-In
function googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            console.log("User signed in: ", result.user);
            displayProfile(result.user);
        })
        .catch((error) => {
            console.error("Error during Google sign-in: ", error);
        });
}

// Facebook Sign-In
function facebookSignIn() {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            console.log("User signed in: ", result.user);
            displayProfile(result.user);
        })
        .catch((error) => {
            console.error("Error during Facebook sign-in: ", error);
        });
}

// Display user profile information
function displayProfile(user) {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('profile-section').style.display = 'block';
    document.getElementById('username').textContent = user.displayName;
    document.getElementById('bio-text').textContent = user.bio || "Hello!";
}

// Real-Time Messaging using WebSocket or Firebase
const socket = new WebSocket('wss://your-websocket-server.com'); // Replace with your server URL
socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    displayMessage(message);
};

// Display a message in the chat window
function displayMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.innerHTML = `
        <strong>${message.sender}:</strong> ${message.content} <span class="timestamp">${message.timestamp}</span>
    `;
    document.getElementById('messages').appendChild(messageDiv);
}

// Send a message
document.getElementById('send-button').addEventListener('click', () => {
    const content = document.querySelector('#message-input textarea').value;
    if (content) {
        const message = {
            sender: firebase.auth().currentUser.displayName,
            content: content,
            timestamp: new Date().toLocaleTimeString(),
        };
        socket.send(JSON.stringify(message));
        displayMessage(message); // Display sent message immediately
        document.querySelector('#message-input textarea').value = ''; // Clear input
    }
});

// Typing Indicator
document.querySelector('#message-input textarea').addEventListener('input', () => {
    socket.send(JSON.stringify({ type: 'typing', user: firebase.auth().currentUser.displayName }));
});
socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'typing') {
        document.getElementById('typing-indicator').textContent = `${data.user} is typing...`;
    } else {
        document.getElementById('typing-indicator').textContent = '';
    }
};

// Search Functionality
document.getElementById('search-bar').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    // Filter friends, conversations, or groups based on query
    // Implement search filtering here
});

// Notifications
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Dark/Light Mode Toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // Save user preference to Firebase or Local Storage
});

// User Activity and Gamification
let activityPoints = 0;
function updateActivityPoints() {
    activityPoints += 10; // For every message sent
    document.getElementById('activity-level').textContent = `Activity Level: ${activityPoints}`;
}

// Data Analytics Dashboard
function updateDashboard() {
    document.getElementById('message-count').textContent = `Messages Sent: ${messageCount}`;
    document.getElementById('activity-level').textContent = `Activity Level: ${activityPoints}`;
}

// Friend Suggestions
function loadFriendSuggestions() {
    // Load friend suggestions dynamically from server or Firebase
    const suggestions = ["Friend1", "Friend2", "Friend3"]; // Placeholder suggestions
    const suggestionContainer = document.getElementById('friend-suggestions');
    suggestions.forEach(friend => {
        const friendDiv = document.createElement('div');
        friendDiv.textContent = friend;
        suggestionContainer.appendChild(friendDiv);
    });
}

// Story Highlights (Auto-play and swipe)
function loadStories() {
    const stories = ["Story1", "Story2", "Story3"]; // Placeholder stories
    const storyContainer = document.getElementById('story-highlights');
    stories.forEach(story => {
        const storyDiv = document.createElement('div');
        storyDiv.className = 'story';
        storyDiv.textContent = story;
        storyContainer.appendChild(storyDiv);
    });
}

// Initialize the app
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        displayProfile(user);
        loadFriendSuggestions();
        loadStories();
        updateDashboard();
    } else {
        document.getElementById('auth-section').style.display = 'block';
    }
});
