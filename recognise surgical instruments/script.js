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



// index 
const index = {
    0: 'Ciseaux Mayo',
    1: 'Ciseaux Stevens',
    2: 'Ciseaux Stille',
    3: 'Ciseaux micro', 
    4: 'Ciseaux à plâtre',
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
            // If it's a fossil, classify the type of fossil
            const tensor = preprocessImage(image); // Preprocess the image 299x299
            const prediction = model.predict(tensor);
            const predictedClassIndex = await prediction.argMax(1).data();
            showImage.src = image.src;  // Dispaly Image
            // Set the desired width and height for the image
            showImage.width = 200; // Set the width to 200 pixels
            showImage.height = 150; // Set the height to 150 pixels
            const name = index[predictedClassIndex[0]];
            textResult.textContent = 'Predicted class: ' + name;
            tensor.dispose();  // Dispose of the tensor to free memory
                
            } catch (error) {
                showImage.src = image.src;  // Dispaly Image
                // Set the desired width and height for the image
                showImage.width = 200; // Set the width to 200 pixels
                showImage.height = 150; // Set the height to 150 pixels
                textResult.textContent = 'Error handling the file:' + error
            }
        } else {
            showImage.src = image.src;  // Dispaly Image
            // Set the desired width and height for the image
            showImage.width = 200; // Set the width to 200 pixels
            showImage.height = 150; // Set the height to 150 pixels
            textResult.textContent = "check file"
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