document.addEventListener("DOMContentLoaded", function() {
    const videoContainer = document.querySelector(".video-container");
    const textContainer = document.querySelector(".text-container");
    const infoContainer = document.querySelector(".info-container");
    const rollingText = document.getElementById("rolling-text");
    const words = ["FOCUS", "DOPAMINE", "MIND", "RELATIONS"];
    let currentIndex = 0;

    // Set the duration for the fade effects
    const videoFadeDuration = 1000; // 1 second for video fade out
    const textFadeDuration = 500;   // 0.5 seconds for text fade in and out
    const infoFadeDuration = 500;   // 0.5 seconds for info fade in
    const rollingTextInterval = 1500; // 1.5 seconds for each word display

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

    }, 100); // Start the fade effect after 0.1 seconds (adjust as needed)

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
                duration: textFadeDuration,
                easing: 'easeInOutQuad',
                complete: function() {
                    // Fade in the info container after the text container fades out
                    anime({
                        targets: '.info-container',
                        opacity: [0, 1],
                        duration: infoFadeDuration,
                        easing: 'easeInOutQuad'
                    });
                }
            });
        }, rollingTextDuration); // Wait until all rolling text items have been displayed
    }
});
// script.js
document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector('.explosion-button');
    const numParticles = 30; // Reduced the number of particles for better performance

    // Create particles
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particles');
        button.appendChild(particle);
    }

    const particles = document.querySelectorAll('.particles');

    button.addEventListener('mouseenter', function() {
        anime({
            targets: particles,
            opacity: 1,
            translateX: () => anime.random(-100, 100),
            translateY: () => anime.random(-100, 100),
            scale: [0.2, 1],
            duration: 800,
            easing: 'easeOutExpo',
            delay: anime.stagger(10) // Spread out the start times slightly
        });

        anime({
            targets: '.explosion-button',
            scale: [1, 1.1],
            duration: 300,
            easing: 'easeInOutQuad'
        });
    });

    button.addEventListener('mouseleave', function() {
        anime({
            targets: particles,
            opacity: 0,
            translateX: 0,
            translateY: 0,
            scale: [1, 0.2],
            duration: 600,
            easing: 'easeInOutExpo',
            delay: anime.stagger(10) // Spread out the start times slightly
        });

        anime({
            targets: '.explosion-button',
            scale: [1.1, 1],
            duration: 300,
            easing: 'easeInOutQuad'
        });
    });
});
