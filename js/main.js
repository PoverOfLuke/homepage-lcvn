document.addEventListener('DOMContentLoaded', () => {

  // ===== PRELOADER =====
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('hidden'), 300);
    });
    setTimeout(() => preloader.classList.add('hidden'), 2000);
  }

  // ===== THEME TOGGLE =====
  const themeToggle = document.querySelector('.theme-toggle');
  const htmlEl = document.documentElement;
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    htmlEl.setAttribute('data-bs-theme', savedTheme);
  } else {
    htmlEl.setAttribute('data-bs-theme', 'dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-bs-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-bs-theme', next);
      localStorage.setItem('theme', next);
      themeToggle.innerHTML = next === 'dark'
        ? '<i class="fas fa-moon"></i>'
        : '<i class="fas fa-sun"></i>';
    });
    const icon = htmlEl.getAttribute('data-bs-theme') === 'dark' ? 'fa-moon' : 'fa-sun';
    themeToggle.innerHTML = `<i class="fas ${icon}"></i>`;
  }

  // ===== NAVBAR SCROLL =====
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ===== NAVBAR ACTIVE LINK =====
  const navLinks = document.querySelectorAll('.navbar .nav-link');
  const sections = document.querySelectorAll('section[id]');
  function setActiveLink() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 150;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  if (sections.length && navLinks.length) {
    window.addEventListener('scroll', setActiveLink);
    setActiveLink();
  }

  // ===== TYPEWRITER =====
  const typewriterEl = document.querySelector('.typewriter');
  if (typewriterEl) {
    const phrases = [
      'Siti web moderni e performanti',
      'Soluzioni su misura per te',
      'Landing page che convertono',
      'Design su misura per te',
      'Soluzioni web a prezzi onesti'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function type() {
      if (isPaused) {
        setTimeout(type, 2000);
        isPaused = false;
        return;
      }
      const currentPhrase = phrases[phraseIndex];
      if (isDeleting) {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === currentPhrase.length) {
        speed = 3000;
        isPaused = true;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 500;
      }

      setTimeout(type, speed);
    }
    type();
  }

  // ===== ANIMATED COUNTERS =====
  const statNumbers = document.querySelectorAll('.stat-number');
  let countersStarted = false;

  function startCounters() {
    if (countersStarted) return;
    countersStarted = true;
    statNumbers.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      let step = 0;
      const updateCounter = () => {
        step++;
        current += increment;
        if (step >= steps) {
          counter.textContent = target + '+';
          return;
        }
        counter.textContent = Math.round(current) + '+';
        requestAnimationFrame(updateCounter);
      };
      updateCounter();
    });
  }

  const statsSection = document.querySelector('.stats');
  if (statsSection && statNumbers.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .5 });
    observer.observe(statsSection);
  }

  // ===== SKILLS ANIMATION =====
  const skillBars = document.querySelectorAll('.skill-item .progress-bar');
  const skillsSection = document.querySelector('.skills');
  if (skillBars.length && skillsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .3 });
    observer.observe(skillsSection);
  }

  // ===== PORTFOLIO FILTER =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        portfolioItems.forEach(item => {
          if (filter === 'all' || item.classList.contains(filter)) {
            item.style.display = 'block';
            item.style.animation = 'fadeIn .5s ease';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // ===== PORTFOLIO LIGHTBOX =====
  const lightbox = document.getElementById('portfolioLightbox');
  if (lightbox) {
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxTitle = lightbox.querySelector('.lightbox-title');
    const lightboxDesc = lightbox.querySelector('.lightbox-desc');
    const bsLightbox = new bootstrap.Modal(lightbox);

    document.querySelectorAll('.portfolio-item').forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('.portfolio-thumb-placeholder');
        const title = item.querySelector('.portfolio-overlay h5');
        const desc = item.querySelector('.portfolio-overlay p');
        if (img) lightboxImg.src = img.src;
        if (title) lightboxTitle.textContent = title.textContent;
        if (desc) lightboxDesc.textContent = desc.textContent;
        bsLightbox.show();
      });
    });
  }

  // ===== TESTIMONIALS CAROUSEL AUTOPLAY =====
  const testimonialCarousel = document.querySelector('#testimonialCarousel');
  if (testimonialCarousel) {
    new bootstrap.Carousel(testimonialCarousel, {
      interval: 5000,
      touch: true,
      wrap: true
    });
  }

  // ===== CONTACT FORM =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));

    emailjs.init('YOUR_PUBLIC_KEY');

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      let isValid = true;

      [name, email, message].forEach(field => {
        field.classList.remove('is-invalid');
      });

      if (!name.value.trim()) {
        name.classList.add('is-invalid');
        isValid = false;
      }
      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.classList.add('is-invalid');
        isValid = false;
      }
      if (!message.value.trim()) {
        message.classList.add('is-invalid');
        isValid = false;
      }

      if (isValid) {
        const submitBtn = contactForm.querySelector('.btn-submit');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Invio in corso...';

        emailjs.sendForm('contact_service', 'contact_template', contactForm)
          .then(() => {
            contactForm.reset();
            successModal.show();
            setTimeout(() => successModal.hide(), 4000);
          })
          .catch(() => {
            alert('Errore nell\'invio. Riprova pi\u00f9 tardi.');
          })
          .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Invia messaggio';
          });
      }
    });
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===== BACK TO TOP =====
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('show', window.scrollY > 500);
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== AOS INIT (if available) =====
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic'
    });
  }

  // ===== CUSTOM CURSOR (desktop only) =====
  if (window.innerWidth > 1024 && !window.matchMedia('(pointer: coarse)').matches) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>';
    document.body.appendChild(cursor);

    const style = document.createElement('style');
    style.textContent = `
      .custom-cursor { position: fixed; pointer-events: none; z-index: 99999; top: 0; left: 0; }
      .cursor-dot { width: 8px; height: 8px; background: var(--primary); border-radius: 50%; position: fixed; transform: translate(-50%,-50%); transition: width .2s, height .2s, background .2s; z-index: 1; }
      .cursor-ring { width: 40px; height: 40px; border: 2px solid var(--primary); border-radius: 50%; position: fixed; transform: translate(-50%,-50%); transition: all .15s ease; z-index: 0; opacity: .5; }
      a:hover ~ .custom-cursor .cursor-ring,
      button:hover ~ .custom-cursor .cursor-ring,
      .service-card:hover ~ .custom-cursor .cursor-ring { width: 60px; height: 60px; opacity: .2; background: var(--primary); }
    `;
    document.head.appendChild(style);

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.querySelector('.cursor-dot').style.left = mouseX + 'px';
      cursor.querySelector('.cursor-dot').style.top = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * .15;
      ringY += (mouseY - ringY) * .15;
      cursor.querySelector('.cursor-ring').style.left = ringX + 'px';
      cursor.querySelector('.cursor-ring').style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();
  }

});
