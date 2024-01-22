/* code to translate the text */
let categorieName;
let lastPredictedIndex = null;


let index = {
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


function translatePage(lang) {
document.querySelectorAll("[data-translate]").forEach(el => {
    el.textContent = translations[lang][el.dataset.translate];
});

// Update the prediction text if a prediction has been made
if (lastPredictedIndex !== null) {
    categorieName = index[lang][lastPredictedIndex];
    textResult.textContent = categorieName;
}
}
  

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


const translations = {
  'en': {
    'h1': 'AI Model to classify surgical instruments',
    'h2': 'Model is in Beta',
    'h3': 'Here are surgical instruments that the model can recognise.',
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
    'bth-go-back': 'Go back to PIWeb',
    'text-btn-upload': 'Choose File',
  },
  'fr': {
    'h1': 'Modèle IA pour classer les instruments chirurgicaux',
    'h2': 'Le modèle est en version bêta',
    'h3': 'Voici les instruments chirurgicaux que le modèle peut reconnaître.',
    'image-name-1': 'Ciseaux Mayo',
    'image-name-2': 'Ciseaux micro',
    'image-name-3': 'Ciseaux Stevens',
    'image-name-4': 'Ciseaux Stille',
    'image-name-5': 'Ciseaux à plâtre',
    'text-model-h2': 'Essayez le modèle',
    'text-model-h3': 'Téléchargez un instrument chirurgical.',
    'text-model-p1': 'Téléchargez une image d\'instrument chirurgical en choisissant un fichier',
    'text-model-p2': 'Le modèle se lance automatiquement lorsqu\'une image est fournie',
    'text-model-p3': 'Téléchargez une image d\'instrument chirurgical en la glissant et la déposant ou choisissez un fichier',
    'text-model-h4': 'Le modèle se lance automatiquement lorsqu\'une image est fournie',
    'bth-go-back': 'Retourner à PIWeb',
    'text-btn-upload': 'Choisir un fichier',
  }
};


// Set a default language if it's not available in localStorage
if (localStorage.getItem('lang') !== null) {
    lang = localStorage.getItem('lang');
} else {
    lang = "en"; // Default language
    localStorage.setItem('lang', lang); // Optionally, store this default in localStorage
}

// Apply the language settings
translatePage(lang);



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

// Function to load a TensorFlow.js model
async function loadModel(path) {
    return await tf.loadLayersModel(path);  // Load the model from a given path
}


// Function to initialize both models
async function initModels() {
    model = await loadModel('public/tfjs_model/model.json');
}


// Load models and set up the application once the models are loaded
initModels().then(setupApplication);

// Function to setup the application
function setupApplication() {
    // Add drag-and-drop functionality
    const dropArea = document.getElementById('drop-area');
    if (dropArea) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, handleDrag, false);
        });
    } else {
        console.error('Drop area element not found');
    }

    // Attach a change event listener to the image input element
    imageElement.addEventListener('change', () => {
        if (imageElement.files.length > 0) {
            handleImg(imageElement.files[0]);
        }
    });
    
}

// Function to handle drag-and-drop events
function handleDrag(event) {
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
        handleImg(img[0]);
    }
}

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


function updateImageDisplay(image) {
    if (image) {
        showImage.src = image.src;
        showImage.width = 200;
        showImage.height = 150;
    }
    // Append or update as necessary
    result.append(showImage);
    textResult.className = "center-text"
    result.appendChild(textResult);
}

// Function to have the confidence text related to how well the model did
function confidenceText(prediction) {
    const roundedPrediction =  Math.round(prediction * 100);
    let textPrediction;

    if (lang === "fr") {
        textPrediction = `Confiance à ${roundedPrediction}% `;

    }else{
        textPrediction = `${roundedPrediction}% confidence `;

    }

    return textPrediction;
}

let image;
async function handleImg(file) {
    simulateLoading(); // Ensure this function is defined
    if (file && isImage(file)) { // Ensure isImage is a defined function
        try {
            image = await loadImage(file); // Load the image
            const tensor = preprocessImage(image); // Preprocess the image
            const predictionTensor = model.predict(tensor);
            const predictedValue = await predictionTensor.data(); // Get the maximum values 
            const maxValue = Math.max(...predictedValue); // ... points are used to pass the values of the array and retrun only the max value
            const predictedClassIndex = await predictionTensor.argMax(1).data(); // Get the predicted class index
            updateImageDisplay(image); // Refactored repeated code into a function

            if (predictedClassIndex.length > 0) {
                categorieName = index[lang][predictedClassIndex[0]];
                lastPredictedIndex = predictedClassIndex[0];
                textResult.textContent = categorieName + " " + confidenceText(maxValue); // Assuming predictionData[0] is the confidence
            } else {
                textResult.textContent = "No prediction made";
            }

            tensor.dispose(); // Dispose the tensor to free memory
        } catch (error) {
            updateImageDisplay(image); // Handle this case appropriately
            textResult.textContent = 'Error handling the file: ' + error;
        }
    } else {
        updateImageDisplay(); // Handle non-image file
        textResult.textContent = "Please check the file";
    }
}

  


/* footer */
const d = new Date();
const footer = document.getElementById("footerPage");
const a = gt("a", "PIWeb", { href: "../", className: "a-decoration hover-link"});
const span = gt("span", "© " + d.getFullYear() + " Copyright : Powered by ", {className: "no-transition white"});
const p = gt("p", [span, a]);
footer.appendChild(p);