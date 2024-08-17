document.addEventListener("DOMContentLoaded", function() { 
    load_hamburger();
});

function load_hamburger(){
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.header');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    //const closeBtn = document.querySelector('.close-btn')
    let isDrawerOpen = false;
    anime({
        targets: '.header',
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeInOutQuad',
    });

    // Toggle the drawer menu when the hamburger is clicked
    hamburgerMenu.addEventListener('click', function() {
        if(isDrawerOpen){
            navLinks.classList.remove('active');
        }else{
             navLinks.classList.add('active');
        }
        isDrawerOpen = !isDrawerOpen;
    });

    
}