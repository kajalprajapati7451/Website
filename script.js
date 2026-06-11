document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Header Scrolled Effect
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');
  const toggleIcon = mobileMenuToggle.querySelector('i');

  mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Toggle icon fa-bars / fa-xmark
    if (navMenu.classList.contains('active')) {
      toggleIcon.classList.remove('fa-bars');
      toggleIcon.classList.add('fa-xmark');
    } else {
      toggleIcon.classList.remove('fa-xmark');
      toggleIcon.classList.add('fa-bars');
    }
  });

  // Close mobile menu when links are clicked
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // If mobile view and has dropdown, don't close immediately (allow toggling dropdown)
      const isMobile = window.innerWidth <= 1024;
      const hasDropdown = link.nextElementSibling && link.nextElementSibling.classList.contains('dropdown-menu');
      
      if (isMobile && hasDropdown) {
        e.preventDefault();
        const parentItem = link.parentElement;
        parentItem.classList.toggle('open');
      } else {
        navMenu.classList.remove('active');
        toggleIcon.classList.remove('fa-xmark');
        toggleIcon.classList.add('fa-bars');
      }
    });
  });

  // 3. Hero Slider Interactivity
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  let slideInterval;

  const heroSection = document.getElementById('home');
  const showSlide = (index) => {
    heroSlides.forEach(slide => slide.classList.remove('active'));
    heroDots.forEach(dot => dot.classList.remove('active'));
    
    heroSlides[index].classList.add('active');
    heroDots[index].classList.add('active');
    
    // Update the hero section's background image to match the active slide
    const bgImage = heroSlides[index].getAttribute('data-bg');
    if (bgImage) {
      heroSection.style.backgroundImage = `linear-gradient(135deg, rgba(5, 46, 22, 0.9) 0%, rgba(17, 24, 39, 0.85) 100%), url('${bgImage}')`;
    }
    
    currentSlide = index;
  };

  const nextSlide = () => {
    let next = (currentSlide + 1) % heroSlides.length;
    showSlide(next);
  };

  const startSlideShow = () => {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 6000); // 6 seconds auto-transition
  };

  heroDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const targetIndex = parseInt(e.target.getAttribute('data-slide'));
      showSlide(targetIndex);
      startSlideShow(); // reset timer on manual click
    });
  });

  startSlideShow();

  // 4. Testimonials Slider Interactivity
  const feedbackTrack = document.getElementById('feedbackTrack');
  const feedbackSlides = document.querySelectorAll('.feedback-slide');
  const prevBtn = document.getElementById('prevFeedback');
  const nextBtn = document.getElementById('nextFeedback');
  let currentFeedbackIndex = 0;

  const updateFeedbackPosition = () => {
    feedbackTrack.style.transform = `translateX(-${currentFeedbackIndex * 100}%)`;
  };

  nextBtn.addEventListener('click', () => {
    if (currentFeedbackIndex < feedbackSlides.length - 1) {
      currentFeedbackIndex++;
    } else {
      currentFeedbackIndex = 0; // loop back to first
    }
    updateFeedbackPosition();
  });

  prevBtn.addEventListener('click', () => {
    if (currentFeedbackIndex > 0) {
      currentFeedbackIndex--;
    } else {
      currentFeedbackIndex = feedbackSlides.length - 1; // loop to last
    }
    updateFeedbackPosition();
  });

  // 5. Scroll-To-Top Button
  const scrollToTopBtn = document.getElementById('scrollToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollToTopBtn.classList.add('active');
    } else {
      scrollToTopBtn.classList.remove('active');
    }
  });

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // 6. Mobile Sticky Enquire Click handler
  const mobileEnquireBtn = document.getElementById('mobileEnquireBtn');
  mobileEnquireBtn.addEventListener('click', () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // 7. Form Submission Lead Analytics Integration Simulators
  const heroForm = document.getElementById('heroLeadForm');
  const heroSuccess = document.getElementById('heroFormSuccess');

  heroForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate lead tracking analytics push
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'lead_submission',
      'form_type': 'hero_split_form',
      'service_interest': document.getElementById('heroInterest').value
    });
    
    // Animate button loading state
    const submitBtn = heroForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerText;
    submitBtn.disabled = true;
    submitBtn.innerText = 'Sending Request...';

    setTimeout(() => {
      submitBtn.innerText = originalText;
      submitBtn.disabled = false;
      heroSuccess.style.display = 'block';
      heroForm.reset();
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        heroSuccess.style.display = 'none';
      }, 5000);
    }, 1500);
  });

  const contactForm = document.getElementById('contactForm');
  const contactSuccess = document.getElementById('contactFormSuccess');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate lead tracking analytics push
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'contact_submission',
      'form_type': 'contact_full_form',
      'preferred_mode': document.getElementById('contactPref').value
    });

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerText;
    submitBtn.disabled = true;
    submitBtn.innerText = 'Submitting Scope...';

    setTimeout(() => {
      submitBtn.innerText = originalText;
      submitBtn.disabled = false;
      contactSuccess.style.display = 'block';
      contactForm.reset();
      
      setTimeout(() => {
        contactSuccess.style.display = 'none';
      }, 5000);
    }, 1800);
  });

  // 8. Scroll Reveal Animations
  const reveals = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    reveals.forEach(reveal => {
      const windowHeight = window.innerHeight;
      const elementTop = reveal.getBoundingClientRect().top;
      const elementVisible = 120; // vertical offset threshold
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  // Trigger initially on load
  revealOnScroll();

  // 9. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all items
      faqItems.forEach(faq => {
        faq.classList.remove('active');
      });
      
      // Open the clicked one if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

});
