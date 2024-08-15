document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById("doomscrolling-video");
    const textContainer = document.querySelector(".text-container");

    // Set the duration for the fade effect (adjust as needed)
    const fadeDuration = 2000; // 4 seconds
    const textFadeDelay = 500; // 1 second delay before text fades in

    // Start the fade out effect a few seconds after the video starts playing
    setTimeout(() => {
        // Fade out the video container
        anime({
            targets: '.video-container',
            opacity: [1, 0],
            duration: fadeDuration,
            easing: 'easeInOutQuad',
            complete: function() {
                // After video fades out, start fading in the text after a small delay
                setTimeout(() => {
                    anime({
                        targets: '.text-container',
                        opacity: [0, 1],
                        duration: fadeDuration,
                        easing: 'easeInOutQuad'
                    });
                }, textFadeDelay);
            }
        });
    }, 100); // 2 seconds delay before starting the fade (adjust as needed)
});
