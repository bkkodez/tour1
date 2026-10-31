document.addEventListener('DOMContentLoaded', () => {

    // ================================================================
    // SAFARI PACKAGES REGISTRY & DYNAMIC NAVIGATION DROPDOWN
    // ================================================================
    // ADD NEW SAFARI PACKAGES HERE:
    // When you create a new safari package HTML page, simply add an entry
    // to this array. The navigation system automatically checks the country
    // name ("Uganda" or "Rwanda") in the title or country property and places
    // it under the correct category column across all website pages!
    // ================================================================
    const SAFARI_PACKAGES_REGISTRY = [
        // --- UGANDA SAFARI PACKAGES ---
        {
            title: "5 Days Uganda Kibale and Bwindi Impenetrable National Parks Tour from Entebbe to Kigali",
            url: "5-days-uganda-kibale-and-bwindi-impenetrable-national-parks-tour-from-entebbe-to-kigali.html",
            country: "Uganda"
        },
        {
            title: "3 Day Uganda Gorilla Trekking",
            url: "3-day-uganda-gorilla-trekking.html",
            country: "Uganda"
        },
        {
            title: "11 Days Best of Uganda Safari",
            url: "11-days-best-of-uganda-safari.html",
            country: "Uganda"
        },
        {
            title: "3 Day Murchison Safari",
            url: "3-day-murchison-falls-safari.html",
            country: "Uganda"
        },
        {
            title: "4 Day Queen Elizabeth Safari",
            url: "4-day-queen-elizabeth-safari.html",
            country: "Uganda"
        },
        {
            title: "9 Days Uganda Safari",
            url: "9-days-uganda-safari-gorilla-trek-chimpanzee-and-wildlife-safari.html",
            country: "Uganda"
        },
        {
            title: "7 Days Uganda Primates & Wildlife Safari",
            url: "7-days-uganda-primates-wildlife-safari.html",
            country: "Uganda"
        },
        {
            title: "8 Days Uganda Gorilla & Wildlife Safari",
            url: "8-days-uganda-gorilla-wildlife-safari.html",
            country: "Uganda"
        },
        {
            title: "4 Days Bwindi & Queen Elizabeth National Park Safari",
            url: "4-days-bwindi-queen-elizabeth-national-park-safari.html",
            country: "Uganda"
        },

        // --- RWANDA SAFARI PACKAGES ---
        {
            title: "10 Days Rwanda Wildlife and Great Apes Safari",
            url: "10-days-rwanda-wildlife-and-great-apes-safari.html",
            country: "Rwanda"
        },
        {
            title: "5 Day Gorilla Rwanda",
            url: "5-day-gorilla-rwanda.html",
            country: "Rwanda"
        },
        {
            title: "9 Days Rwanda Gorilla, Golden Monkey & Nature Safari",
            url: "9-days-rwanda-gorilla-golden-monkey-nature-safari.html",
            country: "Rwanda"
        },
        {
            title: "3 Days Gorilla Trekking in Rwanda",
            url: "3-days-gorilla-trekking-in-rwanda.html",
            country: "Rwanda"
        },
        {
            title: "15 Days Rwanda & Uganda Safari",
            url: "15-days-rwanda-uganda-safari.html",
            country: "Rwanda"
        },
        {
            title: "10 Days Uganda-Rwanda Safari",
            url: "16-days-uganda-wildlife-and-cultural-safari.html",
            country: "Rwanda"
        }
    ];

    // Function to dynamically categorize and populate safari packages dropdown
    function populateSafarisDropdown() {
        const ugandaLists = document.querySelectorAll('.uganda-package-list');
        const rwandaLists = document.querySelectorAll('.rwanda-package-list');

        if (!ugandaLists.length && !rwandaLists.length) return;

        const ugandaPkgs = [];
        const rwandaPkgs = [];

        SAFARI_PACKAGES_REGISTRY.forEach(pkg => {
            const country = (pkg.country || '').toLowerCase();

            // Direct Country Categorization
            if (country === 'rwanda') {
                rwandaPkgs.push(pkg);
            } else if (country === 'uganda') {
                ugandaPkgs.push(pkg);
            } else if ((pkg.title || '').toLowerCase().includes('rwanda')) {
                rwandaPkgs.push(pkg);
            } else {
                ugandaPkgs.push(pkg);
            }
        });

        const renderItems = (items) => {
            return items.map(item => `<li><a href="${item.url}" class="dropdown-package-link">${item.title}</a></li>`).join('');
        };

        const ugandaHTML = renderItems(ugandaPkgs);
        const rwandaHTML = renderItems(rwandaPkgs);

        ugandaLists.forEach(list => { list.innerHTML = ugandaHTML; });
        rwandaLists.forEach(list => { list.innerHTML = rwandaHTML; });

        // Ensure VIEW MORE link is present at the bottom of every safaris dropdown menu
        document.querySelectorAll('.safaris-dropdown-menu').forEach(menu => {
            if (!menu.querySelector('.safaris-dropdown-footer')) {
                const footer = document.createElement('div');
                footer.className = 'safaris-dropdown-footer';
                footer.innerHTML = '<a href="safaris.html" class="dropdown-view-more-link">VIEW MORE</a>';
                menu.appendChild(footer);
            }
        });
    }

    populateSafarisDropdown();

    // ==========================================
    // HERO SUBTITLE — NATURAL TYPING EFFECT
    // ==========================================
    (function initHeroDescriptionTyping() {
        const subtext = document.getElementById('hero-subtext');
        if (!subtext) return;

        // Respect reduced motion — leave text as-is
        const reducedMotion = window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reducedMotion) return;

        // Save original HTML content to restore cleanly once complete
        const fullHTML = subtext.innerHTML;

        // Clone child nodes to decompose into character spans
        const originalNodes = Array.from(subtext.childNodes);
        const fragment = document.createDocumentFragment();
        const charSpans = [];

        function processNode(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent;
                for (let i = 0; i < text.length; i++) {
                    const span = document.createElement('span');
                    span.className = 'hero-type-char';
                    span.textContent = text[i];
                    fragment.appendChild(span);
                    charSpans.push(span);
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const elementClone = node.cloneNode(false);
                const childNodes = Array.from(node.childNodes);
                childNodes.forEach(child => {
                    if (child.nodeType === Node.TEXT_NODE) {
                        const childText = child.textContent;
                        for (let j = 0; j < childText.length; j++) {
                            const span = document.createElement('span');
                            span.className = 'hero-type-char';
                            span.textContent = childText[j];
                            elementClone.appendChild(span);
                            charSpans.push(span);
                        }
                    } else if (child.nodeType === Node.ELEMENT_NODE) {
                        elementClone.appendChild(child.cloneNode(true));
                    }
                });
                fragment.appendChild(elementClone);
            }
        }

        originalNodes.forEach(node => processNode(node));

        // Create blinking cursor element (starts hidden with .waiting until typing starts)
        const cursor = document.createElement('span');
        cursor.className = 'hero-type-cursor waiting';
        cursor.setAttribute('aria-hidden', 'true');
        cursor.textContent = '|';

        // Replace content with structured spans (pre-reserving full layout dimensions)
        subtext.innerHTML = '';
        subtext.appendChild(fragment);

        // Place cursor right after the first element/container at start
        if (charSpans.length > 0 && charSpans[0].parentNode) {
            charSpans[0].parentNode.insertBefore(cursor, charSpans[0]);
        } else {
            subtext.appendChild(cursor);
        }

        // Accessibility: ensure screen readers read the full sentence
        subtext.setAttribute('aria-label', subtext.textContent.replace(/\|/g, '').trim());

        let charIndex = 0;

        function typeNextChar() {
            if (charIndex < charSpans.length) {
                const currentChar = charSpans[charIndex];
                currentChar.classList.add('typed');

                // Move cursor directly after the newly revealed character
                if (currentChar.nextSibling) {
                    currentChar.parentNode.insertBefore(cursor, currentChar.nextSibling);
                } else {
                    currentChar.parentNode.appendChild(cursor);
                }

                const typedChar = currentChar.textContent;
                charIndex++;

                // Natural human typing cadence:
                // Slightly longer pause after sentence punctuation (., !, ?)
                // Brief pause after commas
                // Slight variation for letters
                let nextDelay = 32;
                if (typedChar === '.' || typedChar === '!' || typedChar === '?') {
                    nextDelay = 240;
                } else if (typedChar === ',') {
                    nextDelay = 130;
                } else if (typedChar === ' ') {
                    nextDelay = 40;
                } else {
                    nextDelay = 26 + Math.floor(Math.random() * 16);
                }

                setTimeout(typeNextChar, nextDelay);
            } else {
                // Typing is complete — keep cursor blinking briefly, then smoothly fade out
                setTimeout(() => {
                    cursor.classList.add('done');
                    setTimeout(() => {
                        // Restore clean original HTML and remove cursor completely
                        subtext.innerHTML = fullHTML;
                    }, 500);
                }, 1000);
            }
        }

        // ========================================================
        // SEQUENTIAL ANIMATION:
        // 1. Big Hero Word animates in first (slower, smooth reveal)
        // 2. Big Hero Word completely finishes
        // 3. Short noticeable pause
        // 4. Typing words start and typewriter continues normally
        // ========================================================
        const heading = document.getElementById('hero-heading');
        const PAUSE_AFTER_HEADING_MS = 220;
        let typingStarted = false;

        function startTyping() {
            if (typingStarted) return;
            typingStarted = true;
            cursor.classList.remove('waiting');
            typeNextChar();
        }

        if (heading) {
            heading.addEventListener('animationend', (e) => {
                if (!e.animationName || e.animationName === 'heroHeadingReveal') {
                    setTimeout(startTyping, PAUSE_AFTER_HEADING_MS);
                }
            }, { once: true });
        }

        // Guaranteed fallback in case animationend does not fire (e.g. backgrounded tab)
        // Heading timing: 150ms start delay + 1450ms animation + 220ms pause = 1820ms
        setTimeout(startTyping, 1850);
    })();

    // ==========================================
    // 0. NAVBAR DROPDOWNS & ACCORDION (SAFARIS & DESTINATIONS)
    // Click-to-expand accordion functionality across Desktop, Tablet & Mobile
    // ==========================================
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
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinksList = document.querySelector('.nav-links-list');

    if (hamburgerMenu && navLinksList) {
        hamburgerMenu.addEventListener('click', () => {
            const isActive = hamburgerMenu.classList.toggle('active');
            navLinksList.classList.toggle('active');

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
        navLinksList.querySelectorAll('a').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                if (anchor.matches('.nav-item-dropdown > .nav-link')) {
                    return;
                }
                hamburgerMenu.classList.remove('active');
                navLinksList.classList.remove('active');
            });
        });
    }

    // ==========================================
    // 1. NAVBAR SCROLL EFFECT
    // ==========================================
    const header = document.getElementById('main-header');
    
    // Performance: requestAnimationFrame scroll listener
    let ticking = false;
    const updateHeader = () => {
        if (window.scrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }, { passive: true });
    updateHeader();

    // ==========================================
    // 2. HERO SLIDESHOW
    // ==========================================
    const heroSlides = document.querySelectorAll('.hero-slide');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    const heroArea = document.getElementById('hero-section');

    if (heroSlides.length > 0) {
        let currentSlideIndex = 0;
        let slideInterval = null;
        let isPaused = false;
        const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const showSlide = (index) => {
            heroSlides.forEach(slide => slide.classList.remove('active'));
            heroSlides[index].classList.add('active');
        };

        const nextSlide = () => {
            currentSlideIndex = (currentSlideIndex + 1) % heroSlides.length;
            showSlide(currentSlideIndex);
        };

        const prevSlide = () => {
            currentSlideIndex = (currentSlideIndex - 1 + heroSlides.length) % heroSlides.length;
            showSlide(currentSlideIndex);
        };

        // Controls
        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextSlide();
            restartSlideshow();
        });
        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevSlide();
            restartSlideshow();
        });

        // Auto-play, Viewport & Visibility Management
        const startSlideshow = () => {
            if (prefersReducedMotion || isPaused || slideInterval) return;
            slideInterval = setInterval(nextSlide, 5000);
        };

        const stopSlideshow = () => {
            if (slideInterval) {
                clearInterval(slideInterval);
                slideInterval = null;
            }
        };

        const restartSlideshow = () => {
            stopSlideshow();
            startSlideshow();
        };

        if (heroArea) {
            heroArea.addEventListener('mouseenter', () => {
                isPaused = true;
                stopSlideshow();
            });
            heroArea.addEventListener('mouseleave', () => {
                isPaused = false;
                startSlideshow();
            });
        }

        // Pause when tab is inactive
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopSlideshow();
            } else if (!isPaused) {
                startSlideshow();
            }
        });

        // Performance: Pause when hero is out of viewport
        if ('IntersectionObserver' in window && heroArea) {
            const heroObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (!isPaused) startSlideshow();
                    } else {
                        stopSlideshow();
                    }
                });
            }, { threshold: 0.05 });
            heroObserver.observe(heroArea);
        } else {
            startSlideshow();
        }
    }

    // ==========================================
    // 3. INJECT IMAGES INTO DOM
    // Only fills images that have no src set in HTML
    // ==========================================

    // Destination card images — skip if src already set
    const destImgs = document.querySelectorAll('.destination-image');
    const destSources = [
        'images/gorilla.jpg',
        'images/lion.jpg',
        'images/murchisonfalls.jpg',
        'images/pic2.jpg',
        'images/chimp 1.jpg',
        'images/gp.jpg'
    ];
    destImgs.forEach((img, i) => {
        if (!img.src || img.src === window.location.href) {
            if (destSources[i]) { img.src = destSources[i]; }
        }
        img.loading = 'lazy';
    });

    // Package card images — skip if src already set
    const packImgs = document.querySelectorAll('.package-image');
    const packSources = [
        'images/goril.jpg',
        'images/layan.jpg',
        'images/murchisonfalls.jpg',
        'images/gp.jpg'
    ];
    packImgs.forEach((img, i) => {
        if (!img.src || img.src === window.location.href) {
            if (packSources[i]) { img.src = packSources[i]; }
        }
        img.loading = 'lazy';
    });

    // Gallery images
    const galImgs = document.querySelectorAll('.gallery-image');
    const galSources = [
        'images/xi.jpg',
        'images/X.jpg',
        'images/i.jpg',
        'images/P.jpg',
        'images/N.jpg',
        'images/A3.jpg'
    ];
    galImgs.forEach((img, i) => {
        if (galSources[i]) { img.src = galSources[i]; img.loading = 'lazy'; }
    });

    // ==========================================
    // 4. SCROLL REVEAL ANIMATIONS
    // ==========================================
    const revealElements = document.querySelectorAll('.country-card, .destination-card, .feature-box, .testimonial-card');
    
    // Set initial state class
    revealElements.forEach(el => el.classList.add('fade-up'));

    const revealOptions = {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px"
    };

    // Performance: IntersectionObserver instead of scroll event
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // ==========================================
    // 5. SMOOTH SCROLLING
    // ==========================================
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetEl = document.getElementById(targetId);
                if(targetEl) {
                    targetEl.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ==========================================
    // 6. STATISTICS CARDS
    // ==========================================
    const features = document.querySelectorAll('.feature-box');
    const counterData = [
        { target: 150, text: 'Species' },
        { target: 50, text: 'Guides' },
        { target: 100, text: 'Tours' },
        { target: 10, text: 'Parks' }
    ];

    // Inject static counters into feature boxes
    features.forEach((box, index) => {
        if(counterData[index]) {
            const counterDiv = document.createElement('div');
            counterDiv.className = 'counter-container';
            counterDiv.innerHTML = `<span class="counter">${counterData[index].target}</span>+ ${counterData[index].text}`;
            
            const desc = box.querySelector('.feature-description');
            if(desc) {
                box.insertBefore(counterDiv, desc);
            } else {
                box.appendChild(counterDiv);
            }
        }
    });

    // ==========================================
    // 7. GALLERY LIGHTBOX
    // ==========================================
    // Generate lightbox DOM elements dynamically
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);

    const lightboxImg = document.createElement('img');
    lightbox.appendChild(lightboxImg);

    const closeBtn = document.createElement('span');
    closeBtn.id = 'lightbox-close';
    closeBtn.innerHTML = '&times;';
    lightbox.appendChild(closeBtn);

    const galleryImages = document.querySelectorAll('.gallery-image');
    galleryImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            lightbox.classList.add('active');
            lightboxImg.src = img.src;
        });
    });

    // Close lightbox events
    lightbox.addEventListener('click', e => {
        if(e.target !== lightboxImg) {
            lightbox.classList.remove('active');
        }
    });
    
    document.addEventListener('keydown', e => {
        if(e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
        }
    });

    // ==========================================
    // 8. WHATSAPP CONTACT FORM VALIDATION & SUBMIT
    // ==========================================
    const contactForm = document.getElementById('whatsapp-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
            document.querySelectorAll('.form-control').forEach(el => el.classList.remove('is-invalid'));
            
            let isValid = true;
            
            // Fields
            const nameField = document.getElementById('fullName');
            const phoneField = document.getElementById('phoneNumber');
            const emailField = document.getElementById('emailAddress');
            const dateField = document.getElementById('travelDate');
            const descField = document.getElementById('tripDescription');
            
            // Validate Name
            if (!nameField.value.trim()) {
                document.getElementById('error-fullName').textContent = 'Please enter your full name.';
                nameField.classList.add('is-invalid');
                isValid = false;
            }
            
            // Validate Phone
            const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
            if (!phoneField.value.trim() || !phoneRegex.test(phoneField.value.trim()) || phoneField.value.trim().length < 7) {
                document.getElementById('error-phoneNumber').textContent = 'Please enter a valid phone number.';
                phoneField.classList.add('is-invalid');
                isValid = false;
            }
            
            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailField.value.trim() || !emailRegex.test(emailField.value.trim())) {
                document.getElementById('error-emailAddress').textContent = 'Please enter a valid email address.';
                emailField.classList.add('is-invalid');
                isValid = false;
            }
            
            // Validate Date
            if (!dateField.value) {
                document.getElementById('error-travelDate').textContent = 'Please select your preferred travel date.';
                dateField.classList.add('is-invalid');
                isValid = false;
            }
            
            // Validate Description
            if (!descField.value.trim()) {
                document.getElementById('error-tripDescription').textContent = 'Please provide a brief description of your trip.';
                descField.classList.add('is-invalid');
                isValid = false;
            }
            
            if (isValid) {
                // Construct WhatsApp Message exactly as required
                const rawMessage = `Hello Uganda Safari,\n\nI would like to make a tour enquiry.\n\nName: ${nameField.value.trim()}\nPhone: ${phoneField.value.trim()}\nEmail: ${emailField.value.trim()}\nPreferred Travel Date: ${dateField.value}\n\nTrip Description:\n${descField.value.trim()}\n\nPlease get back to me with more information. Thank you.`;
                
                const encodedMessage = encodeURIComponent(rawMessage);
                const whatsappUrl = `https://wa.me/256755899925?text=${encodedMessage}`;
                
                // Open WhatsApp in new tab
                window.open(whatsappUrl, '_blank');
                
                // Reset form
                contactForm.reset();
            }
        });
    }

    // ==========================================
    // 9. SAFARI PACKAGES SEARCH BAR (safaris.html)
    // ==========================================
    const safariSearchInput = document.getElementById('safari-search-input');
    const safariSearchClear = document.getElementById('safari-search-clear');
    const safariNoResults = document.getElementById('safari-no-results');
    const safariResetBtn = document.getElementById('safari-reset-btn');

    if (safariSearchInput) {
        // Collect country groups on the safari listing page
        const countryGroups = [
            document.getElementById('uganda-safaris'),
            document.getElementById('rwanda-safaris'),
            document.getElementById('uganda-rwanda-safaris')
        ].filter(Boolean);

        // Pre-cache package card data for fast, accurate searching
        const cardEntries = [];
        countryGroups.forEach(group => {
            const cards = group.querySelectorAll('.safari-ed-card');
            cards.forEach(card => {
                const titleEl = card.querySelector('.safari-ed-title');
                const descEl = card.querySelector('.safari-ed-desc');
                const imgEl = card.querySelector('img');
                
                const titleText = titleEl ? titleEl.textContent : '';
                const descText = descEl ? descEl.textContent : '';
                const imgAlt = imgEl ? (imgEl.getAttribute('alt') || '') : '';
                
                // Combine relevant card content
                const fullText = `${titleText} ${descText} ${imgAlt}`;

                cardEntries.push({
                    card,
                    group,
                    rawText: fullText.toLowerCase()
                });
            });
        });

        // Helper to normalize text (strip punctuation, collapse whitespace)
        function normalizeStr(str) {
            return str
                .toLowerCase()
                .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
        }

        // Stemming helper for common safari queries (days/day, safaris/safari, gorillas/gorilla, tours/tour, etc.)
        function getStem(word) {
            if (word.endsWith('ies')) return word.slice(0, -3) + 'y';
            if (word.endsWith('es') && (word.endsWith('ches') || word.endsWith('shes') || word.endsWith('xes') || word.endsWith('ses'))) {
                return word.slice(0, -2);
            }
            if (word.endsWith('s') && !word.endsWith('ss')) {
                return word.slice(0, -1);
            }
            return word;
        }

        function filterSafariPackages() {
            const rawQuery = safariSearchInput.value.trim();
            const cleanQuery = normalizeStr(rawQuery);

            // Toggle clear button visibility
            if (safariSearchClear) {
                if (rawQuery.length > 0) {
                    safariSearchClear.classList.add('is-visible');
                } else {
                    safariSearchClear.classList.remove('is-visible');
                }
            }

            // If empty, restore all packages and sections
            if (!cleanQuery) {
                cardEntries.forEach(entry => {
                    entry.card.style.display = '';
                });
                countryGroups.forEach(group => {
                    group.style.display = '';
                });
                if (safariNoResults) {
                    safariNoResults.style.display = 'none';
                }
                return;
            }

            const queryWords = cleanQuery.split(' ').filter(Boolean);
            const groupMatchCounts = new Map();
            countryGroups.forEach(g => groupMatchCounts.set(g, 0));
            let totalMatches = 0;

            cardEntries.forEach(entry => {
                const normCard = normalizeStr(entry.rawText);
                
                // Card matches if normalized card contains full query OR every query word (with stemming)
                let isMatch = false;
                if (normCard.includes(cleanQuery)) {
                    isMatch = true;
                } else {
                    isMatch = queryWords.every(word => {
                        if (normCard.includes(word)) return true;
                        const stem = getStem(word);
                        if (stem.length >= 3 && normCard.includes(stem)) return true;
                        return false;
                    });
                }

                if (isMatch) {
                    entry.card.style.display = '';
                    groupMatchCounts.set(entry.group, (groupMatchCounts.get(entry.group) || 0) + 1);
                    totalMatches++;
                } else {
                    entry.card.style.display = 'none';
                }
            });

            // Update each country group visibility: hide section heading and group if 0 matches
            countryGroups.forEach(group => {
                const matchesInGroup = groupMatchCounts.get(group) || 0;
                if (matchesInGroup === 0) {
                    group.style.display = 'none';
                } else {
                    group.style.display = '';
                }
            });

            // If no packages match at all, show the exact message: "No safari packages found. Try another search."
            if (safariNoResults) {
                if (totalMatches === 0) {
                    safariNoResults.style.display = 'block';
                } else {
                    safariNoResults.style.display = 'none';
                }
            }
        }

        // Live instant filtering as user types
        safariSearchInput.addEventListener('input', filterSafariPackages);

        // Escape key clears search
        safariSearchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                safariSearchInput.value = '';
                filterSafariPackages();
            }
        });

        // Clear button click handler
        if (safariSearchClear) {
            safariSearchClear.addEventListener('click', () => {
                safariSearchInput.value = '';
                safariSearchInput.focus();
                filterSafariPackages();
            });
        }

        // Reset button inside no-results box
        if (safariResetBtn) {
            safariResetBtn.addEventListener('click', () => {
                safariSearchInput.value = '';
                safariSearchInput.focus();
                filterSafariPackages();
            });
        }
    }

});
