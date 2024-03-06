window.onload = function() {
    var audioFiles = ['audio/song1.mp3', 'audio/song2.mp3', 'audio/song3.mp3'];
    var duckElement = document.getElementById('duck-img');
    var duckSound = new Audio('audio/ducksoundnew.mp3'); // Replace with the correct path to your duck sound
    var currentAudioIndex = 0;
    var audioInitialized = false;
    var audio = new Audio();
    audio.volume = 0.5;

    function playNextAudio() {
        currentAudioIndex = (currentAudioIndex + 1) % audioFiles.length;
        audio.src = audioFiles[currentAudioIndex];
        audio.play();
    }

    duckElement.addEventListener('click', function() {
        duckSound.play();
    });

    function togglePlayPause() {
        if (!audioInitialized) {
            audio.src = audioFiles[currentAudioIndex];
            audio.addEventListener('ended', playNextAudio);
            audioInitialized = true;
        }
        audio.paused ? audio.play() : audio.pause();
    }

    // Disable Ctrl+Plus, Ctrl+Minus, Ctrl+Mousewheel for zoom control
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey === true || e.metaKey === true) && (e.which === 61 || e.which === 107 || e.which === 173 || e.which === 109 || e.which === 187  || e.which === 189 )) {
            e.preventDefault();
        }
    }, false);

    // Disable pinch zoom
    document.addEventListener('wheel', function(e) {
        if (e.ctrlKey === true) {
            e.preventDefault();
        }
    }, { passive: false });

    // Disable double-tap zoom for touch devices
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(e) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
};
