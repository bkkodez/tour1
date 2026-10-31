/* destination.js — Shared JS for all HAK Tours destination pages */

document.addEventListener('DOMContentLoaded', () => {

  /* ================================================
     1. NAVBAR — scroll effect (same as homepage)
  ================================================ */
  const header = document.getElementById('main-header');
  if (header) {
    const onScroll = () => {
      /* .scrolled only adjusts box-shadow depth — background stays solid at all times */
      header.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ================================================
     2. HAMBURGER MENU & MOBILE DROPDOWNS
  ================================================ */
  const hamburger = document.querySelector('.hamburger-menu');
  const navList   = document.querySelector('.nav-links-list');
  const navLinks  = document.querySelectorAll('.nav-link');
  if (hamburger && navList) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navList.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const dropdownItem = link.closest('.nav-item-dropdown');
        if (dropdownItem && window.innerWidth <= 768) {
          if (!dropdownItem.classList.contains('mobile-open')) {
            e.preventDefault();
            document.querySelectorAll('.nav-item-dropdown').forEach(other => {
              if (other !== dropdownItem) other.classList.remove('mobile-open');
            });
            dropdownItem.classList.add('mobile-open');
            return;
          }
        }
        hamburger.classList.remove('active');
        navList.classList.remove('active');
      });
    });
  }

  /* ================================================
     3. FAQ ACCORDION — one open at a time
  ================================================ */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // close all
      faqItems.forEach(i => i.classList.remove('open'));
      // re-open if it was closed
      if (!isOpen) item.classList.add('open');
    });
  });



  /* ================================================
     6. BOOK / CTA BUTTONS — link to contact page
  ================================================ */
  document.querySelectorAll('.btn-hero-book, .btn-cta-primary').forEach(btn => {
    if (btn.tagName === 'BUTTON' && !btn.getAttribute('data-linked')) {
      btn.addEventListener('click', () => {
        window.location.href = 'contact.html';
      });
      btn.setAttribute('data-linked', '1');
    }
  });

  /* ================================================
     7. LAZY-LOAD gallery & wildlife images
  ================================================ */
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img[data-src]').forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    // Fallback for browsers that don't support native lazy loading
    document.querySelectorAll('img[data-src]').forEach(img => {
      img.src = img.dataset.src;
    });
  }

});
