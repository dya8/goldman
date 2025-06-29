// Loading Screen
window.addEventListener("load", () => {
  setTimeout(() => {
    const loadingScreen = document.getElementById("loading-screen")
    loadingScreen.classList.add("hidden")

    // Initialize animations after loading
    initScrollAnimations()
    initCounters()
  }, 3000)
})

// Navigation
const navbar = document.getElementById("navbar")
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const navLinks = document.querySelectorAll(".nav-link")

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  // Update active nav link
  updateActiveNavLink()
})

// Mobile menu toggle
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  hamburger.classList.toggle("active")
})

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    hamburger.classList.remove("active")
  })
})

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section")
  const scrollPos = window.scrollY + 100

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach((link) => link.classList.remove("active"))
      if (navLink) navLink.classList.add("active")
    }
  })
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        entry.target.classList.remove("fade-in-reset");
        // Reset the animation by reflow
        void entry.target.offsetWidth;
        entry.target.classList.add("fade-in");
      } else {
        entry.target.classList.remove("visible");
        entry.target.classList.remove("fade-in");
        entry.target.classList.add("fade-in-reset");
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(
    ".service-card, .about-card, .stat-item, .contact-card, .gallery-item"
  );
  animatedElements.forEach((el) => {
    observer.observe(el);
  });
}

// Counter animation
function initCounters() {
  const counters = document.querySelectorAll(".stat-number")
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target)
        counterObserver.unobserve(entry.target)
      }
    })
  })

  counters.forEach((counter) => {
    counterObserver.observe(counter)
  })
}

function animateCounter(element) {
  const target = Number.parseInt(element.getAttribute("data-target"))
  const duration = 2000
  const step = target / (duration / 16)
  let current = 0

  const timer = setInterval(() => {
    current += step
    if (current >= target) {
      current = target
      clearInterval(timer)
    }
    element.textContent = Math.floor(current) + (target > 100 ? "+" : "")
  }, 16)
}

// Gallery filtering
const filterButtons = document.querySelectorAll(".filter-btn")
const galleryItems = document.querySelectorAll(".gallery-item")

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter")

    // Update active button
    filterButtons.forEach((btn) => btn.classList.remove("active"))
    button.classList.add("active")

    // Filter gallery items
    galleryItems.forEach((item) => {
      const category = item.getAttribute("data-category")

      if (filter === "all" || category === filter) {
        item.classList.remove("hidden")
      } else {
        item.classList.add("hidden")
      }
    })
  })
})

// Contact form
const contactForm = document.getElementById("contactForm")
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)
  const data = Object.fromEntries(formData)

  // Simulate form submission
  showNotification("Thank you for your message! We will get back to you soon.", "success")
  contactForm.reset()
})

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === "success" ? "check-circle" : "info-circle"}"></i>
            <span>${message}</span>
        </div>
    `

  // Add notification styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === "success" ? "#4CAF50" : "#2196F3"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(400px)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 5000)
}

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".wood-grain")

  parallaxElements.forEach((element) => {
    const speed = 0.5
    element.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Add hover effects to service cards
const serviceCards = document.querySelectorAll(".service-card")
serviceCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)"
  })
})

// Gallery lightbox effect
// View button opens lightbox with the corresponding gallery image
document.querySelectorAll(".view-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent other unintended triggers

    // Get the parent .gallery-image element
    const galleryImage = btn.closest(".gallery-image");

    // Create lightbox overlay
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <span class="lightbox-close">&times;</span>
        <div class="lightbox-image">
          ${galleryImage.innerHTML}
        </div>
      </div>
    `;

    // Lightbox styles
    lightbox.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;

    const lightboxContent = lightbox.querySelector(".lightbox-content");
    lightboxContent.style.cssText = `
      position: relative;
      max-width: 90%;
      max-height: 90%;
      background: white;
      border-radius: 15px;
      overflow: hidden;
      transform: scale(0.8);
      transition: transform 0.3s ease;
    `;

    const closeBtn = lightbox.querySelector(".lightbox-close");
    closeBtn.style.cssText = `
      position: absolute;
      top: 15px;
      right: 20px;
      font-size: 2rem;
      color: white;
      background: rgba(0,0,0,0.5);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 1;
      transition: background 0.3s ease;
    `;

    document.body.appendChild(lightbox);

    // Animate in
    setTimeout(() => {
      lightbox.style.opacity = "1";
      lightboxContent.style.transform = "scale(1)";
    }, 10);

    // Close logic
    const closeLightbox = () => {
      lightbox.style.opacity = "0";
      lightboxContent.style.transform = "scale(0.8)";
      setTimeout(() => {
        document.body.removeChild(lightbox);
      }, 300);
    };

    closeBtn.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", function escClose(ev) {
      if (ev.key === "Escape") {
        closeLightbox();
        document.removeEventListener("keydown", escClose);
      }
    });
  });
});


// Add floating animation to hero elements
const floatingElements = document.querySelectorAll(".floating-card, .hero-image")
floatingElements.forEach((element, index) => {
  element.style.animationDelay = `${index * 0.5}s`
})

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Add smooth reveal animations to sections
  const sections = document.querySelectorAll("section")
  sections.forEach((section, index) => {
    section.style.opacity = "0"
    section.style.transform = "translateY(50px)"
    section.style.transition = "opacity 0.8s ease, transform 0.8s ease"

    setTimeout(() => {
      section.style.opacity = "1"
      section.style.transform = "translateY(0)"
    }, index * 200)
  })

  // Add wood texture animation
  const woodElements = document.querySelectorAll(".wood-grain, .wood-texture-overlay")
  woodElements.forEach((element) => {
    element.style.backgroundPosition = "0 0"
    element.style.animation = "woodGrain 20s linear infinite"
  })
})

// Performance optimization: Throttle scroll events
let ticking = false
function updateOnScroll() {
  updateActiveNavLink()
  ticking = false
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateOnScroll)
    ticking = true
  }
})

// Add custom cursor effect for interactive elements
const interactiveElements = document.querySelectorAll("button, .nav-link, .gallery-image, .service-card")
interactiveElements.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    document.body.style.cursor = "pointer"
  })

  element.addEventListener("mouseleave", () => {
    document.body.style.cursor = "default"
  })
})

// Add ripple effect to buttons
const buttons = document.querySelectorAll(".btn")
buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

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
            pointer-events: none;
        `

    this.style.position = "relative"
    this.style.overflow = "hidden"
    this.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})
function openWhatsApp() {
    const phoneNumber = "918330006300"; // Your WhatsApp Business number (without +)
    const message = "Hi Goldwood, I am interested in getting a quote.";
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}
// Add WhatsApp button functionality

// Add CSS for ripple animation
const style = document.createElement("style")
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)
