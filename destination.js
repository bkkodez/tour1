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
     2. NAVBAR DROPDOWNS & ARROW TOGGLES (SAFARIS & DESTINATIONS)
     Independent navigation links & click-to-expand arrow buttons
  ================================================ */
  const dropdownItems = document.querySelectorAll('.nav-item-dropdown');

  dropdownItems.forEach(dropdown => {
    const navLink = dropdown.querySelector(':scope > .nav-link') || dropdown.querySelector('.nav-link');
    let toggleBtn = dropdown.querySelector('.nav-dropdown-toggle');

    // Dynamic fallback / normalization: if arrow is still inside navLink, extract it into a separate button
    if (!toggleBtn && navLink) {
      const arrowIcon = navLink.querySelector('.nav-dropdown-arrow');
      if (arrowIcon) {
        toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.className = 'nav-dropdown-toggle';
        toggleBtn.setAttribute('aria-label', 'Toggle dropdown menu');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.appendChild(arrowIcon);
        navLink.insertAdjacentElement('afterend', toggleBtn);
      }
    }

    if (toggleBtn) {
      toggleBtn.setAttribute('aria-haspopup', 'true');
      toggleBtn.setAttribute('aria-expanded', 'false');

      toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const isAlreadyOpen = dropdown.classList.contains('is-open');

        // Collapse any other open dropdowns (accordion behavior)
        dropdownItems.forEach(other => {
          if (other !== dropdown) {
            other.classList.remove('is-open', 'mobile-open');
            const otherBtn = other.querySelector('.nav-dropdown-toggle');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current dropdown
        if (isAlreadyOpen) {
          dropdown.classList.remove('is-open', 'mobile-open');
          toggleBtn.setAttribute('aria-expanded', 'false');
        } else {
          dropdown.classList.add('is-open', 'mobile-open');
          toggleBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item-dropdown')) {
      dropdownItems.forEach(dropdown => {
        dropdown.classList.remove('is-open', 'mobile-open');
        const btn = dropdown.querySelector('.nav-dropdown-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Close dropdowns on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdownItems.forEach(dropdown => {
        dropdown.classList.remove('is-open', 'mobile-open');
        const btn = dropdown.querySelector('.nav-dropdown-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
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
          const btn = dropdown.querySelector('.nav-dropdown-toggle');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });
      }
    });

    // Close mobile nav when clicking any link
    navList.querySelectorAll('a').forEach(anchor => {
      anchor.addEventListener('click', () => {
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
