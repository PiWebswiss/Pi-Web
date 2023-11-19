// Declare variables to hold the two models
for (let key in localStorage) {
    console.log(key, localStorage.getItem(key));
}


let fossilModel, checkFossilModel;
const imageElement = document.getElementById('fileElem');
/* const predictButton = document.getElementById('predictButton'); */
const result = document.getElementById('result');
const showImage = document.createElement("img");
const textResult = document.createElement("p");
const dropAreaStyle = document.getElementsByClassName("drop-area");
console.log(dropAreaStyle[0].style.width)
/* predictButton.disabled = true; */  // Disable the predict button initially


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
    fossilModel = await loadModel('https://piweb.ch/model/fossil-classifier-model/model.json');
    checkFossilModel = await loadModel('https://piweb.ch/model/model-fossil-vs-non/model.json');
    /* predictButton.disabled = false; */  // Enable the predict button after models are loaded
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
    
    /* // Handle image upload and prediction
    document.getElementById('predictButton').addEventListener('click', () => {
        const file = imageElement.files[0];
        handleImg(file);
    }); */
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


// Function to check if a file is an image
function isImage(file) {
    return file && file.type.startsWith('image/');
};

// Function to handle image processing and prediction
async function handleImg(file) {
    simulateLoading();
    if (file && isImage(file)) {
        try {
            const image = await loadImage(file);       // Load the image
            const checkTensor = checkPreprocessImage(image);// Preprocess the image 224x224
            const checkPrediction = checkFossilModel.predict(checkTensor);  // Check if it's a fossil
            const predictedCheck = await checkPrediction.argMax(1).data();
            if (predictedCheck[0] == 0) {
                // If it's a fossil, classify the type of fossil
                const tensor = preprocessImage(image); // Preprocess the image 299x299
                const prediction = fossilModel.predict(tensor);
                const predictedClassIndex = await prediction.argMax(1).data();
                showImage.src = image.src;  // Dispaly Image
                // Set the desired width and height for the image
                showImage.width = 200; // Set the width to 200 pixels
                showImage.height = 150; // Set the height to 150 pixels
                const name = index[predictedClassIndex[0]];
                textResult.textContent = 'Predicted class: ' + name;
                tensor.dispose();  // Dispose of the tensor to free memory
            } else {
                showImage.src = image.src;  // Dispaly Image
                // Set the desired width and height for the image
                showImage.width = 200; // Set the width to 200 pixels
                showImage.height = 150; // Set the height to 150 pixels
                textResult.textContent = "This image is not a fossil";
                }
                
            } catch (error) {
                console.log('Error handling the file:', error)
            }
        } else {
            console.log("check file")
            // Handle non-image file (e.g., show message to user)
        }
    }

      



// Append the <p> element to the document body or any other desired element
result.append(showImage)
result.appendChild(textResult);

/* code will only work with a server check: https://stackoverflow.com/questions/53639919/load-tensorflow-js-model-from-local-file-system-in-javascript  */