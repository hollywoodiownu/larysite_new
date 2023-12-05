window.onload = function() {
    var centerImageLink = document.getElementById('centerImageLink');

    centerImageLink.classList.add('disabled');
    centerImageLink.querySelector('.center-img').addEventListener('animationend', function() {
        centerImageLink.classList.remove('disabled');
    });

    // Audio Playback Functionality
    var audioFiles = [
        'audio/song1.mp3',
        'audio/song2.mp3',
        'audio/song3.mp3'
        // Add more file paths as needed
    ];

    var currentAudioIndex = 0;
    var audio = new Audio();
    audio.volume = 0.5;

    function playNextAudio() {
        if (currentAudioIndex >= audioFiles.length) {
            currentAudioIndex = 0;
        }

        audio.src = audioFiles[currentAudioIndex];
        audio.play().then(() => {
            console.log("Playing:", audioFiles[currentAudioIndex]);
        }).catch(e => {
            console.error("Failed to play:", e);
        });

        currentAudioIndex++;
    }

    audio.addEventListener('ended', playNextAudio);

    // Spacebar to play/pause
    window.addEventListener('keydown', function(e) {
        if (e.keyCode === 32) { // Spacebar keycode is 32
            e.preventDefault(); // Prevent default spacebar action (scrolling)
            if (audio.paused) {
                playNextAudio();
            } else {
                audio.pause();
            }
        }
    });
};
