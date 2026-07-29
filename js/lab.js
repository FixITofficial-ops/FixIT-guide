/*==================================================
    FIXIT VIRTUAL PC LAB
    DRAG AND DROP SYSTEM
==================================================*/


document.addEventListener("DOMContentLoaded", function () {


    /*==================================================
        ELEMENTS
    ==================================================*/


    const componentCards =
        document.querySelectorAll(".component-card");


    const motherboardSlots =
        document.querySelectorAll(".motherboard-slot");


    const progressSteps =
        document.querySelectorAll(".progress-step");


    const progressFill =
        document.getElementById("progressFill");


    const progressCount =
        document.getElementById("progressCount");


    const installedCount =
        document.getElementById("installedCount");


    const resetButton =
        document.getElementById("resetBuild");


    const checkButton =
        document.getElementById("checkBuild");


    const difficultyButtons =
        document.querySelectorAll(".difficulty");


    /*==================================================
        COMPONENT DATA
    ==================================================*/


    const componentData = {


        cpu: {

            title: "CPU",

            icon: "fa-microchip",

            description:
                "The CPU is the brain of the computer. It processes instructions and performs calculations.",

            what:
                "The CPU executes instructions and controls the operations of your computer.",

            installation:
                "Place the CPU into the motherboard CPU socket carefully.",

            difficulty: "Beginner"

        },


        ram: {

            title: "RAM",

            icon: "fa-memory",

            description:
                "RAM temporarily stores data that your computer is actively using.",

            what:
                "RAM allows your computer to quickly access active programs and data.",

            installation:
                "Align the RAM with the motherboard memory slot and press it down until it clicks.",

            difficulty: "Beginner"

        },


        gpu: {

            title: "GPU",

            icon: "fa-display",

            description:
                "The GPU processes images, video, and graphics displayed on your screen.",

            what:
                "The graphics card renders visual information and helps run games and graphic applications.",

            installation:
                "Insert the graphics card into the correct PCIe slot.",

            difficulty: "Intermediate"

        },


        ssd: {

            title: "SSD",

            icon: "fa-hard-drive",

            description:
                "An SSD stores your operating system, applications, and personal files.",

            what:
                "The SSD provides fast storage for your computer.",

            installation:
                "Place the SSD into the correct M.2 storage slot.",

            difficulty: "Beginner"

        },


        psu: {

            title: "PSU",

            icon: "fa-bolt",

            description:
                "The power supply provides electricity to all of your computer components.",

            what:
                "The PSU converts electricity into usable power for the computer.",

            installation:
                "Connect the PSU to the motherboard and other components using the correct power cables.",

            difficulty: "Intermediate"

        },


        cooling: {

            title: "COOLING",

            icon: "fa-fan",

            description:
                "The cooling system removes heat from the CPU and other components.",

            what:
                "Cooling prevents your components from overheating during operation.",

            installation:
                "Install the cooler directly above the CPU and make sure it is securely attached.",

            difficulty: "Intermediate"

        }

    };


    /*==================================================
        BUILD STATE
    ==================================================*/


    let installedComponents = [];


    /*==================================================
        COMPONENT INFORMATION
    ==================================================*/


    componentCards.forEach(function (card) {


        card.addEventListener("click", function () {


            const componentName =
                card.dataset.component;


            showComponentInfo(componentName);


        });


    });


    function showComponentInfo(componentName) {


        const data =
            componentData[componentName];


        if (!data) return;


        const infoIcon =
            document.getElementById("infoIcon");


        const infoTitle =
            document.getElementById("infoTitle");


        const infoDescription =
            document.getElementById("infoDescription");


        const whatItDoes =
            document.getElementById("whatItDoes");


        const installationInfo =
            document.getElementById("installationInfo");


        const difficultyLevel =
            document.getElementById("difficultyLevel");


        infoIcon.className =
            `fa-solid ${data.icon}`;


        infoTitle.textContent =
            data.title;


        infoDescription.textContent =
            data.description;


        whatItDoes.textContent =
            data.what;


        installationInfo.textContent =
            data.installation;


        difficultyLevel.innerHTML =
            `<i class="fa-solid fa-circle"></i>
             ${data.difficulty}`;


    }


    /*==================================================
        DRAG START
    ==================================================*/


    componentCards.forEach(function (card) {


        card.addEventListener("dragstart", function (event) {


            const componentName =
                card.dataset.component;


            event.dataTransfer.setData(
                "text/plain",
                componentName
            );


            card.classList.add("dragging");


            showComponentInfo(componentName);


        });


        card.addEventListener("dragend", function () {


            card.classList.remove("dragging");


        });


    });


    /*==================================================
        DRAG OVER
    ==================================================*/


    motherboardSlots.forEach(function (slot) {


        slot.addEventListener("dragover", function (event) {


            event.preventDefault();


            slot.classList.add("drag-over");


        });


        slot.addEventListener("dragleave", function () {


            slot.classList.remove("drag-over");


        });


        slot.addEventListener("drop", function (event) {


            event.preventDefault();


            slot.classList.remove("drag-over");


            const componentName =
                event.dataTransfer.getData("text/plain");


            const correctSlot =
                slot.dataset.slot;


            if (componentName === correctSlot) {


                installComponent(
                    componentName,
                    slot
                );


            } else {


                showWrongDrop(slot);


            }


        });


    });


    /*==================================================
        INSTALL COMPONENT
    ==================================================*/


    function installComponent(
        componentName,
        slot
    ) {


        if (
            installedComponents.includes(componentName)
        ) {

            return;

        }


        installedComponents.push(
            componentName
        );


        slot.classList.add("completed");


        slot.innerHTML = `

            <i class="fa-solid
            ${componentData[componentName].icon}">
            </i>

            <span>
                ${componentData[componentName].title}
            </span>

            <small>
                INSTALLED
            </small>

        `;


        updateProgress();


    }


    /*==================================================
        WRONG DROP
    ==================================================*/


    function showWrongDrop(slot) {


        slot.classList.add("wrong-drop");


        setTimeout(function () {


            slot.classList.remove("wrong-drop");


        }, 600);


    }


    /*==================================================
        UPDATE PROGRESS
    ==================================================*/


    function updateProgress() {


        const totalComponents =
            6;


        const installed =
            installedComponents.length;


        const percentage =
            (installed / totalComponents) * 100;


        progressCount.textContent =
            `${installed} / ${totalComponents}`;


        installedCount.textContent =
            installed;


        progressFill.style.width =
            `${percentage}%`;


        installedComponents.forEach(function (componentName) {


            const progressStep =
                document.querySelector(
                    `[data-progress="${componentName}"]`
                );


            if (progressStep) {


                progressStep.classList.add(
                    "completed"
                );


            }


        });


    }


    /*==================================================
        RESET BUILD
    ==================================================*/


    resetButton.addEventListener("click", function () {


        installedComponents = [];


        progressCount.textContent =
            "0 / 6";


        installedCount.textContent =
            "0";


        progressFill.style.width =
            "0%";


        progressSteps.forEach(function (step) {


            step.classList.remove(
                "completed"
            );


        });


        location.reload();


    });


    /*==================================================
        CHECK BUILD
    ==================================================*/


    checkButton.addEventListener("click", function () {


        if (
            installedComponents.length === 6
        ) {


            alert(
                "BUILD COMPLETE! Your virtual PC has been successfully assembled."
            );


        } else {


            const remaining =
                6 - installedComponents.length;


            alert(
                `Your PC is not complete yet. ${remaining} component(s) still need to be installed.`
            );


        }


    });


    /*==================================================
        DIFFICULTY BUTTONS
    ==================================================*/


    difficultyButtons.forEach(function (button) {


        button.addEventListener("click", function () {


            difficultyButtons.forEach(function (item) {


                item.classList.remove(
                    "active"
                );


            });


            button.classList.add(
                "active"
            );


        });


    });


});
