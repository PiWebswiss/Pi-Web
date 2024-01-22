let fossilModel, checkFossilModel;

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

// Function to load a TensorFlow.js model
async function loadModel(path) {
    return await tf.loadLayersModel(path);  // Load the model from a given path
}


// Function to initialize both models
async function initModels() {
    fossilModel = await loadModel('public/fossil-classifier-model/model.json');
    checkFossilModel = await loadModel('public/model-fossil-vs-non/model.json');
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
        .resizeBilinear([299, 299])            // Resize the image
        .toFloat()                             // Convert to float32
        .div(tf.scalar(255))                   // Normalize the image to [0, 1]
        .expandDims();                         // Add a batch dimension
    return tensor;
}

// Function to preprocess the image for the check model
function checkPreprocessImage(image) {
    let tensor = tf.browser.fromPixels(image)  // Convert the image to a tensor
        .resizeBilinear([224, 224])            // Resize the image for the check model
        .toFloat()                             // Convert to float32
        .div(tf.scalar(255))                   // Normalize the image to [0, 1]
        .expandDims();                         // Add a batch dimension
    return tensor;
}

// index 
const index = {
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
    45: 'turtle'};

    indexNonFossil = {
        0: "fossil",
        1: "non fossil"
    };


// Function to have the confidence text related to how well the model did
function confidenceText(prediction) {
    const roundedPrediction =  Math.round(prediction * 100);
    const textPrediction = `at ${roundedPrediction}% confidence`;

    return textPrediction;
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
async function handleImg(file) {
    simulateLoading();
    if (file && isImage(file)) {
        try {
            const image = await loadImage(file); // Load the image
            const checkTensor = checkPreprocessImage(image); // Preprocess the image 224x224
            const checkPrediction = checkFossilModel.predict(checkTensor); // Check if it's a fossil
            const predictedCheck = await checkPrediction.argMax(1).data();
            updateImageDisplay(image);

            if (predictedCheck[0] == 0) {
                // If it's a fossil, classify the type of fossil
                const tensor = preprocessImage(image); // Preprocess the image 299x299
                const predictionTensor = fossilModel.predict(tensor);
                const predictedValue = await predictionTensor.data(); // Get prediction data
                const predictedClassIndex = await predictionTensor.argMax(1).data();
                const maxValue = Math.max(...predictedValue); // Get max value           
                const name = index[predictedClassIndex[0]];
                textResult.textContent = 'Predicted class: ' + name + " " + confidenceText(maxValue);
                tensor.dispose(); // Dispose of the tensor to free memory
            } else {
                textResult.textContent = "This image is not a fossil";
            }
        } catch (error) {
            textResult.textContent = 'Error handling the file, please check the file'
        }
    } else {
        textResult.textContent = "Please check the file"
        // Handle non-image file (e.g., show message to user)
    }
}


// Append the <p> element to the document body or any other desired element
result.append(showImage);
result.appendChild(textResult);


/* footer */
const d = new Date();
const footer = document.getElementById("footerPage");
const a = gt("a", "PIWeb", { href: "../", className: "a-decoration hover-link"});
const span = gt("span", "© " + d.getFullYear() + " Copyright : Powered by ", {className: "no-transition white"});
const p = gt("p", [span, a]);
footer.appendChild(p);
    