// Define global variables
let char = 0; // Current character index for animation
let timer; // Timer for controlling the animation interval
let typingTimeout; // Global variable for the typing timeout

// Function for creating elements
const gt = (tag, children, attributes, dataAttributes) => {
    const element = document.createElement(tag);

    // Set regular attributes using existing logic
    for (const key in attributes) {
        element[key] = attributes[key];
    }

    // Set custom data attributes using the provided object
    if (dataAttributes) {
        for (const key in dataAttributes) {
            element.setAttribute(key, dataAttributes[key]);;
        }
    }

    // Handle children
    if (children) {
        if (typeof children === "string") element.innerText = children;
        else if (Array.isArray(children)) {
            for (let i = 0; i < children.length; i++) element.appendChild(children[i]);
        } else element.appendChild(children);
    }

    return element;
};


// Set initial language default ("en")
lang = localStorage.getItem('lang') || 'en';

// Declare main IDs outside the function to make them accessible globally
const divHeader = document.getElementById("header-hero");
const container = document.getElementById("container-image");
const containerEPFL = document.getElementById("container-EPFL");
const containerFooter = document.getElementById("footer");

const translations = {
    'en': {
      'title': 'Pi Web - Custom-made AI models & website',
      'h1': 'Custom-made AI models & website',
      'h2': 'I have recently been certified from the EPFL Extension School',
      'text-1': 'Custom-made AI models',
      'text-2': "Optical Character Recognition",
      'text-3': 'AI Model to classify surgical instruments',
      'text-4': 'AI Model to classify fossils',
      'text-5': 'Custom-made website example',
      'footerText': 'My portfolio website, PiWeb, showcases various projects, including custom-made websites and AI models. All my projects are open source.',
    },
    'fr': {
      'title': 'Pi Web - Site web et application web sur mesure',
      'h1': "Modèles d'IA et site web sur mesure",
      'h2': "J'ai récemment été certifiée par l'EPFL Extension School",
      'text-1': "Modèles d'IA sur mesure",
      'text-2': "Reconnaissance optique de caractères",
      'text-3': 'Modèle pour classer les instruments chirurgicaux',
      'text-4': 'Modèle pour classer les fossiles',
      'text-5': 'Exemple de site web sur mesure',
      'footerText': "Mon site web, PiWeb, présente divers projets, notamment des sites web sur mesure et des modèles d'IA. Tous mes projets sont open source.",
    }
};

/* Create header */
function createHeader() {
    // Create header logo and button to change lang
    const translateEnButton = gt("input", null, {type: "button", id: "translateToEn", value: "En", className: "translate-button"});
    const translateFrButton = gt("input", null, {type: "button", id: "translateToFr", value: "Fr", className: "translate-button"});
    const logoText = gt("p", "PiWeb", {className: "logo-margin text-logo"});
    const logoImg = gt("img", null, {className: "img-logo", src: "piweb_logo/logo-2.webp", alt: "pi web logo"});
    const headerDiv = gt("div", [logoImg, logoText, translateFrButton, translateEnButton], {className: "container-fr-en padding-right"});
    
    // Create Neural Network html
    const toggleAnimationDiv = gt("div", null, {id: "toggleAnimation"});
    const neuralNetworkCanvas = gt("canvas", null, {id: "neural-network", className: "neural-network"});
    const aiBoxText = gt("pre", null, {id: "codeSimulation", className: "ai-box-text"});
    const aiBox = gt("div", aiBoxText, {id: "ai-box", className: "ai-box"});
    const heroTitle = gt("h1", null, null, {"data-translate-text": "h1"});
    const heroDiv = gt("div", [heroTitle, aiBox, neuralNetworkCanvas, toggleAnimationDiv], {className: "hero-container grad3"});

    // Append children to heroDiv
    divHeader.appendChild(headerDiv);
    divHeader.appendChild(heroDiv); 
}

createHeader();

