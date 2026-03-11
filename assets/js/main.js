// ── Theme Toggle ─────────────────────────────────────────────
const html = document.documentElement;
const darkBtn = document.getElementById('darkBtn');
const lightBtn = document.getElementById('lightBtn');

function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    darkBtn.classList.toggle('active', theme === 'dark');
    lightBtn.classList.toggle('active', theme === 'light');
}

const saved = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(saved || (prefersDark ? 'dark' : 'light'));

darkBtn.addEventListener('click', () => { applyTheme('dark'); localStorage.setItem('theme', 'dark'); });
lightBtn.addEventListener('click', () => { applyTheme('light'); localStorage.setItem('theme', 'light'); });

// ── Spotlight Effect ──────────────────────────────────────────
const spotlight = document.getElementById('spotlight');
let spotTimeout;

document.addEventListener('mousemove', (e) => {
    spotlight.style.setProperty('--x', e.clientX + 'px');
    spotlight.style.setProperty('--y', e.clientY + 'px');
    spotlight.classList.add('active');
    clearTimeout(spotTimeout);
    spotTimeout = setTimeout(() => spotlight.classList.remove('active'), 100);
});

// ── Category Filter ───────────────────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const postCards = document.querySelectorAll('.post-card[data-category]');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        postCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = '';
                card.style.animation = 'fadeIn 0.3s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ── Fade-in on scroll ─────────────────────────────────────────
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.post-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(16px)';
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        observer.observe(card);
    });
}
