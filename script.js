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
		contactForm.addEventListener('submit', function(event) {
			if (!validateMath()) {
				event.preventDefault(); // Prevent form submission
				return; // Stop further execution
			}

			// Existing code to handle EmailJS form submission
			event.preventDefault();
			
			const submitButton = this.querySelector('button[type="submit"]');
			const originalButtonText = submitButton.textContent;
			submitButton.textContent = 'Sending...';
			submitButton.disabled = true;
			
			var formData = {
				name: document.getElementById('name').value,
				email: document.getElementById('email').value,
				subject: document.getElementById('subject').value,
				message: document.getElementById('message').value,
				website: 'writereadsucceed.com.au'
			};

			emailjs.send('service_gxc3fee', 'template_ks3m9wa', formData)
				.then(() => {
					console.log('SUCCESS!');
					showNotification(
						'Message Sent!', 
						'Your message has been sent successfully. We will get back to you soon.',
						'success'
					);
					contactForm.reset();
				}, (error) => {
					console.log('FAILED...', error);
					showNotification(
						'Error', 
						'Sorry, there was a problem sending your message. Please try again later.',
						'error'
					);
				})
				.finally(() => {
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

    // Clear any existing "OK" button to avoid duplicates
    const existingOkButton = modalContent.querySelector('.ok-button');
    if (existingOkButton) {
        modalContent.removeChild(existingOkButton);
    }

    // Set modal content
    modalTitle.textContent = title;
    modalMessage.textContent = message;

    // Set modal type (success or error)
    modalContent.className = 'modal-content ' + type;

    // Show the modal
    modal.style.display = 'block';

    // Create a new "OK" button
    const okButton = document.createElement('button');
    okButton.textContent = 'OK';
    okButton.className = 'ok-button';
    modalContent.appendChild(okButton);

    // Close the modal on "OK" button click
    okButton.onclick = function () {
        modal.style.display = 'none';
        modalContent.removeChild(okButton); // Remove the button after closing
    };

    // Close the modal when clicking outside of it
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            if (modalContent.contains(okButton)) {
                modalContent.removeChild(okButton); // Ensure the button is removed
            }
        }
    };

    // Automatically close after 5 seconds
    setTimeout(function () {
        if (modal.style.display === 'block') {
            modal.style.display = 'none';
            if (modalContent.contains(okButton)) {
                modalContent.removeChild(okButton); // Ensure the button is removed
            }
        }
    }, 5000);
}
	 let num1, num2, correctAnswer;

		// Generate a random math problem when the page loads
		function generateMathProblem() {
			// Mapping numbers to their text equivalents
			const numberTextMap = {
				1: "one",
				2: "two",
				3: "three",
				4: "four",
				5: "five",
				6: "six",
				7: "seven",
				8: "eight",
				9: "nine",
				10: "ten"
			};

			// Generate random numbers
			num1 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
			num2 = Math.floor(Math.random() * 10) + 1;

			// Get text representation of the numbers
			const num1Text = numberTextMap[num1];
			const num2Text = numberTextMap[num2];

			// Correct answer
			correctAnswer = num1 + num2;

			// Display the math problem in text format
			document.getElementById('mathProblem').textContent = `${num1Text} + ${num2Text}`;
		}


		// Validate the user's answer
		function validateMath() {
			const userAnswer = parseInt(document.getElementById('mathAnswer').value, 10);
			if (userAnswer !== correctAnswer) {
				// Show error modal and stop form submission
				showNotification("Error", "Incorrect answer. Please try again.");
				return false; // This is critical to prevent submission
			}
			return true; // Allow submission if correct
		}

		function showModal(status, message) {
			document.getElementById('modalTitle').textContent = status;
			document.getElementById('modalMessage').textContent = message;
			document.getElementById('notificationModal').style.display = 'block'
		}
		// Generate the problem when the page loads
		window.onload = generateMathProblem;

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