/* typing simulation */
const aiBox = document.getElementById('ai-box');
const styleAiBox = document.querySelector(".ai-box");
const codeBox = document.getElementById('codeSimulation');
const cursor = document.createElement('span');
cursor.textContent = '|';
cursor.className = 'cursor'; // Add a class for styling
codeBox.appendChild(cursor); // Append the cursor to the code box

const codeLines = {
    "en": "Visual representation of an AI in slow motion.",
    "fr": "Visuelle représentation d'une IA au ralenti.",
};


let currentChar = 0; // Index of the current character to be typed


// Function to simulate typing effect for code lines in a specific language.
function typeText(language) {
    // Change max width corresponding to language
    if (language === "en") {
        styleAiBox.style.width = "22rem";
    } else {
        styleAiBox.style.width = "20.5rem";
    }

    // Check if there are more characters to type
    if (currentChar < codeLines[language].length) {
        // Create a text node for the current character
        const textNode = document.createTextNode(codeLines[language][currentChar]);

        // Insert the character before the cursor if it exists, otherwise append it
        if (codeBox.contains(cursor)) {
            codeBox.insertBefore(textNode, cursor);
        } else {
            codeBox.appendChild(textNode);
        }

        // Move to the next character and set a timeout for the next typing action
        currentChar++;
        typingTimeout = setTimeout(() => typeText(language), 140); // Set the global timeout variable
    } else {
        // Once all characters are typed
        if (codeBox.contains(cursor)) {
            // Remove the cursor from the code box
            codeBox.removeChild(cursor);
        
        }
    }
  
}

/* The following code displays a delayed neural network using HTML5 Canvas AP. 
/* Note: The code below was made possible with assistance from Google, Gimini, and OpenAI's GPT-4 chat. */
/* 
The code sets up a neural network visualization on an HTML5 canvas. It defines the structure of the network, draws neurons and synapses,
and animates different paths through the network by highlighting them at intervals. 
*/
// To achieve this, the model's setup and drawing logic are encapsulated in a function, which is then executed after a delay using setTimeout. */
// Access the canvas element and its 2D drawing context
// Get the canvas element and its 2D drawing context
const neroCanvas = document.getElementById('neural-network'); 
const ctx = neroCanvas.getContext('2d');

// Set the dimensions of the canvas
neroCanvas.width = 600;
neroCanvas.height = 550;

// Define the structure of the neural network
const layers = [3, 4, 4, 2]; // Number of neurons in each layer
const neuronRadius = 20; // Radius of each neuron
const layerDistance = 140; // Distance between layers
const defaultNeuronColor = 'rgb(209, 96, 30)'; // Default color for neurons
const defaultSynapseColor = 'rgba(128, 128, 128, 0.5)'; // Default color for synapses
const btnDelay = 1000; // Delay in milliseconds for button creation

