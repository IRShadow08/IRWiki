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
    const text = span.textContent.trim();
    const fill = () => {
        span.innerHTML = text;
        const lineH = span.offsetHeight;
        if (!lineH) return;
        const visible = Math.ceil(window.innerHeight / lineH) + 4;
        span.innerHTML = Array(visible * 3).fill(text).join('<br>');
        const totalH = span.offsetHeight;
        const speed = 60;
        span.style.animationDuration = ((totalH * 0.5) / speed) + 's';
    };
    requestAnimationFrame(() => requestAnimationFrame(fill));
    let timer;
    window.addEventListener('resize', () => {
        clearTimeout(timer);
        timer = setTimeout(fill, 200);
    });
})();