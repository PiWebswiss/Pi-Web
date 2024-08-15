// Define elements
const uploadFile = document.getElementById("uploadFile");
const dropArea = document.getElementById("dropArea");
const fileInput = document.getElementById("fileInput");
const getFileBtn = document.getElementById("getFileBtn");
const btnSelectLang = document.getElementById("btnSelectLang");
const dropdownMenu = document.getElementById("dropdownMenu");
const userFeedBack = document.getElementById("userFeedBack");
const tableFeedBack = document.getElementById("tableFeedBack");
const animatedText = document.getElementById("animatedText");
const btnCopy = document.getElementById("btnCopy");
const tBody = document.getElementById("tBody");
const deleteBtn = document.getElementById("deleteBtn");
const deleteResponse = document.getElementById("deleteResponse");

// Initialize variable to save the current predicted text
let saveText, modelLang; 

// Create an Intl.DateTimeFormat object for local date and time formatting
const dateFormatter = new Intl.DateTimeFormat('default', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // Use 24-hour time format
});

// Supported OCR languages engine 1
/* const langSupported = {
    "Arabic": "ara",
    "Bulgarian": "bul",
    "Chinese (Simplified)": "chs",
    "Chinese (Traditional)": "cht",
    "Croatian": "hrv",
    "Danish": "dan",
    "Dutch": "dut",
    "English": "eng",
    "Finnish": "fin",
    "French": "fre",
    "German": "ger",
    "Greek": "gre",
    "Hungarian": "hun",
    "Korean": "kor",
    "Italian": "ita",
    "Japanese": "jpn",
    "Polish": "pol",
    "Portuguese": "por",
    "Russian": "rus",
    "Slovenian": "slv",
    "Spanish": "spa",
    "Swedish": "swe",
    "Turkish": "tur"
}; */

// Supported OCR languages engine 2
// Added a default seting (en)
const langSupported = {
    "Default" : "Language",
    "Chinese (Simplified)": "chs",
    "Danish": "dan",
    "Dutch": "dut",
    "English": "eng",
    "Finnish": "fin",
    "French": "fre",
    "German": "ger",
    "Italian": "ita",
    "Portuguese": "por",
    "Slovenian": "slv",
    "Spanish": "spa",
    "Swedish": "swe",

};
// Create a new Date object
const datetime = new Date();


// Text animation code modified from GPT4
function typeText(text, element, maxLength = 290) {
    // Clear existing text 
    element.textContent = "";
    let index = 0;

    // Create the cursor element 
    const cursorSpan = document.createElement("span");
    cursorSpan.classList.add("cursor");
    cursorSpan.textContent = "|";
    element.appendChild(cursorSpan);

    // Function to animate text typing
    function type() {
        if (index < text.length && index < maxLength) {
            // Update the text content with the next character
            element.textContent = text.substring(0, index + 1);
            // Re-append the cursor to ensure it stays at end
            element.appendChild(cursorSpan);
            index++;
            setTimeout(type, 100); // Adjust typing speed as needed
        } else {
            if (index >= maxLength) {
                element.textContent = text.substring(0, maxLength) + "...";
            }
            // Remove the cursor after typing
            cursorSpan.remove();
        }
    }
    type();
}

// Function to hide the user feedback message
function hideFeedback(time, element) {
    setTimeout(() => {
        element.style.display = "none";
        element.classList.remove("success", "error", "info");
    }, time);
}

// Function to adjust width of feedback box
function adjustWidth(element) {
    const computeWidth = element.scrollWidth;
    element.style.width = computeWidth + "px";
}

// Display user feedback
function showFeedback(message, type, element) {
    // Code only use in development to help debug
    /* if (!message) {
        console.error("message", message)
        return
    }
    else if (!type) {
        console.error("type", type)
        return
    }
    else if (!element) {
        console.error("element", element)
        return
    } */

    element.innerText = message;
    element.classList.add(type);
    element.style.display = "block";
    adjustWidth(element);
    hideFeedback(5000, element); // hide after 5 seconds
}

// Function to handle drag-and-drop events
function handleDrag(event) {
    // Prevent default behavior and stop event propagation
    event.preventDefault();
    event.stopPropagation();

    // Visual feedback for drag-and-drop
    switch (event.type) {
        case "dragenter":
        case "dragover":
            dropArea.classList.add("dragover");
            break;
        case "dragleave":
        case "drop":
            dropArea.classList.remove("dragover");
            break;
    }

    // Handle file drop event
    if (event.type === "drop") {
        // Retrieve files from the event
        const userFile = event.dataTransfer.files;
        if (userFile.length > 0) {
            handleFileUpload(userFile);
        }
    }
}

