const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');

const newNavTemplate = (activePage) => `<!-- Navigation Menu -->
        <nav id="main-nav" class="navigation-menu">
            <ul class="nav-links-list">
                <li class="nav-item"><a href="index.html" class="nav-link ${activePage === 'index' ? 'active' : ''}">Home</a></li>
                <li class="nav-item"><a href="destinations.html" class="nav-link ${activePage === 'destinations' ? 'active' : ''}">Destinations</a></li>
                <li class="nav-item"><a href="safaris.html" class="nav-link ${activePage === 'safaris' ? 'active' : ''}">Safaris</a></li>
                <li class="nav-item"><a href="gallery.html" class="nav-link ${activePage === 'gallery' ? 'active' : ''}">Gallery</a></li>
                <li class="nav-item"><a href="about.html" class="nav-link ${activePage === 'about' ? 'active' : ''}">About</a></li>
                <li class="nav-item"><a href="contact.html" class="nav-link ${activePage === 'contact' ? 'active' : ''}">Contact</a></li>
            </ul>
        </nav>`;

const getSection = (num, name) => {
    const regex = new RegExp(`<!-- ============================================== -->\\s*<!-- ${num}\\. ${name} SECTION\\s*-->\\s*<!-- ============================================== -->[\\s\\S]*?(?=<!-- ============================================== -->|<!-- WhatsApp Floating Button -->)`);
    const match = content.match(regex);
    return match ? match[0] : '';
};

const headerSection = getSection(1, 'HEADER \\/ NAVBAR');
const heroSection = getSection(2, 'HERO');
const destinationSection = getSection(3, 'DESTINATIONS');
const safariSection = getSection(4, 'SAFARI PACKAGES');
const whyChooseUsSection = getSection(5, 'WHY CHOOSE US');
const gallerySection = getSection(6, 'GALLERY');
const testimonialSection = getSection(7, 'TESTIMONIAL');
const ctaSection = getSection(8, 'CALL TO ACTION');
const footerSection = getSection(9, 'FOOTER');

const topOfDoc = content.substring(0, content.indexOf(headerSection));
const bottomOfDoc = content.substring(content.indexOf('<!-- WhatsApp Floating Button -->'));

function generatePage(filename, activeNav, bodyContent) {
    let header = headerSection;
    const oldNavRegex = /<!-- Navigation Menu -->[\s\S]*?<\/nav>/;
    header = header.replace(oldNavRegex, newNavTemplate(activeNav));
    
    let footer = footerSection;
    footer = footer.replace(/<a href="#" class="footer-link">Home<\/a>/, '<a href="index.html" class="footer-link">Home</a>');
    footer = footer.replace(/<a href="#" class="footer-link">About Us<\/a>/, '<a href="about.html" class="footer-link">About Us</a>');
    footer = footer.replace(/<a href="#" class="footer-link">Our Safaris<\/a>/, '<a href="safaris.html" class="footer-link">Our Safaris</a>');
    footer = footer.replace(/<a href="#" class="footer-link">Contact<\/a>/, '<a href="contact.html" class="footer-link">Contact</a>');
    
    let html = topOfDoc + header + '\n' + bodyContent + '\n' + footer + bottomOfDoc;
    fs.writeFileSync(filename, html);
    console.log(`Generated ${filename}`);
}

generatePage('index.html', 'index', heroSection + ctaSection);
generatePage('destinations.html', 'destinations', destinationSection);
generatePage('safaris.html', 'safaris', safariSection);
generatePage('gallery.html', 'gallery', gallerySection);
generatePage('about.html', 'about', whyChooseUsSection + testimonialSection);
generatePage('contact.html', 'contact', ctaSection);
