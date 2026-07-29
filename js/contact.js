// ===============================
// Initialize EmailJS
// ===============================

let selectedRating = 0;

// ===============================
// STAR RATING
// ===============================

const stars = document.querySelectorAll(".stars i");
const ratingResult = document.getElementById("ratingResult");

stars.forEach((star) => {

    star.addEventListener("click", () => {

        selectedRating = star.dataset.value;

        stars.forEach((s) => {

            if (s.dataset.value <= selectedRating) {

                s.classList.remove("fa-regular");
                s.classList.add("fa-solid");
                s.style.color = "#ff7a00";

            } else {

                s.classList.remove("fa-solid");
                s.classList.add("fa-regular");
                s.style.color = "#666";

            }

        });

        ratingResult.textContent =
            `You rated FIXIT ${selectedRating}/5 ⭐`;

    });

});

// ===============================
// CONTACT FORM
// ===============================

const form = document.getElementById("contactForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const templateParams = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        subject: document.getElementById("subject").value,

        message: document.getElementById("message").value,

        rating: selectedRating || "No rating"

    };

    emailjs.send(

        "service_zs67jrm",

        "template_uei2d7z",

        templateParams

    )

    .then(function(){

        alert("✅ Message sent successfully!");

        form.reset();

        selectedRating = 0;

        ratingResult.textContent = "No rating selected.";

        stars.forEach((star)=>{

            star.classList.remove("fa-solid");

            star.classList.add("fa-regular");

            star.style.color="#666";

        });

    })

    .catch(function(error){

        console.error(error);

        alert("❌ Failed to send message.");

    });

});