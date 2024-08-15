document.addEventListener("DOMContentLoaded", function() {
    const videoContainer = document.querySelector(".video-container");
    const textContainer = document.querySelector(".text-container");
    const rollingText = document.getElementById("rolling-text");
    const words = ["LIFE", "FAMILY", "CARRIER", "FOCUS", "ATTENTION", "MIND"];
    let currentIndex = 0;

    // Set the duration for the fade effect (adjust as needed)
    const fadeDuration = 2000; // 2 seconds for fade out
    const textFadeDelay = 200; // 0.2 seconds delay before text starts to fade in

    // Start the fade out effect immediately
    setTimeout(() => {
        // Fade out the video container
        anime({
            targets: '.video-container',
            opacity: [1, 0],
            duration: fadeDuration,
            easing: 'easeInOutQuad',
        });

        // Start fading in the text shortly after the video starts fading out
        setTimeout(() => {
            anime({
                targets: '.text-container',
                opacity: [0, 1],
                duration: fadeDuration,
                easing: 'easeInOutQuad',
                complete: function() {
                    // Start the rolling text effect after the initial fade-in
                    startRollingText();
                }
            });
        }, textFadeDelay);

    }, 100); // Start the fade effect after 0.1 seconds (adjust as needed)

    function startRollingText() {
        function updateRollingText() {
            // Animate out the current text
            anime({
                targets: '#rolling-text',
                translateY: -20,
                opacity: 0,
                duration: 500,
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
                                duration: 500,
                                easing: 'easeInOutQuad',
                            });
                        }
                    });
                }
            });
        }

        // Start the rolling effect with a delay
        setInterval(updateRollingText, 2000); // Change every 2 seconds
    }
});
