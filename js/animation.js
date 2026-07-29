const reveals = document.querySelectorAll(".reveal");

function revealSections() {
    reveals.forEach(section => {
        const top = section.getBoundingClientRect().top;

        if (top < window.innerHeight - 120) {
            section.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections);