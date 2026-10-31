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
     2. NAVBAR DROPDOWNS & ACCORDION (SAFARIS & DESTINATIONS)
     Click-to-expand accordion functionality across Desktop, Tablet & Mobile
  ================================================ */
  const dropdownItems = document.querySelectorAll('.nav-item-dropdown');

  dropdownItems.forEach(dropdown => {
    // The toggle heading link containing text + arrow icon
    const toggleLink = dropdown.querySelector(':scope > .nav-link') || dropdown.querySelector('.nav-link');
    if (!toggleLink) return;

    toggleLink.setAttribute('aria-haspopup', 'true');
    toggleLink.setAttribute('aria-expanded', 'false');

    toggleLink.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const isAlreadyOpen = dropdown.classList.contains('is-open');

      // Collapse any other open dropdowns (accordion behavior)
      dropdownItems.forEach(other => {
        if (other !== dropdown) {
          other.classList.remove('is-open', 'mobile-open');
          const otherLink = other.querySelector(':scope > .nav-link') || other.querySelector('.nav-link');
          if (otherLink) otherLink.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current dropdown
      if (isAlreadyOpen) {
        dropdown.classList.remove('is-open', 'mobile-open');
        toggleLink.setAttribute('aria-expanded', 'false');
      } else {
        dropdown.classList.add('is-open', 'mobile-open');
        toggleLink.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item-dropdown')) {
      dropdownItems.forEach(dropdown => {
        dropdown.classList.remove('is-open', 'mobile-open');
        const link = dropdown.querySelector(':scope > .nav-link') || dropdown.querySelector('.nav-link');
        if (link) link.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Close dropdowns on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdownItems.forEach(dropdown => {
        dropdown.classList.remove('is-open', 'mobile-open');
        const link = dropdown.querySelector(':scope > .nav-link') || dropdown.querySelector('.nav-link');
        if (link) link.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Mobile Hamburger Menu Toggle
  const hamburger = document.querySelector('.hamburger-menu');
  const navList   = document.querySelector('.nav-links-list');

  if (hamburger && navList) {
    hamburger.addEventListener('click', () => {
      const isActive = hamburger.classList.toggle('active');
      navList.classList.toggle('active');

      // Collapse dropdowns when hamburger menu is closed
      if (!isActive) {
        dropdownItems.forEach(dropdown => {
          dropdown.classList.remove('is-open', 'mobile-open');
          const link = dropdown.querySelector(':scope > .nav-link') || dropdown.querySelector('.nav-link');
          if (link) link.setAttribute('aria-expanded', 'false');
        });
      }
    });

    // Close mobile nav when clicking a regular link or submenu item (not dropdown toggles)
    navList.querySelectorAll('a').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        if (anchor.matches('.nav-item-dropdown > .nav-link')) {
          return;
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
