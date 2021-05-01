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
// document.querySelectorAll('.navlink').forEach(function(el) {
//     el.addEventListener('click', function(e) {
//         e.preventDefault();
//         const id = this.getAttribute('href');
//         document.querySelector(id).scrollIntoView({
//             behavior: "smooth",
//             block: 'start',
//         })
//     })
// })


// document.querySelectorAll('.navlink').forEach(function(el) {
//     el.addEventListener('click', function(e) {
//         e.preventDefault();
//         const id = this.getAttribute('href');

//         document.querySelector(id).getBoundingClientRect().top + nav.offsetHeight;

//         window.scrollTo({
//         left: document.querySelector(id).getBoundingClientRect().top + window.pageXOffset,
//         top: document.querySelector(id).getBoundingClientRect().top - (nav.offsetHeight * 2) + window.pageYOffset,
//         behavior: "smooth"
//     })
//         document.querySelector(id)
//     })
// })

document.querySelectorAll('.navlink').forEach(function(el) {
    el.addEventListener('click', function(e) {
        e.preventDefault();
        const id = this.getAttribute('href');
        const top =document.querySelector(id).getBoundingClientRect().top - (nav.offsetHeight * 2) + window.pageYOffset;
        scrollToSmoothly(top , 500)
    })
})

// Tabbed content
const tabs = document.querySelectorAll('.tab');
const tabContainer = document.querySelector('.tabs');
const tabArticles = document.querySelectorAll('.tabarticle');

tabContainer.addEventListener('click', function(e) {
    const clickedTab = e.target.closest('.tab');

    if(!clickedTab) return;

    //Active tab
    tabs.forEach(t => t.classList.remove('light'))
    clickedTab.classList.add('light')

    //Active article
    tabArticles.forEach(t => t.classList.remove('tabarticle--active'))
    document.querySelector(`.content--${clickedTab.dataset.tab}`).classList.add('tabarticle--active')
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