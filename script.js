document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('show');
    });

    // Smooth scrolling for navigation links
    const links = document.querySelectorAll('nav a, .hero a, .footer-links a');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only for internal links
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // For mobile menu, close after clicking
                    navLinks.classList.remove('show');
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Update active state in navigation
                    document.querySelectorAll('nav a').forEach(navLink => {
                        navLink.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            }
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        document.getElementById('contactForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the form from submitting the default way
            
            // Get the submit button and store its original text
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Collect form data
            var formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                website: 'writereadsucceed.com.au' // Fixed variable
            };

            // Send the email using EmailJS
            emailjs.send('service_gxc3fee', 'template_ks3m9wa', formData)
                .then(() => {
                    console.log('SUCCESS!');
                    showNotification(
                        'Message Sent!', 
                        'Your message has been sent successfully. We will get back to you soon.',
                        'success'
                    );
                    // Reset the form
                    document.getElementById('contactForm').reset();
                }, (error) => {
                    console.log('FAILED...', error);
                    showNotification(
                        'Error', 
                        'Sorry, there was a problem sending your message. Please try again later.',
                        'error'
                    );
                })
                .finally(() => {
                    // Reset button state
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                });
        });
    }

    // Function to show the notification modal
    function showNotification(title, message, type) {
        const modal = document.getElementById('notificationModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalMessage = document.getElementById('modalMessage');
        const modalContent = modal.querySelector('.modal-content');
        
        // Set modal content
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        
        // Set modal type (success or error)
        modalContent.className = 'modal-content ' + type;
        
        // Show the modal
        modal.style.display = 'block';
        
        // Set up close button
        const closeButton = modal.querySelector('.close-button');
        closeButton.onclick = function() {
            modal.style.display = 'none';
        }
        
        // Close when clicking outside the modal
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
        
        // Automatically close after 5 seconds
        setTimeout(function() {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        }, 5000);
    }

    // Active navigation highlighting based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - 100)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
});