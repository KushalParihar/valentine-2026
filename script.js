const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const question = document.getElementById("question");
const mainImg = document.getElementById("mainImg");
const thankYouContainer = document.getElementById("thankYouContainer");

const messages = ["No ❌", "Really? 🤨", "Are you sure? 😲", "Think again! 💭", "Wait... what? 😳"];
let messageIndex = 0;
let hasClickedNo = false;

function moveButton() {
    hasClickedNo = true;
    noBtn.style.position = "absolute";

    // "Nearby" jumping logic - stays within the button area
    const randomX = (Math.random() - 0.5) * 150; 
    const randomY = (Math.random() - 0.5) * 150;

    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    
    noBtn.innerHTML = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    
    // Make Yes grow slightly
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
    yesBtn.style.fontSize = `${currentSize * 1.1}px`;
}

noBtn.addEventListener("mouseover", moveButton);
noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault(); 
    moveButton();
});

yesBtn.addEventListener("click", () => {
    // 1. Fireworks!
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });

    // 2. Change Image & Text
    if (!hasClickedNo) {
        question.innerHTML = "WOWW! So soon!! 😲😱✨";
        mainImg.src = "fast.webp";
    } else {
        question.innerHTML = "YAY! Finally! ❤️🎉";
        mainImg.src = "final.gif";
    }

    // 3. Show Thank You GIF
    thankYouContainer.innerHTML = `<img src="thankyou.gif" class="final-gif">`;

    // 4. Hide Buttons
    noBtn.style.display = "none";
    yesBtn.style.display = "none";
    
    createHearts();
});

function createHearts() {
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement("div");
        heart.innerHTML = "❤️";
        heart.style.position = "fixed";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.top = "100vh";
        heart.style.fontSize = "24px";
        heart.style.animation = `floatUp ${Math.random() * 2 + 3}s linear forwards`;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }
}