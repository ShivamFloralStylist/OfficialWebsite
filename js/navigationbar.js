const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");
const closeBtn = document.getElementById("close-btn");
const overlay = document.getElementById("overlay");

function openMenu() {
    navbar.classList.add("active");
    overlay.classList.add("active");
    document.body.classList.add("menu-open");
    menuToggle.classList.add("hide"); // Hide ☰
}

function closeMenu() {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("menu-open");
    menuToggle.classList.remove("hide"); // Show ☰ again
}

menuToggle.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);