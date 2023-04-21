const starContainer = document.createElement("div");
starContainer.classList.add("star-container");
document.body.appendChild(starContainer);

for (let i = 0; i < 50; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.animationDelay = `${Math.random() * 10}s`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    starContainer.appendChild(star);
}