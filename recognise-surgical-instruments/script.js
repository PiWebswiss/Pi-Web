/* code to translate the text */
let categorieName, maxValue, lang;
let lastPredictedIndex = null;
let error = 0; // used to save the error to transalte it 


const index = {
    'en': {
        0: 'Mayo Scissors',
        1: 'Stevens Scissors',
        2: 'Stille Scissors',
        3: 'Micro Scissors', 
        4: 'Plaster Scissors',
    },
    'fr': {
        0: 'Ciseaux Mayo',
        1: 'Ciseaux Stevens',
        2: 'Ciseaux Stille',
        3: 'Ciseaux micro', 
        4: 'Ciseaux à plâtre',
    }
};

const translations = {
    'en': {
      'title': 'Recognize surgical instruments',
      'h1': 'Demo AI model to classify surgical instruments',
      'h3': 'Here are surgical instruments that the model can recognise.',
      'text-strong': 'Please Note:',
      'note-model-text': 'There is no safeguard in place if images outside of the categories displayed below are provided. The model is only equipped to recognize and classify images within the predefined set of surgical instruments. Therefore, for all images that fall outside of these specified categories, the results should be treated as not accurate.',
      'github-para': 'The MedAI project is open-source and available on ',
      'github-link': 'GitHub',
      'image-name-1': 'Mayo Scissors',
      'image-name-2': 'Micro Scissors',
      'image-name-3': 'Stevens Scissors',
      'image-name-4': 'Stille Scissors',
      'image-name-5': 'Plaster scissors',
      'text-model-h2': 'Try the model',
      'text-model-h3': 'Upload a surgical instrument.',
      'text-model-p1': 'Upload a surgical instrument image by choosing a file',
      'text-model-p2': 'The model runs automatically when an image is given',
      'text-model-p3': 'Upload a surgical instrument image by dragging & dropping or choose a file',
      'text-model-h4': 'The model runs automatically when an image is given',
      'bth-go-back': 'Go back to PiWeb',
      'text-btn-upload': 'Upload an image',
    },
    'fr': {
      'title': 'Reconnaître les instruments chirurgicaux',
      'h1': 'Modèle de démonstration pour classer les instruments chirurgicaux',
      'h3': 'Voici les instruments chirurgicaux que le modèle peut reconnaître.',
      'text-strong': 'Veuillez noter:',
      'note-model-text': "Il n'y a pas de protection en place si des images en dehors des catégories affichées ci-dessous sont fournies. Le modèle n'est équipé que pour reconnaître et classer les images dans l'ensemble prédéfini d'instruments chirurgicaux. Par conséquent, pour toutes les images qui n'entrent pas dans les catégories spécifiées, les résultats doivent être considérés comme inexacts.",
      'github-para': 'Le projet MedAI est open-source et disponible sur ',
      'github-link': 'GitHub',
      'image-name-1': 'Ciseaux Mayo',
      'image-name-2': 'Ciseaux micro',
      'image-name-3': 'Ciseaux Stevens',
      'image-name-4': 'Ciseaux Stille',
      'image-name-5': 'Ciseaux à plâtre',
      'text-model-h2': 'Essayez le modèle',
      'text-model-h3': "Importer une image d'un instrument chirurgical.",
      'text-model-p1': 'Importer une image d\'instrument chirurgical en choisissant une image',
      'text-model-p2': 'Le modèle se lance automatiquement lorsqu\'une image est fournie',
      'text-model-p3': 'Glissez-déposez votre image ici ou choisissez une image',
      'text-model-h4': 'Le modèle se lance automatiquement lorsqu\'une image est fournie',
      'bth-go-back': 'Retourner à PiWeb',
      'text-btn-upload': 'Choisir une image',
    }
  };

    /* Result and errors response */
    const text_translate = {
        'en': {
            'no prediction': 'No prediction made',
            'error': 'Error handling the file, please check the file',
            'check file': 'Please check the file',
        },
        'fr':{
            'no prediction': "Aucune prédiction n'a été faite",
            'error': 'Erreur lors du traitement du fichier, veuillez vérifier le fichier',
            'check file': 'Veuillez vérifier le fichier',
        }
    }

  
