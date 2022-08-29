let url = window.location.href + "";
if(url.indexOf("http://") === 0) window.location.href = url.replace("http://", "https://");


/* utility */
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


/* footer */
const d = new Date();
const footer = document.getElementById("footerPage");
const a = gt("a", "PIWeb", { href: "https://piweb.ch/"});
const span = gt("span", "© " + d.getFullYear() + " Copyright : Powered by ", { className: "no-transition white"});
const p = gt("p", [span, a])
footer.appendChild(p);