// Function to display suported languages
function displayLang() {

    for (let lang in langSupported) {
        // new scope which allows "const" to be used safely and effectively 
        const langCode = langSupported[lang];
        const li = document.createElement("li");
        li.classList.add("dropdown-item", "dropdown-lang-style");
        li.textContent = lang;
        // Add a unique ID
        li.id = `lang-${lang}`;

        // Add click event listener
        li.addEventListener("click", () => {
            // Check if lang I default 
            if (lang === "Default") {
                // Change the button to the lang choosen
                btnSelectLang.innerText = langCode;
                // Set the model languages to null so default values (eng)
                modelLang = null;
            }
            else {
                // Change the button to the lang choosen
                btnSelectLang.innerText = lang;
                // Save user selected languages code (ex: eng)
                modelLang = langCode;
            }
        });

        // Append language list 
        dropdownMenu.appendChild(li);
    }
}
displayLang();


// Function to setup the application
function setupApplication() {
    // Add drag-and-drop functionality
    if (dropArea) {
        ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
            dropArea.addEventListener(eventName, handleDrag, false);
        });

        // Button file selection
        getFileBtn.addEventListener("click", () => {
            fileInput.click();
            
        });
        // Handling file selection
        fileInput.addEventListener("change", (event) => {
            if (event.target.files.length > 0) {
                handleFileUpload(event.target.files);
            }
            else {
                showFeedback("No file selected.", "info", userFeedBack);
            }
            
        });
      
    }
}
setupApplication();


// Initialize an array to store all predictions
let predictions = [];
// Function to save text in the local storage
function saveToLocaleStorage(predictedText) {

    // Format the date and time using the Intl.DateTimeFormat object
    const formattedDateTime = dateFormatter.format(datetime).replace(',', '');

    // Create a dictionary (object) for the prediction
    const prediction = {
        datetime: formattedDateTime,
        text: predictedText,
    };

    // Retrieve existing prediction from local storage
    const storedPred = localStorage.getItem("predictions");
    if (storedPred) {
        // Parse the existing JSON string to get the array of predictions
        predictions = JSON.parse(storedPred)
    }
    else {
        // If no predictions exist, start with an empty array
        predictions = [];

    }

    // Add the predition to the predictions array
    predictions.push(prediction);

    // Convert the predictions array to a JSON string
    const jsonText = JSON.stringify(predictions);

    // Save the new predictions in the local storage
    localStorage.setItem("predictions", jsonText);
}

// Setup all copy buttons in the table
function setupTableCopyBtn() {
    // Select all buttons
    let tableBtnCopy = document.querySelectorAll(".table-copy-btn");

    tableBtnCopy.forEach(button => {
        // Add click event to each button
        button.addEventListener("click", () => {

            // Get the ID of the text element to copy from the data-clipboard-id attribute
            let textElementID = button.getAttribute("data-clipboard-id");

            // Get the text content of the element
            let textToCopy = document.getElementById(textElementID).textContent;

            // Copy the text to the clipboard
            copyTextClipboard(textToCopy, tableFeedBack);
        });
    });
}

// Function to add rows to the table
function showResultsTable() {
    // Get the data
    let data = JSON.parse(localStorage.getItem("predictions")) || [];

    // Clear existing rows
    tBody.innerHTML = "";

    // Ensure we have data
    if (data.length > 0) {
        // Iterate over the results and add rows to table
        data.forEach((item, index) => {
            let row = document.createElement("tr");
            row.setAttribute("scope", "row");

            // Insert the date and time 
            let datetimeCell = document.createElement("td");
            datetimeCell.classList.add("hide-on-small");
            datetimeCell.textContent = item.datetime;
            row.appendChild(datetimeCell);

            // Insert the text
            let textCell = document.createElement("td");
            textCell.id = `text-${index + 1}`;
            textCell.classList.add("truncate-text");
            textCell.textContent = item.text;
            row.appendChild(textCell);

            // Setup button to copy text
            let buttonCell = document.createElement("td");
            let button = document.createElement("button");
            button.id = `copy-btn-${index + 1}`;
            button.setAttribute("data-clipboard-id", `text-${index + 1}`);
            button.classList.add("table-copy-btn");
            button.textContent = "Copy text";
            buttonCell.appendChild(button);
            row.appendChild(buttonCell);

            tBody.appendChild(row);
        });
        // Setup copy text button
        setupTableCopyBtn();
    }
}
// Call function
showResultsTable();

// Function to get text from the OCR.Space API response
function extractTextFromApi(jsonResponse, mainKey="ParsedResults", textKey="ParsedText") {
     // Ensure that we have a valid JSON response
    if (!jsonResponse) return null;
    
    // Check if the mainKey exists in the jsonResponse and has at least one element
    if (mainKey in jsonResponse && jsonResponse[mainKey].length > 0) {
        // Check if the first element contains the textKey
        if (textKey in jsonResponse[mainKey][0]) {
            const text = jsonResponse[mainKey][0][textKey];
            // Return the text if it exists
            return text || null; // Return null if text is undefined or null
        }
    }
    // Return null if the mainKey is not present or if there are no elements
    return null; 
}

// Define OCR.Space API URL
// https://ocr.space/
const ocrUrl = 'https://api.ocr.space/parse/image';

