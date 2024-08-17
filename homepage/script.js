document.addEventListener("DOMContentLoaded", function() {
    const videoContainer = document.querySelector(".video-container");
    const textContainer = document.querySelector(".text-container");
    const infoContainer = document.querySelector(".info-container");
    const rollingText = document.getElementById("rolling-text");
    const loadingText = document.querySelector(".loading-text");
    const videoElement = document.querySelector("video");
    const words = ["FOCUS", "DOPAMINE", "MIND"];
    let currentIndex = 0;

    // Set the duration for the fade effects
    const videoFadeDuration = 2000; // 2 seconds for video fade out
    const textFadeDuration = 500;   // 0.5 seconds for text fade in and out
    const infoFadeDuration = 1000;  // 1 second for info fade in
    const rollingTextInterval = 1500; // 1.5 seconds for each word display

    disableScroll();

    document.getElementById("pre-register").addEventListener("click", function() {
        window.open("https://docs.google.com/forms/d/e/1FAIpQLSdQsZg-TdwJmGvHMKnWMSMhqcL_zJR5YzxxpGQ6eoa56iTTfw/alreadyresponded", "_blank");
    });

    // Wait until the video is fully loaded
    videoElement.addEventListener("loadeddata", function() {
        // Hide the loading text
        loadingText.style.display = "none";
        
        // Make the video visible
        videoContainer.style.display = "block";

        // Start the fade out effect immediately
        setTimeout(() => {
            // Fade out the video container
            anime({
                targets: '.video-container',
                opacity: [1, 0],
                duration: videoFadeDuration,
                easing: 'easeInOutQuad',
            });

            // Fade in the text container shortly after the video starts fading out
            anime({
                targets: '.text-container',
                opacity: [0, 1],
                duration: textFadeDuration,
                easing: 'easeInOutQuad',
                complete: function() {
                    // Start the rolling text effect after the text fades in
                    startRollingText();
                }
            });

        }, 100); // Start the fade effect after 0.1 seconds
    });

    function startRollingText() {
        function updateRollingText() {
            // Animate out the current text
            anime({
                targets: '#rolling-text',
                translateY: -20,
                opacity: 0,
                duration: 300, // 0.3 seconds for text fade out
                easing: 'easeInOutQuad',
                complete: function() {
                    // Update text to the next word
                    currentIndex = (currentIndex + 1) % words.length;
                    rollingText.textContent = words[currentIndex];

                    // Animate in the new text
                    anime({
                        targets: '#rolling-text',
                        translateY: 20, // Start from below
                        opacity: 0,
                        duration: 0, // Set the opacity to 0 immediately for the next animation
                        easing: 'easeInOutQuad',
                        complete: function() {
                            anime({
                                targets: '#rolling-text',
                                translateY: 0,
                                opacity: 1,
                                duration: 300, // 0.3 seconds for text fade in
                                easing: 'easeInOutQuad',
                            });
                        }
                    });
                }
            });
        }

        // Start the rolling effect and manage the total duration
        let rollingTextTimer = setInterval(updateRollingText, rollingTextInterval);

        // Calculate the total time to display all words
        const rollingTextDuration = rollingTextInterval * words.length;

        // After all words have been displayed, fade out the text container and fade in the info container
        setTimeout(() => {
            clearInterval(rollingTextTimer); // Stop rolling text updates

            // Ensure that text container fade-out starts only after all text has been displayed
            anime({
                targets: '.text-container',
                opacity: [1, 0],
                duration: 1000,
                easing: 'easeInOutQuad',
                complete: function() {
                    // Only remove the video container if it exists
                    if (videoContainer) {
                        videoContainer.remove();
                        enableScroll();
                    }
                    // Fade in the info container after the text container fades out
                    anime({
                        targets: '.info-container',
                        opacity: [0, 1],
                        duration: infoFadeDuration,
                        easing: 'easeInOutQuad',
                        complete: function() {
                            // Only remove the text container if it exists
                            if (textContainer) {
                                textContainer.remove();
                                attachScrollListener();
                                attachHoverListenerToSocialLinks()
                                load_hamburger();
                            }
                        }
                    });
                }
            });
        }, rollingTextDuration); // Wait until all rolling text items have been displayed
    }
});
function attachScrollListener(){
    const scrollMessage = document.getElementById('scroll-message');
    let lastScrollTop = null; // To keep track of the last scroll position
    let timeout;
    
    window.addEventListener('scroll', function() {
        clearTimeout(timeout);

        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop || lastScrollTop == null) { // Scrolling down
            scrollMessage.style.opacity = 1;
            scrollMessage.style.visibility = 'visible';

            timeout = setTimeout(function() {
                scrollMessage.style.opacity = 0;
                scrollMessage.style.visibility = 'hidden';
            }, 2000); // Message will disappear after 2 seconds
        } else { // Scrolling up
            scrollMessage.style.opacity = 0;
            scrollMessage.style.visibility = 'hidden';
        }

        lastScrollTop = scrollTop; // Update the last scroll position
    });

}

function disableScroll() {
    document.body.classList.add('no-scroll');
}

// Function to enable scrolling
function enableScroll() {
    document.body.classList.remove('no-scroll');
}

function attachHoverListenerToSocialLinks(){

    const socialLinks = document.querySelectorAll('.social-links a');

    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            anime({
                targets: link.querySelector('i'),
                scale: [1, 1.3],  // Scale the icon up a bit
                color: ['#fff', '#E7E0EC'],  // Change color
                duration: 300,
                easing: 'easeInOutQuad'
            });
        });

        link.addEventListener('mouseleave', () => {
            anime({
                targets: link.querySelector('i'),
                scale: [1.3, 1],  // Scale the icon back to normal
                color: ['#E7E0EC', '#fff'],  // Revert color
                duration: 300,
                easing: 'easeInOutQuad'
            });
        });
    });
}

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