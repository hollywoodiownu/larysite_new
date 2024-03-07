window.onload = function() {
    var audioFiles = ['song1.mp3', 'song2.mp3', 'song3.mp3'];
    var currentAudioIndex = 0;
    var audioInitialized = false;
    var audio = new Audio();
    audio.volume = 0.5;

    var duckSound = new Audio('ducksoundnew.mp3');

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

    // Play the duck sound when the duck image is clicked
    document.querySelector('.duck').addEventListener('click', function() {
        duckSound.play();
    });

    // Space key to toggle play/pause
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space') {
            togglePlayPause();
        }
    });

    // Disable zoom controls
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey === true || e.metaKey === true) && (e.which === 61 || e.which === 107 || e.which === 173 || e.which === 109 || e.which === 187  || e.which === 189 )) {
            e.preventDefault();
        }
    }, false);

    document.addEventListener('wheel', function(e) {
        if (e.ctrlKey === true) {
            e.preventDefault();
        }
    }, { passive: false });

    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(e) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
};