// Function to have the confidence text related to how well the model did
function confidenceText(prediction) {
    const roundedPrediction =  Math.round(prediction * 100);
    let textPrediction;

    if (lang === "fr") {
        textPrediction = `à ${roundedPrediction}%`;

    }else{
        textPrediction = `at ${roundedPrediction}%`;

    }

    return textPrediction;
}


function linkText(lang) {
    // Remove any existing elements before adding new ones
    const existingLinkPara = document.getElementById("github-link");
    if (existingLinkPara) {
        existingLinkPara.innerHTML = ''; // Clear the contents
    }

    // Create a new paragraph element
    const linkpara = document.createElement('p');
    linkpara.textContent = translations[lang]["github-para"];

    // Create a new anchor (link) element
    const link = document.createElement('a');
    link.setAttribute('href', 'https://github.com/PiWebswiss/MedAI');
    link.setAttribute('target', '_blank');
    link.textContent = translations[lang]["github-link"];
    
    // Create a text node for the point
    const point = document.createTextNode('.');
    
    // Append the link to the paragraph
    linkpara.appendChild(link);
    // Add point after the link
    link.after(point);

    // Append the paragraph to the element with ID
    document.getElementById("github-link").appendChild(linkpara); // or append to another element as needed
}


function translatePage(lang) {
    document.querySelectorAll("[data-translate]").forEach(el => {
        // Check if the element has a specific child to translate
        const textContainer = el.querySelector("span");
        if (textContainer) {
            textContainer.textContent = translations[lang][el.dataset.translate];
        } else {
            // If no specific child, update the entire element
            el.textContent = translations[lang][el.dataset.translate];
        }
    });
  
  
    // Update the prediction text if a prediction has been made
    if (lastPredictedIndex !== null) {
        categorieName = index[lang][lastPredictedIndex];
        textResult.textContent = categorieName + " " + confidenceText(maxValue);
    }

    /* error translate */
    switch (error) {
        case 0:
            break;
        case 1:
            textResult.textContent = text_translate[lang]["not fossil"];
            break; // This break statement is important to exit the switch after setting textContent.
        case 2:
            textResult.textContent = text_translate[lang]["error"];
            break;
        case 3:
            textResult.textContent = text_translate[lang]["check file"];
            break;
        default:
            break;
    }

    /* Change HTML lang */
    document.documentElement.lang = lang;
    linkText(lang);
   
}

/* Buttons  */
document.getElementById('translateToFr').addEventListener('click', function() {
  lang = "fr";
  localStorage.setItem('lang', lang);
  translatePage(lang);
  
});

document.getElementById('translateToEn').addEventListener('click', function() {
  lang = "en";
  localStorage.setItem('lang', lang);
  translatePage(lang);
});



// Set initial language default ("en")
lang = localStorage.getItem('lang') || 'en';
/* Translate page */
translatePage(lang);



/* Setup models for inference */
/* code to run the model */
const imageElement = document.getElementById('fileElem');
const result = document.getElementById('result');
const showImage = document.createElement("img");
const textResult = document.createElement("p");


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


// Define progressBar in the broader scope
const progressBar = document.querySelector(".loading-progress");

function updateLoadingBar(percentage) {
    progressBar.style.width = `${percentage}%`;
}

// Example: Update the loading bar with a simulated progress
function simulateLoading() {
    for (let i = 0; i <= 100; i++) {
        setTimeout(() => {
            updateLoadingBar(i);
            }, i); // Adjust the delay as needed for your use case
    }
}


// Function to setup the application
function setupApplication(model) {
    // Add drag-and-drop functionality
    const dropArea = document.getElementById('drop-area');
    if (dropArea) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, (event) => {
                handleDrag(model) // Pass the model
            }, false);
        });
    }

    // Attach a change event listener to the image input element
    imageElement.addEventListener('change', () => {
        if (imageElement.files.length > 0) {
            handleImg(imageElement.files[0], model);
        }
    });
    
}

