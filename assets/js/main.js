const slides = document.querySelectorAll('.slide');
const pauseButton = document.querySelector('#pause');
const previousButton = document.querySelector('#previous');
const nextButton = document.querySelector('#next');

// console.log(previousButton);
// console.log(nextButton);

let currentSlide = 0;
let slidesCount = slides.length;
let isPlaying = true;
let interval = null;

function goToSlide(n) {
    slides[currentSlide].classList.toggle('active');
    currentSlide = (n + slidesCount) % slidesCount;
    slides[currentSlide].classList.toggle('active');
}

function nextSlide() {
    goToSlide(currentSlide + 1);

}

function previousSlide() {
    goToSlide(currentSlide - 1);
}

function pause() {
    if(isPlaying) {
        clearInterval(interval);
        isPlaying = false;
        pauseButton.innerHTML = 'Play';
    }
}

function play() {
    interval = setInterval(nextSlide, 1500);
    isPlaying = true;
    pauseButton.innerHTML = 'Pause';
}

function pausePlay() {
    if(isPlaying) {
        pause();
    }else {
        play();
    }
}

function next() {
    pause();
    nextSlide();
}

function previous() {
    pause();
    previousSlide();
}

pauseButton.addEventListener('click', pausePlay);
previousButton.addEventListener('click', previous);
nextButton.addEventListener('click', next);

interval = setInterval(nextSlide, 1500);