function creatAnimeModel() {
    function setupAndAnimateNetwork() {
        // Function to draw a single neuron
        function drawNeuron(x, y, color = defaultNeuronColor) {
            ctx.beginPath(); // Begin a new path
            ctx.arc(x, y, neuronRadius, 0, Math.PI * 2); // Draw a circle for the neuron
            ctx.fillStyle = color; // Set the fill color
            ctx.fill(); // Fill the neuron with color
            ctx.stroke(); // Draw the outline of the neuron
        }

        // Function to draw a synapse (line) between two neurons
        function drawSynapse(x1, y1, x2, y2, color = defaultSynapseColor) {
            ctx.beginPath(); // Begin a new path
            ctx.moveTo(x1, y1); // Move to the starting point of the synapse
            ctx.lineTo(x2, y2); // Draw a line to the ending point of the synapse
            ctx.strokeStyle = color; // Set the stroke color
            ctx.stroke(); // Draw the synapse
        }

        // Function to draw the entire neural network
        function drawNeuralNetwork(path = [], color = defaultNeuronColor) {
            for (let i = 0; i < layers.length; i++) { // Loop through each layer
                let layerY = neroCanvas.height / (layers[i] + 1); // Calculate vertical position for neurons

                for (let j = 0; j < layers[i]; j++) { // Loop through each neuron in the layer
                    let x = i * layerDistance + 100; // Calculate horizontal position
                    let y = (j + 1) * layerY; // Calculate vertical position
                    let neuronColor = defaultNeuronColor; // Default color for neurons

                    // Check if the current neuron is part of the path to highlight
                    if (i < path.length && j === path[i]) {
                        neuronColor = color; // Change color for neurons in the path
                    }

                    // Draw synapses from each neuron to the next layer
                    if (i < layers.length - 1) {
                        let nextLayerY = neroCanvas.height / (layers[i + 1] + 1);
                        for (let k = 0; k < layers[i + 1]; k++) {
                            let nextX = (i + 1) * layerDistance + 100;
                            let nextY = (k + 1) * nextLayerY;
                            let synapseColor = (i < path.length && j === path[i] && k === path[i + 1]) ? color : defaultSynapseColor;
                            drawSynapse(x, y, nextX, nextY, synapseColor); // Draw the synapse
                        }
                    }

                    drawNeuron(x, y, neuronColor); // Draw the neuron
                }
            }
        }

        // Arrays to store paths and their corresponding colors
        const paths = [];
        const pathColors = [];

        // Generate 40 random paths and their corresponding colors
        for (let i = 0; i < 40; i++) {
            const path = []; // Array to store one path
            const color = 'white'; // Set color to white

            // Generate a random path through all layers
            for (let l = 0; l < layers.length; l++) {
                path.push(Math.floor(Math.random() * layers[l]));
            }

            paths.push(path); // Add the path to paths array
            pathColors.push(color); // Add the color to pathColors array
        }

        // Global variables for animation control
        let isAnimating = true; // Flag to control animation state
        let animationInterval; // Interval variable for animation

        // Function to animate the neural network by highlighting different paths
        function animatePaths() {
            let index = 0; // Initialize index for paths array

            // Function to update animation frame
            function updateAnimation() {
                ctx.clearRect(0, 0, neroCanvas.width, neroCanvas.height); // Clear canvas
                drawNeuralNetwork(paths[index], pathColors[index]); // Draw neural network with current path
                index = (index + 1) % paths.length; // Increment index and wrap around paths array
            }
        
            // Start or stop animation based on state
            if (isAnimating && !animationInterval) {
                animationInterval = setInterval(updateAnimation, 1000); // Start animation interval
            } else if (!isAnimating && animationInterval) {
                clearInterval(animationInterval); // Stop animation interval
                animationInterval = null; // Reset animation interval variable
            }
        }

        animatePaths(); // Initial call to start animation

        // Function to create and set up the play/pause button
        function createButton() {
            const toggleAnimationDiv = document.getElementById('toggleAnimation'); // Get button container element

            // Create an img element for the play/pause button
            const buttonImage = document.createElement('img');
            buttonImage.src = 'icons/pause.png'; // Set initial source for the pause icon
            buttonImage.alt = 'pause'; // Set initial alt text
            buttonImage.classList.add('play-pause-btn'); // Add CSS class for styling

            // Append the button image to the button container
            toggleAnimationDiv.appendChild(buttonImage);

            // Add click event listener to toggle animation state
            toggleAnimationDiv.addEventListener('click', () => {
                isAnimating = !isAnimating; // Toggle animation state
                animatePaths(); // Restart animation with updated state

                // Update button image and alt text based on animation state
                if (isAnimating) {
                    buttonImage.src = 'icons/pause.png'; // Change to pause icon
                    buttonImage.alt = 'Pause'; // Update alt text
                } else {
                    buttonImage.src = 'icons/play.png'; // Change to play icon
                    buttonImage.alt = 'Play'; // Update alt text
                }
            });
        }

        // Delay creation of play/pause button
        setTimeout(createButton, btnDelay);
    }

    setupAndAnimateNetwork(); // Call function to set up and animate neural network
}

creatAnimeModel(); // Call function to create animated neural network model