// Function to handle file upload to OCR Space API
const apiKey = atob("Szg4MTI5MjIzMzg4OTU3")
async function handleFileUpload(file, overlay=false, api_key=apiKey, language="eng") {
    // Ensure files are valid
    if (file.length === 0) {
        showFeedback("Please provide at least one file.", "error", userFeedBack);
        return;
    }

    // Set the language, defaulting to English if no selection is made
    language = modelLang || "eng";

    // Construct a set of key/value pairs
    let formData = new FormData();
    formData.append('file', file[0]);
    // Append the OCR model 
    //formData.append("ocrModel", ocrModel.value);

    // Show info message processing
    showFeedback("Processing your request...", "info", userFeedBack);

    // Using AJAX for submitting the form (code modified from GPT4)
    try {
        let response = await fetch(ocrUrl, {
            method: "POST",
            headers: {
                "isOverlayRequired": overlay,
                "apikey": api_key,
                "language": language,
                "OCREngine": 2,
            },
            body: formData,
        });

        let result = await response.json();

        // Ensure response is valid
        if (!response.ok) {
            showFeedback(result.error, "error", userFeedBack);
            return;
        }

        // Access data
        if (result) {
            let text = extractTextFromApi(jsonResponce=result);
             // Ensure we have some text to display
            if (!text || text.trim() == "") {
                showFeedback("No text.", "info", userFeedBack); 
                return
            }
            typeText(text, animatedText);
            saveToLocaleStorage(text)
            showResultsTable();
            showFeedback("Successfully performed OCR.", "success", userFeedBack);

            // Clear file input after OCR is done
            fileInput.value = "";
           
        }
    } catch (error) {
        showFeedback("Invalid request.", "error", userFeedBack);
    }
}


// Handle form submission via AJAX 
uploadFile.addEventListener("submit", async (event) => {
    // Prevent the form from submitting
    event.preventDefault();

    let files;
    try {
        files = fileInput.files;
    } catch (error) {
        console.error("Error accessing files:", error);
        showFeedback("Please provide at least one file.", "error", userFeedBack);
        return;
    }
    handleFileUpload(files);
});

// Function to copy text inside the Clipboard 
function copyTextClipboard(text, element) {
    // Replace "\n" by a space
    text = text.replace("\n", " ");

    navigator.clipboard.writeText(text)
        .then(() => {
            showFeedback("Text copied", "info", element);
        })
        .catch(err => {
            showFeedback("Failed to copy text", "error", element);
        });
}

// Button to copy text 
btnCopy.addEventListener("click", () => {
    if (!saveText) {
        showFeedback("No text to copy", "info", userFeedBack);
        return;
    }

    // Copy text inside the Clipboard
    copyTextClipboard(saveText, userFeedBack);
});

// Function to show a message for a specified duration
function showMessageFor(element, message, time=5000) {
    // Display the message
    element.innerText = message;
    setTimeout(() => {
        // Clear the message
        element.innerText = "";
    }, time);
}

// Setup button to remove cookie and user data from database
deleteBtn.addEventListener("click", async () => {
    // Clear any previous response 
    deleteResponse.innerText = "";

    if (localStorage.getItem("predictions")) {
        // Clear local storage user data
        localStorage.removeItem("predictions");
        // Update table
        showResultsTable(); 
        // Show user feedback
        showMessageFor(deleteResponse, "All data deleted");
    } 
    else {
        showMessageFor(deleteResponse, "Already removed user data.");
    }
});


/* Function to manage local storage  */
// Function runs every hour and clean entries older than two hours ago from the local storage
function cleanStorage(timeToSubtract) {
    // Calculate the time two hour ago
    const twoHoursAgo = new Date(datetime.getTime() - timeToSubtract);

    // Retrieve existing predictions from local storage
    const storedPredictions = localStorage.getItem("predictions");
    // Ensure we have predictions
    if (storedPredictions) {
        // Parse the existing JSON string to get the array of predictions
        let pred = JSON.parse(storedPredictions);

        
        // Filter the pred array to remove entries older than two hours ago
        pred = pred.filter(({ datetime }) => {
            // Parse the formatted datetime string back to a Date object
            const [datePart, timePart] = datetime.split(' ');
            const [month, day, year] = datePart.split('/');
            const [hours, minutes, seconds] = timePart.split(':');
            const predictionDate = new Date(year, month - 1, day, hours, minutes, seconds);

            return predictionDate >= twoHoursAgo;
        });

        // Convert the updated predictions array to a JSON string
        const jsonText = JSON.stringify(predictions);

        // Save the updated predictions in local storage
        localStorage.setItem('predictions', jsonText);

        // Update the table
        showResultsTable();
    } 
}

// Initialize hours in milliseconds
const oneHour = 3600000 // 3600000 milliseconds = 1 hour
const twoHour = 7200000 // 7200000 is milliseconds or 2 hours
// Call the cleanStorage every hour
setInterval(() => {
    cleanStorage(timeToSubtract=twoHour);
}, oneHour);


// Footer
// Get the footerDate element by its id
const footerDate = document.getElementById("footerDate");
// Populate the footerDate element with the current year
footerDate.innerHTML = `Web OCR &copy - ${datetime.getFullYear()}`;