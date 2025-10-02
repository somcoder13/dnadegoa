// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileMenu = document.getElementById("mobileMenu")

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")
      const icon = mobileMenuBtn.querySelector("i")
      if (mobileMenu.classList.contains("active")) {
        icon.className = "fas fa-times"
      } else {
        icon.className = "fas fa-bars"
      }
    })
  }

  // Close mobile menu when clicking on links
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      const icon = mobileMenuBtn.querySelector("i")
      icon.className = "fas fa-bars"
    })
  })

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]')
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar")
  let lastScrollTop = 0

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > 100) {
      navbar.style.background = "rgba(255, 255, 255, 0.95)"
      navbar.style.backdropFilter = "blur(10px)"
    } else {
      navbar.style.background = "white"
      navbar.style.backdropFilter = "none"
    }

    lastScrollTop = scrollTop
  })

  // Fade in animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  const fadeElements = document.querySelectorAll(".fade-in")
  fadeElements.forEach((el) => observer.observe(el))

  // Property search functionality
  // const searchForm = document.querySelector(".search-form")
  // if (searchForm) {
  //   const searchBtn = searchForm.querySelector(".btn-primary")
  //   if (searchBtn) {
  //     searchBtn.addEventListener("click", (e) => {
  //       e.preventDefault()
  //       handlePropertySearch()
  //     })
  //   }
  // }

  // // Contact form handling
  // const contactForms = document.querySelectorAll("form")
  // contactForms.forEach((form) => {
  //   form.addEventListener("submit", function (e) {
  //     e.preventDefault()
  //     handleFormSubmission(this)
  //   })
  // })

  // // Property card interactions
  // const propertyCards = document.querySelectorAll(".property-card")
  // propertyCards.forEach((card) => {
  //   card.addEventListener("click", () => {
  //     // Add click handling for property cards
  //     console.log("Property card clicked")
  //   })
  // })

  // Initialize tooltips and other interactive elements
  initializeInteractiveElements()
})

// Property search handler
function handlePropertySearch() {
  const searchForm = document.querySelector(".search-form")
  const formData = new FormData()

  const selects = searchForm.querySelectorAll("select")
  selects.forEach((select) => {
    if (select.value && select.value !== select.options[0].value) {
      formData.append(select.name || "search_param", select.value)
    }
  })

  // Simulate search - in real implementation, this would make an API call
  console.log("Searching properties with criteria:", Object.fromEntries(formData))

  // Show loading state
  const searchBtn = searchForm.querySelector(".btn-primary")
  const originalText = searchBtn.textContent
  searchBtn.innerHTML = '<span class="spinner"></span> Searching...'
  searchBtn.disabled = true

  // Simulate API delay
  setTimeout(() => {
    searchBtn.textContent = originalText
    searchBtn.disabled = false

    // Redirect to properties page with search parameters
    const params = new URLSearchParams(formData)
    window.location.href = `properties.html?${params.toString()}`
  }, 1500)
}

// // Form submission handler
// function handleFormSubmission(form) {
//   const formData = new FormData(form)
//   const submitBtn = form.querySelector('button[type="submit"]')

//   if (submitBtn) {
//     const originalText = submitBtn.textContent
//     submitBtn.innerHTML = '<span class="spinner"></span> Sending...'
//     submitBtn.disabled = true

//     // Simulate form submission
//     setTimeout(() => {
//       submitBtn.textContent = originalText
//       submitBtn.disabled = false

