const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");

// Resize canvas to fit the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Store stars in an array
let stars = [];

// Reduced number of stars (for better performance)
const TOTAL_STARS = 50;

// 🌟 Updated Custom Star Messages 🌟
const messages = [
    "I love you from the depths of the Earth to beyond the stars",
    "You are the calm in my chaos",
    "Forever connected, no matter the distance ❤️",
    "You are my Nerd Charming",
    "Looking at the same sky, miles apart 🌎",
    "Our journey is written in the stars 💕",
    "Our souls met among the stars",
    "Noncommittally married since September 2024",
    "Your mind is more beautiful than the cosmos",
    "I love everything that makes you... you",
    "My heart is bound to yours, willingly",
    "I hear your voice and feel your touch at every thought of you"
];

// Function to draw a star
function drawStar(x, y, size, message) {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
    
    // Save star data for interactivity
    stars.push({ x, y, size, message });
}

// Generate stars (without animation)
function generateStars() {
    stars = []; // Reset stars
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < TOTAL_STARS; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let size = Math.random() * 3 + 1;
        let message = messages[Math.floor(Math.random() * messages.length)];
        drawStar(x, y, size, message);
    }
}

// Click event to detect stars
canvas.addEventListener("click", function (event) {
    let clickX = event.clientX;
    let clickY = event.clientY;

    // Check if a star was clicked
    stars.forEach(star => {
        let dx = clickX - star.x;
        let dy = clickY - star.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < star.size + 5) { // Small buffer for easier clicking
            showPopup(star.message, clickX, clickY);
        }
    });
});

// Function to show floating pop-up message
function showPopup(message, x, y) {
    let popup = document.createElement("div");
    popup.textContent = message;
    popup.style.position = "absolute";
    popup.style.left = x + "px";
    popup.style.top = y + "px";
    popup.style.padding = "10px";
    popup.style.background = "rgba(0, 0, 0, 0.7)";
    popup.style.color = "white";
    popup.style.borderRadius = "8px";
    popup.style.zIndex = "10";
    popup.style.fontSize = "14px";

    document.body.appendChild(popup);

    // Remove popup after 2 seconds
    setTimeout(() => {
        popup.remove();
    }, 2000);
}

// Generate stars once (no twinkling)
generateStars();
