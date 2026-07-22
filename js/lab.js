const componentItems =
    document.querySelectorAll(".component-item");

const progressSteps =
    document.querySelectorAll(".progress-step");

const progressFill =
    document.querySelector(".progress-fill");

const progressCount =
    document.querySelector(".progress-count");


// Installed components

let installedComponents = [];


// Component information

const componentData = {

    cpu: {

        title: "CPU",

        icon: "fa-microchip",

        description:
            "The CPU is the brain of your computer. It processes instructions and performs calculations.",

        what:
            "The processor executes instructions and controls the operations of your computer.",

        installation:
            "Place the CPU carefully into the motherboard socket.",

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
            "Align the RAM with the motherboard slot and press down until it clicks.",

        difficulty: "Beginner"

    },


    gpu: {

        title: "GPU",

        icon: "fa-display",

        description:
            "The GPU processes images, videos, and graphics displayed on your screen.",

        what:
            "It renders visual information and helps run games and graphics applications.",

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
            "It provides fast storage for your computer and allows your system to load files.",

        installation:
            "Connect the SSD to the correct storage interface.",

        difficulty: "Beginner"

    },


    psu: {

        title: "PSU",

        icon: "fa-bolt",

        description:
            "The power supply provides electricity to all the components in your computer.",

        what:
            "It converts electricity into the correct power needed by your PC components.",

        installation:
            "Connect the necessary power cables to the motherboard and components.",

        difficulty: "Intermediate"

    },


    cooling: {

        title: "COOLING",

        icon: "fa-fan",

        description:
            "The cooling system keeps your computer components at safe temperatures.",

        what:
            "It removes heat from components such as the CPU and prevents overheating.",

        installation:
            "Attach the cooler correctly and ensure proper contact with the CPU.",

        difficulty: "Intermediate"

    }

};


componentItems.forEach(function(item) {


    item.addEventListener("click", function() {


        const componentName =
            item.dataset.component;


        const data =
            componentData[componentName];


        // Update icon

        const infoIcon =
            document.querySelector(".info-icon i");

        infoIcon.className =
            `fa-solid ${data.icon}`;


        // Update title

        document.querySelector(".info-panel h2")
            .textContent = data.title;


        // Update description

        document.querySelector(".info-description")
            .textContent = data.description;


        // Update information blocks

        const infoBlocks =
            document.querySelectorAll(".info-block p");


        infoBlocks[0].textContent =
            data.what;


        infoBlocks[1].textContent =
            data.installation;


        // Update difficulty

        document.querySelector(".difficulty-info strong")
            .innerHTML =

            `<i class="fa-solid fa-circle"></i>
             ${data.difficulty}`;


        // Install component

        installComponent(componentName);


    });

});


function installComponent(componentName) {


    // Prevent duplicate installation

    if (

        installedComponents.includes(componentName)

    ) {

        return;

    }


    // Add component

    installedComponents.push(componentName);


    // Find progress step

    const progressStep =

        document.querySelector(

            `[data-progress="${componentName}"]`

        );


    // Mark progress step

    progressStep.classList.add("completed");


    // Update progress count

    const totalComponents = 6;


    const installedCount =
        installedComponents.length;


    progressCount.textContent =

        `${installedCount} / ${totalComponents}`;


    // Update progress bar

    const progressPercentage =

        (installedCount / totalComponents) * 100;


    progressFill.style.width =

        `${progressPercentage}%`;


}