document.addEventListener('DOMContentLoaded', function() {
    // Character slider functionality
    const cards = document.querySelectorAll('.character-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (cards.length && prevBtn && nextBtn) {
        let currentIndex = 0;

        function showCard(index) {
            cards.forEach(card => card.classList.remove('active'));
            cards[index].classList.add('active');
        }

        function nextCard() {
            currentIndex = (currentIndex + 1) % cards.length;
            showCard(currentIndex);
        }

        function prevCard() {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            showCard(currentIndex);
        }

        nextBtn.addEventListener('click', nextCard);
        prevBtn.addEventListener('click', prevCard);

        // Optional: Auto-slide every 5 seconds
        setInterval(nextCard, 5000);
    }

    // Form submission
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitButton = this.querySelector('.submit-order');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Processing...';
            submitButton.disabled = true;

            try {
                // Create a new FormData without the file
                const formData = new FormData();
                
                // Add all form fields except the file
                formData.append('name', this.querySelector('#name').value);
                formData.append('email', this.querySelector('#email').value);
                formData.append('phone', this.querySelector('#phone').value);
                formData.append('address_line', this.querySelector('#address_line').value);
                formData.append('building', this.querySelector('#building').value);
                formData.append('street', this.querySelector('#street').value);
                formData.append('subdistrict', this.querySelector('#subdistrict').value);
                formData.append('district', this.querySelector('#district').value);
                formData.append('province', this.querySelector('#province').value);
                formData.append('postal_code', this.querySelector('#postal_code').value);
                formData.append('country', this.querySelector('#country').value);
                formData.append('payment_confirmation', 'Customer will send payment confirmation via email');

                const response = await fetch('https://formspree.io/f/mblgrpzb', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Show success message
                    showNotification('Order submitted successfully! Please send your payment confirmation to our email.', 'success');
                    // Redirect to thank you page
                    window.location.href = 'thank-you.html';
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Error:', error);
                showNotification('There was an error submitting your order. Please try again.', 'error');
                
                // Reset button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }

    // Flipbook functionality
    const openFlipbook = document.getElementById('openFlipbook');
    const closeFlipbook = document.getElementById('closeFlipbook');
    const flipbookModal = document.getElementById('flipbookModal');
    const flipbook = document.getElementById('flipbook');
    const prevPage = document.querySelector('.prev-page');
    const nextPage = document.querySelector('.next-page');
    const pageNumber = document.querySelector('.page-number');
    const pages = document.querySelectorAll('.page');

    if (openFlipbook && closeFlipbook && flipbookModal && pages.length) {
        let currentPage = 0;

        openFlipbook.addEventListener('click', () => {
            flipbookModal.classList.add('active');
        });

        closeFlipbook.addEventListener('click', () => {
            flipbookModal.classList.remove('active');
        });

        function updatePage(index) {
            pages.forEach((page, i) => {
                if (i === index) {
                    page.style.transform = 'rotateY(0deg)';
                    page.style.zIndex = '1';
                } else {
                    page.style.transform = i < index ? 'rotateY(-180deg)' : 'rotateY(0deg)';
                    page.style.zIndex = '0';
                }
            });
            if (pageNumber) {
                pageNumber.textContent = `${index + 1} / ${pages.length}`;
            }
        }

        if (prevPage) {
            prevPage.addEventListener('click', () => {
                if (currentPage > 0) {
                    currentPage--;
                    updatePage(currentPage);
                }
            });
        }

        if (nextPage) {
            nextPage.addEventListener('click', () => {
                if (currentPage < pages.length - 1) {
                    currentPage++;
                    updatePage(currentPage);
                }
            });
        }

        // Initialize first page
        updatePage(0);
    }

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('newsletter-email').value;
            alert('Thank you for subscribing! You will receive updates about our limited editions.');
        });
    }

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Add smooth scrolling for Buy Magazine buttons
    document.querySelectorAll('.btn-primary, .btn-outline').forEach(button => {
        button.addEventListener('click', () => {
            const shopSection = document.querySelector('#shop');
            if (shopSection) {
                shopSection.scrollIntoView({ 
                    behavior: 'smooth'
                });
            }
        });
    });

    // Smooth scrolling for all navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Notification function
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <p>${message}</p>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add notification styles
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '8px';
    notification.style.backgroundColor = type === 'success' ? '#2e7d32' : '#d32f2f';
    notification.style.color = 'white';
    notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    notification.style.zIndex = '10000';
    notification.style.transition = 'all 0.3s ease';

    // Add to document
    document.body.appendChild(notification);

    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);

    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
} 