// Define global variables
let char = 0; // Current character index for animation
let splitText = []; // Array to store individual characters of the text
let timer; // Timer for controlling the animation interval

const container = document.getElementById("container-image");

const translations = {
    'en': {
      'title': 'Pi Web - Custom-made website & web app',
      'h1': 'Pi Web',
      'text-1': 'Custom-made AI models & website',
      'text-2': 'New AI Model to classify surgical instruments',
      'text-3': 'AI Model to classify fossils',
      'text-4': 'My latest web site build!',
    },
    'fr': {
      'title': 'Pi Web - Site web et application web sur mesure',
      'h1': 'Pi Web',
      'text-1': "AI modèles et site web sur mesure",
      'text-2': 'Modèle pour classer les instruments chirurgicaux',
      'text-3': 'Modèle pour classer les fossiles',
      'text-4': 'Nouveaux web site',
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
    img.classList.add("style-img");
    img.src = item.imgSrc;
    img.alt = item.altText;

    // If there's a link, create an anchor element
    if (item.link) {
        const link = document.createElement("a");
        link.classList.add("min-button");
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


/* mail */
const mail = document.getElementById("mail");
const span1 = gt("span", "Contact me by email:", {className: "title-big"});
const aMail = gt("a", "pi.web@piweb.ch", {className: "mail-text-color title-big", href:"mailto:pi.web@piweb.ch"});

mail.appendChild(span1);
mail.appendChild(aMail);


/* mail button */
const btnMail = document.getElementById("btnMail");
const newButton = document.createElement("button");
newButton.addEventListener("click", function() {
    location.href = "mailto:pi.web%40piweb.ch";
});
newButton.textContent = "Send me a mail";
newButton.className = "button-big";
btnMail.appendChild(newButton);



/* footer */
const d = new Date();
const footer = document.getElementById("footerPage");
const a = gt("a", "PIWeb", { href: "#", className: "a-decoration hover-link"});
const span = gt("span", "© " + d.getFullYear() + " Copyright : Powered by ", {className: "no-transition white"});
const p = gt("p", [span, a])
footer.appendChild(p);