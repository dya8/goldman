// Loading Screen
window.addEventListener("load", () => {
  setTimeout(() => {
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.classList.add("hidden");
    initScrollAnimations();
    initCounters();
  }, 3000);
});

// Navigation
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
  updateActiveNavLink();
});
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}


// Mobile menu toggle
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Close mobile menu when clicking on a nav link
// Close mobile menu + smooth scroll for all nav links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    
    if (href.startsWith("#")) {
      e.preventDefault(); // Prevent default anchor jump
      scrollToSection(href.substring(1)); // Scroll smoothly
    }

    // Close mobile menu
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
  });
});


// Dropdown logic for mobile
const servicesToggle = document.querySelector(".services-toggle");
const dropdownMenu = document.querySelector(".dropdown-menu");

servicesToggle?.addEventListener("click", (e) => {
  e.preventDefault();
  dropdownMenu.classList.toggle("active");
});

const dropdownLinks = document.querySelectorAll(".dropdown-link");
dropdownLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
    dropdownMenu.classList.remove("active");

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Active nav link
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section");
  const scrollPos = window.scrollY + 100;
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach((link) => link.classList.remove("active"));
      if (navLink) navLink.classList.add("active");
    }
  });
}

// Scroll animations
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        entry.target.classList.remove("fade-in-reset");
        void entry.target.offsetWidth;
        entry.target.classList.add("fade-in");
      } else {
        entry.target.classList.remove("visible", "fade-in");
        entry.target.classList.add("fade-in-reset");
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  const animatedElements = document.querySelectorAll(".service-card, .about-card, .stat-item, .contact-card, .gallery-item");
  animatedElements.forEach((el) => observer.observe(el));
}

// Counter animation
function initCounters() {
  const counters = document.querySelectorAll(".stat-number");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  });
  counters.forEach((el) => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute("data-target"));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + (target > 100 ? "+" : "");
  }, 16);
}

// Ripple Effect
const buttons = document.querySelectorAll(".btn");
buttons.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255,255,255,0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;`

    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// WhatsApp contact
function openWhatsApp() {
  const message = encodeURIComponent("Hi Goldwood, I am interested in getting a quote.");
  window.open(`https://wa.me/918330006300?text=${message}`, '_blank');
}

function sendToWhatsApp(event) {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !phone || !service || !message) {
    alert("Please fill out all fields.");
    return;
  }

  const fullMessage = encodeURIComponent(`New Inquiry from Goldwood Website:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nService Interested: ${service}\nMessage: ${message}`);
  window.open(`https://wa.me/918330006300?text=${fullMessage}`, '_blank');
}

// Add ripple CSS
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);
