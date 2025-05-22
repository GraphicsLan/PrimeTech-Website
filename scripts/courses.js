document.addEventListener('DOMContentLoaded', function() {
    // Course data
    const courses = {
        'web-development': {
            title: 'Web Development Fundamentals',
            description: 'This comprehensive course introduces you to the world of web development. You\'ll learn to build responsive, user-friendly websites using the core technologies of the web: HTML, CSS, and JavaScript. By the end of the course, you\'ll have built several projects for your portfolio.',
            duration: '8 Weeks (Part-time)',
            schedule: 'Once per week, 2 hours per session',
            requirements: [
                'Basic computer literacy',
                'No prior programming experience required',
                'Access to a computer (Windows, Mac, or Linux)',
                'Dedication to complete assignments and projects',
                'Internet Connectin'
            ],
            outcomes: [
                'Build responsive websites with HTML & CSS',
                'Add interactivity with JavaScript',
                'Understand web design principles',
                'Version control with Git',
                'Deploy websites to live servers'
            ],
            instructor: 'Ronald Wandili',
            price: 'Ksh 0'
        },
        'data-science': {
            title: 'Data Science Essentials',
            description: 'This course provides a practical introduction to data science. You\'ll learn how to collect, clean, analyze, and visualize data using Python and popular data science libraries. The course includes real-world projects to help you apply your new skills.',
            duration: '12 Weeks (Part-time)',
            schedule: 'Once per week, 2 hours per session',
            requirements: [
                'Basic understanding of mathematics',
                'Some programming experience helpful but not required',
                'Access to a computer (Windows, Mac, or Linux)',
                'Willingness to work with data and statistics',
                'Internet Connection'
            ],
            outcomes: [
                'Python programming for data analysis',
                'Data cleaning and preprocessing',
                'Exploratory data analysis',
                'Data visualization techniques',
                'Basic machine learning concepts'
            ],
            instructor: 'Sharon Jepkemoi',
            price: 'Ksh 0'
        },
        'digital-marketing': {
            title: 'Digital Marketing Strategy',
            description: 'Master the essential digital marketing skills needed in today\'s business environment. This course covers SEO, social media marketing, email marketing, content strategy, and analytics. You\'ll develop a complete digital marketing plan for a real or hypothetical business.',
            duration: '6 Weeks (Part-time)',
            schedule: 'Once a week, 1 hour per session',
            requirements: [
                'Basic computer and internet skills',
                'Interest in marketing and business',
                'Access to a computer with internet',
                'Active social media accounts (helpful but not required)'
            ],
            outcomes: [
                'Develop effective digital marketing strategies',
                'Optimize websites for search engines',
                'Create engaging social media content',
                'Analyze marketing performance metrics',
                'Run effective email marketing campaigns'
            ],
            instructor: 'Seth Omondi',
            price: 'Ksh 0'
        },
        'Python Programming': {
            title: 'Introduction to Python Programming',
            description: 'This course is designed for beginners who want to learn Python programming. You\'ll start with the basics and progress to more advanced topics, including data structures, functions, and file handling. By the end of the course, you\'ll be able to write Python scripts and build simple applications.',
            duration: '8 Weeks (Part-time)',
            schedule: 'Once per week, 2 hours per session',
            requirements: [
                'Computer literacy',
                'Basic programming skills',
                'Internet access',
                'Willingness to learn'
            ],
            outcomes: [
                'Python programming skills',
                'Python Progamming syntax mastery',
                'Transition to intermediate python programming',
            ],
            instructor: 'Ian Githinji',
            price: 'Ksh 0'
        },
        'graphic-design': {
            title: 'Graphic Design Fundamentals',
            description: 'Learn the principles of visual communication and design in this hands-on course. You\'ll work with industry-standard tools like Adobe Photoshop and Illustrator to create logos, marketing materials, and digital artwork. By the end, you\'ll have a professional design portfolio.',
            duration: '8 Weeks (Part-time)',
            schedule: 'Once per Week, 2 hours per session',
            requirements: [
                'Creative mindset',
                'Access to a computer (Mac or Windows)',
                'Adobe Creative Cloud (trial version acceptable)',
                'No prior design experience required',
                'Internet Access'
            ],
            outcomes: [
                'Design principles and color theory',
                'Logo and branding design',
                'Typography fundamentals',
                'Adobe Photoshop and Illustrator skills',
                'Digital illustration techniques'
            ],
            instructor: 'Ian Githinji',
            price: 'Ksh 0'
        },
        'Artificial Intelligence': {
            title: 'Artificial Intelligence',
            description: 'This course introduces the fundamental concepts of AI. You\'ll learn about origin of Ai, Prompt Engineering, Ethical use of Ai. The course includes hands-on practicals to reinforce learning.',
            duration: '6 Weeks (Part-time)',
            schedule: 'Once a week, 2 hours per session',
            requirements: [
                'Basic computer knowledge',
                'Interest in technology ',
                'Access to a computer (Windows or Linux recommended)',
                'No prior experience required'
            ],
            outcomes: [
                'Understand common use of AI',
                
                'AI use fundamentals',
                'Propmt Engineering concepts',
                'Ethical Ai use'
            ],
            instructor: 'Ronald Wandili',
            price: 'Ksh 0'
        }
    };

    // Course category filtering
    const categoryBtns = document.querySelectorAll('.category-btn');
    const courseCards = document.querySelectorAll('.course-card');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const category = this.dataset.category;

            // Filter courses
            courseCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Course details display
    const viewDetailBtns = document.querySelectorAll('.view-details-btn');
    const courseDetailsContent = document.getElementById('course-details-content');
    const detailCourseTitle = document.getElementById('detail-course-title');
    const selectedCourseInput = document.getElementById('selectedCourse');

    viewDetailBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const courseId = this.dataset.course;
            const course = courses[courseId];

            // Update the selected course in the form
            selectedCourseInput.value = course.title;

            // Scroll to details section
            document.querySelector('.course-details-section').scrollIntoView({
                behavior: 'smooth'
            });

            // Populate course details
            detailCourseTitle.textContent = course.title;
            
            courseDetailsContent.innerHTML = `
                <div class="course-detail-item">
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                </div>
                
                <div class="course-detail-item">
                    <h4><i class="fas fa-info-circle"></i> Course Details</h4>
                    <p><strong>Duration:</strong> ${course.duration}</p>
                    <p><strong>Schedule:</strong> ${course.schedule}</p>
                    <p><strong>Instructor:</strong> ${course.instructor}</p>
                    <p><strong>Course Fee:</strong> ${course.price}</p>
                </div>
                
                <div class="course-detail-item">
                    <h4><i class="fas fa-clipboard-check"></i> Requirements</h4>
                    <ul>
                        ${course.requirements.map(req => `<li>${req}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="course-detail-item">
                    <h4><i class="fas fa-star"></i> Learning Outcomes</h4>
                    <ul>
                        ${course.outcomes.map(outcome => `<li>${outcome}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="apply-course-btn">
                    <a href="#course-application" class="btn">Apply Now</a>
                </div>
            `;
        });
    });

    // Course application form submission
    const courseApplicationForm = document.getElementById('courseApplicationForm');
    const courseSuccessModal = document.getElementById('courseSuccessModal');
    const closeModalBtns = document.querySelectorAll('.close-modal, .close-modal-btn');

    if (courseApplicationForm) {
        courseApplicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(courseApplicationForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Log form data to console (for demonstration)
            console.log('Course application submitted:', formObject);
            
            // Show success modal
            courseSuccessModal.style.display = 'flex';
            
            // Reset form
            courseApplicationForm.reset();
        });
    }
    
    // Close modal
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            courseSuccessModal.style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === courseSuccessModal) {
            courseSuccessModal.style.display = 'none';
        }
    });

    // Set minimum date for course start date to today
    const startDateInput = document.getElementById('startDate');
    if (startDateInput) {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        const minDate = yyyy + '-' + mm + '-' + dd;
        
        startDateInput.setAttribute('min', minDate);
    }
});