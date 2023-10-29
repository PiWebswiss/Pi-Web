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

// Start of the text animation script
const text = document.getElementById("textAnimation");
const strText = text.textContent;
const splitText = strText.split("");
text.textContent = ""; // Clear the existing text content

// Create a span for each character in the text
for(let i = 0; i < splitText.length; i++) {
  // Create a span and set its text content
  const span = document.createElement('span');
  span.textContent = splitText[i];
  
  // Add the 'title-span' class to the span
  span.className = 'title-span';
  
  // Append the span to the 'text' element
  text.appendChild(span);
}

// Initialize the character position and create a timer for the animation effect
let char = 0;
let timer = setInterval(onTick, 50);

// Function that performs the animation step
function onTick(){
  // Avoid errors when the character index is out of range
  if(char < splitText.length) {
    const span = text.querySelectorAll('span')[char];
    span.classList.add('fade'); // Add the 'fade' class to trigger the CSS transition
    char++;
  } 
  if(char === splitText.length){
    complete(); // End the animation when the last character has been processed
    return;
  }
}

// Function to execute when the animation is complete
function complete(){
  clearInterval(timer); // Clear the interval timer
  timer = null;
}


/* mail */
const mail = document.getElementById("mail");
mail.addEventListener("click", function() {location.href = "mailto:pi.web%40piweb.ch"})
const span1 = gt("span", "Contact me by email:", {className: "title-big"});
const span2 = gt("span", "pi.web@piweb.ch", {className: "mail-text-color title-big"})
mail.appendChild(span1);
mail.appendChild(span2);


/* mail button */
const btnMail = document.getElementById("btnMail");
const newButton = document.createElement("button");
newButton.addEventListener("click", function() {
    location.href = "mailto:pi.web%40piweb.ch";
});
newButton.textContent = "Send me a mail";
newButton.className = "button-big padding";
btnMail.appendChild(newButton);


/* footer */
const d = new Date();
const footer = document.getElementById("footerPage");
const a = gt("a", "PIWeb", { href: "#", className: "a-decoration hover-link"});
const span = gt("span", "© " + d.getFullYear() + " Copyright : Powered by ", {className: "no-transition white"});
const p = gt("p", [span, a])
footer.appendChild(p);