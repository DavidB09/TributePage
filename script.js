
window.onunload = () => window.scrollTo(0,0); // Go to top of window when page refreshed

//// DOTTED LINES ////

(function initializeDottedLines() {
    drawDottedLines(); 
    window.addEventListener('resize', drawDottedLines); 
})(); 

function drawDottedLines() {
    const docHeight = document.querySelector('main').getBoundingClientRect().height;
    const svgElement = document.querySelector('svg'); 
    svgElement.style.height = `${docHeight}px`;

    const targetNodes = document.querySelectorAll('.circle'); 

    function addDottedLine(circle1, circle2) {
        let originalLine = document.querySelector('.main-line.original'); 

        let newLine = originalLine.cloneNode(false); 
        newLine.classList.add('temporary'); 
        newLine.classList.remove('original'); 
        originalLine.after(newLine); 

        let x1 = circle1.offsetLeft + (circle1.offsetWidth / 2);
        let y1 = circle1.offsetTop + (circle1.offsetHeight / 2);
        let x2 = circle2.offsetLeft + (circle2.offsetWidth / 2);
        let y2 = circle2.offsetTop + (circle2.offsetHeight / 2);

        newLine.setAttribute('x1', x1); 
        newLine.setAttribute('y1', y1); 
        newLine.setAttribute('x2', x2); 
        newLine.setAttribute('y2', y2);
    }

    document.querySelectorAll('.temporary').forEach(el => el.remove()); 

    targetNodes.forEach((el, i) => { 
        if (i + 1 <= targetNodes.length - 1) addDottedLine(el, targetNodes[i + 1]); 
    }); 
}

//// ELEMENT TRANSLATE ////

(function elementTranslate() {
    const initialElem = document.querySelectorAll('.initial-slide');

    function revealElement(entries, observer) {
        const [entry] = entries;
        
        entry.target.classList.remove('initial-hidden');
        observer.unobserve(entry.target);
        drawDottedLines(); 
    }

    const sectionObserver = new IntersectionObserver(revealElement, {threshold: [0, 0.1]});

    initialElem.forEach((element) => {
        sectionObserver.observe(element);
        element.classList.add('initial-hidden');
    });

})(); 


//// PERFORMANCE SLIDER ////

(function slider() {
    const slides = document.querySelectorAll('.performance');
    const btnLeft = document.querySelector('.button-left');
    const btnRight = document.querySelector('.button-right');

    let currentSlide = 0;
    const maxSlide = slides.length;

    function goToSlide(slide) {
        slides.forEach(
            (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
        );
    }

    function nextSlide() {
        if (currentSlide === maxSlide - 1) currentSlide = 0;
        else currentSlide++;

        goToSlide(currentSlide);
    }

    function prevSlide() {
        if (currentSlide === 0) currentSlide = maxSlide - 1;
        else currentSlide--;
    
        goToSlide(currentSlide);
    }

    goToSlide(0);

    // Event handlers
    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

})();


//// AUDIO ////

(function audio() {

    const audioCheckElement = document.querySelector('.audio-check'); 

    function handleAudio() {
        const circleElements = document.querySelectorAll('.circle'); 
        const audioElements = Array.from(document.querySelectorAll('.main-audio')); 

        circleElements.forEach((el, i) => {
            el.addEventListener('mouseenter', () => {
                audioElements[i].play(); 
            }); 

            el.addEventListener('mouseleave', () => {
                audioElements[i].pause(); 
                audioElements[i].currentTime = 0; 
            }); 
        }); 
    }

    audioCheckElement.style.transform = 'translateX(0px)'; 

    audioCheckElement.addEventListener('click', (e) => {
        e.preventDefault(); 
        audioCheckElement.style.transform = 'translateX(-500px)'; 
        handleAudio(); 
    }); 

})(); 