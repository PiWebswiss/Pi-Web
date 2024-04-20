let lastPredictedIndex = null;
let error = 0; // used to save the error to transalte it 
let fossilModel, checkFossilModel, maxValue;

const translations = {
    'en': {
    'title': 'fossil classifier',
    'h1': 'AI Model to classify fossils',
    'p-1': 'Identifying fossils can be a time-consuming task that relies on expert knowledge of fossil morphology. This task is particularly challenging due to the often fragmented and degraded nature of fossils.',
    'p-2': 'These models are part of my Capstone Project, which you can find on GitHub ',
    'p-2-link': 'Capstone-Project',
    'li-1': 'The accuracy rate for distinguishing between fossils and non-fossils is 93%.',
    'li-2': 'The accuracy rate in identifying specific fossil types is 90%.',
    'p-3': 'These models were trained on 8 0000 and 80 0000 respectively.',
    'p-4': 'You can try the model below. The model is loaded and run on your device.',
        'p-note-1': 'Please Note:',
        'p-note-2': 'The first time you use this application for inference, it may take a while. This is because the pre-trained models',
        'p-2-strong-1': ' MobileNetV3Small ',
        'p-2-text-1': ' and ',
        'p-2-strong-2': ' InceptionV3 ',
        'p-2-text-2': 'are being loaded on your device.',
        'p-note-3': "It is important to note that these models are not 100% accurate and have their limitations. For example, the fossil classifier was trained only on 46 different categories, meaning it can classify images only within those predefined categories.",
    'text-model-title': 'Upload a fossil image by choosing a file',
    'text-model-p-1': 'Upload a surgical instrument image by choosing a file',
    'text-model-p-2': 'The model runs automatically when an image is given',
    'text-use-model-1': 'Upload a fossil image by dragging & dropping or choose a file',
    'text-use-model-2': 'The model runs automatically when an image is given',
    'text-btn-upload': 'Upload an image',
    'text-image-recognise': 'Here are the fossils that the model can recognise.',
    'bth-go-back': 'Go back to PiWeb',

    },
    'fr': {
    'title': 'classificateur de fossiles',
    'h1': 'Modèle IA pour classifier les fossiles',
    'p-1': "L'identification des fossiles peut être une tâche fastidieuse qui repose sur une connaissance experte de la morphologie des fossiles. Cette tâche est particulièrement difficile en raison de la nature souvent fragmentée et dégradée des fossiles.",
    'p-2': "Ces modèles font partie de mon projet de fin d'études, que vous pouvez trouver sur GitHub ",
    'p-2-link': 'Capstone-Project',
    'li-1': "Le taux de précision pour distinguer entre les fossiles et les non-fossiles est de 93 %.",
    'li-2': "Le taux de précision pour identifier des types spécifiques de fossiles est de 90 %.",
    'p-3': 'Ces modèles ont été entraînés sur 8 0000 et 80 0000 respectivement.',
    'p-4': "Vous pouvez essayer le modèle ci-dessous. Le modèle est chargé et exécuté sur votre appareil.",
        'p-note-1': "Veuillez noter:",
        'p-note-2': 'La première fois que vous utilisez cette application pour l\'inférence, cela peut prendre un certain temps. Cela est dû au chargement sur votre appareil des modèles pré-entraînés',
        'p-2-strong-1': ' MobileNetV3Small ',
        'p-2-text-1': ' et ',
        'p-2-strong-2': ' InceptionV3 ',
        'p-2-text-2': ' sont en train de se charger sur votre appareil.',
        'p-note-3': "Il est important de noter que ces modèles ne sont pas précis à 100 % et ont leurs limites. Par exemple, le classificateur de fossiles a été entraîné uniquement sur 46 catégories différentes, ce qui signifie qu'il ne peut classer les images que dans ces catégories prédéfinies.",
    'text-model-title': 'Importer une image de fossile',
    'text-model-p-1': 'Importer une image de fossile en choisissant une image',
    'text-model-p-2': 'Le modèle s’exécute automatiquement lorsqu’une image est fournie',
    'text-use-model-1': 'Glissez-déposez votre image ici ou choisissez une image',
    'text-use-model-2': 'Le modèle s’exécute automatiquement lorsqu’une image est fournie',
    'text-btn-upload': 'Choisir une image',
    'text-image-recognise': 'Voici les fossiles que le modèle peut reconnaître.',
    'bth-go-back': 'Retour à PiWeb',
      
    }
};

