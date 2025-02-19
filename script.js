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
