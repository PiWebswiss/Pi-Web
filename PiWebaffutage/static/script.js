function navMobile() {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else { 
    x.className = x.className.replace(" w3-show", "");
  }
}


window.gt = (tag, children, attributes) => {
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


/* footer */
const d = new Date();
const footer = document.getElementById("footerPage");
const a = gt("a", "PiWeb", { href: "https://piweb.ch", className: "w3-hover-text-blue"});
const span = gt("span", "© " + d.getFullYear() + " Copyright : Powered by ");
const p = gt("p", [span, a]);
footer.appendChild(p);
