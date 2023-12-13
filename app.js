

    // Audio Playback Functionality
    var audioFiles = [
        'audio/song1.mp3',
        'audio/song2.mp3',
        'audio/song3.mp3'
        // Add more file paths as needed
    ];

    var currentAudioIndex = 0;
    var audioInitialized = false;
    var audio;

    function initializeAudio() {
        audio = new Audio();
        audio.volume = 0.5;
        audio.src = audioFiles[currentAudioIndex];
        audio.addEventListener('ended', playNextAudio);
        audioInitialized = true;
    }

    function playNextAudio() {
        currentAudioIndex = (currentAudioIndex + 1) % audioFiles.length;
        audio.src = audioFiles[currentAudioIndex];
        audio.play();
    }

    function togglePlayPause() {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    }

    // Keydown event listener for spacebar and right arrow
    window.addEventListener('keydown', function(e) {
        if (e.keyCode === 32) { // Spacebar
            e.preventDefault();
            if (!audioInitialized) {
                initializeAudio();
                audio.play();
            } else {
                togglePlayPause();
            }
        } else if (e.keyCode === 39) { // Right arrow key
            e.preventDefault();
            if (audioInitialized) {
                playNextAudio();
            }
        }
    });
};
