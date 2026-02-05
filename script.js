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

    // Nearby jumping range
    const randomX = (Math.random() - 0.5) * 150; 
    const randomY = (Math.random() - 0.5) * 150;

    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    
    noBtn.innerHTML = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    
    // FAST GROWTH: Multiplier increased to 1.6
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
    yesBtn.style.fontSize = `${currentSize * 1.6}px`;
    yesBtn.style.padding = "20px 40px"; // Also increase padding for impact
}

noBtn.addEventListener("mouseover", moveButton);
noBtn.addEventListener("touchstart", (e) => { e.preventDefault(); moveButton(); });

yesBtn.addEventListener("click", () => {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });

    if (!hasClickedNo) {
        question.innerHTML = "WOWW! So soon!! 😲😱✨";
        mainImg.src = "fast.webp";
    } else {
        question.innerHTML = "YAY! Finally! ❤️🎉";
        mainImg.src = "final.gif";
    }

    thankYouContainer.innerHTML = `<img src="thankyou.gif" class="final-gif">`;
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
