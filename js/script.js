// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", function () {
  // Hamburger menu toggle
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav");
  const navOverlay = document.querySelector(".nav-overlay");

  if (hamburger && nav) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      nav.classList.toggle("active");
      if (navOverlay) {
        navOverlay.classList.toggle("active");
      }
      // Prevent body scroll when menu is open
      document.body.style.overflow = nav.classList.contains("active")
        ? "hidden"
        : "";
    });

    // Close menu when clicking overlay
    if (navOverlay) {
      navOverlay.addEventListener("click", function () {
        hamburger.classList.remove("active");
        nav.classList.remove("active");
        navOverlay.classList.remove("active");
        document.body.style.overflow = "";
      });
    }

    // Close menu when clicking a nav link
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function () {
        if (window.innerWidth <= 768) {
          hamburger.classList.remove("active");
          nav.classList.remove("active");
          if (navOverlay) {
            navOverlay.classList.remove("active");
          }
          document.body.style.overflow = "";
        }
      });
    });
  }

  // Add smooth scrolling to all navigation links
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Add active state to navigation based on scroll position
  window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    const headerHeight = document.querySelector(".header").offsetHeight;

    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionHeight = section.offsetHeight;

      if (
        window.pageYOffset >= sectionTop &&
        window.pageYOffset < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });

  // Project Filter Functionality
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card[data-tech]");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Update active button
      filterBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      const filter = this.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const techs = card.getAttribute("data-tech").toLowerCase();

        if (filter === "all" || techs.includes(filter.toLowerCase())) {
          card.classList.remove("hidden");
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
});

// Contact form handling
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const name = formData.get("name");
      const email = formData.get("email");
      const subject = formData.get("subject");
      const message = formData.get("message");

      // Create mailto link
      const mailtoLink = `mailto:goku.careers@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

      // Open email client
      window.location.href = mailtoLink;

      // Show success message
      showNotification(
        "Email client opened! Please send the email to complete your message.",
        "success",
      );

      // Reset form
      this.reset();
    });
  }
});

// Resume download functionality
function downloadResume() {
  // Use the actual PDF file
  const link = document.createElement("a");
  link.href = "Gokul_Nandakumar_Resume.pdf";
  link.download = "Gokul_Nandakumar_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showNotification("Resume download started!", "success");
}

// Copy email to clipboard
function copyEmail() {
  const email = "keshavgupta79r@gmail.com";
  navigator.clipboard
    .writeText(email)
    .then(() => {
      showNotification("Email copied to clipboard!", "success");
    })
    .catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      showNotification("Email copied to clipboard!", "success");
    });
}

// Contact Modal Functions
function openContactModal() {
  const modal = document.getElementById("contactModal");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeContactModal() {
  const modal = document.getElementById("contactModal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

// Close modal when clicking outside
document.addEventListener("click", function (e) {
  const modal = document.getElementById("contactModal");
  if (e.target === modal) {
    closeContactModal();
  }
});

// Close modal on Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeContactModal();
  }
});

// Contact modal form submission
document.addEventListener("DOMContentLoaded", function () {
  const modalForm = document.getElementById("contactModalForm");
  if (modalForm) {
    modalForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const name = formData.get("name");
      const email = formData.get("email");
      const message = formData.get("message");

      // Create mailto link
      const mailtoLink = `mailto:goku.careers@gmail.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

      // Open email client
      window.location.href = mailtoLink;

      // Show success message and close modal
      showNotification(
        "Email client opened! Please send the email to complete your message.",
        "success",
      );
      closeContactModal();

      // Reset form
      this.reset();
    });
  }
});

// Project navigation functionality
function openProject(projectId) {
  const projectPages = {
    "meeting-notes": "projects/meeting-notes-project.html",
    "ev-charger": "projects/ev-charger-project.html",
    "yoga-classification": "projects/yoga-classification-project.html",
    "layoff-analysis": "projects/layoff-analysis-project.html",
    "gpu-telemetry-lakehouse": "projects/gpu-telemetry-project.html",
    "automation-roi": "projects/automation-roi-project.html",
    "resume-modifier": "projects/resume-modifier-project.html",
  };

  if (projectPages[projectId]) {
    window.location.href = projectPages[projectId];
  } else {
    showNotification("Project page coming soon!", "info");
  }
}

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Style the notification
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === "success" ? "#16a34a" : type === "error" ? "#dc2626" : "#2563eb"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.9rem;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 4 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 4000);
}

// Add loading animation for project cards
document.addEventListener("DOMContentLoaded", function () {
  const projectCards = document.querySelectorAll(
    ".project-card:not(.placeholder)",
  );

  projectCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";

    setTimeout(() => {
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 200);
  });
});

// Add typing effect to hero title
document.addEventListener("DOMContentLoaded", function () {
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalHTML = heroTitle.innerHTML;
    const plainText = heroTitle.textContent;
    heroTitle.textContent = "";

    let i = 0;
    const typeWriter = () => {
      if (i < plainText.length) {
        heroTitle.textContent += plainText.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      } else {
        // Once typing is done, swap in the styled HTML with green highlight
        heroTitle.innerHTML = originalHTML;
      }
    };

    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
  }
});

// Add scroll-triggered animations for sections
document.addEventListener("DOMContentLoaded", function () {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe sections for animation
  const sections = document.querySelectorAll(
    ".skills-section, .experience-section, .projects-section, .education-section, .contact-form-section",
  );
  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    observer.observe(section);
  });

  // Observe individual items for staggered animation (grouped by section to reset delay)
  const itemGroups = [
    ".skill-category",
    ".experience-item",
    ".project-card",
    ".education-item",
    ".cert-item",
  ];

  itemGroups.forEach((selector) => {
    const items = document.querySelectorAll(selector);
    items.forEach((item, index) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(20px)";
      item.style.transition = `opacity 0.4s ease ${index * 0.1}s, transform 0.4s ease ${index * 0.1}s`;
      observer.observe(item);
    });
  });
});

// Tech logo hover effects
document.addEventListener("DOMContentLoaded", function () {
  const techLogos = document.querySelectorAll(".tech-logo");

  techLogos.forEach((logo) => {
    logo.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1) rotate(5deg)";
    });

    logo.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotate(0deg)";
    });
  });
});

// Add CSS for animations
const style = document.createElement("style");
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .nav a.active {
        color: #16a34a;
        position: relative;
    }
    
    .nav a.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        right: 0;
        height: 2px;
        background-color: #16a34a;
        border-radius: 1px;
    }
    
    .skill-tag {
        transition: transform 0.2s ease;
    }
    
    .skill-tag:hover {
        transform: scale(1.05);
    }
    
    .experience-item {
        position: relative;
        overflow: hidden;
    }
    
    .experience-item::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(22, 163, 74, 0.08), transparent);
        transition: left 0.5s ease;
    }
    
    .experience-item:hover::before {
        left: 100%;
    }
    
    .tech-logo {
        transition: transform 0.3s ease, filter 0.3s ease;
    }
    
    .contact-item {
        position: relative;
        overflow: hidden;
    }
    
    .contact-item::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(22, 163, 74, 0.08), transparent);
        transition: left 0.5s ease;
    }
    
    .contact-item:hover::before {
        left: 100%;
    }
    
    .form-group input:focus,
    .form-group textarea:focus {
        box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.1);
    }
    
    .submit-btn {
        position: relative;
        overflow: hidden;
    }
    
    .submit-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s ease;
    }
    
    .submit-btn:hover::before {
        left: 100%;
    }
`;
document.head.appendChild(style);
