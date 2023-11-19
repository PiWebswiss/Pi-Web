// Select the element that you want to animate
const element = document.querySelector('.scroll');

// Set the initial state of the animation
element.style.transform = 'translateY(100%)';

// Set up a function to update the state of the animation
function updateAnimation() {
  // Calculate the percentage of the page that has been scrolled
  const scrollPercentage = (window.scrollY / (document.body.offsetHeight - window.innerHeight)) * 100;

  // Update the state of the animation based on the scroll percentage
  element.style.transform = `translateY(${100 - scrollPercentage}%)`;
}

// Listen for the scroll event and update the animation on each scroll
window.addEventListener('scroll', updateAnimation);




// Change style of navbar on scroll
window.onscroll = function() {nav_anim()};
function nav_anim() {
    let navbar = document.getElementById("myNavbar");
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        navbar.className = "w3-bar" + " w3-card" + " w3-animate-top" + " w3-black" ;
    } else {
        navbar.className = navbar.className.replace(" w3-card w3-animate-top w3-black", "");
    }
}