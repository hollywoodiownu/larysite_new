document.addEventListener("DOMContentLoaded", function () {
    /********************************************************
     * 🔥 A) PRELOAD IMAGES
     ********************************************************/
    const imagesToPreload = [
        "img/larygarymods_main.png",
        "img/warning_1.png", 
        "img/profile.png", 
    ];

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
    const introText = document.querySelector(".intro-text");
    const introLogo = document.querySelector(".intro-logo");

    const container = document.querySelector(".container");
    const liveStreamBtn = document.querySelector(".live-stream-btn");

    let introPlayed = sessionStorage.getItem("introPlayed"); // Check sessionStorage

    if (!introPlayed) {
        sessionStorage.setItem("introPlayed", "true"); // Save session to prevent replay on back button

        if (warningImg) {
            warningImg.addEventListener("click", function () {
                playSong();

                warningScreen.style.opacity = "0";

                introScreen.style.display = "flex";
                setTimeout(() => {
                    introScreen.style.opacity = "1";
                }, 100);

                setTimeout(() => {
                    warningScreen.style.display = "none";

                    introText.style.display = "block";
                    setTimeout(() => {
                        introText.style.opacity = "1";
                        introText.style.transform = "scale(1)";
                    }, 100);

                    setTimeout(() => {
                        introText.style.opacity = "0";
                        introText.style.transform = "scale(1.05)";

                        setTimeout(() => {
                            introText.style.display = "none";
                            introLogo.classList.remove("hidden");
                            introLogo.style.display = "block";
                            setTimeout(() => {
                                introLogo.style.opacity = "1";
                                introLogo.style.transform = "scale(1)";
                            }, 100);

                            setTimeout(() => {
                                introLogo.style.opacity = "0";
                                introLogo.style.transform = "scale(1.05)";

                                setTimeout(() => {
                                    introScreen.style.display = "none";
                                    container.style.display = "flex";
                                    liveStreamBtn.classList.remove("hidden");

                                    setTimeout(() => {
                                        container.style.opacity = "1";
                                        container.style.transform = "translate(-50%, -50%) scale(1)";
                                    }, 100);

                                }, 1200);
                            }, 1200);
                        }, 1200);
                    }, 1200);
                }, 500);
            });
        }
    } else {
        // If intro already played, show main container immediately
        warningScreen.style.display = "none";
        introScreen.style.display = "none";
        container.style.display = "flex";
        liveStreamBtn.classList.remove("hidden");

        setTimeout(() => {
            container.style.opacity = "1";
            container.style.transform = "translate(-50%, -50%) scale(1)";
        }, 100);
    }

    /********************************************************
     * 🔥 3. BACK BUTTON - RETURN TO MAIN PAGE, NOT RESTART
     ********************************************************/
    const backButton = document.querySelector(".back-btn");
    if (backButton) {
        backButton.addEventListener("click", function (event) {
            event.preventDefault();
            sessionStorage.setItem("introPlayed", "true"); // Prevent intro from replaying

            window.location.href = "index.html"; // Redirect to main page
        });
    }

    /********************************************************
     * 🔥 4. DISABLE ZOOMING EVERYWHERE
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

    document.documentElement.style.zoom = "reset";

    // LIVESTREAM PAGE FIX
    if (document.body.classList.contains("livestream")) {
        document.documentElement.style.overflow = "hidden";
        document.documentElement.style.touchAction = "none";
    }
});

/********************************************************
 * 🔥 MAGIC MOUSE TRAIL
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
 * 🔥 CUSTOM CURSOR (.cur → fallback .png)
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


document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".container");

    function applyMobileFix() {
        if (window.innerWidth <= 768) {
            container.classList.add("show");
        }
    }

    applyMobileFix();
    window.addEventListener("resize", applyMobileFix);
});
