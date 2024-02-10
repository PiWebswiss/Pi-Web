// Define global variables
let char = 0; // Current character index for animation
let splitText = []; // Array to store individual characters of the text
let timer; // Timer for controlling the animation interval

const container = document.getElementById("container-image");
const containerEPFL = document.getElementById("container-EPFL");
const containerFooter = document.getElementById("footer");

const translations = {
    'en': {
      'title': 'Pi Web - Custom-made AI models & website',
      'h1': 'Custom-made AI models & website',
      'h2': 'I have recently been certified from the EPFL Extension School',
      'text-1': 'Custom-made AI models',
      'text-2': 'New AI Model to classify surgical instruments',
      'text-3': 'AI Model to classify fossils',
      'text-4': 'Custom-made website example',
      'footerText': 'My portfolio website, PIWeb, showcases various projects, including custom-made websites and AI models. All my projects are open source.',
    },
    'fr': {
      'title': 'Pi Web - Site web et application web sur mesure',
      'h1': "Modèles d'IA et site web sur mesure",
      'h2': "J'ai récemment été certifiée par l'EPFL Extension School",
      'text-1': "Modèles d'IA sur mesure",
      'text-2': 'Modèle pour classer les instruments chirurgicaux',
      'text-3': 'Modèle pour classer les fossiles',
      'text-4': 'Exemple de site web sur mesure',
      'footerText': "Mon site web, PIWeb, présente divers projets, notamment des sites web sur mesure et des modèles d'IA. Tous mes projets sont open source.",
    }
};