// index for the models 
const index = {
    'en': {
    0: 'agnatha',
    1: 'ammonoid',
    2: 'amphibian',
    3: 'angiosperm',
    4: 'avialae',
    5: 'belemnite',
    6: 'bivalve',
    7: 'blastoid',
    8: 'bone_fragment',
    9: 'brachiopod',
    10: 'bryozoan',
    11: 'chelicerate',
    12: 'chondrichthyes',
    13: 'conodont',
    14: 'coral',
    15: 'crinoid',
    16: 'crocodylomorph',
    17: 'crustacean',
    18: 'echinoid',
    19: 'gastropod',
    20: 'graptolite',
    21: 'gymnosperm',
    22: 'insect',
    23: 'mammal',
    24: 'mammal_teeth',
    25: 'marine_reptile',
    26: 'myriapod',
    27: 'nautiloid',
    28: 'ophiuroid',
    29: 'ornithischian',
    30: 'osteichthyes',
    31: 'petrified_wood',
    32: 'placoderms',
    33: 'pteridophyte',
    34: 'pterosaurs',
    35: 'reptile_teeth',
    36: 'sauropodomorph',
    37: 'shark_teeth',
    38: 'snake',
    39: 'sponge',
    40: 'starfish',
    41: 'stromatolite',
    42: 'theropod',
    43: 'trace_fossil',
    44: 'trilobite',
    45: 'turtle',
    },
    'fr': {
    0: 'agnathe',
    1: 'ammonoïde',
    2: 'amphibien',
    3: 'angiosperme',
    4: 'avialae',
    5: 'bélemnite',
    6: 'bivalve',
    7: 'blastozoaire',
    8: 'fragment_d_os',
    9: 'brachiopode',
    10: 'bryozoaire',
    11: 'chélicérate',
    12: 'chondrichthyen',
    13: 'conodonte',
    14: 'corail',
    15: 'crinoïde',
    16: 'crocodylomorphe',
    17: 'crustacé',
    18: 'échinide',
    19: 'gastéropode',
    20: 'graptolite',
    21: 'gymnosperme',
    22: 'insecte',
    23: 'mammifère',
    24: 'dents_de_mammifère',
    25: 'reptile_marin',
    26: 'myriapode',
    27: 'nautiloïde',
    28: 'ophiure',
    29: 'ornithischien',
    30: 'osteichthyen',
    31: 'bois_pétrifié',
    32: 'placodermes',
    33: 'ptéridophyte',
    34: 'ptérosaures',
    35: 'dents_de_reptile',
    36: 'sauropodomorphe',
    37: 'dents_de_requin',
    38: 'serpent',
    39: 'éponge',
    40: 'étoile_de_mer',
    41: 'stromatolithe',
    42: 'théropode',
    43: 'trace_fossile',
    44: 'trilobite',
    45: 'tortue',

    },
  
};
    /* Result model 1 index  */
    /* const indexNonFossil = {
        'en': {
            0: "fossil",
            1: "non fossil",
        },
        'fr':{
            0: "fossile",
            1: "non fossile"
        },

    }; */

/* Result and errors response */
const text_translate = {
    'en': {
        'Predicted class': 'Predicted class: ',
        'not fossil': 'This image is not a fossil',
        'error': 'Error handling the file, please check the file',
        'check file': 'Please check the file',
    },
    'fr':{
        'Predicted class': 'Classe prédite : ',
        'not fossil': "Cette image n'est pas un fossil",
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
    const existingLinkPara = document.getElementById("text-link-Capstone-Project");
    if (existingLinkPara) {
        existingLinkPara.innerHTML = ''; // Clear the contents
    }

    // Create a new paragraph element
    const linkpara = document.createElement('p');
    linkpara.textContent = translations[lang]["p-2"];

    // Create a new anchor (link) element
    const link = document.createElement('a');
    link.setAttribute('href', 'https://github.com/PiWebswiss/Capstone-Project-Louis-Cavaleri');
    link.setAttribute('target', '_blank');
    link.textContent = translations[lang]["p-2-link"];

    // Create a text node for the point
    const point = document.createTextNode('.');

    // Append the link to the paragraph
    linkpara.appendChild(link);
    // Add point after the link
    link.after(point);

    // Append the paragraph to the element with ID 'text-link-Capstone-Project'
    document.getElementById("text-link-Capstone-Project").appendChild(linkpara); // or append to another element as needed
}

function noteText(lang) {
    // Remove any existing elements before adding new ones
    const existingNotePara = document.getElementById("text-note-mode");
    if (existingNotePara) {
        existingNotePara.innerHTML = ''; // Clear the contents
    }

    // Create a new paragraph element
    const para = document.createElement('p');

    // Text part before the first strong element
    para.appendChild(document.createTextNode(translations[lang]['p-note-2']));

    // Create strong element for MobileNetV3Small
    const strong1 = document.createElement('strong');
    strong1.textContent = translations[lang]['p-2-strong-1'];
    para.appendChild(strong1);

    // Text part between the strong elements
    para.appendChild(document.createTextNode(translations[lang]['p-2-text-1']));

    // Create strong element for InceptionV3
    const strong2 = document.createElement('strong');
    strong2.textContent = translations[lang]['p-2-strong-2'];
    para.appendChild(strong2);

    // Text part after the second strong element
    para.appendChild(document.createTextNode(translations[lang]['p-2-text-2']));

    // Append the paragraph to the element with ID 'text-note-mode'
    document.getElementById("text-note-mode").appendChild(para);
}


// Function to translate page content based on selected language
function translatePage(lang) {
    document.querySelectorAll("[data-translate]").forEach(el => {
        // Fetch the translation key from the element's data attribute
        const translationKey = el.dataset.translate;
        const translatedText = translations[lang][translationKey];
        el.textContent = translatedText; // Update element text with translation
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

    /* Change html lang and add elements */
    document.documentElement.lang = lang;
    linkText(lang);
    noteText(lang);
}



/* Translate buttons   */
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

const imageElement = document.getElementById('fileElem');
const result = document.getElementById('result');
const showImage = document.createElement("img");
const textResult = document.createElement("p");
const dropAreaStyle = document.getElementsByClassName("drop-area");

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
function setupApplication(fossilModel, checkFossilModel) {
    // Add drag-and-drop functionality
    const dropArea = document.getElementById('drop-area');
    if (dropArea) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, (event) => {
                handleDrag(event, fossilModel, checkFossilModel); // Pass the models
            }, false);
        });
    }

    // Attach a change event listener to the image input element
    imageElement.addEventListener('change', () => {
        if (imageElement.files.length > 0) {
            useModel(imageElement.files[0], fossilModel, checkFossilModel);
        }
    });
    
}

