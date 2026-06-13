// ========================================
//  Theme Management — always follows system
// ========================================

const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

// Apply current system preference
const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
};
applyTheme(systemDark.matches ? 'dark' : 'light');

// Listen for system changes
systemDark.addEventListener('change', (e) => {
  applyTheme(e.matches ? 'dark' : 'light');
});

// Manual toggle — overrides for current session
const toggleBtn = document.getElementById('themeToggle');
if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}

// ========================================

// ========================================
//  Navbar Scroll Effect
// ========================================
const navbar = document.getElementById('navbar');

const handleNavScroll = () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', handleNavScroll, { passive: true });

// ========================================
//  Scroll Reveal Animation
// ========================================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.section, .timeline-item').forEach((el) => {
  el.classList.add('reveal');
  observer.observe(el);
});

// ========================================
//  Smooth Anchor Scroll
// ========================================
document.querySelectorAll('.navbar-links a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
