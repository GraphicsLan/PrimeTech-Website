document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
            } else {
                faqItem.classList.remove('active');
            }
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    const contactSuccessModal = document.getElementById('contactSuccessModal');
    const closeModalBtns = document.querySelectorAll('.close-modal, .close-modal-btn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Log form data to console (for demonstration)
            console.log('Contact form submitted:', formObject);
            
            // Here you would typically send the data to a server
            // For demonstration, we'll just show the success modal
            
            // Show success modal
            contactSuccessModal.style.display = 'flex';
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Close modal
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            contactSuccessModal.style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === contactSuccessModal) {
            contactSuccessModal.style.display = 'none';
        }
    });
    
    // Form validation for subject select
    const subjectSelect = document.getElementById('subject');
    if (subjectSelect) {
        subjectSelect.addEventListener('change', function() {
            if (this.value === '') {
                this.setCustomValidity('Please select a subject');
            } else {
                this.setCustomValidity('');
            }
        });
    }
});