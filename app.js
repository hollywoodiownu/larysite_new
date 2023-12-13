window.onload = function() {
    var audioFiles = ['audio/song1.mp3', 'audio/song2.mp3', 'audio/song3.mp3'];
    var currentAudioIndex = 0;
    var audioInitialized = false;
    var audio = new Audio();
    audio.volume = 0.5;

    function playNextAudio() {
        currentAudioIndex = (currentAudioIndex + 1) % audioFiles.length;
        audio.src = audioFiles[currentAudioIndex];
        audio.play();
    }

    function togglePlayPause() {
        if (!audioInitialized) {
            audio.src = audioFiles[currentAudioIndex];
            audio.addEventListener('ended', playNextAudio);
            audioInitialized = true;
        }
        audio.paused ? audio.play() : audio.pause();
    }

    window.addEventListener('keydown', function(e) {
        if (e.keyCode === 32 || e.keyCode === 39) { // Spacebar or Right Arrow
            e.preventDefault();
            togglePlayPause();
        }
    });
};
