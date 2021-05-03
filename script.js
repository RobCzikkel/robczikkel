// Elements
const header = document.querySelector('header');
const nav = document.querySelector('nav');

console.log(header)

// Sticky Nav
const stickyNav = (entries) => {
    const [entry] = entries;
    console.log(entry)

    if(!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
}

const obsOptions = {
    root: null,
    treshold: 0,
    rootMargin: '-100px',
}

const headerObserver = new IntersectionObserver(stickyNav, obsOptions);
headerObserver.observe(header);


// Smooth Scroll
document.querySelectorAll('.navlink').forEach(function(el) {
    el.addEventListener('click', function(e) {
        e.preventDefault();
        const id = this.getAttribute('href');
        const top =document.querySelector(id).getBoundingClientRect().top - (nav.offsetHeight * 2) + window.pageYOffset;
        scrollToSmoothly(top , 500)
    })
})

// Tabbed content - Services
const tabs = document.querySelectorAll('.tab');
const tabContainer1 = document.querySelector('.tabs1');
const tabArticles = document.querySelectorAll('.articletab');
const tabContent1 = document.querySelector('.tabcontent1') 

tabContainer1.addEventListener('click', function(e) {
    const clickedTab = e.target.closest('.tab');

    if(!clickedTab) return;

    //Active tab
    tabs.forEach(t => {
        t.classList.remove('dark-bg', 'light-font')
    })
    clickedTab.classList.add('dark-bg', 'light-font')

    // Tabcontent
    tabContent1.classList.remove('dark-bg', 'light-font')
    if (clickedTab.dataset.tab == 2) tabContent1.classList.add('dark-bg', 'light-font')

    //Active article
    tabArticles.forEach(t => t.classList.remove('articletab--active'))
    document.querySelector(`.content--${clickedTab.dataset.tab}`).classList.add('articletab--active')
})


// Tabbed content - Portfolio
const tabContainer2 = document.querySelector('.tabs2');
const tabContent2 = document.querySelector('.tabcontent2') 
const tabPortfolios = document.querySelectorAll('.articletab');

tabContainer2.addEventListener('click', function(e) {
    const clickedTab = e.target.closest('.tab');
    console.log(tabPortfolios)
    if(!clickedTab) return;

    //Active tab
    tabs.forEach(t => {
        t.classList.remove('light-bg', 'dark-font')
    })
    clickedTab.classList.add('light-bg', 'dark-font')

    // Tabcontent
    // tabContent2.classList.remove('light-bg', 'pink')
    // if (clickedTab.dataset.tab == 2) tabContent2.classList.add('light-bg');
    // else tabContent2.classList.add('pink');

    // //Active article
    tabPortfolios.forEach(t => t.classList.remove('portfolio--active'))
    document.querySelector(`.portfolio--${clickedTab.dataset.tab}`).classList.add('portfolio--active')
})


// Safari Smooth scroll
function scrollToSmoothly(pos, time) {
    var currentPos = window.pageYOffset;
    var start = null;
    if(time == null) time = 500;
    pos = +pos, time = +time;
    window.requestAnimationFrame(function step(currentTime) {
        start = !start ? currentTime : start;
        var progress = currentTime - start;
        if (currentPos < pos) {
            window.scrollTo(0, ((pos - currentPos) * progress / time) + currentPos);
        } else {
            window.scrollTo(0, currentPos - ((currentPos - pos) * progress / time));
        }
        if (progress < time) {
            window.requestAnimationFrame(step);
        } else {
            window.scrollTo(0, pos);
        }
    });
}