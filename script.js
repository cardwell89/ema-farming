const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id], header[id]');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        backToTop.classList.add('show');
    } else {
        navbar.classList.remove('scrolled');
        backToTop.classList.remove('show');
    }
    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(l => {
        l.classList.remove('active');
        if (l.getAttribute('href') === '#' + current) l.classList.add('active');
    });
});

const hamburger = document.getElementById('hamburger');
const navLinksBox = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
    navLinksBox.classList.toggle('active');
    const i = hamburger.querySelector('i');
    i.classList.toggle('fa-bars');
    i.classList.toggle('fa-times');
});

document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
        navLinksBox.classList.remove('active');
        const i = hamburger.querySelector('i');
        i.classList.add('fa-bars');
        i.classList.remove('fa-times');
    });
});

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

let statsDone = false;
function animateStats() {
    if (statsDone) return;
    const box = document.querySelector('.hero-stats');
    if (!box) return;
    const r = box.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
        statsDone = true;
        document.querySelectorAll('.stat-number').forEach(el => {
            const target = +el.getAttribute('data-count');
            let n = 0;
            const step = target / 60;
            const tick = () => {
                n += step;
                if (n < target) { el.textContent = Math.ceil(n); requestAnimationFrame(tick); }
                else el.textContent = target;
            };
            tick();
        });
    }
}
window.addEventListener('scroll', animateStats);
window.addEventListener('load', animateStats);

const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    if (!name) {
        note.textContent = 'Please enter your name.';
        note.className = 'form-note error';
        return;
    }
    note.textContent = 'Thank you, ' + name + '! Karabo Shilakoe will be in touch shortly.';
    note.className = 'form-note success';
    form.reset();
});

document.getElementById('year').textContent = new Date().getFullYear();
