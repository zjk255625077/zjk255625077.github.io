// ========================================
//  Theme Management (Light / Dark)
// ========================================

const STORAGE_KEY = 'connor-theme';

/** Return 'light' or 'dark' — first checks localStorage, then system preference */
function getPreferredTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** Apply theme to DOM without persisting to localStorage */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

/** Apply theme AND persist user's choice to localStorage */
function saveAndApplyTheme(theme) {
  localStorage.setItem(STORAGE_KEY, theme);
  applyTheme(theme);
}

// --- Initialisation ---
// Apply system-preferred theme without saving (so future system changes still work)
applyTheme(getPreferredTheme());

// Listen for system theme changes — only auto-switch if user hasn't saved a preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    applyTheme(e.matches ? 'dark' : 'light');
  }
});

// Toggle button — manually switching saves the preference, locking the theme
const toggleBtn = document.getElementById('themeToggle');
toggleBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  saveAndApplyTheme(current === 'dark' ? 'light' : 'dark');
});

// ========================================
//  Scroll Progress Bar
// ========================================
const progressBar = document.getElementById('progressBar');

const updateProgress = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;
};

window.addEventListener('scroll', updateProgress, { passive: true });

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
