document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('show');
            }
        });
    });
    
    // Form submission
    const partnerForm = document.getElementById('partnerForm');
    const successModal = document.getElementById('successModal');
    const closeModalBtns = document.querySelectorAll('.close-modal, .close-modal-btn');
    
    if (partnerForm) {
        partnerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For demonstration, we'll just show the success modal
            
            // Get form data
            const formData = new FormData(partnerForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Log form data to console (for demonstration)
            console.log('Form submitted:', formObject);
            
            // Show success modal
            successModal.style.display = 'flex';
            
            // Reset form
            partnerForm.reset();
        });
    }
    
    // Close modal
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            successModal.style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === successModal) {
            successModal.style.display = 'none';
        }
    });
    
    // Form validation for checkboxes
    const interestCheckboxes = document.querySelectorAll('input[name="interestAreas"]');
    const partnershipTypeSelect = document.getElementById('partnershipType');
    
    // Example of additional validation
    if (partnershipTypeSelect) {
        partnershipTypeSelect.addEventListener('change', function() {
            if (this.value === 'financial') {
                // You could add specific validation for financial partnerships
            }
        });
    }
    
    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.benefit-card, .activity-card, .type-card, .form-section');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.benefit-card, .activity-card, .type-card, .form-section').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});