window.onload = function() {
    var centerImgLink = document.getElementById('centerImageLink');
    var centerImg = centerImgLink.querySelector('.center-img');
    var kickImg = document.getElementById('kick-img');

    // Wait for the fade-in animation to complete
    centerImg.addEventListener('animationend', function() {
        centerImgLink.classList.remove('disabled');
    });

    // Wait for the fade-in animation of the center image to complete
    centerImg.addEventListener('animationend', function() {
        kickImg.classList.remove('disabled');
    });

    // Initially set the links as disabled
    centerImgLink.classList.add('disabled');
    kickImg.classList.add('disabled');
};
