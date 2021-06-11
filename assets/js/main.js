const slides = document.querySelectorAll(".slide");
const indicators = document.querySelectorAll('.indicator');
const indicatorsContainer = document.querySelector('#indicators-container');
// console.log(indicatorsContainer);

const pauseButton = document.querySelector("#pause-btn");
const previousButton = document.querySelector("#previous-btn");
const nextButton = document.querySelector("#next-btn");

// console.log(previousButton);
// console.log(nextButton);

let currentSlide = 0;
let slidesCount = slides.length;
let isPlaying = true;
let interval = null;

function goToSlide(n) {
  slides[currentSlide].classList.toggle("active");
  indicators[currentSlide].classList.toggle("active");
  currentSlide = (n + slidesCount) % slidesCount;
  slides[currentSlide].classList.toggle("active");
  indicators[currentSlide].classList.toggle("active");
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function previousSlide() {
  goToSlide(currentSlide - 1);
}

function pause() {
  if (isPlaying) {
    clearInterval(interval);
    isPlaying = false;
    pauseButton.innerHTML = "Play";
  }
}

function play() {
  interval = setInterval(nextSlide, 1500);
  isPlaying = true;
  pauseButton.innerHTML = "Pause";
}

function pausePlay() {
  if (isPlaying) {
    pause();
  } else {
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

function indicate(e) {
  const target = e.target;
  if(target && target.classList.contains('indicator')) {
    pause();
    goToSlide(+target.dataset.slideTo);
  }
}

pauseButton.addEventListener("click", pausePlay);
previousButton.addEventListener("click", previous);
nextButton.addEventListener("click", next);
indicatorsContainer.addEventListener("click", indicate);

interval = setInterval(nextSlide, 1500);