// Function to handle drag-and-drop events
function handleDrag(event, model) {
    // Prevent default behavior and stop event propagation
    event.preventDefault();
    event.stopPropagation();

    // Visual feedback for drag-and-drop
    const dropArea = document.getElementById('drop-area');
    switch(event.type) {
        case 'dragenter':
        case 'dragover':
            dropArea.classList.add('dragover');
            break;
        case 'dragleave':
        case 'drop':
            dropArea.classList.remove('dragover');
            break;
    }

    // Handle file drop event
    if (event.type === 'drop') {
        const img = event.dataTransfer.files;
        handleImg(img[0], model);
    }
}

// Function to initialize both models
async function initModels() {
    const loadModel = await tf.loadLayersModel('public/tfjs-model-V2/model.json');
    return loadModel;
}

// Load models and set up the application once the models are loaded
const modelPromise = initModels(); // Store the promise
modelPromise.then((model) => {
    setupApplication(model); // Pass the loaded Model setupApplication
});


// Function to load an image file
function loadImage(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image();
            img.onload = () => resolve(img);  // Resolve the promise once the image is loaded
            img.onerror = reject;            // Reject the promise if there's an error
            img.src = reader.result;         // Set the image source to the file's data URL
        };
        reader.readAsDataURL(file);          // Read the file as a data URL
    });
}

// Function to preprocess the image into a tensor
function preprocessImage(image) {
    let tensor = tf.browser.fromPixels(image)  // Convert the image to a tensor
        .resizeBilinear([224, 224])            // Resize the image
        .toFloat()                             // Convert to float32
        .div(tf.scalar(255))                   // Normalize the image to [0, 1]
        .expandDims();                         // Add a batch dimension
    return tensor;
}

// Function to check if a file is an image
function isImage(file) {
    return file && file.type.startsWith('image/');
};


const btnUpleadContainer = document.getElementById("btn-uplead-container"); // ID to add class for magine in small scren
const displayImage = document.querySelector(".display-image");
const displayNon = document.querySelector(".display-non")

function updateImageDisplay(image) {
    if (image) {
        showImage.src = image.src;
        showImage.className = "img-result";

        /* For small screen only display the image by default is "none" this is done to remove the blank space */
        if (displayImage) {
            displayImage.style.display = "block";
        }

            /* Add magine 5rem when scren is belowe 600px */
            /* we add the class magrin-top that is in the @media screen and (max-width: 600px)  */
        if (btnUpleadContainer) {
            btnUpleadContainer.classList.add("margin-top");
        }

        /* Change flex box for the images by diplaying it  */
        if(displayNon) {
            displayNon.style.display = "block";
        }
        
    }
    // Append or update as necessary
    result.append(showImage);
    textResult.className = "center-text"
    result.appendChild(textResult);
}


// Function to handle image processing and prediction
async function handleImg(file, model) {
    simulateLoading(); // Ensure this function is defined
    if (file && isImage(file)) { // Ensure isImage is a defined function
        try {
            const image = await loadImage(file); // Load the image
            const tensor = preprocessImage(image); // Preprocess the image
            const predictionTensor = model.predict(tensor);
            const predictedValue = await predictionTensor.data(); // Get the maximum values 
            maxValue = Math.max(...predictedValue); // ... points are used to pass the values of the array and retrun only the max value
            const predictedClassIndex = await predictionTensor.argMax(1).data(); // Get the predicted class index
            updateImageDisplay(image); // Refactored repeated code into a function

            if (predictedClassIndex.length > 0) {
                categorieName = index[lang][predictedClassIndex[0]];
                lastPredictedIndex = predictedClassIndex[0];
                textResult.textContent = categorieName + " " + confidenceText(maxValue); // Assuming predictionData[0] is the confidence
            } else {
                error = 1; 
                textResult.textContent = text_translate[lang]["no prediction"];
            }

            tensor.dispose(); // Dispose the tensor to free memory
        } catch (error) {
            error = 2; 
            textResult.textContent = text_translate[lang]["error"];
        }
    } else {
        error = 3; 
        textResult.textContent = text_translate[lang]["check file"];
    }
}


/* copyright */
const d = new Date();
const copyright = document.getElementById("footer-copyright");
const a = gt("a", "PiWeb.ch", { href: "#", className: "a-decoration hover-link"});
const span = gt("span", "© " + d.getFullYear() + " Copyright : ", {className: "no-transition"});
const p = gt("p", [span, a])
copyright.appendChild(p);