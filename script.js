// Form Validation and Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form submission until validation passes
            
            // Get form values
            let name = document.getElementById('name').value.trim();
            let email = document.getElementById('email').value.trim();
            let message = document.getElementById('message').value.trim();
            
            // Error message containers
            let nameError = document.getElementById('nameError');
            let emailError = document.getElementById('emailError');
            let messageError = document.getElementById('messageError');
            
            // Clear old error messages
            nameError.textContent = "";
            emailError.textContent = "";
            messageError.textContent = "";
            
            let isValid = true;
            
            // Validate Name
            if (name === "") {
                nameError.textContent = "Name cannot be empty";
                isValid = false;
            } else if (name.length < 2) {
                nameError.textContent = "Name must be at least 2 characters long";
                isValid = false;
            }
            
            // Validate Email
            if (email === "") {
                emailError.textContent = "Email cannot be empty";
                isValid = false;
            } else if (!email.includes("@") || !email.includes(".")) {
                emailError.textContent = "Email must contain @ and a domain";
                isValid = false;
            } else if (!isValidEmail(email)) {
                emailError.textContent = "Please enter a valid email address";
                isValid = false;
            }
            
            // Validate Message
            if (message.length < 10) {
                messageError.textContent = "Message must be at least 10 characters long";
                isValid = false;
            } else if (message.length > 500) {
                messageError.textContent = "Message must be less than 500 characters";
                isValid = false;
            }
            
            // If form is valid, allow submission
            if (isValid) {
                // Show success message
                showSuccessMessage();
                // Reset form
                contactForm.reset();
            } else {
                // Scroll to first error
                scrollToFirstError();
            }
        });
    }
    
    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show success message
    function showSuccessMessage() {
        // Create success alert
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-success alert-dismissible fade show';
        alertDiv.innerHTML = `
            <strong>Success!</strong> Your message has been sent successfully. I'll get back to you soon!
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        // Insert before the form
        const contactSection = document.getElementById('contact');
        const container = contactSection.querySelector('.container .row .col-lg-8');
        container.insertBefore(alertDiv, container.firstChild);
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }
    
    // Scroll to first error
    function scrollToFirstError() {
        const errors = document.querySelectorAll('.error-message');
        for (let error of errors) {
            if (error.textContent !== "") {
                error.scrollIntoView({ behavior: 'smooth', block: 'center' });
                break;
            }
        }
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calculate offset based on screen size
                let offset = 80; // Default for desktop
                if (window.innerWidth <= 576) {
                    offset = 60; // Mobile
                } else if (window.innerWidth <= 768) {
                    offset = 70; // Tablet
                }
                
                const offsetTop = targetSection.offsetTop - offset;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(75, 121, 161, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #4B79A1 0%, #283E51 100%)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });
    
    // Add fade-in animation to sections on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Form field focus effects
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // Mobile menu close on link click
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const mobileNavLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
    
    // Add loading animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.type === 'submit') {
                this.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
                this.disabled = true;
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    this.innerHTML = 'Send Message';
                    this.disabled = false;
                }, 3000);
            }
        });
    });
    
    // Initialize tooltips if Bootstrap tooltips are used
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Add click effect to social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Add subtle parallax effect to hero section (disabled on mobile for better performance)
    function handleParallax() {
        if (window.innerWidth > 768) { // Only apply parallax on desktop
            const scrolled = window.pageYOffset;
            const heroSection = document.querySelector('.hero-section');
            if (heroSection && scrolled < heroSection.offsetHeight) {
                heroSection.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        } else {
            // Reset transform on mobile
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                heroSection.style.transform = 'translateY(0)';
            }
        }
    }
    
    window.addEventListener('scroll', handleParallax);
    window.addEventListener('resize', handleParallax);
    
    // Add counter animation for stats (if you want to add stats later)
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const count = parseInt(counter.textContent);
            const increment = target / 100;
            
            if (count < target) {
                counter.textContent = Math.ceil(count + increment);
                setTimeout(() => animateCounters(), 20);
            } else {
                counter.textContent = target;
            }
        });
    }
    
    // Initialize animations when page loads
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Download Resume Function
function downloadResume() {
    // Create a simple PDF download simulation
    const link = document.createElement('a');
    link.href = '#'; // In a real scenario, this would be the actual PDF file
    link.download = 'Mahad_Ghauri_Resume.pdf';
    
    // Show download message
    alert('Resume download started! (This is a demo - in a real scenario, this would download your actual PDF resume)');
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('downloadModal'));
    modal.hide();
}

// Utility function to validate form fields in real-time
function validateField(field, value) {
    const fieldId = field.id;
    const errorElement = document.getElementById(fieldId + 'Error');
    
    switch(fieldId) {
        case 'name':
            if (value.length < 2) {
                errorElement.textContent = 'Name must be at least 2 characters long';
                return false;
            }
            break;
        case 'email':
            if (!isValidEmail(value)) {
                errorElement.textContent = 'Please enter a valid email address';
                return false;
            }
            break;
        case 'message':
            if (value.length < 10) {
                errorElement.textContent = 'Message must be at least 10 characters long';
                return false;
            }
            break;
    }
    
    errorElement.textContent = '';
    return true;
}

// Add real-time validation
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this, this.value.trim());
        });
        
        input.addEventListener('input', function() {
            // Clear error message when user starts typing
            const errorElement = document.getElementById(this.id + 'Error');
            if (errorElement && errorElement.textContent) {
                errorElement.textContent = '';
            }
        });
    });
});

// Email validation helper function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
