/**
 * HORIZON TOURS AND TRAVEL — PACKAGE DETAIL PAGE INTERACTION
 * Premium 3-Tab Navigation, Moving Gold Indicator & Scroll-Spy
 */

(function () {
  'use strict';

  function initPackageNav() {
    var navWrapper = document.getElementById('pkg-section-nav');
    if (!navWrapper) return;

    var navTabsContainer = navWrapper.querySelector('.pkg-nav-tabs');
    var navTabs = navWrapper.querySelectorAll('.pkg-nav-tab');
    var indicator = navWrapper.querySelector('.pkg-nav-indicator');
    var sections = ['section-summary', 'section-itinerary', 'section-inclusions'];

    if (!navTabsContainer || !indicator || navTabs.length === 0) return;

    // Move sliding indicator to active button
    function updateIndicator(activeTab) {
      if (!indicator || !activeTab) return;
      var containerRect = navTabsContainer.getBoundingClientRect();
      var tabRect = activeTab.getBoundingClientRect();

      var leftOffset = tabRect.left - containerRect.left + navTabsContainer.scrollLeft;
      indicator.style.left = leftOffset + 'px';
      indicator.style.width = tabRect.width + 'px';
    }

    // Set active tab
    function setActiveTab(tab) {
      if (!tab) return;
      navTabs.forEach(function (t) {
        t.classList.remove('pkg-nav-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('pkg-nav-active');
      tab.setAttribute('aria-selected', 'true');
      updateIndicator(tab);
    }

    // Smooth scroll to section
    function scrollToSection(targetId, tab) {
      var targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      var headerEl = document.getElementById('main-header');
      var headerH = headerEl ? headerEl.offsetHeight : 80;
      var navH = navWrapper ? navWrapper.offsetHeight : 55;
      var totalOffset = headerH + navH + 15;

      var elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
      var offsetPosition = elementPosition - totalOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setActiveTab(tab);
    }

    // Attach click listeners to tabs
    navTabs.forEach(function (tab) {
      tab.addEventListener('click', function (e) {
        e.preventDefault();
        var targetId = tab.getAttribute('data-target');
        scrollToSection(targetId, tab);
      });
    });

    // Scroll-Spy: detect which section is currently in view
    function handleScrollSpy() {
      var headerEl = document.getElementById('main-header');
      var headerH = headerEl ? headerEl.offsetHeight : 80;
      var navH = navWrapper ? navWrapper.offsetHeight : 55;
      var triggerPoint = headerH + navH + 80;

      var currentSectionId = sections[0];

      for (var i = 0; i < sections.length; i++) {
        var sec = document.getElementById(sections[i]);
        if (sec) {
          var rect = sec.getBoundingClientRect();
          if (rect.top <= triggerPoint) {
            currentSectionId = sections[i];
          }
        }
      }

      navTabs.forEach(function (tab) {
        if (tab.getAttribute('data-target') === currentSectionId) {
          if (!tab.classList.contains('pkg-nav-active')) {
            setActiveTab(tab);
          }
        }
      });
    }

    // Optimized scroll listener
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          handleScrollSpy();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    // Handle window resize & horizontal tab scroll (mobile)
    window.addEventListener('resize', function () {
      var active = navWrapper.querySelector('.pkg-nav-tab.pkg-nav-active');
      if (active) {
        updateIndicator(active);
      }
    });

    navTabsContainer.addEventListener('scroll', function () {
      var active = navWrapper.querySelector('.pkg-nav-tab.pkg-nav-active');
      if (active) {
        updateIndicator(active);
      }
    }, { passive: true });

    // Initialize indicator on page load
    setTimeout(function () {
      var initialActive = navWrapper.querySelector('.pkg-nav-tab.pkg-nav-active') || navTabs[0];
      if (initialActive) {
        setActiveTab(initialActive);
      }
    }, 100);
  }

  function start() {
    initPackageNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
