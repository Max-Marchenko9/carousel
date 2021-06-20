  // **********CAROUSEL**********

class Carousel {
  constructor(params) {
    let setting = {...{containerID: '#carousel', interval: 1500, isPlaying: true, slideID: '.slide'}, ...params};

    this.container = document.querySelector(setting.containerID);
    this.slides = document.querySelectorAll(setting.slideID);
    this.interval = setting.interval;
    this.isPlaying = setting.isPlaying
  }

  _initProps() {
    this.currentSlide = 0;
    this.slidesCount = this.slides.length;

    this.CODE_SPACE = "Space";
    this.CODE_ARROW_RIGHT = "ArrowRight";
    this.CODE_ARROW_LEFT = "ArrowLeft";
    this.FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
    this.FA_PLAY = '<i class="fas fa-play-circle"></i>';
    this.FA_PREV = '<i class="fas fa-arrow-left"></i>';
    this.FA_NEXT = '<i class="fas fa-arrow-right"></i>';
  }

  _initControls() {
    const controls = document.createElement("div");
    const PAUSE = `<span class="control control-pause" id="pause-btn">
                    <span id="fa-pause-icon">${this.FA_PAUSE}</span>
                    <span id="fa-play-icon">${this.FA_PLAY}</span>
                   </span>`;
    const PREV = `<span class="control control-prev" id="previous-btn">${this.FA_PREV}</span>`;
    const NEXT = `<span class="control control-next" id="next-btn">${this.FA_NEXT}</span>`;

    controls.setAttribute("class", "controls");
    controls.innerHTML = PAUSE + PREV + NEXT;
    this.container.appendChild(controls);

    this.pauseButton = this.container.querySelector("#pause-btn");
    this.previousButton = this.container.querySelector("#previous-btn");
    this.nextButton = this.container.querySelector("#next-btn");
    this.pauseIcon = this.container.querySelector('#fa-pause-icon');
    this.playIcon = this.container.querySelector('#fa-play-icon');

    this.isPlaying ? this.pauseIcon.style.opacity = 1 : this.playIcon.style.opacity = 1;
  }

  _initIndicators() {
    const indicators = document.createElement("ol");

    indicators.setAttribute("class", "indicators");

    for (let i = 0, n = this.slidesCount; i < n; i++) {
      const indicator = document.createElement("li");
      indicator.setAttribute("class", "indicator");
      indicator.dataset.slideTo = `${i}`;
      if (i === 0) indicator.classList.add("active");
      indicators.appendChild(indicator);
    }

    this.container.appendChild(indicators);

    this.indicatorsContainer = document.querySelector(".indicators");
    this.indicators = document.querySelectorAll(".indicator");
  }

  _initListeners() {
    this.pauseButton.addEventListener("click", this.pausePlay.bind(this));
    this.previousButton.addEventListener("click", this.previous.bind(this));
    this.nextButton.addEventListener("click", this.next.bind(this));
    this.indicatorsContainer.addEventListener("click",this._indicate.bind(this));
    document.addEventListener("keydown", this.pressKey.bind(this));
    this.container.addEventListener('mouseenter', this._pause.bind(this));
    this.container.addEventListener('mouseleave', this._play.bind(this));
  }

  _goToSlide(n) {
    this.slides[this.currentSlide].classList.toggle("active");
    this.indicators[this.currentSlide].classList.toggle("active");
    this.currentSlide = (n + this.slidesCount) % this.slidesCount;
    this.indicators[this.currentSlide].classList.toggle("active");
    this.slides[this.currentSlide].classList.toggle("active");
  }

  _nextSlide() {
    this._goToSlide(this.currentSlide + 1);
  }

  _previousSlide() {
    this._goToSlide(this.currentSlide - 1);
  }

  _pause() {
    if (this.isPlaying) {
      this.pauseIcon.style.opacity = 0;
      this.playIcon.style.opacity = 1;
      this.isPlaying = false;
      clearInterval(this.timerID);
    }
  }

  _play() {
    if(!this.isPlaying) {
      this.playIcon.style.opacity = 0;
      this.pauseIcon.style.opacity = 1;
      this.isPlaying = true;
      this.timerID = setInterval(() => this._nextSlide(), this.interval);
    }
  }

  pausePlay() {
    if (this.isPlaying) {
      this._pause();
    } else {
      this._play();
    }
  }

  next() {
    this._pause();
    this._nextSlide();
  }

  previous() {
    this._pause();
    this._previousSlide();
  }

  _indicate(e) {
    const target = e.target;
    if (target && target.classList.contains("indicator")) {
      this._pause();
      this._goToSlide(+target.dataset.slideTo);
    }
  }

  pressKey(e) {
    if (e.code === this.CODE_SPACE) {
      this.pausePlay();
      return;
    }
    if (e.code === this.CODE_ARROW_LEFT) {
      this.previous();
      return;
    }
    if (e.code === this.CODE_ARROW_RIGHT) {
      this.next();
      return;
    }
  }

  init() {
    this._initProps();
    this._initControls();
    this._initIndicators();
    this._initListeners();

    if(this.isPlaying) this.timerID = setInterval(() => this._nextSlide(), this.interval);
  }
}

class SwipeCarousel extends Carousel {
  _initListeners() {
    super._initListeners();
    this.container.addEventListener("touchstart", this._swipeStart.bind(this));
    this.container.addEventListener("touchend", this._swipeEnd.bind(this));
  }
  _swipeStart(e) {
    this.swipeStartX = e.changedTouches[0].pageX;
  }

  _swipeEnd(e) {
    this.swipeEndX = e.changedTouches[0].pageX;
    this.swipeStartX - this.swipeEndX > 100 && this.next();
    this.swipeStartX - this.swipeEndX < -100 && this.previous();
  }
}