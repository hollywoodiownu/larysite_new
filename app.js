window.onload = function() {
    var centerImageLink = document.getElementById('centerImageLink');
    var countdown = document.getElementById('countdown');

    // Initially set the links as disabled
    centerImageLink.classList.add('disabled');

    // Wait for the fade-in animation to complete for the center image
    centerImageLink.querySelector('.center-img').addEventListener('animationend', function() {
        centerImageLink.classList.remove('disabled');
        startCountdown(); // Start the countdown when the animation ends
    });

    // Countdown function
    function startCountdown() {
        var endDate = new Date('2023-12-05T09:00:00Z'); // Set the end date and time
        var interval = setInterval(function() {
            var currentDate = new Date();
            var timeLeft = endDate - currentDate;
            if (timeLeft <= 0) {
                clearInterval(interval);
                countdown.innerHTML = '00:00:00'; // Timer reached zero
            } else {
                var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                countdown.innerHTML = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);
            }
        }, 1000);
    }

    // Function to format time as "00"
    function formatTime(time) {
        return time < 10 ? '0' + time : time;
    }
};