/* Image containers  */
// Define an array of objects, each representing the content for a container
const containers = [
    {
        title: "text-1",
        imgSrc: "image/AI-model.webp",
        altText: "custom code"
    },
    {
        title: "text-2",
        imgSrc: "web-OCR/static/image/DALL·E-logo.webp",
        altText: "Optical Character Recognition",
        link: "web-OCR/index.html"
    },
    {
        title: "text-3",
        imgSrc: "image/surgical-instruments.webp",
        altText: "AI Model to classify surgical instruments",
        link: "recognise-surgical-instruments/index.html"
    },
    {
        title: "text-4",
        imgSrc: "image/AI fossil.webp",
        altText: "AI Model to classify fossils",
        link: "fossil-classifier/index.html"
    },
    {
        title: "text-5",
        imgSrc: "image/Pi web site 1.webp",
        altText: "Pi web site affutage",
        link: "PiWebaffutage/index.html"
    }
];

function createContainerElements(item, lang) {
    // Create a container div
    const divContainer = document.createElement("div");
    divContainer.classList.add("container", "padding");

    // Create an h2 element
    const h2 = document.createElement("h2");

    // Create an image element
    const img = document.createElement("img");
    img.src = item.imgSrc;
    img.alt = item.altText;

    // Change style depending on the item displayed 
    if (item.title === "text-1") {
        h2.classList.add("title-big", "center-text-container")
        img.classList.add("style-img",);
    }
    else{
        h2.classList.add("title-litle");
        img.classList.add("style-img", "anim-img");
    }
   
    h2.textContent = translations[lang][item.title];
    
    // If there's a link, create an anchor element
    if (item.link) {
        const link = document.createElement("a");
        link.classList.add("min-button", "no-underline-link");
        link.href = item.link;
        link.textContent = "Check it!";
        
        // Append the link to the h2 element
        h2.appendChild(link);

        // Add an event listener to the image to navigate to the link when clicked
        img.addEventListener("click", () => {
            window.location.href = item.link;
        });

   
    }

    // Append the h2 and image elements to the container div
    divContainer.appendChild(h2);
    divContainer.appendChild(img);

    return divContainer;
}

// EPFL container
const EPFLcontainers = [
    {
        title: "I have recently been certified from the EPFL Extension School",
        text: "EPFL ",
        link: "https://www.epfl.ch/education/continuing-education/applied-data-science-machine-learning/",
        textLink: "Certificate of Open Studies (COS)",
        imgSrc: "image/ai.webp",
        altText: "AI image",
    }
]

function createEPLFContainerElements(item, lang) {
    // Create a container div
    const divContainer = document.createElement("div");
    divContainer.classList.add("container", "padding", "small-scren-padding-top", "grad3");

    // Create an h2 element
    const h2 = document.createElement("h2");
    h2.classList.add("no-container", "title-litle", "hover-link", "white");
    h2.textContent = translations[lang]["h2"];

    // Create an p element
    const p = document.createElement("p");
    p.classList.add("text-red", "title-litle");
    p.textContent = item.text;
    

    // If there's a link, create an anchor element
    const link = document.createElement("a");
    link.classList.add("text-link", "white");
    link.href = item.link;
    link.textContent = item.textLink;
    

    // Create an image element
    const img = document.createElement("img");
    img.classList.add("style-img", "anim-img");
    img.src = item.imgSrc;
    img.alt = item.altText;

    // Add an event listener to the image to navigate to the link when clicked
    img.addEventListener("click", () => {
        window.location.href = item.link;
    });
    
    const divpadding = document.createElement("div");
    divpadding.className = "img-padding-bottom";

    // Append elements to the container div
    p.appendChild(link)
    h2.appendChild(p);
    divContainer.appendChild(h2);
    divContainer.appendChild(img);
    divContainer.appendChild(divpadding);


    return divContainer;
}


