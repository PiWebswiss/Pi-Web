window.addEventListener('scroll', function(e) {
  
  target = document.querySelectorAll('.scroll');
  
  index =  0, length = target.length;

  for (index; index < length; index++) {
      rate = window.pageYOffset * target[index].dataset.rate;
      target[index].style.transform = 'translate3d(0px,'+rate+'px, 0px)';
  }
});
 
function navMobile() {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else { 
    x.className = x.className.replace(" w3-show", "");
  }
}

// Change style of navbar on scroll
window.onscroll = function() {myFunction()};
function myFunction() {
    let navbar = document.getElementById("myNavbar");
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        navbar.className = "w3-bar" + " w3-card" + " w3-animate-top" + " w3-black" ;
    } else {
        navbar.className = navbar.className.replace(" w3-card w3-animate-top w3-black", "");
    }
}


/* footer */
const d = new Date();
const footer = document.getElementById("footerPage");
const a = gt("a", "PIWeb", { href: "https://piweb.ch", className: "w3-hover-text-blue"});
const span = gt("span", "© " + d.getFullYear() + " Copyright : Powered by ");
const p = gt("p", [span, a]);
footer.appendChild(p);
