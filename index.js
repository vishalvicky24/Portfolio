// Hamburger Menu Toggle (90s Rainbow Dialer at Bottom)
const hamburger = document.querySelector('.hamburger');
const navDialer = document.querySelector('.nav-dialer');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navDialer.classList.toggle('active');
    hamburger.classList.toggle('active');
    if (navDialer.classList.contains('active')) {
        // Ensure nav links reset on open
        navLinks.forEach(link => link.classList.remove('active'));
    }
});

// Close dialer when clicking outside (mobile only)
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && navDialer.classList.contains('active') && !navDialer.contains(e.target) && e.target !== hamburger) {
        navDialer.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Navigation Indicator (Web and Scroll Tracking)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            navLinks.forEach(link => {
                link.classList.toggle('active', link.dataset.section === sectionId);
                // Update dialer links if active on mobile
                if (navDialer.classList.contains('active')) {
                    navDialer.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
                }
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.section').forEach(section => observer.observe(section));

// Theme Toggle with Indicator
const themeBtn = document.getElementById('theme-btn');
const themeIndicator = document.getElementById('theme-indicator');
let currentTheme = 'default';

function showThemeIndicator(theme) {
    themeIndicator.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
    themeIndicator.classList.add('active');
    themeIndicator.style.background = theme === 'dark' ? '#00ff88' : theme === 'light' ? '#40c4ff' : '#ff6b35';
    themeIndicator.style.boxShadow = `0 0 15px ${theme === 'dark' ? '#00ff88' : theme === 'light' ? '#40c4ff' : '#ff6b35'}`;
    setTimeout(() => {
        themeIndicator.classList.remove('active');
    }, 1000);
}

themeBtn.addEventListener('click', () => {
    currentTheme = currentTheme === 'default' ? 'light' : currentTheme === 'light' ? 'dark' : 'default';
    document.body.setAttribute('data-theme', currentTheme);
    showThemeIndicator(currentTheme);
});

// Scroll Animations and Transition Effects
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('skill-gauge')) {
                entry.target.style.setProperty('--level', `${entry.target.dataset.level}%`);
            }
            // Add scroll transition effects
            entry.target.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
            setTimeout(() => {
                entry.target.style.transform = 'translateY(0) scale(1)';
                entry.target.style.opacity = '1';
            }, 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal-text, .exp-card, .skill-item, .project-card, .cert-card, .contact-grid, .section-title').forEach(el => {
    el.classList.add('hidden'); // Initial state for scroll effects
    revealObserver.observe(el);
});

document.querySelectorAll('.skill-gauge').forEach(gauge => {
    gauge.classList.add('hidden');
    revealObserver.observe(gauge);
});

// Form Submission
const form = document.querySelector('.contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
        btn.textContent = 'Sent!';
        form.reset();
        setTimeout(() => {
            btn.textContent = 'Send';
            btn.disabled = false;
        }, 1500); // Reduced delay for Nike-like speed
    }, 1000);
});

// Dynamic CSS for Animations and Scroll Effects
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .hidden {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
        }
        .visible {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        .hamburger.active {
            transform: rotate(90deg);
            color: var(--accent-primary);
        }
        /* Scroll Parallax Effect for Sections */
        .section {
            transition: transform 0.5s ease, opacity 0.5s ease;
        }
        .section:not(.visible) {
            transform: translateY(20px) scale(0.98);
            opacity: 0.8;
        }
        /* Additional Fun Scroll Effects */
        .exp-card.visible, .skill-item.visible, .project-card.visible, .cert-card.visible {
            animation: bounce 0.6s ease-out;
        }
        .section-title.visible {
            animation: rotateIn 0.6s ease-out;
        }
        @keyframes bounce {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-5px) scale(1.02); }
        }
        @keyframes rotateIn {
            from { transform: translateY(-20px) rotate(-5deg); opacity: 0; }
            to { transform: translateY(0) rotate(0deg); opacity: 1; }
        }
    </style>
`);