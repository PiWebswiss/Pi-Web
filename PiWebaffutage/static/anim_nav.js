/* paralax animation */
window.addEventListener('scroll', function(e) {
  
    target = document.querySelectorAll('.scroll');
    
    index =  0, length = target.length;
  
    for (index; index < length; index++) {
        rate = window.pageYOffset * target[index].dataset.rate;
        target[index].style.transform = 'translate3d(0px,'+rate+'px, 0px)';
    }
  });



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