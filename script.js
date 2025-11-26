// Set current year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Theme Switcher
const themeSwitcher = document.getElementById('themeSwitcher');
const body = document.body;
const themeIcon = themeSwitcher.querySelector('use');

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  body.classList.add('light-mode');
  themeIcon.setAttribute('href', '#icon-sun');
}

themeSwitcher.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  
  if (body.classList.contains('light-mode')) {
    themeIcon.setAttribute('href', '#icon-sun');
    localStorage.setItem('theme', 'light');
  } else {
    themeIcon.setAttribute('href', '#icon-moon');
    localStorage.setItem('theme', 'dark');
  }
}, { passive: true });

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const mobileMenuIcon = mobileMenuBtn.querySelector('use');

mobileMenuBtn.addEventListener('click', () => {
  const isActive = navMenu.classList.toggle('active');
  mobileMenuIcon.setAttribute('href', isActive ? '#icon-times' : '#icon-bars');
}, { passive: true });

// Close mobile menu on link click
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    mobileMenuIcon.setAttribute('href', '#icon-bars');
  }, { passive: true });
});

// Time Display
function updateTime() {
  const now = new Date();
  const pragueTime = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Prague"}));
  const timeString = pragueTime.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  document.getElementById('currentTime').textContent = timeString;
}

updateTime();
setInterval(updateTime, 1000);

// Scroll Animations - Optimized
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      // Unobserve after animation to improve performance
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Use requestIdleCallback for better performance
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    document.querySelectorAll('.scroll-animate').forEach(el => {
      observer.observe(el);
    });
  });
} else {
  document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el);
  });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 64;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Navbar Scroll Effect - Debounced for performance
const navbar = document.querySelector('.navbar');
let lastScroll = 0;
let ticking = false;

const updateNavbar = () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
  ticking = false;
};

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateNavbar);
    ticking = true;
  }
}, { passive: true });

// Card Mouse Move Effect - Throttled for performance
if (window.matchMedia('(hover: hover)').matches) {
  const throttle = (func, delay) => {
    let timeoutId;
    let lastRan;
    return function(...args) {
      if (!lastRan) {
        func.apply(this, args);
        lastRan = Date.now();
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          if ((Date.now() - lastRan) >= delay) {
            func.apply(this, args);
            lastRan = Date.now();
          }
        }, delay - (Date.now() - lastRan));
      }
    };
  };

  document.querySelectorAll('.skill-card').forEach(card => {
    const handleMouseMove = throttle((e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    }, 50);
    
    card.addEventListener('mousemove', handleMouseMove, { passive: true });
  });
}

// Add keyboard navigation hints
let isTabbing = false;

document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab' && !isTabbing) {
    document.body.classList.add('keyboard-nav');
    isTabbing = true;
  }
}, { passive: true });

document.addEventListener('mousedown', () => {
  if (isTabbing) {
    document.body.classList.remove('keyboard-nav');
    isTabbing = false;
  }
}, { passive: true });

// Optimize animations on load
document.addEventListener('DOMContentLoaded', () => {
  // Remove will-change after animations complete to save resources
  setTimeout(() => {
    document.querySelectorAll('.scroll-animate.active').forEach(el => {
      el.style.willChange = 'auto';
    });
  }, 2000);
});

