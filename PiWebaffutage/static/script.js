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



/* copyright */
const d = new Date();
const copyright = document.getElementById("footer-copyright");
const a = gt("a", "PIWeb.ch", { href: "#", className: "a-decoration hover-link"});
const span = gt("span", "© " + d.getFullYear() + " Copyright : ", {className: "no-transition"});
const p = gt("p", [span, a])
copyright.appendChild(p);