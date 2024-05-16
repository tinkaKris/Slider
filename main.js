const container = document.querySelector("#slider")
const slides = container.querySelectorAll(".slide")
const indicatorsContainer = container.querySelector("#indicators-container")
const indicatorItems = indicatorsContainer.querySelectorAll(".indicator")
const pauseBtn = container.querySelector("#pause-btn")
const prevBtn = container.querySelector("#prev-btn")
const nextBtn = container.querySelector("#next-btn")

const SLIDES_COUNT = slides.length
const CODE_ARROW_LEFT = 'ArrowLeft'
const CODE_ARROW_RIGHT = 'ArrowRight'
const CODE_SPACE = 'Space'
const FA_PAUSE = '<i class="fa fa-pause"></i>'
const FA_PLAY = '<i class="fa fa-play"></i>'
const INTERVAL = 3000

let currentSlide = 0
let isPlaying = true
let timerId = null
let startPosX = null
let endPosX = null

function gotoNth(n) {
    slides[currentSlide].classList.toggle("active")
    indicatorItems[currentSlide].classList.toggle("active")
    currentSlide = (n + SLIDES_COUNT) % SLIDES_COUNT
    slides[currentSlide].classList.toggle("active")
    indicatorItems[currentSlide].classList.toggle("active")
}

function gotoNext() {
    gotoNth(currentSlide + 1)
}

function gotoPrev() {
    gotoNth(currentSlide - 1)
}

function pauseHandler() {
    isPlaying = false
    clearInterval(timerId)
    pauseBtn.innerHTML = FA_PLAY
}

function tick () {
timerId = setInterval(gotoNext, INTERVAL)
}

function playHandler() {
    isPlaying = true
    pauseBtn.innerHTML = FA_PAUSE
    tick()
}

function pausePlayHandler() {
    isPlaying ? pauseHandler() : playHandler()
       } 

function nextHandler() {
    pauseHandler()
    gotoNext()
}

function prevHandler() {
    pauseHandler()
    gotoPrev()
}

function indicateHandler(e) {
    const { target } = e
    if (target.classList.contains("indicator")) {
        pauseHandler()
        gotoNth(+target.dataset.slideTo)
    }
}

function pressKey(e) {
    const { code } = e

    if (code === CODE_ARROW_LEFT) prevHandler()
    if (code === CODE_ARROW_RIGHT) nextHandler()
    if (code === CODE_SPACE) pausePlayHandler()
}
function swipeStartHandler(e) {
    startPosX = e instanceof MouseEvent
        ? e.pageX
        : e.changedTouches[0].pageX
}

function swipeEndHandler(e) {
    endPosX = e instanceof MouseEvent
        ? e.pageX
        : e.changedTouches[0].pageX

    if (endPosX - startPosX > 0) prevHandler()
    if (endPosX - startPosX < -0) nextHandler()
    }
function initListeners() {
pauseBtn.addEventListener("click", pausePlayHandler)
nextBtn.addEventListener("click", nextHandler)
prevBtn.addEventListener("click", prevHandler)
indicatorsContainer.addEventListener("click", indicateHandler)
container.addEventListener("touchstart", swipeStartHandler)
container.addEventListener("mousedown", swipeStartHandler)
container.addEventListener("touchend", swipeEndHandler)
container.addEventListener("mouseup", swipeEndHandler)
document.addEventListener("keydown", pressKey)
}

function init() {
    initListeners()
    tick()
}

init()

