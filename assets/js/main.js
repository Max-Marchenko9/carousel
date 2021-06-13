//   **********CAROUSEL**********

(function(time) {
  const container = document.querySelector('#carousel');
  const slides = document.querySelectorAll(".slide");
  const indicators = document.querySelectorAll('.indicator');
  const indicatorsContainer = document.querySelector('#indicators-container');
  const pauseButton = document.querySelector("#pause-btn");
  const previousButton = document.querySelector("#previous-btn");
  const nextButton = document.querySelector("#next-btn");
  
  let currentSlide = 0;
  let slidesCount = slides.length;
  let isPlaying = true;
  let interval = time;
  let timerID = null;
  let swipeStartX = null;
  let swipeEndX = null;
  
  const CODE_SPACE = 'Space'
  const CODE_ARROW_RIGHT = 'ArrowRight'
  const CODE_ARROW_LEFT = 'ArrowLeft'
  const FA_PAUSE = '<i class="fas fa-pause"></i>';
  const FA_PLAY = '<i class="fas fa-play"></i>';
  
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
      clearInterval(timerID);
      isPlaying = false;
      pauseButton.innerHTML = FA_PLAY;
    }
  }
  
  function play() {
    timerID = setInterval(nextSlide, interval);
    isPlaying = true;
    pauseButton.innerHTML = FA_PAUSE;
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
  
  function pressKey(e) {
    if (e.code === CODE_SPACE) {
      pausePlay(); 
      return;
    }
    if (e.code === CODE_ARROW_LEFT) {
      previous();
      return;
    } 
    if (e.code === CODE_ARROW_RIGHT) {
      next();
      return;
    }
  }
  
  function swipeStart(e) {
    swipeStartX = e.changedTouches[0].pageX;
    if (swipeStartX - swipeEndX > 100) next();
  }
  
  function swipeEnd(e) {
    swipeEndX = e.changedTouches[0].pageX;
    if (swipeStartX - swipeEndX < -100) previous();
  }
  
function initListeners() {
  pauseButton.addEventListener("click", pausePlay);
  previousButton.addEventListener("click", previous);
  nextButton.addEventListener("click", next);
  indicatorsContainer.addEventListener("click", indicate);
  document.addEventListener('keydown', pressKey);
  container.addEventListener('touchstart', swipeStart);
  container.addEventListener('touchend', swipeEnd);
}

function init() {
  initListeners()
  timerID = setInterval(nextSlide, interval);
}
  
init()

}(1500));


