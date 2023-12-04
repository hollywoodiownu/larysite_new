window.onload = function() {
    var centerImgLink = document.getElementById('centerImageLink');
    var centerImg = centerImgLink.querySelector('img');

    // Wait for the fade-in animation to complete
    centerImg.addEventListener('animationend', function() {
        centerImgLink.classList.remove('disabled');
    });

    // Initially set the link as disabled
    centerImgLink.classList.add('disabled');
};
