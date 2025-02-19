document.addEventListener("DOMContentLoaded", function () {
    /********************************************************
     * 🔥 A) PRELOAD IMAGES
     ********************************************************/
    const imagesToPreload = [
        "img/larygarymods_main.png",
        "img/warning_1.png", 
        // Add any other images you need preloaded
        "img/profile.png", 
        // etc...
    ];

    // Preload them all before user clicks
    let loadedCount = 0;
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            loadedCount++;
            console.log(`${src} loaded (${loadedCount}/${imagesToPreload.length})`);
        };
    });

    /********************************************************
     * 🔥 1. AUDIO LOGIC (song2.mp3 at volume 0.2)
     ********************************************************/
    const audio = new Audio("audio/song2.mp3");
    audio.volume = 0.2;

    function playSong() {
        audio.play().catch(err => console.log("Autoplay blocked:", err));
    }

    // Press Space to Pause/Play
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
    const introText = document.querySelector(".intro-text");  // HOLLYWOODIOWNU
    const introLogo = document.querySelector(".intro-logo");  // larygarymods_main.png

    const container = document.querySelector(".container");
    const liveStreamBtn = document.querySelector(".live-stream-btn");

    let introPlayed = false; // Prevent multiple clicks

    if (warningImg) {
        warningImg.addEventListener("click", function () {
            // Only run once
            if (introPlayed) return;
            introPlayed = true;

            // ✅ Start music on user click
            playSong();

            // ✅ Fade out warning screen
            warningScreen.style.opacity = "0";

            // ✅ Show intro background
            introScreen.style.display = "flex";
            setTimeout(() => {
                introScreen.style.opacity = "1";
            }, 100);

            // ✅ Remove warning screen from DOM after 0.5s
            setTimeout(() => {
                warningScreen.style.display = "none";

                /*******************************
                 *  STEP A: HOLLYWOODIOWNU
                 *******************************/
                introText.style.display = "block";
                setTimeout(() => {
                    introText.style.opacity = "1";
                    introText.style.transform = "scale(1)";
                }, 100);

                // Hold text at full opacity for 1.2s
                setTimeout(() => {
                    // Fade out text (1.2s)
                    introText.style.opacity = "0";
                    introText.style.transform = "scale(1.05)";

                    setTimeout(() => {
                        introText.style.display = "none";

                        /*******************************
                         *  STEP B: larygarymods_main.png
                         *******************************/
                        introLogo.classList.remove("hidden");
                        introLogo.style.display = "block";
                        setTimeout(() => {
                            introLogo.style.opacity = "1";
                            introLogo.style.transform = "scale(1)";
                        }, 100);

                        // Hold logo for 1.2s
                        setTimeout(() => {
                            // Fade out logo (1.2s)
                            introLogo.style.opacity = "0";
                            introLogo.style.transform = "scale(1.05)";

                            setTimeout(() => {
                                // Hide intro screen entirely
                                introScreen.style.display = "none";

                                // Show main container
                                container.style.display = "flex";
                                liveStreamBtn.classList.remove("hidden");

                                // Fade in container
                                setTimeout(() => {
                                    container.style.opacity = "1";
                                    container.style.transform = "translate(-50%, -50%) scale(1)";
                                }, 100);

                            }, 1200); // logo fade-out
                        }, 1200); // logo hold
                    }, 1200); // text fade-out
                }, 1200); // text hold

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