// Function to handle drag-and-drop events
function handleDrag(event, fossilModel, checkFossilModel) {
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
        useModel(img[0], fossilModel, checkFossilModel);
    }
}

// Function to initialize both models
async function initModels() {
    const loadFossilModel = await tf.loadLayersModel('public/fossil-classifier-model/model.json');
    const loadFcheckFossilModel = await tf.loadLayersModel('public/model-fossil-vs-non/model.json');
    return  [loadFossilModel, loadFcheckFossilModel];
}
// Load models 
const modelPromise = initModels();
// Load models and set up the application once the models are loaded
modelPromise.then(([fossilModel, checkFossilModel]) => { 
    setupApplication(fossilModel, checkFossilModel); // Pass both models to setupApplication
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
/// img_sape must be array (ex [299, 229])
function preprocessImage(image, img_shape) {
    let tensor = tf.browser.fromPixels(image)  // Convert the image to a tensor
        .resizeBilinear(img_shape)            // Resize the image
        .toFloat()                             // Convert to float32
        .div(tf.scalar(255))                   // Normalize the image to [0, 1]
        .expandDims();                         // Add a batch dimension
    return tensor;
}


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




// Function to check if a file is an image
function isImage(file) {
    return file && file.type.startsWith('image/');
};



// Function to handle image processing and prediction
async function useModel(file, fossilModel, checkFossilModel) {
    simulateLoading();
    if (file && isImage(file)) {
        try {
            const image = await loadImage(file); // Load the image
            const checkTensor = preprocessImage(image, [224, 224]); // Preprocess the image 224x224
            const checkPrediction = checkFossilModel.predict(checkTensor); // Check if it's a fossil
            const predictedCheck = await checkPrediction.argMax(1).data();
            updateImageDisplay(image);

            if (predictedCheck[0] == 0) {
                // If it's a fossil, classify the type of fossil
                const tensor = preprocessImage(image, [299, 299]); // Preprocess the image 299x299
                const predictionTensor = fossilModel.predict(tensor);
                const predictedValue = await predictionTensor.data(); // Get prediction data
                const predictedClassIndex = await predictionTensor.argMax(1).data();
                lastPredictedIndex = predictedClassIndex[0];
                const maxValue = Math.max(...predictedValue); // Get max value         
                const name = index[lang][predictedClassIndex[0]];
                textResult.textContent = text_translate[lang]["Predicted class"] + name + " " + confidenceText(maxValue);
                tensor.dispose(); // Dispose of the tensor to free memory
            } else {
                error = 1; 
                textResult.textContent = text_translate[lang]["not fossil"];
            }
        } catch (error) {
            error = 2; 
            textResult.textContent = text_translate[lang]["error"];
        }
    } else {
        error = 3; 
        textResult.textContent = text_translate[lang]["check file"];
        // Handle non-image file (e.g., show message to user)
    }
}


// Append the <p> element to the document body or any other desired element
result.append(showImage);
result.appendChild(textResult);



/* footer */
const d = new Date();
const footer = document.getElementById("footerPage");
const a = gt("a", "PiWeb.ch", { href: "../", className: "a-decoration hover-link"});
const span = gt("span", "© " + d.getFullYear() + " Copyright : ", {className: "no-transition white"});
const p = gt("p", [span, a]);
footer.appendChild(p);
    