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


document.querySelectorAll('.navlink').forEach(function(el) {
    el.addEventListener('click', function(e) {
        e.preventDefault();
        const id = this.getAttribute('href');

        document.querySelector(id).getBoundingClientRect().top + nav.offsetHeight;

        window.scrollTo({
        left: document.querySelector(id).getBoundingClientRect().top + window.pageXOffset,
        top: document.querySelector(id).getBoundingClientRect().top - (nav.offsetHeight * 2) + window.pageYOffset,
        behavior: "smooth"
    })
        document.querySelector(id)
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
