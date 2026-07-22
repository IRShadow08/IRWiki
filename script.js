const toggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.style.display = 'flex';
    } else {
        backToTop.style.display = 'none';
    }
});

const themeToggle = document.getElementById('themeToggle');
const icon = themeToggle.querySelector('i');
const heroImg = document.getElementById('heroProfileImg');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
    if (heroImg) {
        heroImg.src = isLight ? 'Assets/LightModeMe.png' : 'Assets/DarkModeMe.png';
    }
});

(function() {
    const span = document.querySelector('.hero-deco-text span');
    if (!span) return;
    const text = 'Arvin Miguel - Antonio';
    const fill = () => {
        span.innerHTML = text;
        const lineH = span.offsetHeight;
        if (!lineH) return;
        const visible = Math.ceil(window.innerHeight / lineH) + 2;
        const block = Array(visible).fill(text).join('<br>');
        span.innerHTML = block + '<br>' + block;
        const speed = 60;
        span.style.animationDuration = ((span.offsetHeight * 0.5) / speed) + 's';
    };
    requestAnimationFrame(() => requestAnimationFrame(fill));
    let timer;
    window.addEventListener('resize', () => {
        clearTimeout(timer);
        timer = setTimeout(fill, 200);
    });
})();