/* Footer */
function crateFooter(lang) {
    // Create the main footer container
    const containerFooter = gt("div", null, {className: "footer-content"});

    // Section 1: Logo and Text
    const footerLogo = gt("img", null, {src: 'piweb_logo/logo-2.webp', alt: 'footer logo', className: 'footer-logo'});
    const h2 = gt("h2", "PiWeb", {});
    const div = gt("div", [footerLogo, h2], {className: "footer-image-section"});
    const paraOne = gt("p", translations[lang]["footerText"], {className: "footer-text"});
    const footerSectionOne = gt("div", [div, paraOne], {className: "footer-section"});

    // Section 2: Social Links
    // Mail
    const mailLogo = gt("img", null, {src: 'icons/email.png', alt: 'Icon', className: 'icon'});
    const myMail = gt("a", "pi.web@piweb.ch", {href: "mailto:pi.web@piweb.ch", className: "social-links"});
    const mailContainer = gt("div", [mailLogo, myMail], {className: "link-container footer-padding-top"});

    // GitHub
    const gitHubLogo = gt("img", null, {src: 'icons/github.png', alt: 'Icon', className: 'icon'});
    const gitHubLink = gt("a", "github.com/PiWebswiss", {href: "https://github.com/PiWebswiss", className: "social-links"});
    const gitHubContainer = gt("div", [gitHubLogo, gitHubLink], {className: "link-container" });

    // LinkedIn
    const linkedinLogo = gt("img", null, {src: 'icons/linkedin.png', alt: 'Icon', className: 'icon'});
    const linkedinLink = gt("a", "linkedin.com/in/pilink", {href: "https://linkedin.com/in/pilink", className: "social-links"});
    const linkedinContainer = gt("div", [linkedinLogo, linkedinLink], {className: "link-container"});

    const footerSectionTwo = gt("div", [mailContainer, gitHubContainer, linkedinContainer], {className: "footer-section social-links"});

    // Append sections to the footer container
    containerFooter.appendChild(footerSectionOne);
    containerFooter.appendChild(footerSectionTwo);

    return containerFooter;
}


// Function to translate page content based on selected language
function translatePage(lang) {
    document.querySelectorAll("[data-translate-text]").forEach(el => {
        // Fetch the translation key from the element's data attribute
        const translationKey = el.dataset.translateText;
        const translatedText = translations[lang][translationKey];
        el.textContent = translatedText; // Update element text with translation
    });
    
    /* Change HTML lang */
    document.documentElement.lang = lang;
    
    // Clear any ongoing typing simulation
    if (typingTimeout) {
        clearTimeout(typingTimeout);
        typingTimeout = null;
    }
    // Update the typing simulation
    currentChar = 0;
    codeBox.innerHTML = ''; // Clear existing text
    codeBox.appendChild(cursor); // Re-append the cursor
    // Start function typeCode with a delay 
    setTimeout(() => typeText(lang), 1000);// Delay in milliseconds



    // Inside the loop
    container.innerHTML = ''; // Clear the existing content of the main container

    containers.forEach(item => {
        const divContainer = createContainerElements(item, lang);
        container.appendChild(divContainer); // Append the new elements to the main container
    });

    // Inside the loop
    containerEPFL.innerHTML = ''; // Clear the existing content of the main container

    EPFLcontainers.forEach(item => {
        const container = createEPLFContainerElements(item, lang);
        containerEPFL.appendChild(container); // Append the new elements to the main container
    });

   /* Create footer */
   containerFooter.innerHTML = ''; // Clear the existing content of the main container
   containerFooter.appendChild(crateFooter(lang))
}


// Event listeners for language change
document.getElementById('translateToFr').addEventListener('click', function() {
    localStorage.setItem('lang', 'fr');
    translatePage('fr');
});

document.getElementById('translateToEn').addEventListener('click', function() {
    localStorage.setItem('lang', 'en');
    translatePage('en');
});



translatePage(lang);


/* copyright */
const d = new Date();
const copyright = document.getElementById("footer-copyright");
const a = gt("a", "PiWeb.ch", { href: "#", className: "a-decoration hover-link"});
const span = gt("span", "© " + d.getFullYear() + " Copyright : ", {className: "no-transition"});
const p = gt("p", [span, a])
copyright.appendChild(p);