// Scroll animation
document.addEventListener('DOMContentLoaded', function() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(element => {
        observer.observe(element);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
    
    // Header background on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('bg-white', 'shadow-md');
            header.classList.remove('bg-white/90');
        } else {
            header.classList.remove('bg-white', 'shadow-md');
            header.classList.add('bg-white/90');
        }
    });
    
    // Gallery filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-primary', 'text-white');
                btn.classList.add('bg-white', 'text-dark');
            });
            
            // Add active class to clicked button
            this.classList.remove('bg-white', 'text-dark');
            this.classList.add('bg-primary', 'text-white');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Mobile menu functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    function openMobileMenu() {
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    mobileMenuToggle.addEventListener('click', openMobileMenu);
    mobileMenuClose.addEventListener('click', closeMobileMenu);
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
});



// FAQ toggle function
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector(".faq-answer");
    const icon = faqItem.querySelector(".faq-toggle i");

    // Toggle visibility
    const isOpen = !answer.classList.contains("hidden");

    // Close all
    document.querySelectorAll(".faq-answer").forEach((el) => el.classList.add("hidden"));
    document
      .querySelectorAll(".faq-toggle i")
      .forEach((ic) => ic.classList.remove("rotate-180"));

    // If not already open, open this one
    if (!isOpen) {
      answer.classList.remove("hidden");
      icon.classList.add("rotate-180");
    }
  }
