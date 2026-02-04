// ============================================
// MAIN JAVASCRIPT FUNCTIONALITY
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================
  // MOBILE MENU TOGGLE
  // ============================================
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');
  
  if (navbarToggle) {
    navbarToggle.addEventListener('click', function() {
      navbarToggle.classList.toggle('active');
      navbarMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const menuLinks = navbarMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        navbarToggle.classList.remove('active');
        navbarMenu.classList.remove('active');
      });
    });
  }

  // ============================================
  // STICKY NAVBAR
  // ============================================
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.15)';
    }

    lastScroll = currentScroll;
  });

  // ============================================
  // SMOOTH SCROLLING FOR ANCHOR LINKS
  // ============================================
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#"
      if (href === '#') return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================
  // SCROLL TO TOP BUTTON
  // ============================================
  const scrollToTopBtn = document.querySelector('.scroll-to-top');
  
  if (scrollToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    });

    scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ============================================
  // INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
  // ============================================
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach(element => {
    fadeObserver.observe(element);
  });

  // ============================================
  // COUNTER ANIMATION
  // ============================================
  const counters = document.querySelectorAll('[data-counter]');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        const target = parseInt(entry.target.getAttribute('data-counter'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            entry.target.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            entry.target.textContent = target;
          }
        };

        updateCounter();
        entry.target.classList.add('counted');
      }
    });
  }, {
    threshold: 0.5
  });

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });

  // ============================================
  // ACTIVE NAVIGATION HIGHLIGHTING
  // ============================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-menu a');

  function highlightNavigation() {
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  if (sections.length > 0) {
    window.addEventListener('scroll', highlightNavigation);
  }

  // ============================================
  // TESTIMONIAL SLIDER (if exists on page)
  // ============================================
  const testimonialSlider = document.querySelector('.testimonial-slider');
  
  if (testimonialSlider) {
    const slides = testimonialSlider.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    const dotsContainer = document.querySelector('.testimonial-dots');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    // Create dots
    if (dotsContainer) {
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    }

    function showSlide(index) {
      slides.forEach(slide => slide.classList.remove('active'));
      slides[index].classList.add('active');

      // Update dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
      }
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      showSlide(currentSlide);
    }

    function goToSlide(index) {
      currentSlide = index;
      showSlide(currentSlide);
    }

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Auto-play
    let autoplay = setInterval(nextSlide, 5000);

    // Pause on hover
    testimonialSlider.addEventListener('mouseenter', () => {
      clearInterval(autoplay);
    });

    testimonialSlider.addEventListener('mouseleave', () => {
      autoplay = setInterval(nextSlide, 5000);
    });
  }

  // ============================================
  // RESULTS MARQUEE ANIMATION (if exists)
  // ============================================
  const marquee = document.querySelector('.results-marquee');
  
  if (marquee) {
    const marqueeContent = marquee.querySelector('.marquee-content');
    if (marqueeContent) {
      // Clone content for seamless loop
      const clone = marqueeContent.cloneNode(true);
      marquee.appendChild(clone);
    }
  }

});
