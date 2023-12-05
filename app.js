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
    var audio;

    function playNextAudio() {
        if (!audio) {
            audio = new Audio();
            audio.volume = 0.5;
            audio.addEventListener('ended', playNextAudio);
        }

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

    // Spacebar to play/pause
    window.addEventListener('keydown', function(e) {
        if (e.keyCode === 32) {
            e.preventDefault();
            if (!audio || audio.paused) {
                playNextAudio();
            } else {
                audio.pause();
            }
        }
    });
};
