{
const container = document.querySelector('.hero-hire');
const slides = Array.from(document.querySelectorAll('.hero-slideshow .slide'));
const interval = 5000; // ms between transitions
let current = 0;
let timer = null;

const next = () => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
};

const start = () => { timer = setInterval(next, interval); };
const stop  = () => { clearInterval(timer); };

container.addEventListener('mouseenter', stop);
container.addEventListener('mouseleave', start);

start();
}