window.onload = function() {
    // [existing code for centerImageLink]

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
        audio.addEventListener('ended', function() {
            currentAudioIndex = (currentAudioIndex + 1) % audioFiles.length;
            audio.src = audioFiles[currentAudioIndex];
            audio.play();
        });
        audioInitialized = true;
    }

    function togglePlayPause() {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    }

    // Spacebar to initialize and play/pause
    window.addEventListener('keydown', function(e) {
        if (e.keyCode === 32) {
            e.preventDefault();
            if (!audioInitialized) {
                initializeAudio();
                audio.play();
            } else {
                togglePlayPause();
            }
        }
    });
};
