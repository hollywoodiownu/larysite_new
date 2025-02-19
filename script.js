document.addEventListener("DOMContentLoaded", function () {
    const warningScreen = document.querySelector(".warning-screen");
    const warningImg = document.querySelector(".warning-img");
    const introScreen = document.querySelector(".intro");
    const container = document.querySelector(".container");
    const liveStreamBtn = document.querySelector(".live-stream-btn");

    if (warningImg) {
        warningImg.addEventListener("click", function () {
            warningScreen.style.opacity = "0";

            // 🔥 Immediately show blurred Hollywood intro
            introScreen.style.display = "flex"; 
            setTimeout(() => {
                introScreen.style.opacity = "1"; 
            }, 100);

            setTimeout(() => {
                warningScreen.style.display = "none";

                setTimeout(() => {
                    introScreen.style.opacity = "0";
                    setTimeout(() => {
                        introScreen.style.display = "none";
                        container.style.display = "flex";
                        liveStreamBtn.classList.remove("hidden");

                        setTimeout(() => {
                            container.style.opacity = "1";
                            container.style.transform = "translate(-50%, -50%) scale(1)";
                        }, 100);
                    }, 1000);
                }, 3000);
            }, 500);
        });
    }

    // **🔥 Disable Zooming Everywhere 🔥**
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

    // **🔥 Livestream Page Fix 🔥**
    if (document.body.classList.contains("livestream")) {
        document.documentElement.style.overflow = "hidden";
        document.documentElement.style.touchAction = "none";

        let backButton = document.querySelector(".back-btn");
        if (backButton) {
            backButton.style.pointerEvents = "auto";
        }

        // **🔥 Completely Kill Zooming Inside the Iframe 🔥**
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



document.addEventListener("DOMContentLoaded", function () {
    // 🔥 Magic Mouse Trail Effect
    document.addEventListener("mousemove", function (e) {
        for (let i = 0; i < 3; i++) { // Creates 3 particles per move
            let trail = document.createElement("div");
            trail.classList.add("magic-trail");
            document.body.appendChild(trail);

            // Random offset for a more natural effect
            let offsetX = (Math.random() - 0.5) * 20;
            let offsetY = (Math.random() - 0.5) * 20;

            // Set position
            trail.style.left = `${e.clientX + offsetX}px`;
            trail.style.top = `${e.clientY + offsetY}px`;

            // Remove after animation
            setTimeout(() => {
                trail.remove();
            }, 800);
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const cursorCur = "https://hollywoodiownu.github.io/larysite_new/img/wand_1.cur";
    const cursorPng = "https://hollywoodiownu.github.io/larysite_new/img/wand_1.png";

    // Test if .cur works
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
