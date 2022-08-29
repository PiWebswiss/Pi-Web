let url = window.location.href + "";
if(url.indexOf("http://") === 0) window.location.href = url.replace("http://", "https://");

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


const text = document.getElementById("textAnimation");
const strText = text.textContent;
const splitText = strText.split("");
text.textContent = "";
for(let i = 0; i < splitText.length; i++) {
  text.innerHTML += "<span>" + splitText[i] + "</span>";
}

let char = 0;
let timer = setInterval(onTick, 50);

function onTick(){
  const span = text.querySelectorAll('span')[char];
  span.classList.add('fade');
  char++ 
  if(char === splitText.length){
    complete();
    return;
  }
}

function complete(){
  clearInterval(timer);
  timer = null;
}

/* mail */
const btnMail = document.getElementById("btnMail");
btnMail.addEventListener("click", function() {location.href = "mailto:pi.web%40piweb.ch"});

const mail = document.getElementById("mail");
mail.innerText = "Mail: pi.web@piweb.ch";
mail.className = "mail-text-color";
/* to remove !!!!! */
console.log("to remove !", encodeURIComponent("pi.web@piweb.ch"))

/* footer */
const d = new Date();
const footer = document.getElementById("footerPage");
const a = gt("a", "PIWeb", { href: "#", className: "a-decoration"});
const span = gt("span", "© " + d.getFullYear() + " Copyright : Powered by ", { className: "no-transition white"});
const p = gt("p", [span, a])
footer.appendChild(p);