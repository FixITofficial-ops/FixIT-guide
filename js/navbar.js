const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");
const header = document.querySelector("header");

menuToggle.addEventListener("click", () => {

    menuToggle.classList.toggle("active");
    navbar.classList.toggle("active");

    header.classList.toggle("menu-open");

    document.body.classList.toggle("no-scroll");

});

document.querySelectorAll("#navbar a").forEach(link => {

    link.addEventListener("click", () => {

        menuToggle.classList.remove("active");
        navbar.classList.remove("active");
        header.classList.remove("menu-open");
        document.body.classList.remove("no-scroll");

    });

});