// Define an array of objects, each representing the content for a container
const containers = [
    {
        title: "text-1",
        imgSrc: "image/AI-model.webp",
        altText: "custom code"
    },
    {
        title: "text-2",
        imgSrc: "image/surgical-instruments.webp",
        altText: "AI Model to classify surgical instruments",
        link: "recognise surgical instruments/index.html"
    },
    {
        title: "text-3",
        imgSrc: "image/AI fossil.webp",
        altText: "AI Model to classify fossils",
        link: "fossil-classifier/index.html"
    },
    {
        title: "text-4",
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
    if (item.title === "text-1") {
        h2.classList.add("title-big", "center-text-container")
    }
    else{
        h2.classList.add("title-big");
    }
   
    h2.textContent = translations[lang][item.title];

    // Create an image element
    const img = document.createElement("img");
    img.classList.add("style-img", "anim-img");
    img.src = item.imgSrc;
    img.alt = item.altText;

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

function  createEPLFContainerElements(item, lang) {
    // Create a container div
    const divContainer = document.createElement("div");
    divContainer.classList.add("container", "padding", "padding-top", "grad3");

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


// Function for creating elements, already defined in your codebase
const gt = (tag, children, attributes) => {
    const element = document.createElement(tag);
    for (const key in attributes) {
        element[key] = attributes[key];
    }
    if (children) {
        if (typeof children === "string") element.innerText = children;
        else if (Array.isArray(children)){
            for (let i = 0; i < children.length; i++) element.appendChild(children[i]);
        }else element.appendChild(children);
    }
    return element;
  };
  



// Function to initialize text animation
function initializeTextAnimation(textContent) {
    const textElement = document.getElementById("textAnimation");
    if (textElement) {
        // Clear the existing content of the text element
        textElement.innerHTML = "";

        // Split the provided text into individual characters
        splitText = textContent.split("");
        splitText.forEach(char => {
            // Create a span for each character
            const span = document.createElement('span');
            span.textContent = char;
            span.className = 'title-span'; // Assign a class for styling
            textElement.appendChild(span); // Append the span to the text element
        });

        // Reset the animation parameters
        char = 0; // Reset character index
        clearInterval(timer); // Clear any existing animation timer
        timer = setInterval(onTick, 120); // Start the animation interval
    }
}

// Function called at each interval tick to animate text
function onTick() {
    const textElement = document.getElementById("textAnimation");
    if (char < splitText.length) {
        // Select the span corresponding to the current character
        const span = textElement.querySelectorAll('span')[char];
        span.classList.add('fade'); // Apply the fade effect
        char++; // Move to the next character
    } else {
        complete(); // If all characters processed, call complete function
    }
}

// Function to execute when the animation is complete
function complete() {
    clearInterval(timer); // Stop the animation interval
    timer = null; // Clear the timer variable
    char = 0; // Reset the character index for possible re-animation
}


/* Footer */
function crateFooter(lang) {
    // Create the main footer container
    const containerFooter = gt("div", null, { className: "footer-content" });

    // Section 1: Logo and Text
    const footerLogo = gt("img", null, { src: 'image/logo 2.webp', alt: 'footer logo', className: 'footer-logo' });
    const h2 = gt("h2", "PiWeb", {});
    const div = gt("div", [footerLogo, h2], { className: "footer-image-section" });
    const paraOne = gt("p", translations[lang]["footerText"], { className: "footer-text" });
    const footerSectionOne = gt("div", [div, paraOne], { className: "footer-section" });

    // Section 2: Social Links
    // Mail
    const mailLogo = gt("img", null, { src: 'icons/email.png', alt: 'Icon', className: 'icon' });
    const myMail = gt("a", "pi.web@piweb.ch", { href: "mailto:pi.web@piweb.ch", className: "social-links" });
    const mailContainer = gt("div", [mailLogo, myMail], { className: "link-container footer-padding-top" });

    // GitHub
    const gitHubLogo = gt("img", null, { src: 'icons/github.png', alt: 'Icon', className: 'icon' });
    const gitHubLink = gt("a", "github.com/PiWebswiss", { href: "https://github.com/PiWebswiss", className: "social-links" });
    const gitHubContainer = gt("div", [gitHubLogo, gitHubLink], { className: "link-container" });

    // LinkedIn
    const linkedinLogo = gt("img", null, { src: 'icons/linkedin.png', alt: 'Icon', className: 'icon' });
    const linkedinLink = gt("a", "linkedin.com/in/pilink", { href: "https://linkedin.com/in/pilink", className: "social-links" });
    const linkedinContainer = gt("div", [linkedinLogo, linkedinLink], { className: "link-container" });

    const footerSectionTwo = gt("div", [mailContainer, gitHubContainer, linkedinContainer], { className: "footer-section social-links" });

    // Append sections to the footer container
    containerFooter.appendChild(footerSectionOne);
    containerFooter.appendChild(footerSectionTwo);

    return containerFooter;
}




// Function to translate page content based on selected language
function translatePage(lang) {
    document.querySelectorAll("[data-translate]").forEach(el => {
        // Fetch the translation key from the element's data attribute
        const translationKey = el.dataset.translate;
        const translatedText = translations[lang][translationKey];
        el.textContent = translatedText; // Update element text with translation
    });
    

    // Reinitialize the text animation with the translated text
    const newText = document.getElementById("textAnimation").textContent;
    initializeTextAnimation(newText); // Restart the animation with new text

    /* Change HTML lang */
    document.documentElement.lang = lang;

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


// Set initial language default ("en")
lang = localStorage.getItem('lang') || 'en';


translatePage(lang);

// Initial text animation setup
initializeTextAnimation(document.getElementById("textAnimation").textContent);


/* The following code is from ChatGPT-4 demonstrates a delayed setup and display of a neural network. 
To achieve this, the model's setup and drawing logic are encapsulated in a function, which is then executed after a delay using setTimeout. */
 // Access the canvas element and its 2D drawing context
const neroCanvas = document.getElementById('neural-network'); 
const ctx = neroCanvas.getContext('2d');

// Set the dimensions of the canvas
neroCanvas.width = 600;
neroCanvas.height = 550;

// Define the structure of the neural network
const layers = [3, 4, 4, 2]; // Number of neurons in each layer
const neuronRadius = 20;
const layerDistance = 140;

function creatAnimeModel() {
    function setupAndAnimateNetwork() {
        // Function to draw a single neuron
        function drawNeuron(x, y, color = 'blue') {
            ctx.beginPath(); // Begin a new path
            ctx.arc(x, y, neuronRadius, 0, Math.PI * 2); // Draw a circle for the neuron
            ctx.fillStyle = color; // Set the color for the neuron
            ctx.fill(); // Fill the neuron with color
            ctx.stroke(); // Draw the outline of the neuron
        }

        // Function to draw a synapse (line) between two neurons
        function drawSynapse(x1, y1, x2, y2, color = 'rgba(128, 128, 128, 0.5)') {
            ctx.beginPath(); // Begin a new path
            ctx.moveTo(x1, y1); // Start point of the synapse
            ctx.lineTo(x2, y2); // End point of the synapse
            ctx.strokeStyle = color; // Set the color of the synapse
            ctx.stroke(); // Draw the synapse
        }

        // Function to draw the entire neural network
        function drawNeuralNetwork(path = [], color = 'rgb(209, 96, 30)') {
            // Default color for synapses not in the path
            const defaultSynapseColor = 'rgba(128, 128, 128, 0.5)'; 

            for (let i = 0; i < layers.length; i++) { // Loop through each layer
                let layerY = neroCanvas.height / (layers[i] + 1); // Calculate vertical position

                for (let j = 0; j < layers[i]; j++) { // Loop through each neuron in the layer
                    let x = i * layerDistance + 100; // Calculate horizontal position
                    let y = (j + 1) * layerY; // Calculate vertical position
                    let neuronColor = 'rgb(209, 96, 30)'; // Default color for neurons

                    // Check if the current neuron is part of the path
                    if (i < path.length && j === path[i]) {
                        neuronColor = color; // Change color for neurons in the path
                    }

                    // Draw synapses from each neuron
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

        // Arrays to store the paths and their colors
        const paths = [];
        const pathColors = [];

        // Generate 20 random paths and their corresponding colors
        for (let i = 0; i < 20; i++) {
            const path = []; // Array to store one path
            const color = 'white'; // Set color to white

            // Generate a random path through all layers
            for (let l = 0; l < layers.length; l++) {
                path.push(Math.floor(Math.random() * layers[l]));
            }

            paths.push(path); // Add the path to the paths array
            pathColors.push(color); // Add the color to the pathColors array
        }

        // Function to animate the neural network by highlighting different paths
        function animatePaths() {
            let index = 0;
            let interval = setInterval(() => {
                ctx.clearRect(0, 0, neroCanvas.width, neroCanvas.height); // Clear the canvas for redrawing
                drawNeuralNetwork(paths[index], pathColors[index]); // Draw the network with the current path highlighted
                index = (index + 1) % paths.length; // Increment the index to animate the next path
            }, 1000); // Change path every 1000 milliseconds (1 second)
        }

        return animatePaths();
    }
    // Delay the setup and animation of the network
    setTimeout(setupAndAnimateNetwork, 1000); // 200000 milliseconds delay
}

  
/* Code Simulation animation */
const aiBox = document.getElementById('ai-box');
const codeBox = document.getElementById('codeSimulation');
const cursor = document.createElement('span');
cursor.textContent = '|';
cursor.className = 'cursor'; // Add a class for styling
codeBox.appendChild(cursor); // Append the cursor to the code box

const codeLines = [
    "Dense(3, activation='relu')\n",
    "Dense(4, activation='relu')\n",
    "Dense(4, activation='relu')\n",
    "Dense(2, activation='sigmoid')\n",
    "Train Model", 
];

let currentLine = 0;
let currentChar = 0;

function typeCode() {
    if (currentLine < codeLines.length) {
        if (currentChar < codeLines[currentLine].length) {
            const textNode = document.createTextNode(codeLines[currentLine][currentChar]);
            codeBox.insertBefore(textNode, cursor); // Insert new character before the cursor
            currentChar++;
            setTimeout(typeCode, 140); // Speed of typing
        } else {
            if (currentLine === codeLines.length - 1) {
                // Handle the Enter key press simulation after 'Train'
                simulateEnterKeyPress();
            } else {
                codeBox.insertBefore(document.createTextNode("\n"), cursor); // Insert new line
                currentLine++;
                currentChar = 0;
                setTimeout(typeCode, 200); // Delay before starting new line
            }
        }
    }
}

// Function to toggle class based on screen size
function toggleClassOnScreenSize() {
    const smallScreenSize = 600; // Define the breakpoint for small screen size

    if (window.innerWidth <= smallScreenSize) {
        // If the screen is small
        aiBox.className = 'display-small-screen';
        codeBox.className = 'display-small-screen';
        /* neroCanvas.classList.add('neg-margin-top'); */
    } else {
        // If the screen is not small
        aiBox.className = 'ai-box';
        codeBox.className = 'ai-box-text';
       /*  neroCanvas.classList.remove('neg-margin-top'); */
    }
}
function simulateEnterKeyPress() {
    const enterKey = document.createElement('span');
    enterKey.textContent = '↵ Enter';
    enterKey.className = 'enter-key';
    codeBox.insertBefore(enterKey, cursor);
    // Remove the cursor after the animation
    codeBox.removeChild(cursor);
    // Simulate the press
    setTimeout(() => {
        enterKey.classList.add('pressed');
    }, 800); // Delay to start the press effect

    // Simulate the release
    setTimeout(() => {
        enterKey.classList.remove('pressed');
        // remove typed code only on small screen
        toggleClassOnScreenSize();
    }, 1500); // Delay to end the press effect

    // Call creatAnimeModel to initiate the process
    creatAnimeModel(); 
}

// Start typing with a delay
const startDelay = 6000; // Delay in milliseconds
setTimeout(typeCode, startDelay);


// Debounce function to limit how often the resize event can fire
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}
// Add resize event listener with debounce
window.addEventListener('resize', debounce(toggleClassOnScreenSize, 100));


/* copyright */
const d = new Date();
const copyright = document.getElementById("footer-copyright");
const a = gt("a", "PiWeb.ch", { href: "#", className: "a-decoration hover-link"});
const span = gt("span", "© " + d.getFullYear() + " Copyright : ", {className: "no-transition"});
const p = gt("p", [span, a])
copyright.appendChild(p);