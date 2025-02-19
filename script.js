document.addEventListener("DOMContentLoaded", function () {
    /********************************************************
     * 🔥 1. AUDIO LOGIC (song2.mp3 at volume 0.2)
     ********************************************************/
    const audio = new Audio("audio/song2.mp3");
    audio.volume = 0.2;

    function playSong() {
        audio.play().catch(err => console.log("Autoplay blocked:", err));
    }

    // Space key toggles pause/play
    document.addEventListener("keydown", function (event) {
        if (event.key === " ") {
            event.preventDefault();
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        }
    });

    /********************************************************
     * 🔥 2. WARNING SCREEN → INTRO → MAIN PAGE
     ********************************************************/
    const warningScreen = document.querySelector(".warning-screen");
    const warningImg = document.querySelector(".warning-img");
    const introScreen = document.querySelector(".intro");
    const introText = document.querySelector(".intro-text");       // HOLLYWOODIOWNU
    const introLogo = document.querySelector(".intro-logo");       // larygarymods_main.png
    const container = document.querySelector(".container");
    const liveStreamBtn = document.querySelector(".live-stream-btn");

    let introPlayed = false; // Prevents multiple clicks restarting

    if (warningImg) {
        warningImg.addEventListener("click", function () {
            if (introPlayed) return; // Stop if already played
            introPlayed = true;

            // Start music
            playSong();

            // Fade out warning screen
            warningScreen.style.opacity = "0";

            // Show intro screen
            introScreen.style.display = "flex";
            setTimeout(() => {
                introScreen.style.opacity = "1";
            }, 100);

            setTimeout(() => {
                // Remove warning screen from DOM
                warningScreen.style.display = "none";

                // Step A: Fade in HOLLYWOODIOWNU
                introText.style.display = "block";
                setTimeout(() => {
                    introText.style.opacity = "1";
                    introText.style.transform = "scale(1)";
                }, 100);

                // Wait 1.5s, then fade it out
                setTimeout(() => {
                    introText.style.opacity = "0";
                    introText.style.transform = "scale(1.05)";

                    setTimeout(() => {
                        introText.style.display = "none";

                        // Step B: Fade in larygarymods_main.png
                        introLogo.classList.remove("hidden");
                        introLogo.style.display = "block";
                        setTimeout(() => {
                            introLogo.style.opacity = "1";
                            introLogo.style.transform = "scale(1)";
                        }, 100);

                        // Wait 1.5s, then fade out logo
                        setTimeout(() => {
                            introLogo.style.opacity = "0";
                            introLogo.style.transform = "scale(1.05)";

                            setTimeout(() => {
                                // Hide intro, show main container
                                introScreen.style.display = "none";
                                container.style.display = "flex";
                                liveStreamBtn.classList.remove("hidden");

                                // Fade in container
                                setTimeout(() => {
                                    container.style.opacity = "1";
                                    container.style.transform = "translate(-50%, -50%) scale(1)";
                                }, 100);
                            }, 600); // Logo fade-out
                        }, 1500); // Logo hold
                    }, 600); // HOLLYWOODIOWNU fade-out complete
                }, 1500); // HOLLYWOODIOWNU hold
            }, 500);
        });
    }

    /********************************************************
     * 🔥 3. DISABLE ZOOMING EVERYWHERE
     ********************************************************/
    function disableZoom(event) {
        if (event.ctrlKey || event.metaKey || event.deltaY) {
            event.preventDefault();
        }
    }
    document.addEventListener("wheel", disableZoom, { passive: false });
    document.addEventListener("keydown", function (event) {
        if (event.ctrlKey && (event.key === "+" || event.key === "-" || event.key === "0")) {
            event.preventDefault();
        }
    });
    document.addEventListener("gesturestart", function (event) {
        event.preventDefault();
    });
    document.addEventListener("dblclick", function (event) {
        event.preventDefault();
    });
    document.addEventListener("touchmove", function (event) {
        if (event.scale !== 1) {
            event.preventDefault();
        }
    }, { passive: false });

    document.documentElement.style.zoom = "reset";

    // LIVESTREAM PAGE FIX
    if (document.body.classList.contains("livestream")) {
        document.documentElement.style.overflow = "hidden";
        document.documentElement.style.touchAction = "none";
        let backButton = document.querySelector(".back-btn");
        if (backButton) {
            backButton.style.pointerEvents = "auto";
        }
        let iframe = document.querySelector("#kick-stream");
        if (iframe) {
            iframe.style.pointerEvents = "none";
        }
        let streamBox = document.querySelector("#stream-box");
        if (streamBox) {
            streamBox.style.pointerEvents = "none";
        }
    }
});

/********************************************************
 * 🔥 4. MAGIC MOUSE TRAIL
 ********************************************************/
document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("mousemove", function (e) {
        for (let i = 0; i < 3; i++) {
            let trail = document.createElement("div");
            trail.classList.add("magic-trail");
            document.body.appendChild(trail);

            let offsetX = (Math.random() - 0.5) * 20;
            let offsetY = (Math.random() - 0.5) * 20;

            trail.style.left = `${e.clientX + offsetX}px`;
            trail.style.top = `${e.clientY + offsetY}px`;

            setTimeout(() => {
                trail.remove();
            }, 800);
        }
    });
});

/********************************************************
 * 🔥 5. CUSTOM CURSOR (.cur → fallback .png)
 ********************************************************/
document.addEventListener("DOMContentLoaded", function () {
    const cursorCur = "https://hollywoodiownu.github.io/larysite_new/img/wand_1.cur";
    const cursorPng = "https://hollywoodiownu.github.io/larysite_new/img/wand_1.png";

    let testCursor = new Image();
    testCursor.src = cursorCur;
    testCursor.onload = function () {
        document.body.style.cursor = `url('${cursorCur}'), auto`;
    };
    testCursor.onerror = function () {
        console.warn("CUR file failed, falling back to PNG...");
        document.body.style.cursor = `url('${cursorPng}') 25 25, auto`;
    };
});
