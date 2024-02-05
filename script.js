// Define global variables
let char = 0; // Current character index for animation
let splitText = []; // Array to store individual characters of the text
let timer; // Timer for controlling the animation interval

const container = document.getElementById("container-image");
const containerEPFL = document.getElementById("container-EPFL");
const containerFooter = document.getElementById("footer");

const translations = {
    'en': {
      'title': 'Pi Web - Custom-made website & web app',
      'h1': 'Pi Web',
      'h2': 'I have recently been certified from the EPFL Extension School',
      'text-1': 'Custom-made AI models & website',
      'text-2': 'New AI Model to classify surgical instruments',
      'text-3': 'AI Model to classify fossils',
      'text-4': 'My latest web site build!',
      'footerText': 'My portfolio website, PIWeb, showcases various projects, including custom-made websites and AI models. All my projects are open source.',
    },
    'fr': {
      'title': 'Pi Web - Site web et application web sur mesure',
      'h2': "J'ai récemment été certifiée par l'EPFL Extension School",
      'h1': 'Pi Web',
      'text-1': "AI modèles et site web sur mesure",
      'text-2': 'Modèle pour classer les instruments chirurgicaux',
      'text-3': 'Modèle pour classer les fossiles',
      'text-4': 'Nouveaux web site',
      'footerText': "Mon site web, PIWeb, présente divers projets, notamment des sites web sur mesure et des modèles d'IA. Tous mes projets sont open source.",
    }
};

// Define an array of objects, each representing the content for a container
const containers = [
    {
        title: "text-1",
        imgSrc: "image/AI-model.jpg",
        altText: "custom code"
    },
    {
        title: "text-2",
        imgSrc: "image/surgical-instruments.png",
        altText: "AI Model to classify surgical instruments",
        link: "recognise surgical instruments/index.html"
    },
    {
        title: "text-3",
        imgSrc: "image/AI fossil.png",
        altText: "AI Model to classify fossils",
        link: "fossil-classifier/index.html"
    },
    {
        title: "text-4",
        imgSrc: "image/Pi web site 1.png",
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
    h2.classList.add("title-big", "no-container");
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
        text: "EPLF ",
        link: "https://www.epfl.ch/education/continuing-education/applied-data-science-machine-learning/",
        textLink: "Certificate of Open Studies (COS)",
        imgSrc: "image/ai.jpg",
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
        timer = setInterval(onTick, 200); // Start the animation interval
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
    // footer
    const containerFooter = document.createElement("div");
    containerFooter.classList.add("footer-content");
    

    // Section 1
    const footerSectionOne = document.createElement("div");
    footerSectionOne.classList.add("footer-section");

    // img logo
    const div = document.createElement("div");
    div.classList.add("footer-image-section");
    const footerLogo = document.createElement("img");
    footerLogo.setAttribute('src', 'image/logo 2.png');
    footerLogo.setAttribute('alt', 'footer logo');
    footerLogo.setAttribute('class', 'footer-logo');
    // website name
    const h2 = document.createElement("h2");
    h2.innerText = "PIWeb";

    div.appendChild(footerLogo);
    div.appendChild(h2);

    // paragraph one
    const paraOne = document.createElement("p");
    paraOne.classList.add("footer-text");
    paraOne.innerText = translations[lang]["footerText"]

    // Section 2
    const footerSectionTwo = document.createElement("div");
    footerSectionTwo.classList.add("footer-section", "social-links");

    // My mail
    const mailContainer = document.createElement("div"); // Container for mail text and link
    mailContainer.classList.add("link-container", "footer-padding-top");
    const mailLogo = document.createElement("img");
    mailLogo.setAttribute('src', 'icons/email.png');
    mailLogo.setAttribute('alt', 'Icon');
    mailLogo.setAttribute('class', 'icon');
    const myMail = document.createElement("a");
    myMail.classList.add("social-links");
    myMail.setAttribute("href", "mailto:pi.web@piweb.ch");
    myMail.innerText = "pi.web@piweb.ch";
    mailContainer.appendChild(mailLogo);
    mailContainer.appendChild(myMail);

    // GitHub link
    const gitHubContainer = document.createElement("div"); // Container for GitHub text and link
    gitHubContainer.classList.add("link-container");
    const gitHubLogo = document.createElement("img");
    gitHubLogo.setAttribute('src', 'icons/github.png');
    gitHubLogo.setAttribute('alt', 'Icon');
    gitHubLogo.setAttribute('class', 'icon');
    const gitHubLink = document.createElement("a");
    gitHubLink.classList.add("social-links");
    gitHubLink.setAttribute("href", "https://github.com/PiWebswiss");
    gitHubLink.innerText = "github.com/PiWebswiss";
    gitHubContainer.appendChild(gitHubLogo);
    gitHubContainer.appendChild(gitHubLink);

    // LinkedIn link
    const linkedinContainer = document.createElement("div"); // Container for LinkedIn text and link
    linkedinContainer.classList.add("link-container");
    const linkedinLogo = document.createElement("img");
    linkedinLogo.setAttribute('src', 'icons/linkedin.png');
    linkedinLogo.setAttribute('alt', 'Icon');
    linkedinLogo.setAttribute('class', 'icon');
    const linkedinLink = document.createElement("a");
    linkedinLink.classList.add("social-links");
    linkedinLink.setAttribute("href", "https://linkedin.com/in/pilink");
    linkedinLink.innerText = "linkedin.com/in/pilink";
    linkedinContainer.appendChild(linkedinLogo);
    linkedinContainer.appendChild(linkedinLink);

    // Create elements
    footerSectionOne.appendChild(div);
    footerSectionOne.appendChild(paraOne);

    footerSectionTwo.appendChild(mailContainer);
    footerSectionTwo.appendChild(gitHubContainer);
    footerSectionTwo.appendChild(linkedinContainer);

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


/* Code I'm woking on  */

/* html code */
/* <!--  code animation -->
<<div id="aiModelBox">
    <pre id="codeSimulation"></pre>
</div>  */




/* const codeBox = document.getElementById('codeSimulation');
const codeLines = [
    "import tensorflow as tf\n",
    "model = tf.keras.Sequential([\n",
    "    tf.keras.layers.Dense(units=1, input_shape=[1])\n",
    "])\n",
    "model.compile(optimizer='sgd', loss='mean_squared_error')\n",
    "xs = [1, 2, 3, 4, 5, 6]\n",
    "ys = [1, 1.5, 2, 2.5, 3, 3.5]\n",
    "model.fit(xs, ys, epochs=500)\n",
    "print(model.predict([10.0]))\n"
];

let currentLine = 0;
let currentChar = 0;

function typeCode() {
    if (currentLine < codeLines.length) {
        if (currentChar < codeLines[currentLine].length) {
            codeBox.textContent += codeLines[currentLine][currentChar];
            currentChar++;
            setTimeout(typeCode, 50); // Speed of typing
        } else {
            codeBox.textContent += "\n";
            currentLine++;
            currentChar = 0;
            setTimeout(typeCode, 200); // Delay before starting new line
        }
    }
}

typeCode(); */



/* copyright */
const d = new Date();
const copyright = document.getElementById("footer-copyright");
const a = gt("a", "PIWeb.ch", { href: "#", className: "a-decoration hover-link"});
const span = gt("span", "© " + d.getFullYear() + " Copyright : ", {className: "no-transition"});
const p = gt("p", [span, a])
copyright.appendChild(p);