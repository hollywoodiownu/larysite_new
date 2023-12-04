window.onload = function() {
    var centerImageLink = document.getElementById('centerImageLink');
    var kickLink = document.getElementById('kickLink');

    // Initially set the links as disabled
    centerImageLink.classList.add('disabled');
    kickLink.classList.add('disabled');

    // Wait for the fade-in animation to complete for the center image
    centerImageLink.querySelector('.center-img').addEventListener('animationend', function() {
        centerImageLink.classList.remove('disabled');
    });

    // Wait for the fade-in animation to complete for the kick image
    kickLink.querySelector('.kick-img').addEventListener('animationend', function() {
        kickLink.classList.remove('disabled');
    });
};
