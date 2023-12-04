window.onload = function() {
    // Countdown Timer Code
    var centerImageLink = document.getElementById('centerImageLink');
    var countdown = document.getElementById('countdown');

    centerImageLink.classList.add('disabled');
    centerImageLink.querySelector('.center-img').addEventListener('animationend', function() {
        centerImageLink.classList.remove('disabled');
        startCountdown(); 
    });

    function startCountdown() {
        var endDate = new Date('December 5, 2023 09:01:00 EST');
        var interval = setInterval(function() {
            var currentDate = new Date();
            var timeLeft = endDate - currentDate;

            if (timeLeft <= 0) {
                clearInterval(interval);
                countdown.innerHTML = '00:00:00';
            } else {
                var totalSeconds = Math.ceil(timeLeft / 1000);
                var hours = Math.floor(totalSeconds / 3600);
                var minutes = Math.floor((totalSeconds % 3600) / 60);
                var seconds = totalSeconds % 60;

                countdown.innerHTML = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);
            }
        }, 1000);
    }

    function formatTime(time) {
        return time < 10 ? '0' + time : time;
    }

    // Audio Playback Functionality
    var audioFiles = [
        'audio/song1.mp3'
        // Add more file paths as needed
    ];

    var currentAudioIndex = 0;
    var audio = new Audio();
    audio.volume = 0.5; // Set volume to half

    function playNextAudio() {
        if (currentAudioIndex >= audioFiles.length) {
            currentAudioIndex = 0; // Reset to the first file if we've reached the end
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
    playNextAudio(); // Start playing the first audio file
};