//       // Show success message
//       showNotification("Message sent successfully! We will get back to you soon.", "success")
//       form.reset()
//     }, 2000)
//   }
// }

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `

  // Add notification styles if not already present
  if (!document.querySelector("#notification-styles")) {
    const styles = document.createElement("style")
    styles.id = "notification-styles"
    styles.textContent = `
            .notification {
                position: fixed;
                top: 2rem;
                right: 2rem;
                background: white;
                border-radius: 0.5rem;
                box-shadow: 0 10px 25px rgba(0,0,0,0.15);
                z-index: 10000;
                min-width: 300px;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            }
            .notification.show {
                transform: translateX(0);
            }
            .notification-content {
                padding: 1rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .notification-success {
                border-left: 4px solid #10b981;
            }
            .notification-error {
                border-left: 4px solid #ef4444;
            }
            .notification-info {
                border-left: 4px solid #3b82f6;
            }
            .notification-close {
                background: none;
                border: none;
                font-size: 1.25rem;
                cursor: pointer;
                color: #6b7280;
                margin-left: 1rem;
            }
        `
    document.head.appendChild(styles)
  }

  document.body.appendChild(notification)

  // Show notification
  setTimeout(() => notification.classList.add("show"), 100)

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.classList.remove("show")
    setTimeout(() => notification.remove(), 300)
  }, 5000)

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close")
  closeBtn.addEventListener("click", () => {
    notification.classList.remove("show")
    setTimeout(() => notification.remove(), 300)
  })
}

// Initialize interactive elements
function initializeInteractiveElements() {
  // Add hover effects to cards
  const cards = document.querySelectorAll(".card, .property-card, .feature-card")
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })

  // Add click effects to buttons
  const buttons = document.querySelectorAll(".btn")
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Create ripple effect
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
                animation: ripple 0.6s linear;
                pointer-events: none;
            `

      if (!document.querySelector("#ripple-styles")) {
        const styles = document.createElement("style")
        styles.id = "ripple-styles"
        styles.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                    .btn {
                        position: relative;
                        overflow: hidden;
                    }
                `
        document.head.appendChild(styles)
      }

      this.appendChild(ripple)
      setTimeout(() => ripple.remove(), 600)
    })
  })

  // Initialize lazy loading for images
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.removeAttribute("data-src")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Utility functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments
    
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Search functionality for properties page
function initializePropertyFilters() {
  const filterForm = document.querySelector(".filter-form")
  if (!filterForm) return

  const filterInputs = filterForm.querySelectorAll("input, select")
  const propertyCards = document.querySelectorAll(".property-card")

  filterInputs.forEach((input) => {
    input.addEventListener("change", debounce(filterProperties, 300))
  })

  function filterProperties() {
    const filters = {}
    filterInputs.forEach((input) => {
      if (input.value && input.value !== "") {
        filters[input.name] = input.value.toLowerCase()
      }
    })

    propertyCards.forEach((card) => {
      const shouldShow = Object.keys(filters).every((key) => {
        const cardValue = card.dataset[key]
        return !cardValue || cardValue.toLowerCase().includes(filters[key])
      })

      card.style.display = shouldShow ? "block" : "none"
    })
  }
}

// Initialize property filters if on properties page
if (window.location.pathname.includes("properties")) {
  document.addEventListener("DOMContentLoaded", initializePropertyFilters)
}

// WhatsApp integration
function openWhatsApp(message = "") {
  const phoneNumber = "919370655832"
  const defaultMessage = "Hi! I am interested in your real estate services."
  const finalMessage = message || defaultMessage
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`
  window.open(url, "_blank")
}

// Add WhatsApp click handlers
document.addEventListener("DOMContentLoaded", () => {
  const whatsappButtons = document.querySelectorAll("[data-whatsapp]")
  whatsappButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()
      const message = this.dataset.whatsapp
      openWhatsApp(message)
    })
  })
})

// Performance optimization
window.addEventListener("load", () => {
  // Remove loading states
  document.body.classList.remove("loading")

  // Initialize performance monitoring
  if ("performance" in window) {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart
    console.log(`Page loaded in ${loadTime}ms`)
  }
})

// Error handling
window.addEventListener("error", (e) => {
  console.error("JavaScript error:", e.error)
  // In production, you might want to send this to an error tracking service
})

// Service Worker registration (for PWA capabilities)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => console.log("SW registered"))
      .catch((error) => console.log("SW registration failed"))
  })
}

  const slides = document.querySelector('.slides');
  const slideItems = document.querySelectorAll('.slide');
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');

  let index = 0;

  function showSlide(i) {
    index = (i + slideItems.length) % slideItems.length;
    slides.style.transform = `translateX(-${index * 100}%)`;
  }

  nextBtn.addEventListener('click', () => showSlide(index + 1));
  prevBtn.addEventListener('click', () => showSlide(index - 1));


// Contact form submission
const form = document.getElementById("contactForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const res = await fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  });
  if (res.ok) {
    alert("Thanks! We received your message.");
    form.reset();
  } else {
    alert("Oops, something went wrong.");
  }
});

