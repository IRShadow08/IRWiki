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
const stmLogo = document.getElementById('stmLogo');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
    if (heroImg) {
        heroImg.src = isLight ? 'Assets/LightModeMe.png' : 'Assets/DarkModeMe.png';
    }
    if (stmLogo) {
        stmLogo.src = isLight ? 'Assets/STMLight.png' : 'Assets/STMDark.png';
    }
});

(function() {
    const span = document.querySelector('.hero-deco-text span');
    if (!span) return;
    const text = 'IRShadow - RvnIrs';
    let posY = 0, lastT = 0, lineH = 0, animId;
    const speed = 20;

    const fill = () => {
        span.innerHTML = text;
        lineH = span.offsetHeight;
        if (!lineH) return;
        const visible = Math.ceil(window.innerHeight / lineH) + 4;
        span.innerHTML = Array(visible).fill(text).join('<br>');
        posY = 0;
        span.style.transform = 'translateY(0)';
    };

    const frame = (t) => {
        if (!lastT) lastT = t;
        const dt = (t - lastT) / 1000;
        lastT = t;
        posY += speed * dt;
        if (posY >= lineH) {
            posY -= lineH;
            const lines = span.innerHTML.split('<br>');
            lines.push(lines.shift());
            span.innerHTML = lines.join('<br>');
        }
        span.style.transform = `translateY(${-posY}px)`;
        animId = requestAnimationFrame(frame);
    };

    span.style.animation = 'none';
    fill();
    animId = requestAnimationFrame(frame);

    let timer;
    window.addEventListener('resize', () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            cancelAnimationFrame(animId);
            fill();
            lastT = 0;
            animId = requestAnimationFrame(frame);
        }, 200);
    });
})();

document.getElementById('copyEmail').addEventListener('click', (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('arvinmiguela08@gmail.com').then(() => {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = 'Email copied to clipboard';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2500);
    });
});

/* ===== Experience Carousel ===== */
(function() {
    const track = document.querySelector('.carousel-track');
    if (!track) return;
    const cards = track.querySelectorAll('.carousel-card');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dotsContainer = document.querySelector('.carousel-dots');
    let index = 0;

    cards.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
    });

    function goTo(i) {
        if (i < 0 || i >= cards.length) return;
        index = i;
        track.style.transform = 'translateX(-' + (index * 100) + '%)';
        dotsContainer.querySelectorAll('.carousel-dot').forEach((d, j) => {
            d.classList.toggle('active', j === index);
        });
    }

    prevBtn.addEventListener('click', () => goTo(index - 1));
    nextBtn.addEventListener('click', () => goTo(index + 1));
})();

